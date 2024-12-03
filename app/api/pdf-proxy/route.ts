import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileId = searchParams.get('fileId')

  if (!fileId) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 })
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL
    )

    const accessToken = searchParams.get('access_token')
    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 401 })
    }

    oauth2Client.setCredentials({
      access_token: accessToken
    })

    const drive = google.drive({ version: 'v3', auth: oauth2Client })

    const response = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media'
      },
      { responseType: 'arraybuffer' }
    )

    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', 'inline')

    return new NextResponse(response.data as ArrayBuffer, {
      headers
    })
  } catch (error) {
    console.error('Error fetching PDF:', error)
    return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 })
  }
}
