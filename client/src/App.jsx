import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Project from "./routes/project";

const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  return (
    <Project/>
    // <div>
    //   <h1>Linear Project Planning</h1>
    //   <nav>
    //     <Link to="/projects">Projects</Link>
    //   </nav>
    //   <Outlet />
    // </div>
  );
}
