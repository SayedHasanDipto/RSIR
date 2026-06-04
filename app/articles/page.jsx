import { getPosts } from '@/lib/content';
import { ArticlesClient } from './articles-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AllArticlesPage() {
  const posts = await getPosts();
  return <ArticlesClient dbPosts={posts} />;
}
