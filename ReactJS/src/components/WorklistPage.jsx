import { useEffect, useState } from "react";
import logo from "../assets/HealthTOM-Logo.png";
import Model from "./Model";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";

export default function WorklistPage() {
  const [exams, setExams] = useState([]);
  const [model, setModel] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/exams")
      .then((res) => res.json())
      .then((res) => setExams(res));
  }, []);
  let examsElements = exams.map((ex) => {
    return (
      <TableRow
        key={ex.examId}
        onClick={() => {
          setModel(ex);
          setIsVisible((prev) => !prev);
        }}
      >
        <TableCell align="center">{ex.patientId}</TableCell>
        <TableCell align="center">{ex.name}</TableCell>
        <TableCell align="center">{ex.gender}</TableCell>
        <TableCell align="center">{ex.email}</TableCell>
        <TableCell align="center">{ex.birthDate.split(" ")[0]}</TableCell>
        <TableCell align="center">{ex.type}</TableCell>
        <TableCell align="center">{ex.date.split(" ")[0]}</TableCell>
        <TableCell align="center">{ex.time}</TableCell>
        <TableCell align="center">{ex.status}</TableCell>
      </TableRow>
    );
  });

  function handleSearch(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const id = formData.get("id");
    const name = formData.get("name");
    const date = formData.get("date");
    fetch(
      `http://localhost:5000/api/exams/search?id=${id}&name=${name}&date=${date}`
    )
      .then((res) => res.json())
      .then((res) => setExams(res));
    formEl.reset();
  }
  function refersh() {
    fetch("http://localhost:5000/api/exams")
      .then((res) => res.json())
      .then((res) => setExams(res));
  }

  function addExam() {
    navigate("/addexam");
  }
  function logOut() {
    navigate("/");
  }
  return (
    <>
      <header>
        <img src={logo} alt="logo" />
        <div className="hbuttons">
          <Button variant="contained" onClick={addExam}>
            Add Exam
          </Button>
          <Button variant="outlined " onClick={logOut}>
            Log Out
          </Button>
        </div>
      </header>
      <main>
        <aside>
          <Typography component="h2" variant="h4">
            Search
          </Typography>
          <form onSubmit={handleSearch}>
            <TextField
              label="Patient ID"
              size="small"
              variant="standard"
              type="number"
              name="id"
              id="id"
              fullWidth
            />
            <TextField
              label=" Name"
              size="small"
              variant="standard"
              type="text"
              name="name"
              id="name"
              fullWidth
            />
            <TextField
              size="small"
              sx={{ mt: 2 }}
              variant="standard"
              type="date"
              name="date"
              id="date"
              fullWidth
            />
            <div className="buttons">
              <Button variant="contained" type="submit">
                submit
              </Button>
              <Button variant="contained" onClick={refersh}>
                refresh
              </Button>
            </div>
          </form>
        </aside>
        <div className="grid">
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Patient ID</TableCell>
                  <TableCell align="center">Patient Name</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Birth Date</TableCell>
                  <TableCell align="center">Exam Type</TableCell>
                  <TableCell align="center">Exam Date</TableCell>
                  <TableCell align="center">Exam Time</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{examsElements}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
      {isVisible && <Model model={model} setIsvisiable={setIsVisible} />}
    </>
  );
}
