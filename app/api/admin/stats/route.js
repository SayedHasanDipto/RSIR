import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { lessonsCollection, postsCollection, resourcesCollection } from '@/lib/models';

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [totalLessons, totalPosts, totalResources, recentLessons, recentPosts] = await Promise.all([
      lessonsCollection().countDocuments(),
      postsCollection().countDocuments(),
      resourcesCollection().countDocuments(),
      lessonsCollection().find().sort({ createdAt: -1 }).limit(5).toArray(),
      postsCollection().find().sort({ createdAt: -1 }).limit(5).toArray(),
    ]);

    const publishedLessons = await lessonsCollection().countDocuments({ status: 'published' });
    const publishedPosts = await postsCollection().countDocuments({ status: 'published' });
    const publishedResources = await resourcesCollection().countDocuments({ status: 'published' });

    return NextResponse.json({
      stats: {
        totalLessons,
        totalPosts,
        totalResources,
        publishedLessons,
        publishedPosts,
        publishedResources,
        draftLessons: totalLessons - publishedLessons,
        draftPosts: totalPosts - publishedPosts,
        draftResources: totalResources - publishedResources,
      },
      recentLessons: recentLessons.map(l => ({ ...l, _id: l._id.toString() })),
      recentPosts: recentPosts.map(p => ({ ...p, _id: p._id.toString() })),
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
