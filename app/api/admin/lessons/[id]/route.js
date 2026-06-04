import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { requireAdmin } from '@/lib/admin';
import { lessonsCollection } from '@/lib/models';
import { processVideoUrl } from '@/lib/video-utils';

// GET — Get single lesson
export async function GET(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const lesson = await lessonsCollection().findOne({ _id: new ObjectId(id) });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({ lesson: { ...lesson, _id: lesson._id.toString() } });
  } catch (error) {
    console.error('Get lesson error:', error);
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
  }
}

// PUT — Update lesson
export async function PUT(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, category, duration, description, content, instructor, difficulty, videoUrl, videoType, thumbnailUrl, status: lessonStatus } = body;

    // Process video URL if changed
    let processedVideo = null;
    if (videoUrl && (videoType === 'youtube' || videoType === 'facebook')) {
      processedVideo = processVideoUrl(videoUrl);
    }

    const updateData = {
      ...(title && { title }),
      ...(category && { category }),
      ...(duration !== undefined && { duration }),
      ...(description !== undefined && { description }),
      ...(content !== undefined && { content }),
      ...(instructor && { instructor }),
      ...(difficulty && { difficulty }),
      ...(videoType && { videoType }),
      ...(videoUrl !== undefined && { 
        videoUrl: processedVideo?.embedUrl || videoUrl,
        originalVideoUrl: videoUrl,
      }),
      ...(thumbnailUrl !== undefined && { 
        thumbnailUrl: processedVideo?.thumbnailUrl || thumbnailUrl 
      }),
      ...(lessonStatus && { status: lessonStatus }),
      updatedAt: new Date(),
    };

    const result = await lessonsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const updated = await lessonsCollection().findOne({ _id: new ObjectId(id) });
    return NextResponse.json({ 
      success: true, 
      lesson: { ...updated, _id: updated._id.toString() } 
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}

// DELETE — Delete lesson
export async function DELETE(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const result = await lessonsCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete lesson error:', error);
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 });
  }
}
