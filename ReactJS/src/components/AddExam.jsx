import { useState } from "react";
import logo from "../assets/HealthTOM-Logo.png";
import { useNavigate } from "react-router-dom";



export default function AddExam() {
  const [Image, setImage] = useState(null);
  const navigate=useNavigate()
  function handleSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const Id = parseInt(formData.get("id"));
    const Name = formData.get("name");
    const Gender = formData.get("gender");
    const BirthDate = formData.get("bd");
    const Email = formData.get("email");
    const Type = formData.get("type");
    const Date = formData.get("ed");
    const Time = formData.get("et");
    const Comments = formData.get("comments");
    const Status = formData.get("status");

    fetch("http://localhost:5000/api/exams/addExam", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id,
        Name,
        Gender,
        BirthDate,
        Email,
        Type,
        Date,
        Time,
        Comments,
        Status,
        Img: Image,
      }),
    });
    formEl.reset();
    navigate("/dashboard")
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertImageToBase64(file);
    }
  };
  const convertImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace(/[\r\n]/g, "")
        .replace("data:", "")
        .replace(/^.+,/, "");
      setImage(base64String);
      
    };
    reader.readAsDataURL(file);
  };
  function goHome(){
    navigate("/dashboard");

  }
  function logOut(){
    navigate("/")
  }
  return (
    <>
      <header>
        <img src={logo} alt="" />
        <div className="hbuttons">
          <button onClick={goHome}>Worklist Page</button>
          <button onClick={logOut}>Log Out</button>
        </div>
      </header>
      <div className="add">
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">Patient ID</label>
          <input type="number" name="id" id="id" />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label htmlFor="bd">Birth Date</label>
          <input type="date" name="bd" id="bd" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="CT scan">CT Scan</option>
            <option value="X-ray Scan">X-ray Scan</option>
          </select>
          <label htmlFor="ed">Exam Date</label>
          <input type="date" name="ed" id="ed" />
          <label htmlFor="et">Exam Time</label>
          <input type="time" name="et" id="et" />
          <label htmlFor="comments">comments</label>
          <input type="text" name="comments" id="comments" />
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="Scheduled">Scheduled</option>
            <option value="Arrived">Arrived</option>
            <option value="Canceled">Canceled</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="img">Exam Scan</label>
          <input
            type="file"
            accept="image/*"
            name="img"
            id="img"
            onChange={handleImageChange}
          />
          <button>submit</button>
        </form>
      </div>
    </>
  );
}
