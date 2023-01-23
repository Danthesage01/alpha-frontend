import React, { useEffect, useState } from "react";
import { PageLink } from "../components/PageLink";
import FormRow from "../components/FormRow";
import axios from "axios";
import { URL, config } from "../utils/utils";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import TalkCard from "../components/TalkCard";

const initialState = {
  title: "",
  speaker: "",
  capacity: "",
};

const TalksPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [talks, setTalks] = useState([]);
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

  const getAllTalks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/talks`, config);
      setTalks(res.data.talks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMSG(error.response.data.msg);
    }
  };

  useEffect(() => {
    getAllTalks();
  }, []);

  const addNewTalk = async () => {
    setIsLoading(true);
    try {
      const { title, speaker, capacity } = formData;
      const response = await axios.post(`${URL}/talks`, {
        title,
        speaker,
        capacity,
      });
      setIsLoading(false);
      if (response.data.status === 201) {
        getAllTalks();
        toast.success(response.data.msg);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTalk();
    setFormData((prev) => {
      return {
        ...prev,
        title: "",
        speaker: "",
        capacity: "",
      };
    });
  };

  const deleteTalk = async (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        const res = await axios.delete(`${URL}/talks/${id}`);
        getAllTalks();
        toast.success(res.data.msg);
      } else {
        toast.info("You chose to retain this talk");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div>
      <PageLink link="/">Back Home</PageLink>
      <form className="talk-form">
        <h4>Add a talk</h4>
        <FormRow
          name="title"
          labelText="Title"
          type="text"
          value={formData.title}
          handleChange={handleChange}
          placeholder="Talk title"
          required={true}
        />
        <FormRow
          name="speaker"
          labelText="Speaker"
          type="text"
          value={formData.speaker}
          handleChange={handleChange}
          placeholder="Speaker's name"
          required={true}
        />
        <FormRow
          name="capacity"
          labelText="Capacity"
          type="number"
          value={formData.capacity}
          handleChange={handleChange}
          placeholder="Available seats capacity"
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
        <h4> All Talks</h4>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="talks">
            {talks.length < 1 ? (
              <div className="empty-list">No talk added yet.</div>
            ) : (
              talks.map((talk) => {
                const { _id: talkId } = talk;
                return (
                  <TalkCard
                    key={talkId}
                    talk={talk}
                    deleteTalk={deleteTalk}
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

export default TalksPage;
