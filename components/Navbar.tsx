"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import SideNav from "./SideNav";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import Image from "next/image";

const pages = ["HOME", "RESTAURANTS", "RESERVATIONS", "CONTACT"];

function Navbar() {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenSidebar(newOpen);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Image src="/images/logo.png" alt="Logo" width={200} height={200} />

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>

            {/* Sidebar */}
            <Drawer
              anchor="right"
              open={openSidebar}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: "15rem" }}
                role="presentation"
                onClick={toggleDrawer(false)}
              >
                <SideNav />
              </Box>
            </Drawer>
            {/* End Sidebar */}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((text) => (
              <Button
                key={text}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {text}
              </Button>
            ))}
          </Box>

          <Stack
            display={{ xs: "none", md: "flex" }}
            py={1}
            spacing={2}
            direction="row"
          >
            <Button variant="outlined">Login</Button>
            <Button variant="contained">Register</Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;