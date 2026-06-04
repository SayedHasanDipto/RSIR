import { NextResponse } from 'next/server';
import { classesCollection } from '@/lib/models';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const classes = await classesCollection()
      .find({})
      .sort({ date: 1 })
      .toArray();
      
    return NextResponse.json(classes);
  } catch (error) {
    console.error('Failed to fetch classes:', error);
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Validate required fields
    const { title, type, date, time, seats, color, status } = data;
    if (!title || !type || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newClass = {
      title,
      type,
      date: new Date(date),
      time,
      seats: seats ? parseInt(seats) : 0,
      color: color || 'border-gold',
      status: status || 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await classesCollection().insertOne(newClass);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Failed to create class:', error);
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}
