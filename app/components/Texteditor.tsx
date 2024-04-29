import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box} from '@mui/material';

function TextEditor() {
    const [text, setText] = useState('');

    const handleChange = (content: any, delta: any, source: any, editor: { getHTML: () => React.SetStateAction<string>; }) => {
        setText(editor.getHTML());
    };

    const handleSave = () => {
        console.log("Saving data:", text);
    };

    const handleBlur = () => {
        handleSave();
    };

    return (
        <Box sx={{ m: 'auto',width:'100%',borderRadius: "8px", }}>
            <ReactQuill theme="snow" value={text} onChange={handleChange} onBlur={handleBlur} />
        </Box>
    );
}

export default TextEditor;
