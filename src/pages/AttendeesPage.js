import React, { useState, useEffect } from "react";
import { PageLink } from "../components/PageLink";
import axios from "axios";
import FormRow from "../components/FormRow";
import { FaTrash } from "react-icons/fa";
import { URL, config } from "../utils/utils";
import Loader from "../components/Loader";

const initialState = {
  name: "",
  email: "",
};
const AttendeesPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getAllAttendees = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/attendees`, config);
      setAttendees(res.data.attendees);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAttendees();
  }, []);

  const addNewAttendee = async () => {
    setIsLoading(true);
    try {
      const { name, email } = formData;
      const response = await axios.post(`${URL}/attendees`, {
        name,
        email,
      });
      setIsLoading(false);
      if (response.data.status === 201) {
        getAllAttendees();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewAttendee();
    setFormData((prev) => {
      return {
        ...prev,
        name: "",
        email: "",
      };
    });
  };

  const deleteAnAttendee = async (id) => {
    console.log("I am deleting you", id);
      try {
      const res = await axios.delete(`${URL}/attendees/${id}`);
      if (res.data) {
        console.log(res.data, res.data.msg);
        getAllAttendees()
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <PageLink link="/">Back Home</PageLink>
      <form className="talk-form">
        <h4>Add an attendee</h4>
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
        >
          Submit
        </button>
      </form>
      <div className="talks-container">
        <h4> All Attendees</h4>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="talks">
            {attendees.map((attendee) => {
              const { _id: attendeeId, name, email } = attendee;
              return (
                <div
                  className="single-talk"
                  key={attendeeId}
                >
                  <div>
                    <p className="talk-title">{name}</p>
                    <p className="talk-speaker">{email}</p>
                  </div>
                  <div
                    className="talk-trash"
                    onClick={() => deleteAnAttendee(attendeeId)}
                  >
                    <FaTrash />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeesPage;
