import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url')

  if (typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType) {
      throw new Error('URL does not have a valid content type')
    }

    // console.log('Content-Type:', contentType)

    // const data = await response.text()

    // console.log('Data:', data)

    return NextResponse.json({ contentType })
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch the URL: ${error.message}` },
      { status: 500 }
    )
  }
}
