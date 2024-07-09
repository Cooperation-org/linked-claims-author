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
        Accept: '*/*'
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType) {
      throw new Error('URL does not have a valid content type')
    }

    const data = await response.text()

    return NextResponse.json({ contentType, data })
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch the URL: ${error.message}` },
      { status: 500 }
    )
  }
}
