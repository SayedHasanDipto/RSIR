import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { resourcesCollection } from '@/lib/models';

// GET — List all resources (admin)
export async function GET(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [resources, total] = await Promise.all([
      resourcesCollection()
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      resourcesCollection().countDocuments(filter),
    ]);

    return NextResponse.json({
      resources: resources.map(r => ({ ...r, _id: r._id.toString() })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Resources list error:', error);
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

// POST — Create a new resource
export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, category, fileUrl, fileSize, status: resStatus } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const resource = {
      title,
      description: description || '',
      category: category || 'General',
      fileUrl: fileUrl || '',
      fileSize: fileSize || 0,
      downloadCount: 0,
      status: resStatus || 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await resourcesCollection().insertOne(resource);

    return NextResponse.json({
      success: true,
      resource: { ...resource, _id: result.insertedId.toString() },
    }, { status: 201 });
  } catch (error) {
    console.error('Create resource error:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}
