import React from "react";
import { Box, Button, Typography } from "@mui/material";
import image from "./Assets/Small Main Photo.png";
import Image from "next/image";
import chat from "./Assets/Ghost Copy Blocks.png";
import checkMark from "./Assets/Checkmark for 2nd Phone.png";
import SVGDesign, {
  SVGLogo,
  SVGBadgeCheck,
  SVGMobile,
  SVGInMobile,
  SVGCheckMark,
} from "./Assets/SVGs";
const page = () => {
  return (
    <>
      <Box
        sx={{
          ml: "17px",
          display: "flex",
          flexDirection: "column",
          gap: "37px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "92%" },
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
              style={{ width: "100%", height: "110px" }}
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
              right: "272px",
              bottom: "-68px",
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
      </Box>
    </>
  );
};

export default page;
