/**
 * Simple in-memory rate limiter for the /ask endpoint.
 * Prevents the same user from hammering the Gemini API if voice hook
 * fires duplicate commands in quick succession.
 *
 * Limits: max 1 request per 2 seconds per user.
 */

const lastRequestTime = new Map(); // userId → timestamp (ms)
const COOLDOWN_MS = 2000; // 2 seconds between requests per user

export function askRateLimiter(req, res, next) {
  const userId = req.userId; // set by isAuth middleware
  const now = Date.now();
  const last = lastRequestTime.get(userId) || 0;

  if (now - last < COOLDOWN_MS) {
    const remaining = ((COOLDOWN_MS - (now - last)) / 1000).toFixed(1);
    return res.status(429).json({
      response: `Please wait ${remaining} seconds before sending another command.`,
    });
  }

  lastRequestTime.set(userId, now);

  // Cleanup old entries every 5 minutes to avoid memory leak
  if (lastRequestTime.size > 1000) {
    const cutoff = now - 60_000;
    for (const [uid, ts] of lastRequestTime) {
      if (ts < cutoff) lastRequestTime.delete(uid);
    }
  }

  next();
}
