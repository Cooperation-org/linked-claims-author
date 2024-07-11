
export const handleUrlValidation = async (event: React.ChangeEvent<HTMLInputElement>, setUrlError: (arg0: string) => void) => {
    const url = event.target.value
    if (url) {
      try {
        const response = await fetch(`/api/fetchContent?url=${encodeURIComponent(url)}`)
        console.log(':  handleUrlChange  response', response)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const { contentType, data } = await response.json()

        console.log(':  handleUrlChange  contentType', contentType)
        console.log(':  handleUrlChange  data', data)
        const videoRegex =
          /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$|youtube\.com|vimeo\.com/i

        const gitHubRegex = /github\.com/i

        if (videoRegex.test(url)) {
          setUrlError('The URL points to a video link.')
        } else if (gitHubRegex.test(url)) {
          setUrlError('The URL points to a video link.')
        } else if (contentType.includes('text/html')) {
          setUrlError('The URL points to a web page.')
        } else if (contentType.startsWith('image/')) {
          setUrlError('The URL points to an image.')
        } else if (contentType.startsWith('audio/')) {
          setUrlError('The URL points to an audio.')
        } else if (contentType === 'application/pdf') {
          setUrlError('The URL points to a PDF document.')
        } else if (contentType === 'application/json') {
          setUrlError('The URL points to JSON data.')
        } else if (contentType.startsWith('application/')) {
          if (contentType.includes('zip')) {
            setUrlError('The URL points to a ZIP archive.')
          } else if (
            contentType.includes('msword') ||
            contentType.includes('wordprocessingml')
          ) {
            setUrlError('The URL points to a Word document.')
          } else if (contentType.includes('vnd.ms-excel')) {
            setUrlError('The URL points to an Excel spreadsheet.')
          } else if (
            contentType.includes('vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          ) {
            setUrlError('The URL points to an Excel spreadsheet (XLSX).')
          } else if (contentType.includes('xml')) {
            setUrlError('The URL points to an XML document.')
          } else {
            setUrlError('The URL points to an application document.')
          }
        } else if (contentType.startsWith('text/')) {
          if (contentType.includes('plain')) {
            setUrlError('The URL points to a plain text file.')
          } else if (contentType.includes('csv')) {
            setUrlError('The URL points to a CSV file.')
          } else {
            setUrlError('The URL points to a text document.')
          }
        } else if (contentType.startsWith('font/')) {
          setUrlError('The URL points to a font file.')
        } else {
          setUrlError('The URL points to an unsupported content type.')
        }
      } catch (error: any) {
        setUrlError(`Failed to fetch the URL or URL is not valid: ${error.message}`)
      }
    } else {
      setUrlError('URL cannot be empty.')
    }
  }