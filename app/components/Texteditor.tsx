import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, FormLabel} from '@mui/material';

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
        <Box sx={{ m: 'auto',width:'100%',borderRadius: "8px", ml: "-10px"}}>
            <FormLabel
                  sx={{
                    color: "#202E5B",
                    fontFamily: "Lato",
                    fontSize: "16px",
                    fontWeight: 600,
                    "&.Mui-focused": {
                      color: "#000",
                    },
                  }}
                  id="name-label"
                >
                  Credential Name
                  <span style={{ color: "red" }}> *</span>
                </FormLabel>
            <ReactQuill style={{marginTop:'5px'}} theme="snow" value={text} onChange={handleChange} onBlur={handleBlur} />
        </Box>
    );
}

export default TextEditor;
