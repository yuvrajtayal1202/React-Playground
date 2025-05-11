import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import reactDOM from "react-dom/client";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Notes from "./pages/Notes/Notes";
import NotesDetail from "./pages/Notes/NotesDetail";

const App = () => {
    
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:id" element={<NotesDetail />} />
      </Route>
    )
  );


  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
