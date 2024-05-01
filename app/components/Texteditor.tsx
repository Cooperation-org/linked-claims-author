import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, FormLabel } from "@mui/material";
import "./TextEditor.css";

interface TextEditorProps {
  value: any;
  onChange: (value: any) => void;
}

function TextEditor({ value, onChange }: TextEditorProps) {
  const handleChange = (
    content: string,
    delta: any,
    source: string,
    editor: { getHTML: () => string }
  ) => {
    if (source === "user") {
      onChange(editor.getHTML());
    }
  };

  const handleBlur = () => {
    console.log("Saving data:", value);
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
    "ordered",
    "check",
  ];

  return (
    <Box sx={{ width: "103%", borderRadius: "8px", ml: "-10px" }}>
      <FormLabel
        sx={{
          color: "#202E5B",
          fontFamily: "Lato",
          fontSize: "16px",
          fontWeight: 600,
          "&.Mui-focused": { color: "#000" },
        }}
        id="editor-label"
      >
        Earning Criteria<span style={{ color: "red" }}> *</span>
      </FormLabel>
      <Box className="text-editor-container" sx={{ borderRadius: "8px" }}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          modules={modules}
          formats={formats}
          style={{ marginTop: "4px", borderRadius: "8px" }}
          placeholder="e.g., Managed a local garden for 2 years, Organized weekly gardening workshops, Led a community clean-up initiative"
        />
      </Box>
    </Box>
  );
}

export default TextEditor;
