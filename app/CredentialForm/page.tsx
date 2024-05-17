"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Box, Typography, useMediaQuery,Theme } from "@mui/material";
import { useTheme } from '@mui/system';
import Form from "../components/form/Form";
import fram from ".././Assets/Frame 35278.png";
import vector from ".././Assets/Vector 145.png";
import img3 from ".././Assets/Tessa Persona large sceens.png";
import { SVGLargeScreen } from "../Assets/SVGs";
// import { GoogleDriveStorage } from "trust-storage";

const FormComponent = () => {
  const theme: Theme = useTheme();
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  // async function createFolderAndUploadFile() {
  //   try {
  //     const storage = new GoogleDriveStorage(
  //       "ya29.a0AXooCguvQYvScV8ciYoNaP69soAOpNu-G8Z1Fmpzfv30V494F7PWpLTxT7m40ZlnwyFgVRAqlbYD5AcaF3vy9uQxrc_1GKB9jrZf78o6Ip46QmQHL8gm8wxp2liJ5Q-NqFgicK43B6tq3xR8JngSu6DQf9BO847M04kNaCgYKAaESARASFQHGX2MivjxJ8TrL8MAGqNTsB1UjBA0171"
  //     ); // please contact to @0marSalah to add your account to the project
  //     const folderName = "USER_UN(IQUE_KEY"; // need to discussed with team how we sill set the folder name
  //     const folderId = await storage.createFolder(folderName);

  //     const fileData = {
  //       fileName: "test.json",
  //       mimeType: "application/json",
  //       body: new Blob([JSON.stringify({ name: "amr nabel" })], {
  //         type: "application/json",
  //       }),
  //     };
  //     const fileId = await storage.save(fileData, folderId);
  //     console.log("File uploaded successfully with ID:", fileId);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  // useEffect(() => {
  //   createFolderAndUploadFile();
  // }, []);
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 153px)",
        display: !isLargeScreen ? "flex" : "block",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100px",
            mt: "50px",
          }}
        >
          <SVGLargeScreen />
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={img3}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
            />
          </Box>
        </Box>
      </Box>
      <Form />
      {!isLargeScreen && (
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
              {typeof window !== "undefined" && (
                <Image style={{ marginLeft: "10px" }} src={vector} alt="logo" />
              )}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FormComponent;
