import { useTheme } from '@mui/material/styles'
import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Box, FormLabel } from '@mui/material'
import './TextEditor.css'

interface TextEditorProps {
  value: any
  onChange: (value: any) => void
}

function TextEditor({ value, onChange }: Readonly<TextEditorProps>) {
  const theme = useTheme()

  const handleChange = (content: string) => {
    onChange(content)
  }

  const handleBlur = () => {
    console.log('Saving data:', value)
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      ['code-block']
    ]
  }

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'list',
    'bullet',
    'code-block',
    'check'
  ]

  return (
    <Box sx={{ width: '100%', borderRadius: '8px' }}>
      <FormLabel
        sx={{
          color: theme.palette.t3BodyText,
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 600
        }}
        id='editor-label'
      >
        Earning Criteria<span style={{ color: 'red' }}> *</span>
      </FormLabel>
      <Box className='text-editor-container' sx={{ borderRadius: '8px' }}>
        <ReactQuill
          theme='snow'
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          modules={modules}
          formats={formats}
          style={{ marginTop: '4px', borderRadius: '8px' }}
          placeholder='e.g., Managed a local garden for 2 years, Organized weekly gardening workshops, Led a community clean-up initiative'
        />
      </Box>
    </Box>
  )
}

export default TextEditor
