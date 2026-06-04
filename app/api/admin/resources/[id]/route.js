import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { requireAdmin } from '@/lib/admin';
import { resourcesCollection } from '@/lib/models';

// GET — Get single resource
export async function GET(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const resource = await resourcesCollection().findOne({ _id: new ObjectId(id) });

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json({ resource: { ...resource, _id: resource._id.toString() } });
  } catch (error) {
    console.error('Get resource error:', error);
    return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 });
  }
}

// PUT — Update resource
export async function PUT(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, category, fileUrl, fileSize, status: resStatus } = body;

    const updateData = {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(category && { category }),
      ...(fileUrl !== undefined && { fileUrl }),
      ...(fileSize !== undefined && { fileSize }),
      ...(resStatus && { status: resStatus }),
      updatedAt: new Date(),
    };

    const result = await resourcesCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const updated = await resourcesCollection().findOne({ _id: new ObjectId(id) });
    return NextResponse.json({ 
      success: true, 
      resource: { ...updated, _id: updated._id.toString() } 
    });
  } catch (error) {
    console.error('Update resource error:', error);
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
  }
}

// DELETE — Delete resource
export async function DELETE(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const result = await resourcesCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete resource error:', error);
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
  }
}
