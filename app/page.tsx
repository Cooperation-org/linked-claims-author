import React from "react";
import { Box, Button, Typography } from "@mui/material";
import image from "./Assets/ccd5c4f2d7292730102eb03094e511eb.jpeg";
import Image from "next/image";
import chat from "./Assets/Ghost Copy Blocks.png";
import checkMark from "./Assets/Checkmark for 2nd Phone.png";
const page = () => {
  return (
    <>
      <Box
        sx={{
          ml: "16px",
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
          <Box sx={{ position: "relative", width: "400px", height: "110px" }}>
            <Box
              sx={{
                position: "absolute",
                mt: "45px",
                left: "-14px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="16"
                viewBox="0 0 390 16"
                fill="none"
              >
                <path
                  d="M-42.924 7.49914C-40.7835 8.57537 -17.5977 9.60175 -13.279 9.84048C22.6072 11.8242 64.3481 13.9567 100.111 13.5085C121.25 13.2436 140.214 12.0003 158.338 10.8382C186.052 9.06113 212.535 6.98637 240.895 5.36204C270.115 3.68848 300.703 2.53681 334.424 2.46605C356.06 2.42064 377.433 2.97713 399.404 3.4749"
                  stroke="#FFCB25"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                height: "",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "fit-content",
                  bgcolor: "#FFCB25",
                  borderRadius: "2px",
                  p: "2px 5px",
                  right: "245px",
                  bottom: "-70px",
                  zIndex: 11111,
                }}
              >
                Admitted
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  width: "fit-content",
                  bgcolor: "#FFCB25",
                  borderRadius: "2px",
                  p: "0px 5px",
                  right: "120px",
                  zIndex: 11111,
                }}
              >
                Hired
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  width: "fit-content",
                  bgcolor: "#FFCB25",
                  borderRadius: "2px",
                  p: "0px 5px",
                  right: "80px",
                  bottom: "-100px",
                  zIndex: 11111,
                }}
              >
                Promoted
              </Box>
              <Image
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "110px",
                  border: "4px solid #003FE0",
                  zIndex: 1111,
                  position: "absolute",
                }}
                src={image}
                alt="logo"
              />
            </Box>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="76"
              height="62"
              viewBox="0 0 76 62"
              fill="none"
            >
              <path
                d="M2 60C15.8505 57.6916 28.0557 45.8102 31.7778 32.4444C33.4681 26.3745 34.7807 18.5073 32.3333 12.4444C27.9021 1.46716 17.1791 7.47976 11.7778 14.6667C5.65705 22.8108 13.6422 28.1388 21.1111 30.0556C35.4504 33.7355 48.337 27.0496 58.9444 17.8333C64.5167 12.9919 68.8278 7.17215 74 2"
                stroke="#FFCB25"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
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
                top: "60px",
                left: "20px",
                display: "flex",
                width: "77px",
                height: "11px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <g clip-path="url(#clip0_425_4116)">
                  <path
                    d="M2.40625 5.38842C2.31502 4.97749 2.32903 4.55019 2.44697 4.14613C2.56491 3.74206 2.78297 3.37432 3.08092 3.07699C3.37887 2.77966 3.74707 2.56238 4.15138 2.44529C4.55569 2.32819 4.98302 2.31508 5.39375 2.40717C5.61982 2.0536 5.93125 1.76264 6.29934 1.56109C6.66743 1.35955 7.08034 1.25391 7.5 1.25391C7.91966 1.25391 8.33256 1.35955 8.70065 1.56109C9.06875 1.76264 9.38018 2.0536 9.60625 2.40717C10.0176 2.31468 10.4457 2.32773 10.8506 2.44511C11.2556 2.56249 11.6243 2.78038 11.9224 3.07851C12.2205 3.37664 12.4384 3.74534 12.5558 4.15029C12.6732 4.55525 12.6862 4.98331 12.5937 5.39467C12.9473 5.62073 13.2383 5.93217 13.4398 6.30026C13.6414 6.66835 13.747 7.08126 13.747 7.50092C13.747 7.92057 13.6414 8.33348 13.4398 8.70157C13.2383 9.06966 12.9473 9.3811 12.5937 9.60717C12.6858 10.0179 12.6727 10.4452 12.5556 10.8495C12.4385 11.2538 12.2213 11.622 11.9239 11.92C11.6266 12.2179 11.2589 12.436 10.8548 12.5539C10.4507 12.6719 10.0234 12.6859 9.6125 12.5947C9.38672 12.9496 9.07505 13.2418 8.70633 13.4442C8.33761 13.6467 7.92377 13.7528 7.50312 13.7528C7.08248 13.7528 6.66864 13.6467 6.29992 13.4442C5.9312 13.2418 5.61952 12.9496 5.39375 12.5947C4.98302 12.6867 4.55569 12.6736 4.15138 12.5565C3.74707 12.4395 3.37887 12.2222 3.08092 11.9248C2.78297 11.6275 2.56491 11.2598 2.44697 10.8557C2.32903 10.4516 2.31502 10.0243 2.40625 9.61342C2.04997 9.38794 1.75651 9.07602 1.55315 8.70667C1.3498 8.33733 1.24316 7.92254 1.24316 7.50092C1.24316 7.07929 1.3498 6.66451 1.55315 6.29516C1.75651 5.92581 2.04997 5.61389 2.40625 5.38842Z"
                    stroke="#003FE0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.625 7.5L6.875 8.75L9.375 6.25"
                    stroke="#003FE0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_425_4116">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
                  top: "3px",
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="245"
              viewBox="0 0 128 245"
              fill="none"
            >
              <rect width="128" height="245" rx="20" fill="#F7F7F7" />
              <rect x="7" y="7" width="114" height="230" rx="15" fill="white" />
              <rect
                x="0.5"
                y="0.5"
                width="127"
                height="244"
                rx="20.5"
                stroke="#4D4D4D"
              />
              <rect
                x="7.5"
                y="7.5"
                width="113"
                height="229"
                rx="11.5"
                stroke="#4D4D4D"
              />
              <path
                d="M35.5 7.5V7.5C36.4306 7.8102 37.1302 8.58591 37.343 9.54349L37.8275 11.724C38.5126 14.8067 41.2468 17 44.4047 17H82.7195C85.7257 17 88.2512 14.7396 88.5831 11.7518L88.8254 9.57147C88.9318 8.61348 89.5856 7.80481 90.5 7.5V7.5"
                stroke="#4D4D4D"
              />
              <rect x="50" y="9" width="20" height="2" rx="1" fill="#EBEBEB" />
              <circle cx="76" cy="10" r="2" fill="#EBEBEB" />
              <rect
                x="47"
                y="228"
                width="34"
                height="2"
                rx="1"
                fill="#EBEBEB"
              />
              <path d="M35 7H90L89 8H36.621L35 7Z" fill="#F7F7F7" />
            </svg>
          </Box>
          <Box sx={{ m: "0 10px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="24"
              viewBox="0 0 50 24"
              fill="none"
            >
              <path
                d="M49.0607 13.0607C49.6464 12.4749 49.6464 11.5251 49.0607 10.9393L39.5147 1.3934C38.9289 0.807611 37.9792 0.807611 37.3934 1.3934C36.8076 1.97919 36.8076 2.92893 37.3934 3.51472L45.8787 12L37.3934 20.4853C36.8076 21.0711 36.8076 22.0208 37.3934 22.6066C37.9792 23.1924 38.9289 23.1924 39.5147 22.6066L49.0607 13.0607ZM0 13.5H48V10.5H0V13.5Z"
                fill="#E7E6E6"
              />
            </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="23"
                  viewBox="0 0 64 23"
                  fill="none"
                >
                  <path
                    d="M2 2.25C16.6109 2.25 31.2226 2.29855 45.8333 2.23611C50.8609 2.21463 55.8905 2 60.9167 2C62.6423 2 59.3985 2.93971 59.3472 2.95833C46.382 7.66253 31.1661 8.17244 19.6944 16.4722C18.5792 17.2791 16.5489 18.8481 17.4167 19.9167C18.9149 21.7616 25.0695 20.2047 26.6944 19.9583C30.7214 19.3478 34.7166 18.5762 38.75 18"
                    stroke="#FFCB25"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                </svg>
              </Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="245"
              viewBox="0 0 128 245"
              fill="none"
            >
              <rect width="128" height="245" rx="20" fill="#F7F7F7" />
              <rect x="7" y="7" width="114" height="230" rx="15" fill="white" />
              <rect
                x="0.5"
                y="0.5"
                width="127"
                height="244"
                rx="20.5"
                stroke="#4D4D4D"
              />
              <rect
                x="7.5"
                y="7.5"
                width="113"
                height="229"
                rx="11.5"
                stroke="#4D4D4D"
              />
              <path
                d="M35.5 7.5V7.5C36.4306 7.8102 37.1302 8.58591 37.343 9.54349L37.8275 11.724C38.5126 14.8067 41.2468 17 44.4047 17H82.7195C85.7257 17 88.2512 14.7396 88.5831 11.7518L88.8254 9.57147C88.9318 8.61348 89.5856 7.80481 90.5 7.5V7.5"
                stroke="#4D4D4D"
              />
              <rect x="50" y="9" width="20" height="2" rx="1" fill="#EBEBEB" />
              <circle cx="76" cy="10" r="2" fill="#EBEBEB" />
              <rect
                x="47"
                y="228"
                width="34"
                height="2"
                rx="1"
                fill="#EBEBEB"
              />
              <path d="M35 7H90L89 8H36.621L35 7Z" fill="#F7F7F7" />
            </svg>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default page;
