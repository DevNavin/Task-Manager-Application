import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Input, Label, FormGroup } from "reactstrap";
import TaskForm from "./TaskForm";
import moment from "moment";
import { deleteTask, editTask, sortTask } from "./redux/taskReducer";
import classNames from "classnames";

function App() {
  const [modal, setModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [field, setField] = useState("");

  const dispatch = useDispatch();
  const { taskData } = useSelector((state) => ({
    taskData: state.taskData.data,
  }));

  const toggle = () => setModal(!modal);

  const handleEdit = (data) => {
    setEditData(data);
    toggle();
  };

  const handleStatus = (id, status) => {
    setField('')
    const result = taskData.find((d) => d.id === id);
    dispatch(editTask({ ...result, status }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask({ id }));
  };

  const handleSort = (e) => {
    setField(e.target.value);
    dispatch(sortTask({ field: e.target.value }));
  };

  useEffect(() => {
    setTableData(taskData);
  }, [taskData]);

  return (
    <div className="App">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="sort-by mr-2">Sort By :</div>
          <select class="form-control ml-2" value={field} onChange={handleSort}>
            <option value="">Select an Option</option>
            <option value="status">Status</option>
            <option value="created_at">Created date</option>
          </select>
        </div>
        <Button color="primary" onClick={toggle}>
          Add New Task
        </Button>
      </div>

      <div className="mt-5">
        {tableData.length > 0 &&
          tableData.map((data, _id) => (
            <Row
              className={classNames("task-list-card", {
                "border-red": data.status === "PENDING",
                "border-green": data.status === "COMPLETED",
              })}
              key={_id}
            >
              <Col className="" xs="2">
                {data?.title}
              </Col>
              <Col className="" xs="4">
                {data?.description}
              </Col>
              <Col className="" xs="2">
                {moment(data?.created_at).format("DD/MM/YYYY hh:mm a")}
              </Col>
              <Col className="" xs="2">
                <div className="d-flex justify-content-between">
                  <FormGroup switch>
                    <Input
                      type="switch"
                      checked={data.status === "COMPLETED"}
                      onClick={() => {
                        handleStatus(
                          data?.id,
                          data.status === "PENDING" ? "COMPLETED" : "PENDING"
                        );
                      }}
                    />
                    <Label className="ml-2" check>
                      {data?.status}
                    </Label>
                  </FormGroup>
                </div>
              </Col>
              <Col className="" xs="2">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => handleEdit(data)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(data?.id)}
                  >
                    Delete
                  </button>
                </div>
              </Col>
            </Row>
          ))}
      </div>

      {modal && (
        <TaskForm
          isOpen={modal}
          toggle={toggle}
          editData={editData}
          setEditData={setEditData}
        />
      )}
    </div>
  );
}

export default App;
