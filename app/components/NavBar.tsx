import React from "react";
import SigninButton from "./SigninButton";
import { Box, Typography } from "@mui/material";


const NavBar = () => {
  return (
    <Box
      sx={{
        width: { xs: "92%" },
        height: { xs: "24px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        
      }}
    >
      <Box sx={{ display:'flex', ml: "14px", gap: "90px",}}>
        
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 12H20" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 6H20" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 18H20" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "16px",
          color: "#242F56",
        }}
        >
        LinkedClaims
      </Typography>
          </Box>
        <SigninButton/>
    </Box>
  );
};

export default NavBar;
