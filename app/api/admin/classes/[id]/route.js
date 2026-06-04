import { NextResponse } from 'next/server';
import { classesCollection } from '@/lib/models';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const { id } = await params;
    
    // Remove immutable fields if present
    delete data._id;
    if (data.date) {
      data.date = new Date(data.date);
    }
    if (data.seats) {
      data.seats = parseInt(data.seats);
    }
    data.updatedAt = new Date();

    const result = await classesCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update class:', error);
    return NextResponse.json({ error: 'Failed to update class' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const result = await classesCollection().deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete class:', error);
    return NextResponse.json({ error: 'Failed to delete class' }, { status: 500 });
  }
}
