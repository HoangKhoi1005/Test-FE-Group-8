import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Snackbar, Alert } from "@mui/material";
import { useAuth } from "~/pages/Auth/index";

function Profiles({ loggedInUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutSnackbarOpen, setLogoutSnackbarOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setAuth({
      id: null,
      userName: "",
      role: "",
    });
    setLogoutSnackbarOpen(true);
    handleClose();
    window.location.reload();
  };

  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setLogoutSnackbarOpen(false);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? "basic-menu-profiles" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt="Profile Picture"
            src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/275253747_1072102423713589_4612179048140960110_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFXLmledEki0IJrIZG56lUYLlgfC2oNXtAuWB8Lag1e0BhIdURdF0Zv82HzYLgFvxkhgEvpEyBM9xONwlzGv4Bt&_nc_ohc=0DftG3g4P1cQ7kNvgEMKrQf&_nc_ht=scontent.fsgn5-10.fna&gid=Aa1Pn0UNWd6eVdf26MOitd0&oh=00_AYCCztGFbKHBdYH1-dF1rcINGqrAMjYA_JCKD4mFuBhdGw&oe=668CCA96"
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-profiles",
        }}
      >
        {loggedInUser ? (
          <>
            <MenuItem>
              <Avatar sx={{ width: 28, height: 28, mr: 2 }} />{" "}
              {loggedInUser.userName}
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>

      <Snackbar
        open={logoutSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Bạn đã đăng xuất thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Profiles;
