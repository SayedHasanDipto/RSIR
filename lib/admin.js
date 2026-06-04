/**
 * Admin Authorization Helpers
 * Provides session checking and admin verification utilities
 */

import { auth } from './auth';
import { headers } from 'next/headers';
import { db } from './db';

/**
 * Get the current session from Better Auth
 * Works in server components and API routes
 */
export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch {
    return null;
  }
}

/**
 * Check if the current user is an admin
 * Returns session data if admin, null otherwise
 */
export async function getAdminSession() {
  const session = await getSession();
  if (!session?.user) return null;
  
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rsir.com';
  
  // If email matches the designated ADMIN_EMAIL, automatically grant admin access
  if (session.user.email.toLowerCase() === adminEmail.toLowerCase()) {
    return {
      ...session,
      user: {
        ...session.user,
        role: 'admin',
      },
    };
  }

  // Fallback: Check admin role in the user collection
  const usersCollection = db.collection('user');
  const user = await usersCollection.findOne({ 
    email: session.user.email 
  });
  
  if (!user || user.role !== 'admin') return null;
  
  return {
    ...session,
    user: {
      ...session.user,
      role: 'admin',
    },
  };
}

/**
 * Require admin session — throws response if not admin
 * Use in API routes
 */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return null;
  }
  return session;
}
