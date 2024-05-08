import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { SVGBuilding, SVGDate } from "../Assets/SVGs";
import { FormData, FormProps } from "../components/form/Types";
import test from "../Assets//test.png";

const dataPreview = (formData: FormData) => {
  console.log(":  dataPreview  formData", formData)
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
          Basic Barista Training
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
              Aug 8, 2022
            </Typography>
          </Box>
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
        This credential certifies that I am able to demonstrate advanced skills
        in coffee preparation, customer service, and knowledge of coffee origins
        and brewing techniques.
      </Typography>
      <Typography
        sx={{
          color: "#202E5B",
          fontFamily: "Inter",
          Fontsize: "15px",
          fontWeight: 400,
        }}
      >
        Earning criteria:
        <ul style={{ marginLeft: "25px" }}>
          <li>Took 12 hours of barista classes</li>
          <li>Got anonymous customer feedback</li>
          <li>Got teacher feedback</li>
        </ul>
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
          <li> Video of the perfect shot of espresso</li>
        </ul>
      </Typography>
    </Box>
  );
};

export default dataPreview;
