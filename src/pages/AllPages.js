import React from "react";
import PageLinkHome from "../components/PageLink";

const AllPages = () => {
  return (
    <div className="homepage">
      <PageLinkHome link="/talks">Click to Add Talks</PageLinkHome>
      <PageLinkHome link="/attendees">Click to add Attendees</PageLinkHome>
      <PageLinkHome link="/attendee-to-talk">Click to add attendees to a talk</PageLinkHome>
    </div>
  );
};

export default AllPages;
