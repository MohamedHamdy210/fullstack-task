import { useState } from "react";
import logo from "../assets/HealthTOM-Logo.png";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  
  Box,
} from "@mui/material";

export default function AddExam() {
  const [Image, setImage] = useState(null);
  const navigate = useNavigate();
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
    navigate("/dashboard");
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
  function goHome() {
    navigate("/dashboard");
  }
  function logOut() {
    navigate("/");
  }
  return (
    <>
      <header>
        <img src={logo} alt="" />
        <div className="hbuttons">
          <Button variant="contained" onClick={goHome}>Worklist Page</Button>
          <Button variant="outlined" onClick={logOut}>Log Out</Button>
        </div>
      </header>
      <div className="add">
        <Typography component="h2" variant="h3">
          Add Exam
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="id">Patient ID</label> */}
          <Box>
            <InputLabel>&nbsp;</InputLabel>
            <TextField
              size="small"
              label="Patient ID"
              type="number"
              name="id"
              id="id"
              required
            />
          </Box>
          <Box>
            <InputLabel>&nbsp;</InputLabel>
            <TextField
              size="small"
              label="Name"
              type="text"
              name="name"
              id="name"
              required
            />
          </Box>
          <Box>
            <InputLabel>&nbsp;</InputLabel>

            <FormControl>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                label="gender"
                size="small"
                name="gender"
                id="gender"
                required
                sx={{ width: "222.4px" }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <InputLabel>Birth Date</InputLabel>
            <TextField
              sx={{ width: "222.4px" }}
              size="small"
              type="date"
              name="bd"
              id="bd"
              required
            />
          </Box>

          <Box>
            <InputLabel>&nbsp;</InputLabel>
            <TextField
              size="small"
              label="Email"
              type="email"
              name="email"
              id="email"
              required
            />
          </Box>

          <Box>
            <InputLabel>&nbsp;</InputLabel>
            <FormControl>
              <InputLabel id="typelabel">Type</InputLabel>
              <Select
                sx={{ width: "222.4px" }}
                labelId="typelabel"
                label="Type"
                size="small"
                name="type"
                id="type"
                required
              >
                <MenuItem value="Ct Scan">Ct Scan</MenuItem>
                <MenuItem value="X-Ray">X-Ray</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <label htmlFor="ed">Exam Date</label> */}
          <Box>
            <InputLabel>Exam Date</InputLabel>
            <TextField
              sx={{ width: "222.4px" }}
              size="small"
              type="date"
              name="ed"
              id="ed"
              required
            />
          </Box>
          {/* <label htmlFor="et">Exam Time</label> */}
          <Box>
            <InputLabel>Exam Time </InputLabel>
            <TextField
              sx={{ width: "222.4px" }}
              size="small"
              type="time"
              name="et"
              id="et"
              required
            />
          </Box>
          <Box>
            <InputLabel>&nbsp;</InputLabel>
            <TextField
              size="small"
              label="Comments"
              type="text"
              name="comments"
              id="comments"
            />
          </Box>
          <Box>
            <InputLabel>&nbsp;</InputLabel>
            <FormControl>
              <InputLabel id="statusl">Status</InputLabel>
              <Select
                labelId="statusl"
                label="Status"
                size="small"
                name="status"
                id="status"
                required
                sx={{ width: "222.4px" }}
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Arrived">Arrived</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <label htmlFor="img">Exam Scan</label> */}
          <Box>
            <InputLabel>Exam Scan</InputLabel>

            <TextField
              size="small"
              sx={{ width: "222.4px" }}
              type="file"
              accept="image/*"
              name="img"
              id="img"
              required
              onChange={handleImageChange}
            />
          </Box>

          <Box>
            <InputLabel>&nbsp;</InputLabel>
            <Button  variant="contained" type="submit">
              submit
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
}
