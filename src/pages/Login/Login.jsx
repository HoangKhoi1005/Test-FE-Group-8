import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./LoginStyle.css";
import password_icon from "~/assets/password.png";
import email_icon from "~/assets/email.png";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAuth } from "~/pages/Auth/index";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [logoutSnackbarOpen, setLogoutSnackbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const handleLogin = async () => {
    if (!name || !password) {
      alert("Tên và mật khẩu trống, vui lòng nhập!");
      return;
    }
    try {
      const response = await axios.get(
        "https://66be10c274dfc195586e78a9.mockapi.io/api/accounts"
      );
      const accounts = response.data;

      // Kiểm tra name và mật khẩu từ trường nhập với dữ liệu từ API
      const user = accounts.find(
        (account) => account.name === name && account.password === password
      );

      if (user) {
        setAuth({
          id: user.id,
          userName: user.userName,
          role: user.role,
        });
        localStorage.setItem("userID", user.id);
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("role", user.role);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setLogoutSnackbarOpen(true);
        setTimeout(() => setIsLoggedIn(true), 1500);
      } else {
        alert("Tên hoặc mật khẩu không chính xác. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra đăng nhập:", error);
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
          <button className="submit" onClick={handleLogin}>
            Log In
          </button>
          <button className="submit">Sign Up</button>
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
            Bạn đã đăng nhập thành công!
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default Login;
