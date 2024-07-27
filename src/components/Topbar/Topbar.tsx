"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import { MENU_ITEM, MENU_ITEMS_2 } from "@/utils/config";
import {
  AssistantPhoto,
  BlockOutlined,
  Comment,
  Logout,
  Person,
  PostAdd,
  Report,
  Settings,
  Menu,
  Close,
  Dashboard,
  EventAvailable,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "@/app/redux/reducers/theme";
import { RootState } from "@/app/redux/store";
import { logout } from "@/app/redux/actions/auth";
import { authActions } from "@/app/redux/reducers/auth";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)",

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const dispatch = useDispatch();
  const { theme, sidebar } = useSelector((state: RootState) => state.theme);

  console.log(theme, sidebar);
  const router = useRouter();

  const handleDrawerOpen = () => {
    dispatch(themeActions.toggleSidebar());
  };

  const handleDrawerClose = () => {
    dispatch(themeActions.toggleSidebar());
  };

  const handleLogout = async () => {
    console.log("logout called");

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await logout(refreshToken)
        .then((response) => {
          if (response) {
            dispatch(authActions.setCurrentUser([]));
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClick = (name: any) => {
    if (name.name === "Logout") {
      handleLogout();
    } else {
      router.push(`${name.link}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={sidebar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(sidebar && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Stack
            flexDirection={"row"}
            justifyContent="space-between"
            width={"100%"}
          >
            <Typography variant="h6" noWrap component="div">
              Social Media Admin Dashboard
            </Typography>
            <Avatar sx={{ cursor: "pointer" }} />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={sidebar}>
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={handleDrawerClose}>
            <Close />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MENU_ITEM.map((text, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                router.push(`${text.link}`);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: sidebar ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebar ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.name === "Dashboard" ? (
                    <Dashboard />
                  ) : text.name === "Users" ? (
                    <Person />
                  ) : text.name === "Posts" ? (
                    <PostAdd />
                  ) : text.name === "Events" ? (
                    <EventAvailable />
                  ) : text.name === "Comments" ? (
                    <Comment />
                  ) : text.name === "Suggestions" ? (
                    <AssistantPhoto />
                  ) : null}
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: sidebar ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {MENU_ITEMS_2.map((text, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                handleClick(text);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: sidebar ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebar ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.name === "Report List" ? (
                    <Report />
                  ) : text.name === "Block List" ? (
                    <BlockOutlined />
                  ) : text.name === "Settings" ? (
                    <Settings />
                  ) : text.name === "Logout" ? (
                    <Logout />
                  ) : null}
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: sidebar ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
