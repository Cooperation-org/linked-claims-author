import React from 'react'
import { FormData } from '../../../../components/form/types/Types'

interface DataComponentProps {
  formData: FormData
}

const DataComponent: React.FC<DataComponentProps> = ({ formData }) => {
  return <div>Data Preview</div>
}

export default DataComponent
