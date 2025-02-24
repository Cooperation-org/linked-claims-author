async function refreshAccessToken(token: any) {
  try {
    const url = 'https://oauth2.googleapis.com/token'

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })
    })

    const refreshedTokens = await response.json()
    console.log(':  refreshAccessToken  refreshedTokens', refreshedTokens)

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expires: Date.now() + refreshedTokens.expires_in * 1000,
      // If no new refresh token is returned, keep the old one
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.error('Error refreshing access token', error)

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export { refreshAccessToken }
