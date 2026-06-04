/**
 * Public Content Fetching Utilities
 * Used by frontend pages to fetch published content from MongoDB
 */

import { lessonsCollection, postsCollection, resourcesCollection, classesCollection } from './models';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Get all upcoming classes
 */
export async function getClasses() {
  noStore();
  const filter = { status: 'published', date: { $gte: new Date(new Date().setHours(0,0,0,0)) } };
  
  const classes = await classesCollection()
    .find(filter)
    .sort({ date: 1 })
    .toArray();
  
  return classes.map(cls => ({
    ...cls,
    _id: cls._id.toString(),
  }));
}

/**
 * Get all published lessons, optionally filtered by category
 */
export async function getLessons(category = null) {
  noStore();
  const filter = { status: 'published' };
  if (category) filter.category = category;
  
  const lessons = await lessonsCollection()
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();
  
  return lessons.map(lesson => ({
    ...lesson,
    _id: lesson._id.toString(),
  }));
}

/**
 * Get a single lesson by ID
 */
export async function getLessonById(id) {
  noStore();
  const { ObjectId } = await import('mongodb');
  
  try {
    const lesson = await lessonsCollection().findOne({ 
      _id: new ObjectId(id) 
    });
    if (!lesson) return null;
    return { ...lesson, _id: lesson._id.toString() };
  } catch {
    return null;
  }
}

/**
 * Get all published posts
 */
export async function getPosts(category = null) {
  noStore();
  const filter = { status: 'published' };
  if (category) filter.category = category;
  
  const posts = await postsCollection()
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();
  
  return posts.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug) {
  noStore();
  const { ObjectId } = await import('mongodb');
  
  let filter = { status: 'published' };
  
  try {
    filter.$or = [
      { slug },
      { _id: new ObjectId(slug) }
    ];
  } catch {
    filter.slug = slug;
  }

  const post = await postsCollection().findOne(filter);
  if (!post) return null;
  return { ...post, _id: post._id.toString() };
}

/**
 * Get all published resources/PDFs
 */
export async function getResources(category = null) {
  noStore();
  const filter = { status: 'published' };
  if (category) filter.category = category;
  
  const resources = await resourcesCollection()
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();
  
  return resources.map(resource => ({
    ...resource,
    _id: resource._id.toString(),
  }));
}

/**
 * Increment download count for a resource
 */
export async function incrementDownloadCount(id) {
  const { ObjectId } = await import('mongodb');
  
  try {
    await resourcesCollection().updateOne(
      { _id: new ObjectId(id) },
      { $inc: { downloadCount: 1 } }
    );
  } catch {
    // Silently fail
  }
}
