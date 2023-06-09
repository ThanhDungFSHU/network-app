import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import { Avatar, Divider } from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

function MainHeader() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout(() => navigate("/login"));
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user?.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/"
        sx={{ mx: 1 }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/account"
        sx={{ mx: 1 }}
      >
        My account
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo sx={{ width: "50px", height: "50px" }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoderComm - Aries
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              onClick={handleProfileMenuOpen}
            />
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
