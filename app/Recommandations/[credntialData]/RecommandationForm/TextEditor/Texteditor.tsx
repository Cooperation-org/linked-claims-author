import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Box } from '@mui/material'
import './TextEditor.css'
import Quill from 'quill'

const Delta = Quill.import('delta')

interface TextEditorProps {
  value: any
  onChange: (value: any) => void
  placeholder?: string
}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

const Clipboard = Quill.import('modules/clipboard') as any

class PlainClipboard extends Clipboard {
  quill: any

  onPaste(e: ClipboardEvent) {
    e.preventDefault()
    const range = this.quill.getSelection()
    if (range) {
      const text = (e.clipboardData || (window as any).clipboardData).getData(
        'text/plain'
      )
      const delta = new Delta().retain(range.index).delete(range.length).insert(text)
      this.quill.updateContents(delta, 'silent')
      this.quill.setSelection(range.index + text.length)
      this.quill.scrollIntoView()
    }
  }
}

if (typeof window !== 'undefined') {
  Quill.register('modules/clipboard', PlainClipboard, true)
}

const TextEditor = forwardRef((props: TextEditorProps, ref) => {
  const { value, onChange, placeholder } = props
  const quillRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    getValue: () => quillRef.current?.getEditor().getText() ?? ''
  }))

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
    ],
    clipboard: {
      matchVisual: false
    }
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
      <Box
        className='text-editor-container'
        sx={{ borderRadius: '8px', fontFamily: 'Inter', fontWeight: 500 }}
      >
        {typeof window !== 'undefined' && (
          <ReactQuill
            theme='snow'
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            modules={modules}
            formats={formats}
            style={{
              marginTop: '4px',
              borderRadius: '8px'
            }}
            placeholder={placeholder}
          />
        )}
      </Box>
    </Box>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor
