import React from "react";
import img from "../assets/not-found.svg";
import PageLinkHome from "../components/PageLink";
const Error = () => {
  return (
    <div
      style={{
        marginTop: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h3 style={{textAlign: "center", marginBottom: "-2rem"}}>Page Not found</h3>
        <PageLinkHome link="/"> Back Home</PageLinkHome>
        <img
          src={img}
          alt="not-found"
          style={{
            marginTop: "2rem",
            width: "90vw",
            maxWidth: "600px",
            display: "block",
            marginBottom: "2rem",
          }}
        />
      </div>
    </div>
  );
};

export default Error;
