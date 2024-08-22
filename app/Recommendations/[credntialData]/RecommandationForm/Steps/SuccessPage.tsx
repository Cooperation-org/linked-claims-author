import React from 'react'
import { FormData } from '../../../../components/form/types/Types'

interface SuccessPageProps {
  formData: FormData
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  reset: () => void
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  formData,
  setActiveStep,
  reset
}) => {
  return <div>Success</div>
}

export default SuccessPage
