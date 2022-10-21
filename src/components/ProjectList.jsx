import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  TextField,
  IconButton,
  ButtonGroup,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Project from "./Project";
import api from "../api";
import { useHistory } from "react-router-dom";

export default function ProjectList() {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");

  const fetchProjects = async () => {
    const { data } = await api.getProjects();
    setProjects(data);
  };

  const saveProject = async () => {
    await api.createProject({ name: newProject });
    setNewProject("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const ProjectItem = ({ project }) => {
    const [name, setName] = useState(project.name);
    const [edit, setEdit] = useState(false);

    const editProject = async () => {
      await api.updateProject({ name, id: project.id });
      fetchProjects();
    };

    const deleteProject = async () => {
      await api.deleteProject({ id: project.id });
      fetchProjects();
    };

    return (
      <Grid item>
        <TextField
          value={name}
          fullWidth
          margin="dense"
          disabled={!edit}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <ButtonGroup fullWidth>
          <IconButton aria-label="delete" color="error" onClick={deleteProject}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => {
              setEdit(!edit);
            }}
            disabled={edit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="save"
            color="secondary"
            disabled={project.name === name}
            onClick={editProject}
          >
            <SaveIcon />
          </IconButton>
        </ButtonGroup>
        <Project
          key={`project-${project.id}`}
          items={project.tasks}
          id={project.id}
          fetchProjects={fetchProjects}
        />
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            position="static"
            onClick={() => {
              localStorage.removeItem("todo:token");
              history.push("/");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Paper>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {projects.map((project) => (
            <ProjectItem project={project} key={`project-item-${project.id}`} />
          ))}
          <Grid item>
            <TextField
              placeholder="Create new project"
              value={newProject}
              fullWidth
              margin="dense"
              onChange={(event) => {
                setNewProject(event.target.value);
              }}
            />
            <IconButton
              aria-label="save"
              color="primary"
              disabled={!newProject}
              onClick={saveProject}
            >
              <SaveIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
