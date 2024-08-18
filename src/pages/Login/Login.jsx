import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./LoginStyle.css";
import password_icon from '~/assets/password.png';
import email_icon from '~/assets/email.png';
import axios from 'axios';

const Login = () => {
    
  const [action, setAction] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(""); // Thay username thành name
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const handleLogin = async () => {
    if (!name || !password) {
        alert("Tên và mật khẩu trống, vui lòng nhập!"); 
        return;
      }
    try {
      const response = await axios.get('https://66be10c274dfc195586e78a9.mockapi.io/api/accounts');
      const accounts = response.data;
      
      // Kiểm tra name và mật khẩu từ trường nhập với dữ liệu từ API
      const user = accounts.find(account => account.name === name && account.password === password); // Thay username thành name
      
      if (user) {
        setIsLoggedIn(true); // Đăng nhập thành công
      } else {
        alert("Tên hoặc mật khẩu không chính xác. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra đăng nhập:", error);
    }
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
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> {/* Thay type thành text */}
            </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="submit-container">
            <button className="submit" onClick={handleLogin}>Log In</button>
          <button className="submit">Sign Up</button>
        </div>
      </div>
    );
  }
};

export default Login;