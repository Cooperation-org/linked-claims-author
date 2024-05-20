import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import image from "./Assets/Small Main Photo.png";
import Image from "next/image";
import chat from "./Assets/Ghost Copy Blocks.png";
import checkMark from "./Assets/Checkmark for 2nd Phone.png";
import SVGDesign, {
  SVGBadgeCheck,
  SVGMobile,
  SVGInMobile,
  SVGCheckMark,
  SVGCheckMarks,
} from "./Assets/SVGs";
import img from "./Assets/Annika Rangarajan.png";
const page = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "37px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%" },
            flexDirection: "column",
            alignItems: "center",
            gap: "37px",
            mt: "37px",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              color: "#242F56",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "30px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "125%",
            }}
          >
            Verified Skills For Your Resume
          </Typography>
          <Typography
            sx={{
              color: "#242F56",
              textAlign: "center",
              fontFamily: "Lato",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              width: { xs: "83%" },
            }}
          >
            Sign up in seconds. Let your true skills shine. Stand out from the
            crowd.{" "}
          </Typography>
          <Box sx={{ width: "120%", height: "110px" }}>
            <Image
              style={{ width: "100%", height: "100px" }}
              src={image}
              alt="logo"
            />
          </Box>
          <Button
            sx={{
              width: "176px",
              textAlign: "center",
              fontFamily: "Lato",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "20px",
              borderRadius: "100px",
              bgcolor: "#003FE0",
              color: "white",
            }}
          >
            <span style={{ textTransform: "lowercase" }}>
              Get started for FREE
            </span>
          </Button>
          <Box
            sx={{
              position: "absolute",
              right: "78%",
              bottom: "-18%",
              zIndex: 1111111,
            }}
          >
            <SVGDesign />
          </Box>
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            height: "148px",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            flexShrink: 0,
            width: { xs: "92%" },
          }}
        >
          <Typography
            sx={{
              color: "#242F56",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "125%",
              p: "0 50px",
            }}
          >
            Building your story in the age of AI.
          </Typography>
          <Typography
            sx={{
              color: "#202E5B",
              textAlign: "center",
              fontFamily: "Lato",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              p: "0 30px",
            }}
          >
            No more cut and paste. No more re-doing your resume. Add your skills
            once, then mix and match them for each job.{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { xs: "92%" },
            height: "245px",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                color: "#79747E",
                textAlign: "center",
                fontFamily: "Lato",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                position: "absolute",
                top: "35px",
                left: "25px",
              }}
            >
              Resume
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: "58px",
                left: "20px",
                display: "flex",
                width: "77px",
                height: "11px",
              }}
            >
              <SVGBadgeCheck />
              <Typography
                sx={{
                  color: "#003FE0",
                  textAlign: "center",
                  fontFamily: "Arial",
                  fontSize: "9px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "normal",
                  position: "absolute",
                  top: "5px",
                  left: "20px",
                }}
              >
                VERIFIED
              </Typography>
            </Box>
            <Image
              style={{
                top: "90px",
                left: "20px",
                zIndex: 1111,
                position: "absolute",
              }}
              src={chat}
              alt="logo"
            />
            <Box
              sx={{
                width: "59px",
                height: "20px",
                color: "#FFF",
                textAlign: "center",
                fontFamily: "Lato",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                position: "absolute",
                top: "200px",
                left: "35px",
                bgcolor: "#003FE0",
                borderRadius: "5px",
              }}
            >
              <span style={{ textTransform: "lowercase" }}>Share</span>
            </Box>
            <SVGMobile />
          </Box>
          <Box sx={{ m: "0 10px" }}>
            <SVGCheckMark />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                color: "#79747E",
                textAlign: "center",
                fontFamily: "Lato",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                position: "absolute",
                top: "130px",
                left: "35px",
              }}
            >
              Hired!
            </Typography>
            <Image
              style={{
                top: "60px",
                left: "40px",
                zIndex: 1111,
                position: "absolute",
              }}
              src={checkMark}
              alt="logo"
            />
            <Box
              sx={{
                position: "absolute",
                top: "162px",
                left: "35px",
                display: "flex",
                width: "77px",
                height: "11px",
              }}
            >
              <SVGInMobile />
            </Box>
            <SVGMobile />
          </Box>
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
            width: { xs: "92%" },
          }}
        >
          <Box
            sx={{ display: "flex", gap: "15px", width: "300px", mr: "20px" }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: "#202E5B",
                fontFamily: "Lato",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Personalized AI skill descriptions
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", gap: "15px", width: "300px", mr: "20px" }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: "#202E5B",
                fontFamily: "Lato",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Instant insight into your strengths
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", gap: "15px", width: "300px", mr: "20px" }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: "#202E5B",
                fontFamily: "Lato",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Increased employer visibility
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", gap: "15px", width: "300px", mr: "20px" }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: "#202E5B",
                fontFamily: "Lato",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Personalized resumes for each job
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", gap: "15px", width: "300px", mr: "20px" }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: "#202E5B",
                fontFamily: "Lato",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Faster background checks
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "350px", background: "#F6F6F6" }}>
          <Typography
            sx={{
              color: "#242F56",
              fontFamily: "Poppins",
              fontSize: 24,
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "125%",
              width: "calc(100%- 30px)",
              display: "flex",
              justifyContent: "flex-start",
              m: "53px 17px 33px ",
            }}
          >
            Your data. Your stories.
          </Typography>
          <Stack
            direction="row"
            sx={{ display: "flex", overflowY: "auto", gap: "10px", pl: "16px" }}
          >
            <Box
              sx={{
                minWidth: "328px",
                height: "192px",
                borderRadius: "10px",
                opacity: 0.9,
                bgcolor: "#FFCB25",
                display: "flex",
                p:'27px',
                gap:'15px'
              }}
            >
              <Image
                style={{
                  height: "57px",
                  width: "57px",
                }}
                src={img}
                alt="logo"
              />
              <Box>
                <Typography
                  sx={{
                    width: "212px",
                    color: "#202E5B",
                    fontFamily: "Lato",
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                    mb:'15px'
                  }}
                >
                  Dheepthi Ravikumar
                </Typography>
                <Typography
                  sx={{
                    width: "212px",
                    color: "#202E5B",
                    fontFamily: "Lato",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  “LinkedClaims helped me see that I had way more skills than I
                  realized. It gave me the confidence I needed to apply for a
                  job I never would have applied for otherwise.”
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                minWidth: "328px",
                height: "192px",
                borderRadius: "10px",
                opacity: 0.9,
                bgcolor: "#FFCB25",
                display: "flex",
                p:'27px',
                gap:'15px'
              }}
            >
              <Image
                style={{
                  height: "57px",
                  width: "57px",
                }}
                src={img}
                alt="logo"
              />
              <Box>
                <Typography
                  sx={{
                    width: "212px",
                    color: "#202E5B",
                    fontFamily: "Lato",
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                    mb:'15px'
                  }}
                >
                  Dheepthi Ravikumar
                </Typography>
                <Typography
                  sx={{
                    width: "212px",
                    color: "#202E5B",
                    fontFamily: "Lato",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  “LinkedClaims helped me see that I had way more skills than I
                  realized. It gave me the confidence I needed to apply for a
                  job I never would have applied for otherwise.”
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default page;
