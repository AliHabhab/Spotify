import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Login from "../component/Login";
import Search from "../component/Search";
import Artist from "../component/Artist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/artist/:artistId" element={<Artist />}></Route>
    </>
  )
);
export default router;
