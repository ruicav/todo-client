import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TaskList from "./TasksList";
import { useAuth } from "../contexts/auth";
import api from "../api";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function Project({ items, fetchProjects, id }) {
  const { user } = useAuth();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(
    [...items].filter((task) => task.status === "PENDING")
  );
  const [right, setRight] = useState(
    [...items].filter((task) => task.status === "DONE")
  );

  const leftChecked = intersection(checked, left);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = async () => {
    await api.updateTasksInBatch({ tasks: leftChecked, status: "DONE" });
    fetchProjects();
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Grid item>
        <TaskList
          items={left}
          handleToggle={handleToggle}
          checked={checked}
          fetchProjects={fetchProjects}
          projectId={id}
        />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Done
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <TaskList
          items={right}
          handleToggle={handleToggle}
          checked={checked}
          done
        />
      </Grid>
    </Grid>
  );
}
