"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import dayjs from "dayjs";
import { currentUser, userLogout } from "@/app/api/user";
import { toast } from "react-toastify";

const pages = ["RESERVATIONS"];
const settings = [
  { name: "Tài khoản", page: "account" },
  { name: "Lịch sử đặt", page: "book-history" },
  { name: "Đăng xuất", page: "logout" },
];

export default function Navbar() {
  const searchParams = useSearchParams();

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenSidebar(newOpen);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const data = await currentUser();

      console.log("Current user", data);

      if (data && data.user) {
        setIsLogin(true);
      }
    };

    checkLogin();
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Menu for mobile view */}
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
              anchor="left"
              open={openSidebar}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: "15rem" }}
                role="presentation"
                onClick={toggleDrawer(false)}
              >
                <SideNav isLogin={isLogin} />
              </Box>
            </Drawer>
            {/* End Sidebar */}
          </Box>
          {/* End Menu for mobile view */}
          <Box
            flex={{ xs: 1, md: "inherit" }}
            display={{ xs: "none", md: "flex" }}
            justifyContent="center"
            component={Link}
            href="/"
          >
            <Image src="/images/logo.png" alt="Logo" width={200} height={200} />
          </Box>

          {/* Search box */}
          {searchParams.size > 0 && (
            <>
              <Box
                onClick={() => setOpenSearch(true)}
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent="space-between"
                borderRadius={20}
                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                p="5px"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    opacity: "80%",
                  },
                }}
              >
                <Typography
                  fontWeight="bold"
                  pl={2}
                  maxWidth={150}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {searchParams.get("place")}
                </Typography>
                <Divider orientation="vertical" flexItem />

                <Box
                  maxWidth={200}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography fontWeight="bold" mr={2}>
                    {searchParams.get("fromDate")}
                  </Typography>
                  <Typography fontWeight="bold">
                    {searchParams.get("untilDate")}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />

                <Typography
                  fontWeight="bold"
                  maxWidth={70}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {searchParams.get("guests")} người
                </Typography>

                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>
              <Dialog open={openSearch} onClose={() => setOpenSearch(false)}>
                <Box p={5}>
                  <SearchBar
                    placeInput={searchParams.get("place") || ""}
                    checkInDateInput={dayjs(searchParams.get("fromDate"))}
                    checkOutDateInput={dayjs(searchParams.get("untilDate"))}
                    guestsInput={Number(searchParams.get("guests")) || 2}
                    setOpenSearch={setOpenSearch}
                  />
                </Box>
              </Dialog>
            </>
          )}
          {/* End Search box */}

          <Box display="flex" alignItems="center">
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              {pages.map((text) => (
                <Button
                  key={text}
                  sx={{ my: 2, color: "black", display: "block" }}
                  component={Link}
                  href={`/${text.toLowerCase()}`}
                >
                  {text}
                </Button>
              ))}
            </Box>

            {isLogin ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={"NA"} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    if (setting.page === "logout") {
                      return (
                        <MenuItem
                          key={setting.page}
                          onClick={async () => {
                            handleCloseUserMenu();

                            const data = await userLogout();
                            console.log(data);
                            if (data.errors) {
                              toast.error(
                                "Đăng xuất thất bại " + data.errors[0].message
                              );
                            } else {
                              toast.success("Đăng xuất thành công");
                              setIsLogin(false);
                            }
                          }}
                        >
                          <Typography textAlign="center">
                            {setting.name}
                          </Typography>
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem
                          key={setting.page}
                          onClick={handleCloseUserMenu}
                          component={Link}
                          href={`/${setting.page}`}
                        >
                          <Typography textAlign="center">
                            {setting.name}
                          </Typography>
                        </MenuItem>
                      );
                    }
                  })}
                </Menu>
              </>
            ) : (
              <Box display={{ xs: "none", md: "flex" }} py={1} gap={2}>
                <Button variant="outlined" component="a" href="/login">
                  Đăng nhập
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function SideNav({ isLogin }: { isLogin: boolean }) {
  return (
    <List>
      <Divider sx={{ mt: "5rem" }} />
      {pages.map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} href={`/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}

      {!isLogin && (
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <Button variant="outlined" component="a" href="/login">
            Đăng nhập
          </Button>
        </Box>
      )}
    </List>
  );
}
