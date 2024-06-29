import React from 'react';
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { API } from "../../service/api";
import logo from "../../public/image/login.jpg";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0, 0, 0, 0.6);
`;
const Image = styled("img")({
  margin: "auto",
  display: "flex",
});
const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 25px 35px;

  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  background-color: rgba(0,0,150,0.8);
  color: #fff;
  text-transform: none;
  border-radius: 2px;
  height: 48px;
`;
const SignUpButton = styled(Button)`
  background-color: #fff;
  color: #2874f0;
  text-transform: none;
  border-radius: 2px;
  height: 48px;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #fff;
  background-color:#000
  font-weight: 600;
`;
const Login = ({ setIsAuthenticated }) => {
  const signupInitialVal = {
    name: "",
    username: "",
    password: "",
  };
  const loginInitialVal = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);
  const [account, toggleAccount] = useState("login");
  const [signup, setSignUp] = useState(signupInitialVal);
  const [login, setLogin] = useState(loginInitialVal);
  const [error, setError] = useState("");
  const toggleState = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };
  const onInputChange = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setError("");
        setSignUp(signupInitialVal);
        toggleAccount("login");
      } else {
        setError("Something went wrong. Please try again later");
      }
    } catch (error) {}
  };
  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (
      response.data.validPassword !== undefined &&
      !response.data.validPassword
    ) {
      setError("Password is not valid");
      return;
    }else if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError("Something went wrong. Please try again later");
    }
  };
  return (
    <Component>
      <Box>
        <Image src={logo} alt="img" width={"100%"} />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              name="username"
              onChange={(e) => onValueChange(e)}
              label="Enter username"
            />
            <TextField
              variant="standard"
              name="password"
              onChange={(e) => onValueChange(e)}
              label="Enter password"
            />
            {error === "Password is not valid" && (
              <div style={{ color: "Red", marginTop: 0 }}>{error}</div>
            )}
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Typography style={{ textAlign: "center", color: "#686868" }}>
              OR
            </Typography>
            <SignUpButton variant="outlined" onClick={() => toggleState()}>
              Create an Account
            </SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              label="Enter name"
              name="name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              label="Enter username"
              name="username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              label="Enter password"
              name="password"
            />
            {error && <Error>{error}</Error>}
            <SignUpButton variant="outlined" onClick={() => signupUser()}>
              Sign Up
            </SignUpButton>
            <Typography style={{ textAlign: "center", color: "#686868" }}>
              OR
            </Typography>
            <LoginButton variant="contained" onClick={() => toggleState()}>
              Already have an account?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
