import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Form from "../components/form/Form";
import fram from ".././Assets/Frame 35278.png";
import vector from ".././Assets/Vector 145.png";

const FormComponent = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 153px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Form />
      <Box
        sx={{
          mt: "30px",
          width: "100%",
          height: "114px",
          bgcolor: "#D1E4FF",
          p: "28px 70px 28px 50px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Box>
          <Image src={fram} alt="fram" />
        </Box>
        <Box>
          <Typography
            sx={{
              width: "200px",
              color: "#202E5B",
              fontFamily: "Lato",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            Learn how this data is used & protected.
            {<Image style={{ marginLeft: "10px" }} src={vector} alt="logo" />}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FormComponent;
