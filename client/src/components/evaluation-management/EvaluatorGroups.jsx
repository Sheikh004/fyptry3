import React, { useEffect, useContext, useState } from "react";
import {
  getEvaluatorOneGroups,
  getEvaluatorPreGroups,
  getEvaluatorTwoGroups,
  getActiveEvent,
  grade,
} from "../../api/api";
import { ChatContext } from "../../context/ChatProvider";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import EvaluatorNavbar from "../Navbar/EvaluatorNavbar";
function EvaluatorGroups(props) {
  const { user } = useContext(ChatContext);
  const [open, setOpen] = useState(false);
  const [currSId, setCurrId] = useState();
  const [value, setValue] = useState("");
  const [m1, setM1] = useState(0);
  const [m2, setM2] = useState(0);
  const [m3, setM3] = useState(0);
  const [m4, setM4] = useState(0);
  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Remove non-numeric characters from the input value
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setValue(numericValue);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrId();
  };
  const handleGradeClick = (id) => {
    setOpen(true);
    setCurrId(id);
  };

  const handleSubmitGrade = async () => {
    let gr = m1 + m2 + m3 + m4;
    const res = await grade({ sId: currSId, gOne: gr });
    console.log(res);
  };
  const [fypGroups, setFypGroups] = useState();
  useEffect(() => {
    const fetchEvaluatorGroups = async () => {
      // console.log(user);
      const data0 = await getActiveEvent();
      console.log(data0);
      if (data0 && data0.length === 1) {
        if (data0[0].name === "FYP-I") {
          const data1 = await getEvaluatorOneGroups(user.id);
          console.log(data1);
          if (data1 && data1.groupList) {
            setFypGroups(data1.groupList);
          }
        }
        if (data0[0].name === "Pre-FYP") {
          const data2 = await getEvaluatorPreGroups(user.id);
          console.log(data2);
          if (data2 && data2.groupList) {
            setFypGroups(data2.groupList);
          }
        }
        if (data0[0].name === "FYP-II") {
          const data3 = await getEvaluatorTwoGroups(user.id);
          console.log(data3);
          if (data3 && data3.groupList) {
            setFypGroups(data3.groupList);
          }
        }
      }

      // console.log(data0);
    };
    fetchEvaluatorGroups();
  }, []);
  return (
    <div style={{ height: "100%", width: "100%", flex: "100%" }}>
      {/* <EvaluatorNavbar /> */}

      <div
        style={{
          width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" },
          paddingLeft: { xs: "10px", md: "100px" },
          paddingRight: { xs: "10px", md: "100px" },
          paddingTop: "20px",
          paddingBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: 30,
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "bold",
            color: "white",
            backgroundColor: "#28282B",
            borderRadius: "10px",
            padding: "5px",
            marginTop: "20px",
          }}
        >
          Assigned FYP Groups
        </h1>
        {console.log(fypGroups)}
        {fypGroups && (
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Student</th>
                <th>Supervisor</th>
              </tr>
            </thead>
            <tbody>
              {fypGroups.map((group) => (
                <tr key={group.id}>
                  <td>{group.name}</td>
                  <td>
                    <ul>
                      {group.studentID.map((student) => (
                        <li key={student.id}>
                          {student.name}
                          <Button onClick={() => handleGradeClick(student.id)}>
                            Grade
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {group.supervisorId._id && group.supervisorId._id.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ resize: "both", overflow: "auto" }}
      >
        <div
          style={{
            backgroundColor: "lightgrey",
            borderRadius: "10px",
            margin: "40px",

            marginBottom: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Student Presentation Marks</Typography>
          <TextField
            label="Enter Marks"
            onChange={(e) => {
              setM1(parseInt(e.target.value));
            }}
          ></TextField>
          <Typography>Student Report Marks</Typography>\
          <TextField
            label="Enter Marks"
            onChange={(e) => {
              setM2(parseInt(e.target.value));
            }}
          ></TextField>
          <Typography>Student Implementation Marks</Typography>
          <TextField
            label="Enter Marks"
            onChange={(e) => {
              setM3(parseInt(e.target.value));
            }}
          ></TextField>
          <Typography>Student Response Marks</Typography>
          <TextField
            label="Enter Marks"
            onChange={(e) => {
              setM4(parseInt(e.target.value));
            }}
          ></TextField>
          <Button onClick={handleSubmitGrade}>Grade</Button>
        </div>
      </Modal>
    </div>
  );
}

export default EvaluatorGroups;
