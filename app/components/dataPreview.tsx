import React from "react";
import Image from "next/image";
import { Box, Typography, useMediaQuery, Theme } from "@mui/material";
import { useTheme } from "@mui/system";
import { SVGBuilding, SVGDate } from "../Assets/SVGs";
import { FormData } from "../components/form/Types";
import test from "../Assets//test.png";

const DataPreview = ({ formData }: { formData: FormData }) => {
  const theme: Theme = useTheme();
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  console.log(":  dataPreview  formData", formData);

  const handleNavigate = (url: string) => {
    window.location.href = url;
  };
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #E5E7EB",
        p: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        bgcolor: isLargeScreen ? "#F9F9F9" : "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isLargeScreen ? "row" : "column",
          gap: !isLargeScreen ? "10px": '20px',
        }}
      >
        <Box
          sx={{
            borderRadius: "2px",
          }}
        >
          <Image
            style={{ width: !isLargeScreen ? "100%" : "179px", height: "100%" }}
            src={test}
            alt="testImage"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection:  "column",
            gap:'10px' ,
            justifyContent: "center"
          }}
        >
          <Typography
            sx={{
              color: "#202E5B",
              fontFamily: "Inter",
              Fontsize: "18px",
              fontWeight: 800,
            }}
          >
          {formData.credentialName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              p: "2px 5px",
              bgcolor: "#E5E7EB",
              borderRadius: "5px",
              width: "80px",
            }}
          >
            <Box sx={{ mt: "2px" }}>
              <SVGDate />
            </Box>
            <Typography
              sx={{
                color: "#4E4E4E",
                fontFamily: "Poppins",
                Fontsize: "13px",
                fontWeight: 400,
              }}
            >
              {formData.credentialDuration}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          color: "#202E5B",
          fontFamily: "Inter",
          Fontsize: "15px",
          fontWeight: 400,
        }}
      >
        {formData.description}
      </Typography>
      <Typography
        sx={{
          color: "#202E5B",
          fontFamily: "Inter",
          Fontsize: "15px",
          fontWeight: 400,
        }}
      >
        <span style={{ display: "block" }}>Earning criteria:</span>
        {/* <ul style={{ marginLeft: "25px" }}>
          <li>Took 12 hours of barista classes</li>
          <li>Got anonymous customer feedback</li>
          <li>Got teacher feedback</li>
        </ul> */}
        {formData.credentialDescription}
      </Typography>
      <Typography
        sx={{
          color: "#202E5B",
          fontFamily: "Inter",
          Fontsize: "15px",
          fontWeight: 400,
        }}
      >
        Portoflio:
        <ul
          style={{
            marginLeft: "25px",
            textDecorationLine: "underline",
            color: "#003FE0",
          }}
        >
          {formData?.portfolio?.map((porto) => (
            <li key={porto.url} onClick={() => handleNavigate(porto.url)}>
              {porto.name}
            </li>
          ))}
        </ul>
      </Typography>
    </Box>
  );
};

export default DataPreview;
