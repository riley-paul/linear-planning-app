import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  return (
    <div>
      <h1>Pipeline Project</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/projects">Projects</Link> |{" "}
        <Link to="/centerlines">Centerlines</Link>
      </nav>
      <Outlet />
    </div>
  );
}
