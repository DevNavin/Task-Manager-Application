import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addTask, editTask } from "./redux/taskReducer";

const TaskForm = ({ isOpen, toggle, editData, setEditData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });

  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    const result = {
      ...form,
      created_at: new Date(),
    };

    if (result?.id) {
      dispatch(editTask(result));
    } else {
      result.id = new Date().getTime();
      dispatch(addTask(result));
    }
    setEditData(null);
    toggle();
  };

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {editData ? "Edit" : "Add"} Task
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              type="text"
              onChange={(e) => handleChange("title", e.target.value)}
              value={form.title}
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              id="description"
              type="textarea"
              onChange={(e) => handleChange("description", e.target.value)}
              value={form.description}
            />
          </FormGroup>

          <FormGroup switch>
            <Input
              type="switch"
              checked={form.status === "COMPLETED"}
              onClick={() => {
                handleChange(
                  "status",
                  form.status === "PENDING" ? "COMPLETED" : "PENDING"
                );
              }}
            />
            <Label check>{form?.status}</Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskForm;
