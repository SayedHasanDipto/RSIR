import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { postsCollection, generateSlug } from '@/lib/models';

// GET — List all posts (admin)
export async function GET(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const [posts, total] = await Promise.all([
      postsCollection()
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      postsCollection().countDocuments(filter),
    ]);

    return NextResponse.json({
      posts: posts.map(p => ({ ...p, _id: p._id.toString() })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Posts list error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST — Create a new post
export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, excerpt, category, thumbnailUrl, status: postStatus } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const post = {
      title,
      slug: generateSlug(title),
      content: content || '',
      excerpt: excerpt || '',
      category: category || 'General',
      thumbnailUrl: thumbnailUrl || '',
      status: postStatus || 'published',
      author: session.user.name || session.user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await postsCollection().insertOne(post);

    return NextResponse.json({
      success: true,
      post: { ...post, _id: result.insertedId.toString() },
    }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
