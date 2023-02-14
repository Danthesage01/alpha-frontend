import React from "react";
import { FaTrash } from "react-icons/fa";

const AttendeeCard = ({ attendee, deleteAnAttendee }) => {
  const { _id: attendeeId, name, email, talkTitle } = attendee;
  return (
    <div
      className="single-attendee"
      key={attendeeId}
    >
      <div>
        {deleteAnAttendee && (
          <p className="attendee-title">{talkTitle && `${talkTitle}`}</p>
        )}
        <p className="attendee-name">{name}</p>
        <p className="attendee-email">{email}</p>
      </div>
      {deleteAnAttendee && (
        <div
          className="talk-trash"
          onClick={() => deleteAnAttendee(attendeeId)}
        >
          <FaTrash />
        </div>
      )}
    </div>
  );
};

export default AttendeeCard;
