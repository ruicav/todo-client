import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
  TextField,
  IconButton,
  ListSubheader,
  ButtonGroup,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../api";

export default function Tasklist({
  items,
  handleToggle,
  checked,
  projectId,
  done = false,
  fetchProjects,
}) {
  const [newTask, setNewTask] = useState("");

  const saveTask = async () => {
    await api.createTask({ projectId, description: newTask });
    fetchProjects();
  };

  const Task = ({ task, labelId }) => {
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState(task.description);

    const updateTask = async () => {
      await api.updateTask({ description, id: task.id });
      fetchProjects();
    };

    const deleteTask = async () => {
      await api.deleteTask({ id: task.id });
      fetchProjects();
    };

    return (
      <ListItem
        key={task}
        role="listitem"
        button
        secondaryAction={
          done ? null : (
            <ButtonGroup>
              <IconButton
                disabled={edit}
                onClick={() => {
                  setEdit(!edit);
                }}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                disabled={task.description === description}
                onClick={updateTask}
              >
                <SaveIcon />
              </IconButton>
              <IconButton color="error" onClick={deleteTask}>
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          )
        }
      >
        {!done && (
          <ListItemIcon>
            <Checkbox
              checked={checked.indexOf(task) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{
                "aria-labelledby": labelId,
              }}
              onClick={handleToggle(task)}
            />
          </ListItemIcon>
        )}
        {edit ? (
          <TextField
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            size="small"
          />
        ) : (
          <ListItemText
            id={labelId}
            primary={`${task.description}`}
            secondary={done ? `Done at: ${task.doneAt}` : null}
          />
        )}
      </ListItem>
    );
  };

  return (
    <Paper sx={{ width: 400, height: 330, overflow: "auto" }}>
      <List dense component="div" role="list">
        <ListSubheader>{`${done ? "DONE" : "TO-DO"}`}</ListSubheader>
        {items.map((task) => {
          const labelId = `transfer-list-item-${task.id}-label`;
          return <Task task={task} key={labelId} labelId={labelId} />;
        })}
        {!done && (
          <ListItem>
            <TextField
              placeholder="New Task"
              size="small"
              fullWidth
              value={newTask}
              onChange={(event) => {
                setNewTask(event.target.value);
              }}
            />
            <ListItemIcon>
              <IconButton
                size="small"
                disabled={!newTask}
                onClick={saveTask}
                color="secondary"
              >
                <SaveIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        )}
      </List>
    </Paper>
  );
}
