import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { SVGBuilding, SVGDate } from "../Assets/SVGs";
import { FormData } from "../components/form/Types";
import test from "../Assets//test.png";

const dataPreview = ({ formData }: { formData: FormData }) => {
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
      }}
    >
      <Box
        sx={{
          borderRadius: "2px",
        }}
      >
        <Image
          style={{ width: "100% ", height: "100%" }}
          src={test}
          alt="testImage"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-start",
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
        <Box sx={{ width: "100%", display: "flex", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              p: "2px 5px",
              bgcolor: "#E5E7EB",
              borderRadius: "5px",
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
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              p: "2px 5px",
              bgcolor: "#E5E7EB",
              borderRadius: "5px",
            }}
          >
            <SVGBuilding />
            <Typography
              sx={{
                color: "#4E4E4E",
                fontFamily: "Poppins",
                Fontsize: "13px",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.143",
              }}
            >
              Not Verified
            </Typography>
          </Box> */}
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

export default dataPreview;
