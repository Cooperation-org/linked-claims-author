import { GoogleDriveStorage, uploadToGoogleDrive } from '@cooperation/vc-storage'

export const uploadImages = async (
  selectedFiles: any[],
  watch: any,
  storage: any,
  setValue: any,
  setSelectedFiles: any
) => {
  try {
    if (selectedFiles.length === 0) return

    const filesToUpload = selectedFiles.filter(
      (fileItem: { uploaded: any; file: any; name: any }) =>
        !fileItem.uploaded && fileItem.file && fileItem.name
    )
    if (filesToUpload.length === 0) return

    const uploadedFiles = await Promise.all(
      filesToUpload.map(async (fileItem: { file: File; name: string }, index: number) => {
        const newFile = new File([fileItem.file], fileItem.name, {
          type: fileItem.file.type
        })

        const uploadedFile = await uploadToGoogleDrive(
          storage as GoogleDriveStorage,
          newFile
        )
        const fileId = (uploadedFile as { id: string }).id

        return {
          ...fileItem,
          googleId: fileId,
          uploaded: true,
          isFeatured: index === 0 && !watch('evidenceLink')
        }
      })
    )

    const featuredFile = uploadedFiles.find(file => file.isFeatured)
    const nonFeaturedFiles = uploadedFiles.filter(file => !file.isFeatured)

    if (featuredFile?.googleId) {
      setValue(
        'evidenceLink',
        `https://drive.google.com/uc?export=view&id=${featuredFile.googleId}`
      )
    }

    const currentPortfolio = watch('portfolio') || []
    const newPortfolioEntries = nonFeaturedFiles.map(file => ({
      name: file.name,
      url: `https://drive.google.com/uc?export=view&id=${file.googleId}`,
      googleId: file.googleId
    }))

    setValue('portfolio', [...currentPortfolio, ...newPortfolioEntries])

    setSelectedFiles((prevFiles: any[]) =>
      prevFiles.map((file: { name: any }) => {
        const uploadedFile = uploadedFiles.find(f => f.name === file.name)
        return uploadedFile
          ? { ...file, googleId: uploadedFile.googleId, uploaded: true }
          : file
      })
    )
  } catch (error) {
    console.error('Error uploading files:', error)
  }
}
