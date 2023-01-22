import React, {useState} from 'react'
import PageLink from "../components/PageLink";
import FormRow from "../components/FormRow";

const initialState = {
  name: "",
  email: "",
};
const TalkAttendeesPage = () => {
const [formData, setFormData] = useState(initialState);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => {
    return {
      ...prev,
      [name]: value,
    };
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};

return (
  <div>
    <PageLink link="/">Back Home</PageLink>
    <div>
      <form>
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
        >
          Submit
        </button>
      </form>
    </div>
  </div>
);
}

export default TalkAttendeesPage
