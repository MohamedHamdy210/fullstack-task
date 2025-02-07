import { useState } from "react";
import logo from "../assets/HealthTOM-Logo.png";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

export default function Login() {
  localStorage.removeItem("token");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch(`http://localhost:5000/api/users/login`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());

    if (response.token) {
      localStorage.setItem("token", response.token);
      navigate("dashboard");
    } else {
      setErr("Invalid username or password");
    }
  }
  function register() {
    navigate("/register");
  }
  return (
    <>
      <header>
        <img src={logo} alt="logo" />
        <Button variant="outlined" onClick={register}>
          Register
        </Button>
      </header>

      <div className="login">
        <Typography variant="h2" component="h1">
          Sign in
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
      </div>
    </>
  );
}
