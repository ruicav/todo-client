import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import api from "../api";

export default function NewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="body1">New User</Typography>
        <TextField
          id="email-input"
          placeholder="Name"
          variant="outlined"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
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
            await api.createUser({ name, email, password });
            history.push("/");
          }}
        >
          Create
        </Button>
      </Grid>
    </Box>
  );
}
