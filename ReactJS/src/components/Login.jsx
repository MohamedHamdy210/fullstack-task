import { useState } from "react";
import logo from "../assets/HealthTOM-Logo.png";
import { useNavigate } from "react-router-dom";

export default function Login(){
 localStorage.removeItem("token")
  const [err, setErr] = useState("")
  const navigate=useNavigate()
  async function  handleSubmit(event) {
    event.preventDefault()
     const formEl = event.currentTarget;
     const formData = new FormData(formEl);
     const username = formData.get("username");
     const password = formData.get("password");
    
      
      const response= await fetch(`http://localhost:5000/api/users/login`,{
      method:"Post",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({username,password})
    })
      .then((res) => res.json())
      
  if(response.token){
    localStorage.setItem("token",response.token)
    navigate("dashboard")
  }else{

    setErr("Invalid username or password")
  }
    
  }
  function register(){
    navigate("/register")
  }
  return (
    <>
      <header>
        <img src={logo} alt="logo" />
        <button onClick={register}>Register</button>
      </header>

      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">username</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="">password</label>
          <input type="password" name="password" id="password" />
          <button>submit</button>
        </form>
        <h4>{err} </h4>
      </div>
    </>
  );
}
