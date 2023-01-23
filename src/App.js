import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  TalkAttendeesPage,
  AttendeesPage,
  ErrorPage,
  TalksPage,
  AllPages,
} from "./pages";
import SharedLayout from "./pages/SharedLayout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SharedLayout />}
        >
          <Route
            index
            element={<AllPages />}
          />
          <Route
            path="talks"
            element={<TalksPage />}
          />
          <Route
            path="talks/:talkId"
            element={<TalkAttendeesPage />}
          />
          <Route
            path="attendees"
            element={<AttendeesPage />}
          />
        </Route>
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={4000}
      />
    </Router>
  );
}

export default App;
