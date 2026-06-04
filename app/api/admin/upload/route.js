import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// POST — Upload file (PDF, image/thumbnail)
export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'general'; // 'pdf', 'thumbnail', 'general'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum 50MB allowed.' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = {
      pdf: ['application/pdf'],
      thumbnail: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
      general: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    };

    const allowed = allowedTypes[type] || allowedTypes.general;
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type. Allowed: ${allowed.join(', ')}` 
      }, { status: 400 });
    }

    // Create upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', type);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const ext = file.name.split('.').pop();
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .substring(0, 50);
    const filename = `${safeName}-${timestamp}.${ext}`;

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${type}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
