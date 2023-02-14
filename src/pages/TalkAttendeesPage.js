import React, { useEffect, useState } from "react";
import { PageLink } from "../components/PageLink";
import FormRow from "../components/FormRow";
import { useParams } from "react-router-dom";
import { URL, config } from "../utils/utils";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import AtteendeeCard from "../components/AttendeeCard";

const initialState = {
  name: "",
  email: "",
};
const TalkAttendeesPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [singleTalk, setSingleTalk] = useState({});
  const [talkAttendees, setTalkAttendees] = useState([]);
  // eslint-disable-next-line
  const [errorMSG, setErrorMSG] = useState("");
  const { talkId } = useParams();

  const { name, email } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getSingleTalk = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/talks/${talkId}`, config);
      setSingleTalk(res.data.talk);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleTalk();
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  const { title, speaker, capacity, _id: id } = singleTalk;

  const getAllAttendeesToTalk = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/talks/${talkId}/attendees`, config);
      setTalkAttendees(res.data.attendees);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMSG(error.response.data.msg);
    }
  };

  useEffect(() => {
    getAllAttendeesToTalk();
    // eslint-disable-next-line
  }, []);

  const addAttendeeToTalk = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${URL}/talks/${talkId}/attendees`, {
        name,
        email,
      });
      setIsLoading(false);
      if (res.data.status === 201) {
        getAllAttendeesToTalk();
        toast.success(res.data.msg);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAttendeeToTalk();
    setFormData((prev) => {
      return {
        ...prev,
        name: "",
        email: "",
      };
    });
  };

  return (
    <div className="div-wrapper">
      <div className="page-link-wrapper">
        <PageLink link="/talks">Go to Talks</PageLink>
        <PageLink link="/attendees">Go to Attendees</PageLink>
      </div>
      <h4 className="talk-details">Talk Details</h4>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="talk-body">
          <h5>Title: {title}</h5>
          <h5>Speaker: {speaker}</h5>
          <h5>Capacity: {capacity && `${capacity} Available Seats`} </h5>
        </div>
      )}
      <form className="talk-form">
        <h4>Add an attendee to this talk</h4>
        <FormRow
          name="name"
          labelText="Name"
          type="text"
          value={formData.name}
          handleChange={handleChange}
          placeholder="Attendee's name"
          required={true}
        />
        <FormRow
          name="email"
          labelText="Email"
          type="email"
          value={formData.email}
          handleChange={handleChange}
          placeholder="Attendee's email"
          required={true}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn submit-btn"
          disabled={isLoading && true}
        >
          {isLoading ? "loading..." : "Submit"}
        </button>
      </form>
      <div className="talks-container">
        <h4> Talk Attendees</h4>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="talks">
            {talkAttendees.length < 1 ? (
              <div className="empty-list">
                No attendee added to this talk yet.
              </div>
            ) : (
              talkAttendees.map((attendee) => {
                const { _id: attendeeId } = attendee;

                return (
                  <AtteendeeCard
                    key={attendeeId}
                    attendee={attendee}
                  />
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalkAttendeesPage;
