import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import RootLayout from "./Components/Layouts/RootLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/auth/LoginPage.jsx";
import { Provider } from "react-redux";
import { store } from "./apps/store.js";
import Profile from "./pages/Profile";
import Userpf from "./pages/Userpf";
import OnProgessPage from "./pages/OnProgessPage.jsx";
import RootLayoutv2 from "./Components/Layouts/RootLayoutv2.jsx";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<App />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path = "/profile" element={<Profile/>}/>
          <Route path={"/userpf"} element={<Userpf/>}/>

<<<<<<< HEAD
                <Route path={"/homepage"} element={<HomePage/>}/>
                <Route path={"/progess"} element={<OnProgessPage/>}/>
                <Route path={"/about"} element={<AboutUs/>}/>


            </Route>
            <Route path={"/"} element={<RootLayoutv2/>}>
           <Route path = "/profile" element={<Profile/>}/>
            <Route path={"/userpf"} element={<Userpf/>}></Route>
                <Route path={"/progess"} element={<OnProgessPage/>}/>
            </Route>
            <Route path="login" element={<LoginPage/>}/>
        </Routes>
=======
        </Route>
        <Route path="/" element={<RootLayoutv2/>}>
          <Route path="/progess" element={<OnProgessPage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
