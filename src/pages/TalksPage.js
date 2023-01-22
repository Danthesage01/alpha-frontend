import React, { useEffect, useState } from "react";
import { PageLink } from "../components/PageLink";
import FormRow from "../components/FormRow";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { URL, config } from "../utils/utils";
import Loader from "../components/Loader";

const initialState = {
  title: "",
  speaker: "",
  capacity: "",
};

const TalksPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [talks, setTalks] = useState([]);
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

  const getAllTalks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${URL}/talks`, config);
      setTalks(res.data.talks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
    console.log("deleted", id);
    try {
      const res = await axios.delete(`${URL}/talks/${id}`);
      if (res.data) {
        console.log(res.data, res.data.msg);
        getAllTalks()
      }
    } catch (error) {
      console.log(error)
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
            {talks.map((talk) => {
              const { _id: talkId, title, speaker, capacity } = talk;
              return (
                <div
                  className="single-talk"
                  key={talkId}
                >
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalksPage;
