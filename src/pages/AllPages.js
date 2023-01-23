import React from "react";
import PageLinkHome from "../components/PageLink";

const AllPages = () => {
  return (
    <div className="homepage">
      <PageLinkHome link="/talks">Click to Add Talks</PageLinkHome>
      <PageLinkHome link="/attendees">Click to Add Attendees</PageLinkHome>
    </div>
  );
};

export default AllPages;
