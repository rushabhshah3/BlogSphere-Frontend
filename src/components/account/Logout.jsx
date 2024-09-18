import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    setIsAuthenticated(false);
    setTimeout(() => navigate("/"), 3000);
  }, [navigate, setIsAuthenticated]);
  return (
    <>
      <h1>You are successfully logged out.</h1>
      <h2>You will be redirected to login in 3 seconds.</h2>
    </>
  );
};

export default Logout;
