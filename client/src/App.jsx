import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Project from "./routes/project";
import NavBar from "./components/Navbar";

const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  return (
    <div>
      <NavBar/>
      <Outlet />
    </div>
  );
}
