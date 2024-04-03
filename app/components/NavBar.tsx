import React from "react";
import { Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const NavBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        bgcolor: "#4460EA",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "4px 20px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "26px",
          lineHeight: "auto",
          letterSpacing: "-3%",
        }}
      >
        LinkedClaims
      </Typography>
      <Box>
        <Button sx={{ width: "fit-content", color: "white",mr:'15px',p:'0' }}>
          <SearchIcon />
        </Button>
        <Button
          sx={{
            width: "91px",
            mr:'8px',
            borderRadius: "8px",
            bgcolor: "white",
            color: "black",
            "&:hover": {
              bgcolor: "white",
            },
          }}
          variant="text"
        >
          <PersonOutlineOutlinedIcon
            sx={{ mr: "5px", width: "16px", height: "16px" }}
          />
          <Typography
            sx={{ fontWeight: "600", fontSize: "15px", letterSpacing: "0.5%" }}
          >
            L<span style={{ textTransform: "lowercase" }}>og in</span>
          </Typography>
        </Button>
        <Button sx={{ borderRadius: "8px", color: "white",width:'80px' }} variant="text">
          <Typography
            sx={{ fontWeight: "600", fontSize: "15px", letterSpacing: "0.5%" }}
          >
            R<span style={{ textTransform: "lowercase" }}>egister</span>
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;
