"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, FormProps } from "./Types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SVGSparkles } from "../../Assets/SVGs";
import TextEditor from "../Texteditor";

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
    borderRadios: "28px",
  },
});
const Form = () => {
  const [formData, setFormData] = useState<FormData>();
  const [value, setValue] = useState("Device");
  const [activeStep, setActiveStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [portfolios, setPortfolios] = useState([{ name: "", url: "" }]);
  const characterLimit = 294;
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
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handlePortfolioChange = (index: number, field: string, value: string) => {
    const updatedPortfolios = portfolios.map((portfolio, idx) => {
      if (idx === index) {
        return { ...portfolio, [field]: value };
      }
      return portfolio;
    });
    setPortfolios(updatedPortfolios);
  };

  const handleAddPortfolio = () => {
    if (portfolios.length < 5) {
      setPortfolios([...portfolios, { name: "", url: "" }]);
    }
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
        }}
      >
        {textGuid[activeStep]}
        {activeStep === 0 && <span style={{ color: "red" }}> *</span>}
      </Typography>
      {activeStep !== 0 && (
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
      <Box sx={{ pl: "15px", width: "100%" }}>
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
              Is this for a individual or a business?
            </FormLabel>
          )}
          <RadioGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              m: "0 auto",
              width: "100%",
            }}
            aria-labelledby="form-type-label"
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
            )}
            {activeStep === 1 && (
              <FormControlLabel
                sx={{
                  bgcolor: "#FFF",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
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
            )}
          </RadioGroup>
          {activeStep === 1 && (
            <Box sx={{ ml: "-10px", mt: "20px" }}>
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
                placeholder="e.g., Maria Fernández or Kumar Enterprises"
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
                    fontWeight: 700,
                    letterSpacing: "0.075px",
                  },
                }}
              />
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <Box sx={{ ml: "-10px" }}>
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
                  placeholder="e.g., Community Gardening Coordinator"
                  variant="outlined"
                  sx={{
                    bgcolor: "#FFF",
                    borderRadius: "800px",
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
                      fontWeight: 700,
                      letterSpacing: "0.075px",
                    },
                  }}
                />
              </Box>
              <TextEditor />
              <Box sx={{ ml: "-10px" }}>
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
                  placeholder="1 Day"
                  variant="outlined"
                  sx={{
                    bgcolor: "#FFF",
                    borderRadius: "800px",
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
                      fontWeight: 700,
                      letterSpacing: "0.075px",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
          {activeStep === 3 && (
            <Box sx={{ ml: "-10px" }} position="relative" width="100%">
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
                style={{ width: "100%", marginBottom: "3px" }}
                multiline
                rows={11}
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                helperText={`${inputValue.length}/${characterLimit} characters`}
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
            <Box sx={{ ml: "-10px" }}>
              {portfolios.map((portfolio, index) => (
                <>
                  <Box sx={{ mb: "15px" }} key={index}>
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
                      Name
                    </FormLabel>
                    <TextField
                      value={portfolio.name}
                      onChange={(e) => handlePortfolioChange(index, "name", e.target.value)}
                      placeholder="Picture of the Community Garden"
                      variant="outlined"
                      sx={{
                        bgcolor: "#FFF",
                        borderRadius: "800px",
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
                          fontWeight: 700,
                          letterSpacing: "0.075px",
                        },
                      }}
                    />
                  </Box>
                  <Box key={index}>
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
                      URL
                    </FormLabel>
                    <TextField
                      value={portfolio.url}
                      onChange={(e) => handlePortfolioChange(index, "url", e.target.value)}

                      placeholder="https://www.pics.com"
                      variant="outlined"
                      sx={{
                        bgcolor: "#FFF",
                        borderRadius: "800px",
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
                          fontWeight: 700,
                          letterSpacing: "0.075px",
                        },
                      }}
                    />
                  </Box>
                </>
              ))}
              {portfolios.length < 5 && (
                <Box
                  sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                    display: "flex",
                  }}
                >
                  <button
                    onClick={handleAddPortfolio}
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
            </Box>
          )}
        </FormControl>
      </Box>
      <Box
        sx={{
          height: "40px",
          display: "flex",
          gap: "15px",
          justifyContent: activeStep !== 0 ? "space-between" : "center",
        }}
      >
        {activeStep !== 0 && (
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              padding: "0 24px",
              borderRadius: "100px",
              bgcolor: "#FFF",
              textTransform: "capitalize",
              color: "#4E4E4E",
              fontFamily: "Roboto",
              "&:hover": {
                bgcolor: "#FFF",
              },
            }}
          >
            back
          </Button>
        )}
        {activeStep !== 0 && (
          <Button
            variant="contained"
            onClick={() => {}}
            sx={{
              padding: "10px 24px",
              gap: "8px",
              borderRadius: "100px",
              bgcolor: "#FFF",
              textTransform: "capitalize",
              color: "#4E4E4E",
              fontFamily: "Roboto",
              lineHeight: "20px",
              "&:hover": {
                bgcolor: "#FFF",
              },
            }}
          >
            save & Exit
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          sx={{
            padding: "10px 24px",
            borderRadius: "100px",
            bgcolor: "#003FE0",
            width: "20px",
            textTransform: "capitalize",
            fontFamily: "Roboto",
            lineHeight: "20px",
            "&:hover": {
              bgcolor: "#003FE0",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default Form;
