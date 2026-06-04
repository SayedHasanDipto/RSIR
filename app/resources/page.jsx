import { getResources } from '@/lib/content';
import { ResourcesClient } from './resources-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AllResourcesPage() {
  const resources = await getResources();
  return <ResourcesClient dbResources={resources} />;
}
