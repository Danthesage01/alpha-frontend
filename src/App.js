import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  TalkAttendeesPage,
  AttendeesPage,
  ErrorPage,
  TalksPage,
  AllPages,
} from "./pages";

function App() {
  return (
    <React.Fragment>
      <Router>
        <h2>Welcome to Alpha Gaps Conference</h2>
        <Routes>
          <Route
            path="/"
            element={<AllPages />}
          />
          <Route
            path="/talks"
            element={<TalksPage />}
          />
          <Route
            path="attendee-to-talk"
            element={<TalkAttendeesPage />}
          />
          <Route
            path="attendees"
            element={<AttendeesPage />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
