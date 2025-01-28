import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  const fileId = params.fileId
  const url = `https://drive.google.com/uc?id=${fileId}&export=download`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Drive API error: ${response.status}`)
    }

    // Get the content type
    const contentType = response.headers.get('content-type')

    // Convert the response to array buffer
    const data = await response.arrayBuffer()

    // Return the response with appropriate headers
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch file' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const dynamic = 'force-dynamic' // Disable caching for this route
