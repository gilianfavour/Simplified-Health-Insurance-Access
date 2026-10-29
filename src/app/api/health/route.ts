/**
 * GET /api/health
 * Simple health-check endpoint. Returns 200 with build metadata.
 */
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
  })
}
