import { useEffect, useState } from "react";
import logo from "../assets/HealthTOM-Logo.png";
import Model from "./Model";
import { useNavigate } from "react-router-dom";

export default function WorklistPage(){
    const [exams,setExams]=useState([])
    const [model, setModel] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const navigate=useNavigate()          
    useEffect(()=>{
        fetch("http://localhost:5000/api/exams").
        then((res)=>res.json()).then((res)=>setExams(res));
    },[])
    let examsElements=exams.map((ex)=>{
        return (
          <tr
            key={ex.examId}
            onClick={() => {
              setModel(ex);
              setIsVisible(prev=>!prev)
            }}
          >
            <td>{ex.patientId}</td>
            <td>{ex.name}</td>
            <td>{ex.gender}</td>
            <td>{ex.email}</td>
            <td>{ex.birthDate.split(" ")[0]}</td>
            <td>{ex.type}</td>
            <td>{ex.date.split(" ")[0]}</td>
            <td>{ex.time}</td>
            <td>{ex.status}</td>
          </tr>
        );
    })
    
   function handleSearch(event) {
    event.preventDefault()
    const formEl = event.currentTarget
    const formData = new FormData(formEl)
    const id = formData.get("id")
    const name= formData.get("name")
    const date=formData.get("date")
    fetch(`http://localhost:5000/api/exams/search?id=${id}&name=${name}&date=${date}`)
    .then((res)=>res.json()).then((res)=>setExams(res));
    formEl.reset()
   }
   function refersh(){
     fetch("http://localhost:5000/api/exams")
       .then((res) => res.json())
       .then((res) => setExams(res));
   }
  
   function addExam(){
    navigate("/addexam")
   }
   function logOut(){
    navigate("/")
  }
    return (
      <>
        <header>
          <img src={logo} alt="logo" />
          <div className="hbuttons">
            <button onClick={addExam}>Add Exam</button>
            <button onClick={logOut}>Log Out</button>
          </div>
        </header>
        <main>
          <aside>
            <h2>Search</h2>
            <form onSubmit={handleSearch}>
              <label htmlFor="id">Patient ID</label>
              <input type="number" name="id" id="id" />
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
              <label htmlFor="date">Exam Date</label>
              <input type="date" name="date" id="date" />
              <div className="buttons">
                  <button>submit</button>
                  <button onClick={refersh}>refresh</button>
              </div>
            </form>
          </aside>
          <div className="grid">
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Birth date</th>
                  <th>Exam type</th>
                  <th>Exam date</th>
                  <th>Exam Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{examsElements}</tbody>
            </table>
          </div>
        </main>
        {isVisible && <Model model={model} setIsvisiable={setIsVisible} />}
      </>
    );
}