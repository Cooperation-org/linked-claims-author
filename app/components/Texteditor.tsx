import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, FormLabel } from "@mui/material";
import "./TextEditor.css";

function TextEditor() {
  const [text, setText] = useState("");

  const handleChange = (
    content: any,
    delta: any,
    source: any,
    editor: { getHTML: () => React.SetStateAction<string> }
  ) => {
    setText(editor.getHTML());
  };

  const handleSave = () => {
    console.log("Saving data:", text);
  };

  const handleBlur = () => {
    handleSave();
  };

  const modules = {
    toolbar: [
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "link",
        { list: "ordered" },
        { list: "bullet" },
        { list: "check" },
        "code-block",
      ],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "bullet",
    "link",
    'ordered',
    'check',
  ];

  return (
    <Box sx={{ width: "103%", borderRadius: "8px", ml: "-10px" }}>
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
        Earning Criteria
        <span style={{ color: "red" }}> *</span>
      </FormLabel>
      <ReactQuill
        theme="snow"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        modules={modules}
        formats={formats}
        style={{ marginTop: "4px" }}
        placeholder="e.g., Managed a local garden for 2 years, Organized weekly gardening workshops, Led a community clean-up initiative"
      />
    </Box>
  );
}

export default TextEditor;
