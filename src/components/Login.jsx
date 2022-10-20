import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const history = useHistory();

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <TextField
          id="email-input"
          placeholder="Email"
          variant="outlined"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <TextField
          id="outlined-password-input"
          type="password"
          variant="outlined"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Button
          variant="outlined"
          onClick={async (e) => {
            e.preventDefault();
            await signIn({ email, password });
            history.push("/projects");
          }}
        >
          Log in
        </Button>
        <Link to="/new-user">New User?</Link>
      </Grid>
    </Box>
  );
}
