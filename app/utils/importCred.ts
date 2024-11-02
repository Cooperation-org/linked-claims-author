import { signAndSave, saveRaw } from './googleDrive' 

export async function importCredential(url: string, accessToken: string | undefined): Promise<ProcessResult> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return { 
        success: false, 
        error: `Failed to fetch URL: ${response.statusText}` 
      }
    }

    const content = await response.text()
    const jsonData = JSON.parse(content)
    const file = await saveRaw(accessToken, jsonData)
    return {
      success: true,
      file: file
    }
    
  } catch (e) {
    return {
      success: false,
      error: `${e.message}`
    }
  }
}
