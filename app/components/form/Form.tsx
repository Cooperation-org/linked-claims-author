"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProps, FormData } from "./types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField, Box, Button, Typography } from "@mui/material";

const textGuid = [
  "Hi, I’m Tessa! Where do you want to save your LinkedClaims? ",
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

const Form: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState<FormData>();
  const [value, setValue] = useState("Device");
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = textGuid.length;
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

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
        {textGuid[activeStep]}
        {activeStep === 0 && <span style={{ color: "red" }}> *</span>}
      </Typography>
      <Box sx={{ pl: "15px" }}>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel
            sx={{
              color: "var(--T3-Body-Text, #202E5B)",
              fontFamily: "Lato",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "0.08px",
              mb: "7px",
            }}
            id="demo-controlled-radio-buttons-group"
          >
            Is this for a individual or a business?
          </FormLabel>
          <RadioGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              m: "0 auto",
            }}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {activeStep === 0 && (
              <FormControlLabel
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
                value="Device"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Save to My Device"
              />
            )}
            {activeStep === 0 && (
              <FormControlLabel
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
                value="Google Drive"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Google Drive"
              />
            )}
            {activeStep === 0 && (
              <FormControlLabel
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  pr: "5px",
                }}
                value="Digital Wallet"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Your Digital Wallet (e.g. Corner Pocket)"
              />
            )}
            {activeStep === 0 && (
              <FormControlLabel
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
                value="Dropbox"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Dropbox"
              />
            )}
            {activeStep === 1 && (
              <FormControlLabel
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  pr: "5px",
                }}
                value="Digital Wallet"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Your Digital Wallet (e.g. Corner Pocket)"
              />
            )}
            {activeStep === 1 && (
              <FormControlLabel
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
                value="Dropbox"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Dropbox"
              />
            )}
          </RadioGroup>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        onClick={handleNext}
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

export default Form;
