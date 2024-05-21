"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { FormData } from "./Types";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Box,
  Button,
  Typography,
  styled,
  useMediaQuery,
  Theme,
  ButtonProps,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { SVGSparkles, SVGGroup, SVGDate, SVGTime } from "../../Assets/SVGs";
import TextEditor from "../Texteditor";
import image from "../../Assets/nathan-dumlao-zUNs99PGDg0-unsplash 1.png";
import twitter from "../../Assets/twitter.png";
import instagram from "../../Assets/instagram.png";
import linkedin from "../../Assets/linkedin.png";
import mail from "../../Assets/mail.png";
import messageCircle from "../../Assets/message-circle.png";
import DataComponent from "../dataPreview";
import GoogleDriveStorage from "trust-storage";

const textGuid = [
  "",
  "Let’s get started with your name and address.",
  "Thanks, Alice! Now let’s learn more about the skills you have.",
  "Now describe what you can demonstrate using this skill.",
  "Do you have any portfolio pieces you want to add?",
  "Would you like to add an image to your credential?",
  "Well done! Here’s what you’ve created:",
  "Success!",
];

const note =
  "Please note, all fields marked with an asterisk are required and must be completed.";
const successNote =
  "Congratulations on your achievement. Tell the world what you’ve accomplished!";

const StyledButton = styled(Button)<ButtonProps>(({ theme, color }) => ({
  padding: "10px 24px",
  borderRadius: "100px",
  textTransform: "capitalize",
  fontFamily: "Roboto",
  fontWeight: "600",
  lineHeight: "20px",
  border: "1px solid  #4E4E4E",
  backgroundColor: color === "primary" ? "#003FE0" : "#FFF",
  color: color === "primary" ? "#FFF" : "#4E4E4E",
  "&:hover": {
    backgroundColor: color === "primary" ? "#003FE0" : "#FFF",
  },
}));

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    position: "relative",
    paddingRight: "50px",
    width: "100%",
    height: "275px",
    marginTop: "3px",
  },
  "& .MuiFormHelperText-root": {
    position: "absolute",
    bottom: 8,
    right: 16,
    fontSize: "0.75rem",
    borderRadius: "28px",
  },
});

const boxStyles = {
  width: "100%",
  bgcolor: "#FFF",
  borderRadius: "8px",
  border: "1px solid #E5E7EB",
};

const Form = () => {
  const [formData, setFormData] = useState<FormData>();
  const [activeStep, setActiveStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const theme = useTheme<Theme>();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const characterLimit = 294;
  const maxSteps = textGuid.length;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      storageOption: "Device",
      fullName: "",
      persons: "",
      credentialName: "",
      credentialDuration: "",
      credentialDescription: "",
      portfolio: [{ name: "", url: "" }],
      imageLink: "",
      description: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolio",
  });

  useEffect(() => {
    const handleHashChange = () => {
      const stepFromHash = parseInt(
        window.location.hash.replace("#step-", ""),
        10
      );
      if (
        !isNaN(stepFromHash) &&
        stepFromHash >= 0 &&
        stepFromHash < maxSteps
      ) {
        setActiveStep(stepFromHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [maxSteps]);
  // will update the max steps lates when needed **Amr

  useEffect(() => {
    setActiveStep(0);
    window.location.hash = `step-0`;
  }, []);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
    window.location.hash = `step-${step}`;
  };

  const handleNext = () => {
    handleStepChange(activeStep + 1);
  };

  const handlePreview = () => {
    handleStepChange(activeStep + 1);
  };

  const handleSign = () => {
    handleStepChange(activeStep + 1);
    reset();
  };

  const handleBack = () => {
    handleStepChange(activeStep - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTextEditorChange = (value: string | undefined) => {
    setValue("credentialDescription", value ?? "");
  };

  const handleFormSubmit = handleSubmit((data: FormData) => {
    if (data.storageOption === "Google Drive") {
      createFolderAndUploadFile(data);
    } else {
      localStorage.setItem("personalCredential", JSON.stringify(data));
    }

    reset();
    setActiveStep(0)

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

  async function createFolderAndUploadFile(data: FormData) {
    try {
      const storage = new GoogleDriveStorage(
        "ya29.a0AXooCgtr98BzDdaKVCEjt_iKv1qYXN1K82qkUDdBe5Gbk4Dt7UuiXDAhRUJhdYYsDBoYqLqLONWWPcG6SC9JUOIVodhxazXgMeHR5oZaVMeitHZK6FwhPoWOmkC8X0UOfw3thCGaOIVAivkc7RT159cPRvUvNjfAhQ72aCgYKAYUSARASFQHGX2Mial7SSpMkWhSj0iF-_-1taA0171"
      );
      const folderName = "USER_UN(IQUE_KEY";
      const folderId = await storage.createFolder(folderName);

      const fileData = {
        fileName: "test.json",
        mimeType: "application/json",
        body: new Blob([JSON.stringify(data)], {
          type: "application/json",
        }),
      };
      const fileId = await storage.save(fileData, folderId);
      console.log("File uploaded successfully with ID:", fileId);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
          p: "0 50px",
        }}
      >
        {activeStep === 0 && (
          <>
            <span style={{ display: "block" }}>Hi, I’m Tessa!</span>
            <span>Where do you want to save your LinkedClaims?</span>
          </>
        )}
        {textGuid[activeStep]}
        {activeStep === 0 && <span style={{ color: "red" }}> *</span>}
      </Typography>
      {!isLargeScreen && activeStep !== 7 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          {activeStep !== 0 && (
            <Box
              sx={{
                width: "7px",
                height: "5px",
                bgcolor: "#202E5B",
                borderRadius: "3px",
              }}
            ></Box>
          )}
          <Box
            sx={{
              width:
                activeStep === 0 || activeStep === 1 || activeStep === 2
                  ? "22px"
                  : "7px",
              height: "5px",
              bgcolor: "#202E5B",
              borderRadius: "3px",
            }}
          ></Box>
          <Box
            sx={{
              width:
                activeStep === 3 || activeStep === 4 || activeStep === 5
                  ? "22px"
                  : "7px",
              height: "5px",
              bgcolor: "#202E5B",
              borderRadius: "3px",
            }}
          ></Box>
          <Box
            sx={{
              width: activeStep === 6 ? "22px" : "7px",
              height: "5px",
              bgcolor: "#202E5B",
              borderRadius: "3px",
            }}
          ></Box>
        </Box>
      )}
      {activeStep !== 0 && activeStep !== 7 && activeStep !== 6 && (
        <Typography
          sx={{
            color: "#202E5B",
            textAlign: "center",
            fontFamily: "Lato",
            fontSize: "16px",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          {note}
        </Typography>
      )}
      {activeStep === 7 && (
        <Typography
          sx={{
            color: "#202E5B",
            textAlign: "center",
            fontFamily: "Lato",
            fontSize: "16px",
            fontStyle: "italic",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          {successNote}
        </Typography>
      )}
      <Box sx={{ width: { xs: "100%", md: "55%" } }}>
        <FormControl sx={{ width: "100%" }}>
          {activeStep === 1 && (
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
                "&.Mui-focused": {
                  color: "#000",
                },
              }}
              id="form-type-label"
            >
              Is this for an individual or a business?
            </FormLabel>
          )}
          <RadioGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              m: "0 auto",
              width: { xs: "100%", md: "50%" },
              pl: "10px",
              minWidth: "355px",
              alignItems: "center",
            }}
            aria-labelledby="form-type-label"
            name="controlled-radio-buttons-group"
            value={watch("storageOption")}
            onChange={(e) => setValue("storageOption", e.target.value)}
          >
            {activeStep === 0 && (
              <FormControlLabel
                value="Device"
                sx={boxStyles}
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
                value="Google Drive"
                sx={boxStyles}
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
                value="Digital Wallet"
                sx={boxStyles}
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
                value="Dropbox"
                sx={boxStyles}
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
          {activeStep === 1 && (
            <RadioGroup
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row", md: "row" },
                gap: "15px",
                m: "0 auto",
                width: "100%",
                ml: "10px",
              }}
              aria-labelledby="form-type-label"
              name="controlled-radio-buttons-group"
              value={watch("persons")}
              onChange={(e) => setValue("persons", e.target.value)}
            >
              <FormControlLabel
                sx={{
                  ...boxStyles,
                  width: { md: "calc(50% - 15px)", xs: "100%" },
                }}
                value="Individual"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Individual"
              />
              <FormControlLabel
                sx={{
                  ...boxStyles,
                  width: { md: "calc(50% - 15px)", xs: "100%" },
                }}
                value="Business"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#2563EB",
                      },
                    }}
                  />
                }
                label="Business"
              />
            </RadioGroup>
          )}
          {activeStep === 1 && (
            <Box sx={{ mt: "20px" }}>
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
                Full Name or Business Name
                <span style={{ color: "red" }}> *</span>
              </FormLabel>
              <TextField
                {...register("fullName", { required: "Full name is required" })}
                placeholder="e.g., Maria Fernández or Kumar Enterprises"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                sx={{
                  bgcolor: "#FFF",
                  width: "100%",
                  mt: "3px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                aria-labelledby="name-label"
                inputProps={{
                  "aria-label": "weight",
                  style: {
                    color: "black",
                    fontSize: "15px",
                    fontStyle: "italic",
                    fontWeight: 600,
                    letterSpacing: "0.075px",
                  },
                }}
              />
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <Box>
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
                <TextField
                  {...register("credentialName", {
                    required: "Credential name is required",
                  })}
                  placeholder="e.g., Community Gardening Coordinator"
                  variant="outlined"
                  error={!!errors.credentialName}
                  helperText={errors.credentialName?.message}
                  sx={{
                    bgcolor: "#FFF",
                    width: "100%",
                    mt: "3px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  aria-labelledby="name-label"
                  inputProps={{
                    "aria-label": "weight",
                    style: {
                      color: "black",
                      fontSize: "15px",
                      fontStyle: "italic",
                      fontWeight: 600,
                      letterSpacing: "0.075px",
                    },
                  }}
                />
              </Box>
              <TextEditor
                value={watch("credentialDescription")}
                onChange={handleTextEditorChange}
              />
              <Box>
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
                  Duration
                  <span style={{ color: "red" }}> *</span>
                </FormLabel>
                <TextField
                  {...register("credentialDuration", {
                    required: "Duration is required",
                  })}
                  placeholder="1 Day"
                  variant="outlined"
                  error={!!errors.credentialDuration}
                  helperText={errors.credentialDuration?.message}
                  sx={{
                    bgcolor: "#FFF",
                    width: "100%",
                    mt: "3px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                  aria-labelledby="name-label"
                  inputProps={{
                    "aria-label": "weight",
                    style: {
                      color: "black",
                      fontSize: "15px",
                      fontStyle: "italic",
                      fontWeight: 600,
                      letterSpacing: "0.075px",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
          {activeStep === 3 && (
            <Box position="relative" width="100%">
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
                Description (publicly visible)
                <span style={{ color: "red" }}> *</span>
              </FormLabel>
              <CustomTextField
                {...register("description", {
                  required: "Description is required",
                })}
                style={{ width: "100%", marginBottom: "3px" }}
                multiline
                rows={11}
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                helperText={`${inputValue.length}/${characterLimit} characters`}
                error={!!errors.description}
                FormHelperTextProps={{
                  className: "MuiFormHelperText-root",
                }}
                inputProps={{
                  maxLength: characterLimit,
                }}
              />
              <Box sx={{ display: "flex", gap: "5px" }}>
                <SVGSparkles />
                <FormLabel
                  sx={{
                    color: "#202E5B",
                    fontFamily: "Lato",
                    fontSize: "13px",
                    textDecorationLine: "underline",
                    lineHeight: "24px",
                    letterSpacing: "0.065px",
                    fontWeight: 400,
                    "&.Mui-focused": {
                      color: "#000",
                    },
                  }}
                  id="name-label"
                >
                  Use AI to generate a description.
                </FormLabel>
              </Box>
            </Box>
          )}
          {activeStep === 4 && (
            <Box>
              {fields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <Box sx={{ mb: "15px" }}>
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
                      id={`name-label-${index}`}
                    >
                      Name
                    </FormLabel>
                    <TextField
                      {...register(`portfolio.${index}.name`, {
                        required: "Name is required",
                      })}
                      defaultValue={field.name}
                      placeholder="Picture of the Community Garden"
                      variant="outlined"
                      sx={{
                        bgcolor: "#FFF",
                        width: "100%",
                        mt: "3px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                      aria-labelledby={`name-label-${index}`}
                    />
                  </Box>
                  <Box>
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
                      id={`url-label-${index}`}
                    >
                      URL
                    </FormLabel>
                    <TextField
                      {...register(`portfolio.${index}.url`, {
                        required: "URL is required",
                      })}
                      defaultValue={field.url}
                      placeholder="https://www.example.com"
                      variant="outlined"
                      error={!!errors?.portfolio?.[index]?.name}
                      helperText={errors?.portfolio?.[index]?.name?.message}
                      sx={{
                        bgcolor: "#FFF",
                        width: "100%",
                        mt: "3px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                      aria-labelledby={`url-label-${index}`}
                    />
                  </Box>
                </React.Fragment>
              ))}
              {fields.length < 5 && (
                <Box
                  sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                    display: "flex",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => append({ name: "", url: "" })}
                    style={{
                      background: "none",
                      color: "#003FE0",
                      border: "none",
                      padding: 0,
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 400,
                      letterSpacing: "0.075px",
                      textAlign: "right",
                      lineHeight: "16px",
                      marginTop: "7px",
                    }}
                  >
                    Add another
                  </button>
                </Box>
              )}
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "40px",
                }}
              >
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    background: "none",
                    color: "#6750A4",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  Skip
                </button>
              </Box>
            </Box>
          )}
          {activeStep === 5 && (
            <Box>
              <FormLabel
                sx={{
                  color: "#202E5B",
                  fontFamily: "Lato",
                  fontSize: "13px",
                  fontWeight: 600,
                  "&.Mui-focused": {
                    color: "#000",
                  },
                }}
                id="name-label"
              >
                URL of an image you have permission to use (optional)
              </FormLabel>
              <TextField
                {...register("imageLink")}
                placeholder="https://"
                variant="outlined"
                sx={{
                  bgcolor: "#FFF",
                  width: "100%",
                  mt: "3px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                aria-labelledby="name-label"
                inputProps={{
                  "aria-label": "weight",
                  style: {
                    color: "black",
                    fontSize: "15px",
                    fontStyle: "italic",
                    fontWeight: 600,
                    letterSpacing: "0.075px",
                  },
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "40px",
                }}
              >
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    background: "none",
                    color: "#6750A4",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  Skip
                </button>
              </Box>
            </Box>
          )}
          {activeStep === 6 && <DataComponent formData={watch()} />}
          {activeStep === 7 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100px",
                  display: "flex",
                  gap: "15px",
                  bgcolor: "#E5E7EB",
                  borderRadius: "20px",
                }}
              >
                <Image
                  style={{ width: "100px", height: "100px" }}
                  src={image}
                  alt="logo"
                />
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ textAlign: "right", pr: "15px", mt: "5px" }}>
                    <SVGGroup />
                  </Box>
                  <Typography
                    sx={{
                      color: "#202E5B",
                      textAlign: "left",
                      fontFamily: "Inter",
                      fontSize: "15px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    Basic Barista Training
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      gap: "15px",
                      mt: "5px",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "3px" }}>
                      <SVGDate />
                      <Typography
                        sx={{
                          color: "#4E4E4E",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          fontWeight: 400,
                          lineHeight: "150%",
                        }}
                      >
                        2 days
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "3px" }}>
                      <SVGTime />
                      <Typography
                        sx={{
                          color: "#4E4E4E",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          fontWeight: 400,
                          lineHeight: "150%",
                        }}
                      >
                        3 min
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "9px",
                }}
              >
                {[twitter, linkedin, instagram, mail, messageCircle].map(
                  (icon, index) => (
                    <Box
                      key={index}
                      sx={{
                        bgcolor: "#E5E7EB",
                        borderRadius: "20px",
                        height: "40px",
                        width: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image src={icon} alt={`${icon}Icon`} />
                    </Box>
                  )
                )}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setActiveStep(0)}
                  sx={{
                    padding: "10px 24px",
                    borderRadius: "100px",
                    bgcolor: "#003FE0",
                    textTransform: "capitalize",
                    fontFamily: "Roboto",
                    lineHeight: "20px",
                    "&:hover": {
                      bgcolor: "#003FE0",
                    },
                  }}
                >
                  Add Another
                </Button>
              </Box>
            </Box>
          )}
        </FormControl>
      </Box>
      {activeStep !== 7 && (
        <Box
          sx={{
            height: "40px",
            display: "flex",
            gap: "15px",
            justifyContent: activeStep !== 0 ? "space-between" : "center",
          }}
        >
          {activeStep !== 0 && (
            <StyledButton onClick={handleBack} color="secondary">
              back
            </StyledButton>
          )}
          {activeStep !== 0 && (
            <StyledButton type="submit" color="secondary">
              save & Exit
            </StyledButton>
          )}
          {activeStep !== 5 && activeStep !== 6 && (
            <StyledButton onClick={handleNext} color="primary">
              Next
            </StyledButton>
          )}
          {activeStep === 6 && (
            <StyledButton onClick={handleSign} color="primary">
              Sign
            </StyledButton>
          )}
          {activeStep === 5 && (
            <StyledButton
              onClick={handlePreview}
              disabled={activeStep === maxSteps - 1}
              color="primary"
            >
              Preview
            </StyledButton>
          )}
        </Box>
      )}
    </form>
  );
};

export default Form;
