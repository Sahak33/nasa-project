import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Search from "../pages/search/Search";
import Show from "../pages/show/Show";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search" />}></Route>
        <Route path="search" element={<Search/>}></Route>
        <Route path="show" element={<Show/>}></Route>
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;