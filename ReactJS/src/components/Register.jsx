import { useState } from "react";
import logo from "../assets/HealthTOM-Logo.png";
import { useNavigate } from "react-router-dom";
import { Button, Typography,TextField } from "@mui/material";
export default function Register() {
  localStorage.removeItem("token");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch(`http://localhost:5000/api/users/register`,{
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    ).then((res) => res.json());

    if (response.token) {
      alert(response.message)
      localStorage.setItem("token",response.token)
      navigate("/dashboard");
    } else {
      setErr("Invalid username or password");
    }
  }
  function login(){
    navigate('/')
  }
  return (
    <>
      <header>
        <img src={logo} alt="logo" />
        <Button variant="outlined" onClick={login}>Login</Button>
      </header>

      <div className="login">
        <Typography variant="h2" component="h1">
          Register
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ m: 2 }}
            variant="outlined"
            size="small"
            label="Username"
            type="text"
            name="username"
            id="username"
            fullWidth
            required
            error={err ? true : false}
          />
          <TextField
            sx={{ m: 1 }}
            type="password"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            label="Password"
            fullWidth
            required
            error={err ? true : false}
            helperText={" " + err}
          />
          <Button type="submit" sx={{ m: 2 }} variant="contained">
            submit
          </Button>
        </form>
        {/* <h4>{err} </h4> */}
      </div>
    </>
  );
}
