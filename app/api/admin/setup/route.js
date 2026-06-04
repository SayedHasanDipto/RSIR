import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const usersCollection = db.collection('user');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ 
        error: 'User not found. Please sign up with this email address first, then try promoting it.' 
      }, { status: 404 });
    }

    await usersCollection.updateOne(
      { email },
      { $set: { role: 'admin' } }
    );

    return NextResponse.json({ 
      success: true, 
      message: `Successfully promoted ${email} to admin.` 
    });
  } catch (error) {
    console.error('Make admin error:', error);
    return NextResponse.json({ error: 'Failed to promote user' }, { status: 500 });
  }
}
