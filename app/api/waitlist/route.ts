// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';

export async function POST(req: NextRequest) {
  try {
    const { email, plan } = await req.json();

    if (!email || !/^\w+@\w+\.\w+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection failed');

    // Check if already exists
    const existing = await db.collection('waitlist').findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Already on waitlist' }, { status: 400 });
    }

    // Add to waitlist
    await db.collection('waitlist').insertOne({
      email,
      plan: plan || 'pro',
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: 'Added to waitlist!' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}