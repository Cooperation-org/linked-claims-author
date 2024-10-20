import { useState, useCallback } from 'react'

// Define the shape of a single comment
interface Comment {
  author: string
  howKnow: string
  recommendationText: string
  qualifications: string
  createdTime: string
}

// Define the shape of the comments state
interface CommentsState {
  [fileId: string]: Comment[]
}

// Define the return type of the hook
interface UseFetchCommentsReturn {
  comments: CommentsState
  fetchComments: (fileId: string) => Promise<void>
  commentLoading: boolean
  error: string | null
}

/**
 * Custom hook to fetch comments for a given file ID from Google Drive API.
 *
 * @param accessToken - The OAuth2 access token for authorization.
 * @returns An object containing the comments, fetch function, commentLoading state, and error state.
 */
const useFetchComments = (accessToken: string | null): UseFetchCommentsReturn => {
  const [comments, setComments] = useState<CommentsState>({})
  const [commentLoading, setCommentLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches comments for a specific file ID and updates the state accordingly.
   *
   * @param fileId - The ID of the file to fetch comments for.
   */
  const fetchComments = useCallback(
    async (fileId: string) => {
      if (!accessToken) {
        console.error('Access Token not available.')
        setError('Access Token not available.')
        return
      }

      setCommentLoading(true)
      setError(null)

      try {
        const url = `https://www.googleapis.com/drive/v2/files/${fileId}/comments`
        console.log('Fetching comments from URL:', url)

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error.message || 'Failed to fetch comments.')
        }

        const data = await response.json()

        const commentsData: Comment[] = data.items.map((comment: any) => {
          console.log('Raw comment content:', comment.content)

          let parsedContent: Record<string, string> = {}
          if (comment.content && comment.content.trim().startsWith('{')) {
            try {
              parsedContent = JSON.parse(comment.content)
            } catch (e) {
              console.error('Error parsing comment content:', e)
              parsedContent = {}
            }
          } else {
            console.warn('Comment content is not valid JSON:', comment.content)
            parsedContent = {
              recommendationText: comment.content
            }
          }

          return {
            author:
              typeof comment.author === 'string'
                ? comment.author
                : comment.author.displayName,
            howKnow: parsedContent['howKnow'] || '',
            recommendationText: parsedContent['recommendationText'] || '',
            qualifications:
              parsedContent['qualifications'] ||
              parsedContent['qualif'] ||
              parsedContent['mainAnswer'] ||
              '',
            createdTime: comment.createdTime
          }
        })

        setComments(prevState => ({
          ...prevState,
          [fileId]: commentsData
        }))
        console.log('Parsed commentsData:', commentsData)
      } catch (error: any) {
        console.error('Error fetching comments:', error)
        setError(error.message || 'An unknown error occurred.')
      } finally {
        setCommentLoading(false)
      }
    },
    [accessToken]
  )

  return { comments, fetchComments, commentLoading, error }
}

export default useFetchComments
