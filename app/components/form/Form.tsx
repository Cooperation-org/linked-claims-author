'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProps, FormData } from "./types";
import { TextField, Box, Button, Typography } from "@mui/material";

const textGuid = [
  "Hi, I’m Tessa! Where do you want to save your LinkedClaims? *",
  "Let’s get started with your name and address.",
  "Thanks, Alice!  Now let’s learn more about the skills you have.",
  "Now describe what you can demonstrate using this skill.",
  "Do you have any portfolio pieces you want to add?",
  "Would you like to add an image to your credential?",
  "Well done! Here’s what you’ve created:",
  "Success!",
];

const note =
  "Please note, all fields marked with an asterisk are required and must be completed.";

const CredentialForm: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState<FormData>();
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      address: "",
      expirationDate: "",
      awardedDate: "",
      skillName: "",
      skillCriteria: "",
      skillDescription: "",
      badgeImage: "",
      evidence: "",
      didKeySeed: "",
    },
  });

  const handleFormSubmit = handleSubmit((data: FormData) => {
    console.log(data);
    setFormData(data);
    const codeToCopy = JSON.stringify(data, null, 2);

    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        console.log("Form values copied to clipboard");
        reset();
      })
      .catch((err) => {
        console.error("Unable to copy form values to clipboard: ", err);
      });
  });
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
        marginTop: "30px",
        padding: "0 15px 30px",
      }}
      onSubmit={handleFormSubmit}
    >
      <Typography
        sx={{
          color: "#202E5B",
          textAlign: "center",
          fontFamily: "Lato",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          p: "0 30px",
        }}
      >
        Hi, I’m Tessa! Where do you want to save your LinkedClaims?
        <span style={{ color: "red" }}> *</span>
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Box>
          <TextField
            fullWidth
            label="Your Name"
            {...register("name")}
            required
          />
        </Box>
        <Box>
          <TextField fullWidth label="Your Address" {...register("address")} />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Date this credential expires"
            {...register("expirationDate")}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          padding: "10px 24px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          borderRadius: "100px",
          bgcolor: "#003FE0",
          width: "20px",
          textTransform: "capitalize",
        }}
      >
        Next
      </Button>
    </form>
  );
};

export default CredentialForm;
