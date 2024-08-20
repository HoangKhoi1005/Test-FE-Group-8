import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import "./SigninStyle.css";
import password_icon from "~/assets/password.png";
import email_icon from "~/assets/email.png";
import user_icon from "~/assets/person.png";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAuth } from "~/pages/Auth/index";


const SignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [logoutSnackbarOpen, setLogoutSnackbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const handleSignUp = async () => {
    if (!name || !userName || !password) {
      alert("Tên, tên người dùng và mật khẩu không được để trống, vui lòng nhập!");
      return;
    }
    try {
      const response = await axios.get(
        "https://66be10c274dfc195586e78a9.mockapi.io/api/accounts"
      );
      const accounts = response.data;

      const existingUser = accounts.find((account) => account.name === name);

      if (existingUser) {
        alert("Tài khoản đã tồn tại. Vui lòng chọn tên khác.");
      } else {
        const newUser = {
          name: name,
          password: password,
          userName: userName,
          role: "user",
        };

        const createResponse = await axios.post(
          "https://66be10c274dfc195586e78a9.mockapi.io/api/accounts",
          newUser
        );

        setAuth({
          id: createResponse.data.id,
          userName: createResponse.data.userName,
          name: createResponse.data.name,
          role: createResponse.data.role,
        });

        localStorage.setItem("userID", createResponse.data.id);
        localStorage.setItem("userName", createResponse.data.userName);
        localStorage.setItem("name", createResponse.data.name);
        localStorage.setItem("role", createResponse.data.role);
        localStorage.setItem("loggedInUser", JSON.stringify(createResponse.data));

        setLogoutSnackbarOpen(true);
        setTimeout(() => setIsLoggedIn(true), 1500);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra đăng ký:", error);
    }
  };

  const handleSnackbarClose = () => {
    setLogoutSnackbarOpen(false);
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleSignUp}>
            Sign In
          </button>
          <button className="submit gray">
          <Link to="/Login">Login</Link>
          </button>
          </div>

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
            Bạn đã đăng ký thành công!
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default SignUp;