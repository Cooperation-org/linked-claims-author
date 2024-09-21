export const handleUrlValidation = async (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setUrlError: (arg0: string[]) => void,
  index: number,
  urlErrorArray: string[]
) => {
  const url = event.target.value
  const updatedErrors = [...urlErrorArray] // Copy existing error array

  if (url) {
    try {
      const response = await fetch(`/api/fetchContent?url=${encodeURIComponent(url)}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const { contentType } = await response.json()

      const videoRegex = /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$|youtube\.com|vimeo\.com/i
      const gitHubRegex = /github\.com/i

      if (videoRegex.test(url)) {
        updatedErrors[index] = 'The URL points to a video link.'
      } else if (gitHubRegex.test(url)) {
        updatedErrors[index] = 'The URL points to a GitHub repository.'
      } else if (contentType.includes('text/html')) {
        updatedErrors[index] = 'The URL points to a web page.'
      } else if (contentType.startsWith('image/')) {
        updatedErrors[index] = 'The URL points to an image.'
      } else if (contentType.startsWith('audio/')) {
        updatedErrors[index] = 'The URL points to an audio file.'
      } else if (contentType === 'application/pdf') {
        updatedErrors[index] = 'The URL points to a PDF document.'
      } else if (contentType === 'application/json') {
        updatedErrors[index] = 'The URL points to JSON data.'
      } else if (contentType.startsWith('application/')) {
        if (contentType.includes('zip')) {
          updatedErrors[index] = 'The URL points to a ZIP archive.'
        } else if (
          contentType.includes('msword') ||
          contentType.includes('wordprocessingml')
        ) {
          updatedErrors[index] = 'The URL points to a Word document.'
        } else if (contentType.includes('vnd.ms-excel')) {
          updatedErrors[index] = 'The URL points to an Excel spreadsheet.'
        } else if (
          contentType.includes('vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        ) {
          updatedErrors[index] = 'The URL points to an Excel spreadsheet (XLSX).'
        } else if (contentType.includes('xml')) {
          updatedErrors[index] = 'The URL points to an XML document.'
        } else {
          updatedErrors[index] = 'The URL points to an application document.'
        }
      } else if (contentType.startsWith('text/')) {
        if (contentType.includes('plain')) {
          updatedErrors[index] = 'The URL points to a plain text file.'
        } else if (contentType.includes('csv')) {
          updatedErrors[index] = 'The URL points to a CSV file.'
        } else {
          updatedErrors[index] = 'The URL points to a text document.'
        }
      } else if (contentType.startsWith('font/')) {
        updatedErrors[index] = 'The URL points to a font file.'
      } else {
        updatedErrors[index] = 'The URL points to an unsupported content type.'
      }
    } catch (error: any) {
      updatedErrors[
        index
      ] = `Failed to fetch the URL or URL is not valid: ${error.message}`
    }
  } else {
    updatedErrors[index] = 'URL cannot be empty.'
  }

  setUrlError(updatedErrors) // Set the updated errors array
}
