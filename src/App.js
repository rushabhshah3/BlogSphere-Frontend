import React from 'react';
import "./App.css";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
//components
import Login from "./components/account/Login";
import Logout from "./components/account/Logout";
import DataProvider from "./context/DataProvider";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/Update";
import About from "./components/account/About";
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Outlet />
      <Header />
    </>
  ) : (
    <>
      {localStorage.clear()}
      <Navigate replace={true} to="/login" />
    </>
  );
};
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/preview" element={<Home />} />
          </Routes>
          <div style={{ marginTop: "3.5rem" }}>
            <Routes>
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/logout"
                element={<Logout setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/about"
                element={<PrivateRoute isAuthenticated={true} />}
              >
                <Route path="/about" element={<About />} />
              </Route>
               <Route
                path="/"
                element={<PrivateRoute isAuthenticated={true} />}
              >
                <Route path="/" element={<Home />} />
              </Route>   
              <Route
                path="/create"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/create" element={<CreatePost />} />
              </Route>
              <Route
                path="/details/:id"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/details/:id" element={<DetailView />} />
              </Route>
              <Route
                path="/update/:id"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/update/:id" element={<Update />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
