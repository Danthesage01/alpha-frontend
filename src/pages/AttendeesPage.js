import React, { useState, useEffect } from "react";
import { PageLink } from "../components/PageLink";
import axios from "axios";
import FormRow from "../components/FormRow";
import { URL, config } from "../utils/utils";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import AttendeeCard from "../components/AttendeeCard";

const initialState = {
  name: "",
  email: "",
};
const AttendeesPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [errorMSG, setErrorMSG] = useState("");

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
      setErrorMSG(error.response.data.msg);
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
        toast.success(response.data.msg);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.msg);
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

  const deleteAnAttendee = async (attendeeId) => {
    try {
      if (window.confirm("Are you sure?")) {
        const res = await axios.delete(`${URL}/attendees/${attendeeId}`);
        getAllAttendees();
        toast.success(res.data.msg);
      } else {
        toast.info("You chose to retain this attendee");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
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
          disabled={isLoading && true}
        >
          {isLoading ? "loading..." : "Submit"}
        </button>
      </form>
      <div className="talks-container">
        <h4> All Attendees</h4>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="talks">
            {attendees.length < 1 ? (
              <div className="empty-list">No attendee added yet.</div>
            ) : (
              attendees.map((attendee) => {
                const { _id: attendeeId } = attendee;
                return (
                  <AttendeeCard
                    key={attendeeId}
                    attendee={attendee}
                    deleteAnAttendee={deleteAnAttendee}
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

export default AttendeesPage;
