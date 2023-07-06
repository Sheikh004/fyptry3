import { Box, Typography, Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getUnAssignedGroupsOne,
  getUnAssignedPreGroups,
  getUnAssignedGroupsTwo,
  getEvaluatorsOne,
  getEvaluatorsTwo,
  getPreEvaluators,
  assignGroupOne,
  unassignGroupOne,
  assignPreGroup,
  unassignPreGroup,
  assignGroupTwo,
  unassignGroupTwo,
  getActiveEvent,
} from "../../api/api";

function EvaluatorManagement(props) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [evaluatorsOneList, setEvaluatorsOneList] = useState();
  const [evaluatorsPreList, setEvaluatorsPreList] = useState();
  const [evaluatorsTwoList, setEvaluatorsTwoList] = useState();
  const [unassignedGroupsOneList, setUnassignedGroupsOneList] = useState();
  const [unassignedGroupsPreList, setUnassignedGroupsPreList] = useState();
  const [unassignedGroupsTwoList, setUnassignedGroupsTwoList] = useState();
  const [eventName, setEventName] = useState();
  const [currentGroup, setCurrentGroup] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const checkEvent = async () => {
      const event = await getActiveEvent();
      if (event.length === 1) {
        // console.log(event[0].name);
        setEventName(event[0].name);
      }
    };
    checkEvent();
  }, []);

  useEffect(() => {
    const getEvaluationData = async () => {
      let eOne = await getEvaluatorsOne();
      let ePre = await getPreEvaluators();
      let eTwo = await getEvaluatorsTwo();
      if (eOne) {
        eOne.sort((a, b) => {
          return a.groupList.length - b.groupList.length;
        });
        setEvaluatorsOneList(eOne);
      }

      if (ePre) {
        ePre.sort((a, b) => {
          return a.groupList.length - b.groupList.length;
        });
        setEvaluatorsPreList(ePre);
      }
      // console.log(eOne);
      //   console.log(eTwo);
      //   console.log(ePre);
      if (eTwo) {
        eTwo.sort((a, b) => {
          return a.groupList.length - b.groupList.length;
        });
        setEvaluatorsTwoList(eTwo);
      }

      let unOne = await getUnAssignedGroupsOne();
      let unPre = await getUnAssignedPreGroups();
      let unTwo = await getUnAssignedGroupsTwo();
      console.log(unOne);
      //   console.log(unPre);
      //   console.log(unTwo);
      setUnassignedGroupsOneList(unOne);
      setUnassignedGroupsPreList(unPre);
      setUnassignedGroupsTwoList(unTwo);
    };
    getEvaluationData();
  }, [check]);

  const handleOpen1 = (group) => {
    setOpen1(true);
    setCurrentGroup(group);
  };

  const handleOpen2 = (group) => {
    setOpen2(true);
    setCurrentGroup(group);
  };

  const handleOpen3 = (group) => {
    setOpen3(true);
    setCurrentGroup(group);
  };

  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    height: "90%",
    pt: 2,
    px: 4,
    pb: 3,
    overflowY: "auto",
  };

  const unAssignGroup = async (gid, e_Id) => {
    const data = await unassignGroupOne(gid, e_Id);
    console.log(data);
    if (data) setCheck(!check);
  };

  const handleAssignOne = async (gid, e_Id) => {
    const data = await assignGroupOne(gid, e_Id);
    console.log(data);
    if (data) setCheck(!check);
  };

  const unAssignGroupPre = async (gid, e_Id) => {
    const data = await unassignPreGroup(gid, e_Id);
    console.log(data);
    if (data) setCheck(!check);
  };

  const handleAssignPre = async (gid, e_Id) => {
    const data = await assignPreGroup(gid, e_Id);
    console.log(data);
    if (data) setCheck(!check);
  };
  const unAssignGroupTwo = async (gid, e_Id) => {
    const data = await unassignGroupTwo(gid, e_Id);
    console.log(data);
    if (data) setCheck(!check);
  };

  const handleAssignTwo = async (gid, e_Id) => {
    const data = await assignGroupTwo(gid, e_Id);
    console.log(data);
    if (data) setCheck(!check);
  };

  return (
    <Box>
      {eventName && eventName === "FYP-I" && (
        <Box>
          {/* {console.log(evaluatorsOneList[1]._id.name)} */}
          <Box textAlign={"center"}>
            <h1>Evaluation 1</h1>
          </Box>

          <h2
            style={{
              fontSize: 30,
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              backgroundColor: "green",
              borderRadius: "10px",
              padding: "5px",
              marginTop: "20px",
            }}
          >
            Assigned group
          </h2>
          <table>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "23%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Evaluator</th>
                <th>Assigned Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {evaluatorsOneList &&
                evaluatorsOneList.map((evaluator) => {
                  if (evaluator.groupList.length > 0) {
                    return evaluator.groupList.map((group, index) => (
                      <tr key={`assigned-group-${index}`}>
                        <td>{evaluator._id.name}</td>
                        <td>{group.name}</td>
                        <td>
                          <button
                            onClick={() =>
                              unAssignGroup(group._id, evaluator._id._id)
                            }
                            style={{
                              fontWeight: "bold",
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                              padding: "8px 16px",
                            }}
                          >
                            Unassign
                          </button>
                        </td>
                      </tr>
                    ));
                  }
                })}
            </tbody>
          </table>
          <h2
            style={{
              fontSize: 30,
              textAlign: "center",
              marginBottom: "10px",
              fontFamily: "bold",
              color: "white",
              backgroundColor: "red",
              borderRadius: "10px",
              padding: "5px",
              marginTop: "20px",
            }}
          >
            Unassigned groups
          </h2>
          <table>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Group</th>
                <th>Interests</th>
                <th>Fields</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unassignedGroupsOneList &&
                unassignedGroupsOneList.map((group, index) => (
                  <tr key={`unassigned-group-${index}`}>
                    <td>{group.gName.name}</td>
                    <td>{group.aInterest.join(", ")}</td>
                    <td>{group.dArea.join(", ")}</td>
                    <td>
                      <button
                        onClick={() => handleOpen1(group)}
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "GREEN",
                          color: "white",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                          padding: "8px 16px",
                        }}
                      >
                        Assign Group
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>
      )}
      {eventName && eventName === "Pre-FYP" && (
        <Box>
          <Box textAlign={"center"}>
            <h1>Pre Evaluation</h1>
          </Box>

          <Box>
            <h2
              style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "bold",
                color: "white",
                backgroundColor: "green",
                borderRadius: "10px",
                padding: "5px",
                marginTop: "20px",
              }}
            >
              Assigned group
            </h2>
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "23%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Evaluator Name</th>
                  <th>Assigned Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {evaluatorsPreList &&
                  evaluatorsPreList.map((evaluator) => {
                    if (evaluator.groupList.length > 0) {
                      return evaluator.groupList.map((group) => (
                        <tr key={group._id}>
                          <td>{evaluator._id.name}</td>
                          <td>{group.name}</td>
                          <td>
                            <Button
                              onClick={() => {
                                unAssignGroupPre(group._id, evaluator._id._id);
                              }}
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: "8px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                padding: "8px 16px",
                              }}
                            >
                              Unassign
                            </Button>
                          </td>
                        </tr>
                      ));
                    }
                  })}
              </tbody>
            </table>
          </Box>

          <Box>
            <h2
              style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "bold",
                color: "white",
                backgroundColor: "red",
                borderRadius: "10px",
                padding: "5px",
                marginTop: "20px",
              }}
            >
              Unassigned groups
            </h2>
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Area of Interest</th>
                  <th>Domain Area</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {unassignedGroupsPreList &&
                  unassignedGroupsPreList.map((group) => (
                    <tr key={group._id}>
                      <td>{group.gName.name}</td>
                      <td>{group.aInterest.join(", ")}</td>
                      <td>{group.dArea.join(", ")}</td>
                      <td>
                        <Button
                          onClick={() => handleOpen2(group)}
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "GREEN",
                            color: "white",
                            borderRadius: "8px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            padding: "8px 16px",
                          }}
                        >
                          Assign Group
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
      {eventName && eventName === "FYP-II" && (
        <Box>
          {/* {console.log(evaluatorsOneList[1]._id.name)} */}
          <Box textAlign={"center"}>
            <h1>Final Evaluation</h1>
          </Box>

          <Box>
            <h2
              style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "bold",
                color: "white",
                backgroundColor: "green",
                borderRadius: "10px",
                padding: "5px",
                marginTop: "20px",
              }}
            >
              Assigned group
            </h2>
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "23%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Evaluator Name</th>
                  <th>Assigned Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {evaluatorsTwoList &&
                  evaluatorsTwoList.map((evaluator) => {
                    if (evaluator.groupList.length > 0) {
                      return evaluator.groupList.map((group) => (
                        <tr key={group._id}>
                          <td>{evaluator._id.name}</td>
                          <td>{group.name}</td>
                          <td>
                            <Button
                              onClick={() => {
                                unAssignGroupTwo(group._id, evaluator._id._id);
                              }}
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "GREEN",
                                color: "white",
                                borderRadius: "8px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                padding: "8px 16px",
                              }}
                            >
                              Unassign
                            </Button>
                          </td>
                        </tr>
                      ));
                    }
                  })}
              </tbody>
            </table>
          </Box>

          <Box>
            <h2
              style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "bold",
                color: "white",
                backgroundColor: "red",
                borderRadius: "10px",
                padding: "5px",
                marginTop: "20px",
              }}
            >
              UnAssigned group
            </h2>
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Area of Interest</th>
                  <th>Domain Area</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {unassignedGroupsTwoList &&
                  unassignedGroupsTwoList.map((group) => (
                    <tr key={group._id}>
                      <td>{group.gName.name}</td>
                      <td>
                        {group.aInterest.map((interest) => (
                          <Typography key={interest}>{interest}</Typography>
                        ))}
                      </td>
                      <td>
                        {group.dArea.map((field) => (
                          <Typography key={field}>{field}</Typography>
                        ))}
                      </td>
                      <td>
                        <Button
                          onClick={() => handleOpen3(group)}
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "GREEN",
                            color: "white",
                            borderRadius: "8px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            padding: "8px 16px",
                          }}
                        >
                          Assign Group
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
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
            Lecturers
          </h2>
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                {/* Column Labels */}
                <th>Name</th>
                <th>Title</th>
                <th>Assigned</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {evaluatorsOneList &&
                evaluatorsOneList.map((evaluator) => {
                  {
                    return (
                      evaluator._id._id !== currentGroup?.gName.supervisorId &&
                      evaluator._id.title === "Lecturer" && (
                        <tr key={evaluator._id._id}>
                          {/* Column: Evaluator Name */}
                          <td>{evaluator._id.name}</td>

                          {/* Column: Evaluator Title */}
                          <td>{evaluator._id.title}</td>

                          {/* Column: Total Number of Assigned Groups */}
                          <td>{evaluator.groupList.length}</td>

                          {/* Column: Area of Interest */}
                          <td>
                            {evaluator._id.areaOfInterest.map((interest) => {
                              return <p key={interest}>{interest}</p>;
                            })}
                          </td>

                          {/* Column: Development Field */}
                          <td>
                            {evaluator._id.developmentField.map((field) => {
                              return <p key={field}>{field}</p>;
                            })}
                          </td>

                          {/* Column: Assign Button */}
                          <td>
                            <Button
                              onClick={() => {
                                handleAssignOne(
                                  currentGroup.gId,
                                  evaluator._id._id
                                );
                              }}
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "Green",
                                color: "white",
                                borderRadius: "8px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                padding: "8px 16px",
                              }}
                            >
                              Assign
                            </Button>
                          </td>
                        </tr>
                      )
                    );
                  }
                })}
            </tbody>
          </table>

          <div>
            <h2
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
              Assistant Professors
            </h2>

            <table style={{ color: "black" }}>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  {/* Column Labels */}
                  <th>Name</th>
                  <th>Title</th>
                  <th>Assigned </th>
                  <th>Area of Interest</th>
                  <th>Development Field</th>
                  <th>Assign</th>
                </tr>
              </thead>
              <tbody>
                {evaluatorsOneList &&
                  evaluatorsOneList.map((evaluator) => {
                    {
                      return (
                        evaluator._id._id !==
                          currentGroup?.gName.supervisorId &&
                        evaluator._id.title === "Assistant Professor" && (
                          <tr key={evaluator._id._id}>
                            {/* Column: Evaluator Name */}
                            <td>{evaluator._id.name}</td>

                            {/* Column: Evaluator Title */}
                            <td>{evaluator._id.title}</td>

                            {/* Column: Total Number of Assigned Groups */}
                            <td>{evaluator.groupList.length}</td>

                            {/* Column: Area of Interest */}
                            <td>
                              {evaluator._id.areaOfInterest.map((interest) => {
                                return <p key={interest}>{interest}</p>;
                              })}
                            </td>

                            {/* Column: Development Field */}
                            <td>
                              {evaluator._id.developmentField.map((field) => {
                                return <p key={field}>{field}</p>;
                              })}
                            </td>

                            {/* Column: Assign Button */}
                            <td>
                              <Button
                                onClick={() => {
                                  handleAssignOne(
                                    currentGroup.gId,
                                    evaluator._id._id
                                  );
                                }}
                                style={{
                                  fontWeight: "bold",
                                  backgroundColor: "Green",
                                  color: "white",
                                  borderRadius: "8px",
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                  padding: "8px 16px",
                                }}
                              >
                                Assign
                              </Button>
                            </td>
                          </tr>
                        )
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
          <div>
            {/* Heading: PHD Assistant Professors */}
            <h2
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
              PHD Assistant Professors
            </h2>

            {/* Table for PHD Assistant Professors */}
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  {/* Column Labels */}
                  <th>Name</th>
                  <th>Title</th>
                  <th>Assigned</th>
                  <th>Area of Interest</th>
                  <th>Development Field</th>
                  <th>Assign</th>
                </tr>
              </thead>
              <tbody>
                {evaluatorsOneList &&
                  evaluatorsOneList.map((evaluator) => {
                    {
                      return (
                        evaluator._id._id !==
                          currentGroup?.gName.supervisorId &&
                        evaluator._id.title === "PHD Assistant Professor" && (
                          <tr key={evaluator._id._id}>
                            {/* Column: Evaluator Name */}
                            <td>{evaluator._id.name}</td>

                            {/* Column: Evaluator Title */}
                            <td>{evaluator._id.title}</td>

                            {/* Column: Total Number of Assigned Groups */}
                            <td>{evaluator.groupList.length}</td>

                            {/* Column: Area of Interest */}
                            <td>
                              {evaluator._id.areaOfInterest.map((interest) => {
                                return <p key={interest}>{interest}</p>;
                              })}
                            </td>

                            {/* Column: Development Field */}
                            <td>
                              {evaluator._id.developmentField.map((field) => {
                                return <p key={field}>{field}</p>;
                              })}
                            </td>

                            {/* Column: Assign Button */}
                            <td>
                              <Button
                                onClick={() => {
                                  handleAssignOne(
                                    currentGroup.gId,
                                    evaluator._id._id
                                  );
                                }}
                                style={{
                                  fontWeight: "bold",
                                  backgroundColor: "Green",
                                  color: "white",
                                  borderRadius: "8px",
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                  padding: "8px 16px",
                                }}
                              >
                                Assign
                              </Button>
                            </td>
                          </tr>
                        )
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
          <div>
            {/* Heading: Associate Professor */}
            <h2
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
              Assistant Professors
            </h2>

            {/* Table for Associate Professors */}
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  {/* Column Labels */}
                  <th>Name</th>
                  <th>Title</th>
                  <th> Assigned </th>
                  <th>Area of Interest</th>
                  <th>Development Field</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {evaluatorsOneList &&
                  evaluatorsOneList.map((evaluator) => {
                    {
                      return (
                        evaluator._id._id !==
                          currentGroup?.gName.supervisorId &&
                        evaluator._id.title === "Associate Professor" && (
                          <tr key={evaluator._id._id}>
                            {/* Column: Evaluator Name */}
                            <td>{evaluator._id.name}</td>

                            {/* Column: Evaluator Title */}
                            <td>{evaluator._id.title}</td>

                            {/* Column: Total Number of Assigned Groups */}
                            <td>{evaluator.groupList.length}</td>

                            {/* Column: Area of Interest */}
                            <td>
                              {evaluator._id.areaOfInterest.map((interest) => {
                                return <p key={interest}>{interest}</p>;
                              })}
                            </td>

                            {/* Column: Development Field */}
                            <td>
                              {evaluator._id.developmentField.map((field) => {
                                return <p key={field}>{field}</p>;
                              })}
                            </td>

                            {/* Column: Assign Button */}
                            <td>
                              <Button
                                onClick={() => {
                                  handleAssignOne(
                                    currentGroup.gId,
                                    evaluator._id._id
                                  );
                                }}
                                style={{
                                  fontWeight: "bold",
                                  backgroundColor: "Green",
                                  color: "white",
                                  borderRadius: "8px",
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                  padding: "8px 16px",
                                }}
                              >
                                Assign
                              </Button>
                            </td>
                          </tr>
                        )
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
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
            Lecturers
          </h2>
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Assigned </th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {console.log(evaluatorsPreList)}
              {evaluatorsPreList &&
                evaluatorsPreList.map((evaluator) => {
                  return (
                    evaluator._id._id !== currentGroup?.gName.supervisorId &&
                    evaluator._id.title === "Lecturer" && (
                      <tr key={evaluator._id._id}>
                        <td>{evaluator._id.name}</td>
                        <td>{evaluator._id.title}</td>
                        <td>{evaluator.groupList.length}</td>
                        <td>
                          {evaluator._id.areaOfInterest.map((interest) => (
                            <Typography key={interest}>{interest}</Typography>
                          ))}
                        </td>
                        <td>
                          {evaluator._id.developmentField.map((field) => (
                            <Typography key={field}>{field}</Typography>
                          ))}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              handleAssignPre(
                                currentGroup.gId,
                                evaluator._id._id
                              );
                            }}
                          >
                            Assign
                          </Button>
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
          <h2
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
            Assistant professor
          </h2>
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Total Number of Assigned Groups</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evaluatorsPreList &&
                evaluatorsPreList.map((evaluator) => {
                  return (
                    evaluator._id._id !== currentGroup?.gName.supervisorId &&
                    evaluator._id.title === "Assistant Professor" && (
                      <tr key={evaluator._id._id}>
                        <td>{evaluator._id.name}</td>
                        <td>{evaluator._id.title}</td>
                        <td>{evaluator.groupList.length}</td>
                        <td>
                          {evaluator._id.areaOfInterest.map((interest) => (
                            <Typography key={interest}>{interest}</Typography>
                          ))}
                        </td>
                        <td>
                          {evaluator._id.developmentField.map((field) => (
                            <Typography key={field}>{field}</Typography>
                          ))}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              handleAssignPre(
                                currentGroup.gId,
                                evaluator._id._id
                              );
                            }}
                          >
                            Assign
                          </Button>
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>

          <h2
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
            PHD Assistant professor
          </h2>
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Total Number of Assigned Groups</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evaluatorsPreList &&
                evaluatorsPreList.map((evaluator) => {
                  return (
                    evaluator._id._id !== currentGroup?.gName.supervisorId &&
                    evaluator._id.title === "PhD Assistant Professor" && (
                      <tr key={evaluator._id._id}>
                        <td>{evaluator._id.name}</td>
                        <td>{evaluator._id.title}</td>
                        <td>{evaluator.groupList.length}</td>
                        <td>
                          {evaluator._id.areaOfInterest.map((interest) => (
                            <Typography key={interest}>{interest}</Typography>
                          ))}
                        </td>
                        <td>
                          {evaluator._id.developmentField.map((field) => (
                            <Typography key={field}>{field}</Typography>
                          ))}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              handleAssignPre(
                                currentGroup.gId,
                                evaluator._id._id
                              );
                            }}
                          >
                            Assign
                          </Button>
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
          <h2
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
            Associate professor
          </h2>
          <table style={{ color: "black" }}>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th> Name</th>
                <th>Title</th>
                <th>Total Number of Assigned Groups</th>
                <th>Area of Interest</th>
                <th>Development Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evaluatorsPreList &&
                evaluatorsPreList.map((evaluator) => {
                  return (
                    evaluator._id._id !== currentGroup?.gName.supervisorId &&
                    evaluator._id.title === "Associate Professor" && (
                      <tr key={evaluator._id._id}>
                        <td>{evaluator._id.name}</td>
                        <td>{evaluator._id.title}</td>
                        <td>{evaluator.groupList.length}</td>
                        <td>
                          {evaluator._id.areaOfInterest.map((interest) => (
                            <div key={interest}>{interest}</div>
                          ))}
                        </td>
                        <td>
                          {evaluator._id.developmentField.map((field) => (
                            <div key={field}>{field}</div>
                          ))}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleAssignPre(
                                currentGroup.gId,
                                evaluator._id._id
                              );
                            }}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
        </Box>
      </Modal>
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Lecturers</Typography>
          {console.log(evaluatorsTwoList)}
          {evaluatorsTwoList &&
            evaluatorsTwoList.map((evaluator) => {
              {
                return (
                  evaluator._id._id !== currentGroup?.gName.supervisorId &&
                  evaluator._id.title === "Lecturer" && (
                    <Box>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {evaluator._id.name}
                      </Typography>
                      <Typography>{evaluator._id.title}</Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Total Number of Assigned Groups:{" "}
                        {evaluator.groupList.length}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Area of Interest:{" "}
                        {evaluator._id.areaOfInterest.map((interest) => {
                          return <Typography>{interest}</Typography>;
                        })}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Developmment Field:{" "}
                        {evaluator._id.developmentField.map((field) => {
                          return <Typography>{field}</Typography>;
                        })}
                      </Typography>
                      <Button
                        onClick={() => {
                          handleAssignTwo(currentGroup.gId, evaluator._id._id);
                        }}
                      >
                        Assign
                      </Button>
                    </Box>
                  )
                );
              }
            })}
          <Typography variant="h4">Assistant Professors</Typography>
          {evaluatorsTwoList &&
            evaluatorsTwoList.map((evaluator) => {
              {
                return (
                  evaluator._id._id !== currentGroup?.gName.supervisorId &&
                  evaluator._id.title === "Assistant Professor" && (
                    <Box>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {evaluator._id.name}
                      </Typography>
                      <Typography>{evaluator._id.title}</Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Total Number of Assigned Groups:{" "}
                        {evaluator.groupList.length}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Area of Interest:{" "}
                        {evaluator._id.areaOfInterest.map((interest) => {
                          return <Typography>{interest}</Typography>;
                        })}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Developmment Field:{" "}
                        {evaluator._id.developmentField.map((field) => {
                          return <Typography>{field}</Typography>;
                        })}
                      </Typography>
                      <Button
                        onClick={() => {
                          handleAssignTwo(currentGroup.gId, evaluator._id._id);
                        }}
                      >
                        Assign
                      </Button>
                    </Box>
                  )
                );
              }
            })}
          <Typography variant="h4">PHD Assistant Professors</Typography>
          {evaluatorsTwoList &&
            evaluatorsTwoList.map((evaluator) => {
              {
                return (
                  evaluator._id._id !== currentGroup?.gName.supervisorId &&
                  evaluator._id.title === "PHD Assistant Professor" && (
                    <Box>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {evaluator._id.name}
                      </Typography>
                      <Typography>{evaluator._id.title}</Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Total Number of Assigned Groups:{" "}
                        {evaluator.groupList.length}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Area of Interest:{" "}
                        {evaluator._id.areaOfInterest.map((interest) => {
                          return <Typography>{interest}</Typography>;
                        })}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Developmment Field:{" "}
                        {evaluator._id.developmentField.map((field) => {
                          return <Typography>{field}</Typography>;
                        })}
                      </Typography>
                      <Button
                        onClick={() => {
                          handleAssignTwo(currentGroup.gId, evaluator._id._id);
                        }}
                      >
                        Assign
                      </Button>
                    </Box>
                  )
                );
              }
            })}
          <Typography variant="h4">Associate Professor</Typography>
          {evaluatorsTwoList &&
            evaluatorsTwoList.map((evaluator) => {
              {
                return (
                  evaluator._id._id !== currentGroup?.gName.supervisorId &&
                  evaluator._id.title === "Associate Professor" && (
                    <Box>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {evaluator._id.name}
                      </Typography>
                      <Typography>{evaluator._id.title}</Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Total Number of Assigned Groups:{" "}
                        {evaluator.groupList.length}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Area of Interest:{" "}
                        {evaluator._id.areaOfInterest.map((interest) => {
                          return <Typography>{interest}</Typography>;
                        })}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Developmment Field:{" "}
                        {evaluator._id.developmentField.map((field) => {
                          return <Typography>{field}</Typography>;
                        })}
                      </Typography>
                      <Button
                        onClick={() => {
                          handleAssignTwo(currentGroup.gId, evaluator._id._id);
                        }}
                      >
                        Assign
                      </Button>
                    </Box>
                  )
                );
              }
            })}
        </Box>
      </Modal>
    </Box>
  );
}

export default EvaluatorManagement;
