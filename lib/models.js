/**
 * MongoDB Collection Helpers
 * Provides typed access to admin-managed content collections
 */

import { db } from './db';

// ─── Collection References ───────────────────────────────────────
export const lessonsCollection = () => db.collection('lessons');
export const postsCollection = () => db.collection('posts');
export const resourcesCollection = () => db.collection('resources');
export const classesCollection = () => db.collection('classes');

// ─── Index Setup (call once on app init) ─────────────────────────
export async function ensureIndexes() {
  try {
    await lessonsCollection().createIndex({ category: 1, status: 1 });
    await lessonsCollection().createIndex({ createdAt: -1 });
    
    await postsCollection().createIndex({ slug: 1 }, { unique: true });
    await postsCollection().createIndex({ status: 1, createdAt: -1 });
    
    await resourcesCollection().createIndex({ category: 1, status: 1 });
    await resourcesCollection().createIndex({ createdAt: -1 });
    
    await classesCollection().createIndex({ date: 1 });
    await classesCollection().createIndex({ status: 1 });
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}

// ─── Slug Generator ──────────────────────────────────────────────
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    + '-' + Date.now().toString(36);
}
