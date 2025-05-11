import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Notes from "./pages/Notes/Notes";
import NotesDetail from "./pages/Notes/NotesDetail";
import { useAuth } from "./AuthContext";

const App = () => {
  const { user } = useAuth(); // <-- This will trigger re-creation of router on user change

  const router = React.useMemo(() =>
    createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notes/:id" element={<NotesDetail />} />
        </Route>
      )
    )
  , [user?.uid]); // <-- Re-create router when user changes

  return (
    <RouterProvider router={router} />
  );
};

export default App;