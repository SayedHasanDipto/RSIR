import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { lessonsCollection } from '@/lib/models';
import { processVideoUrl } from '@/lib/video-utils';

// GET — List all lessons (admin)
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

    const [lessons, total] = await Promise.all([
      lessonsCollection()
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      lessonsCollection().countDocuments(filter),
    ]);

    return NextResponse.json({
      lessons: lessons.map(l => ({ ...l, _id: l._id.toString() })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Lessons list error:', error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}

// POST — Create a new lesson
export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, duration, description, content, instructor, difficulty, videoUrl, videoType, thumbnailUrl, status: lessonStatus } = body;

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    // Process video URL if provided
    let processedVideo = null;
    if (videoUrl && (videoType === 'youtube' || videoType === 'facebook')) {
      processedVideo = processVideoUrl(videoUrl);
    }

    const lesson = {
      title,
      category,
      duration: duration || '',
      description: description || '',
      content: content || '',
      instructor: instructor || 'Robiul Islam',
      difficulty: difficulty || 'Intermediate',
      videoType: videoType || 'youtube',
      videoUrl: processedVideo?.embedUrl || videoUrl || '',
      originalVideoUrl: videoUrl || '',
      thumbnailUrl: processedVideo?.thumbnailUrl || thumbnailUrl || '',
      status: lessonStatus || 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await lessonsCollection().insertOne(lesson);

    return NextResponse.json({
      success: true,
      lesson: { ...lesson, _id: result.insertedId.toString() },
    }, { status: 201 });
  } catch (error) {
    console.error('Create lesson error:', error);
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}
