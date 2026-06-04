/**
 * Video URL Processing Utilities
 * Handles YouTube and Facebook video URLs — extracts IDs and creates embed URLs
 */

/**
 * Detect the video platform from a URL
 * @param {string} url - The video URL
 * @returns {"youtube" | "facebook" | "unknown"}
 */
export function detectVideoPlatform(url) {
  if (!url) return 'unknown';
  
  const youtubePatterns = [
    /youtube\.com/,
    /youtu\.be/,
  ];
  
  const facebookPatterns = [
    /facebook\.com/,
    /fb\.watch/,
    /fb\.com/,
  ];
  
  if (youtubePatterns.some(p => p.test(url))) return 'youtube';
  if (facebookPatterns.some(p => p.test(url))) return 'facebook';
  return 'unknown';
}

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeId(url) {
  if (!url) return null;
  
  const patterns = [
    // Standard watch URL
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    // Short URL
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // Embed URL
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // V URL
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    // Shorts URL
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

/**
 * Create YouTube embed URL from video ID
 */
export function getYouTubeEmbedUrl(videoId) {
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Create YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(videoId) {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Extract Facebook video URL and create embed URL
 * Supports:
 * - https://www.facebook.com/watch/?v=VIDEO_ID
 * - https://www.facebook.com/USER/videos/VIDEO_ID
 * - https://fb.watch/VIDEO_ID
 */
export function getFacebookEmbedUrl(url) {
  if (!url) return null;
  // Facebook uses an oEmbed/plugin URL with the original URL encoded
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=560`;
}

/**
 * Process any video URL and return embed data
 * @param {string} url - Raw video URL
 * @returns {{ platform, embedUrl, videoId, thumbnailUrl } | null}
 */
export function processVideoUrl(url) {
  if (!url) return null;
  
  const platform = detectVideoPlatform(url);
  
  if (platform === 'youtube') {
    const videoId = extractYouTubeId(url);
    if (!videoId) return null;
    return {
      platform: 'youtube',
      videoId,
      embedUrl: getYouTubeEmbedUrl(videoId),
      thumbnailUrl: getYouTubeThumbnail(videoId),
      originalUrl: url,
    };
  }
  
  if (platform === 'facebook') {
    return {
      platform: 'facebook',
      videoId: null,
      embedUrl: getFacebookEmbedUrl(url),
      thumbnailUrl: null, // FB doesn't provide easy thumbnail access
      originalUrl: url,
    };
  }
  
  return {
    platform: 'unknown',
    videoId: null,
    embedUrl: url,
    thumbnailUrl: null,
    originalUrl: url,
  };
}
