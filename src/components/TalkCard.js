import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const TalkCard = ({ talk, deleteTalk }) => {
  const { _id: talkId, title, speaker } = talk;
  return (
    <div
      className="single-talk"
      key={talkId}
    >
      <div className="single-talk-content">
        <div>
          <p className="talk-title">{title}</p>
          <p className="talk-speaker">{speaker}</p>
        </div>
        <div
          className="talk-trash"
          onClick={() => deleteTalk(talkId)}
        >
          <FaTrash />
        </div>
      </div>

      <Link
        to={`/talks/${talkId}`}
        className="link-btn"
      >
        Add Attendee
      </Link>
    </div>
  );
};

export default TalkCard;
