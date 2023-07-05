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
  const [currentGroup, setCurrentGroup] = useState();
  const [check, setCheck] = useState(false);
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
      // console.log(unOne);
      // console.log(unPre);
      // console.log(unTwo);
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
      <Box>
        {/* {console.log(evaluatorsOneList[1]._id.name)} */}
        <Typography>Evaluation 1</Typography>
        <Box>
          <Typography>Assigned Groups</Typography>
          {evaluatorsOneList &&
            evaluatorsOneList.map((evaluator) => {
              if (evaluator.groupList.length > 0) {
                return (
                  <Box>
                    <Typography>{evaluator._id.name}</Typography>
                    {evaluator.groupList.map((group) => {
                      return (
                        <Box>
                          <Typography>{group.name}</Typography>
                          <Button
                            onClick={() => {
                              unAssignGroup(group._id, evaluator._id._id);
                            }}
                          >
                            Unassign
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>
                );
              }
            })}
        </Box>
        <Box>
          <Typography>Unassigned Groups</Typography>
          {unassignedGroupsOneList &&
            unassignedGroupsOneList.map((group) => {
              return (
                <Box>
                  <Typography>{group.gName.name}</Typography>
                  {group.aInterest.map((interest) => {
                    return <Typography>{interest}</Typography>;
                  })}
                  {group.dArea.map((field) => {
                    return <Typography>{field}</Typography>;
                  })}
                  {/* <Typography>{group.aInterest}</Typography> */}
                  {/* <Typography>{group.dArea}</Typography> */}

                  <Button
                    onClick={() => {
                      handleOpen1(group);
                    }}
                  >
                    Assign Group
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Box>
      <Box>
        {/* {console.log(evaluatorsOneList[1]._id.name)} */}
        <Typography>Evaluation Pre</Typography>
        <Box>
          <Typography>Assigned Groups</Typography>
          {evaluatorsPreList &&
            evaluatorsPreList.map((evaluator) => {
              if (evaluator.groupList.length > 0) {
                return (
                  <Box>
                    <Typography>{evaluator._id.name}</Typography>
                    {evaluator.groupList.map((group) => {
                      return (
                        <Box>
                          <Typography>{group.name}</Typography>
                          <Button
                            onClick={() => {
                              unAssignGroupPre(group._id, evaluator._id._id);
                            }}
                          >
                            Unassign
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>
                );
              }
            })}
        </Box>
        <Box>
          <Typography>Unassigned Groups</Typography>
          {unassignedGroupsPreList &&
            unassignedGroupsPreList.map((group) => {
              return (
                <Box>
                  <Typography>{group.gName.name}</Typography>
                  {group.aInterest.map((interest) => {
                    return <Typography>{interest}</Typography>;
                  })}
                  {group.dArea.map((field) => {
                    return <Typography>{field}</Typography>;
                  })}
                  {/* <Typography>{group.aInterest}</Typography>
                  <Typography>{group.dArea}</Typography> */}
                  <Button
                    onClick={() => {
                      handleOpen2(group);
                    }}
                  >
                    Assign Group
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Box>
      <Box>
        {/* {console.log(evaluatorsOneList[1]._id.name)} */}
        <Typography>Evaluation Two</Typography>
        <Box>
          <Typography>Assigned Groups</Typography>
          {evaluatorsTwoList &&
            evaluatorsTwoList.map((evaluator) => {
              if (evaluator.groupList.length > 0) {
                return (
                  <Box>
                    <Typography>{evaluator._id.name}</Typography>
                    {evaluator.groupList.map((group) => {
                      return (
                        <Box>
                          <Typography>{group.name}</Typography>
                          <Button
                            onClick={() => {
                              unAssignGroupTwo(group._id, evaluator._id._id);
                            }}
                          >
                            Unassign
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>
                );
              }
            })}
        </Box>
        <Box>
          <Typography>Unassigned Groups</Typography>
          {unassignedGroupsTwoList &&
            unassignedGroupsTwoList.map((group) => {
              return (
                <Box>
                  <Typography>{group.gName.name}</Typography>
                  {group.aInterest.map((interest) => {
                    return <Typography>{interest}</Typography>;
                  })}
                  {group.dArea.map((field) => {
                    return <Typography>{field}</Typography>;
                  })}
                  {/* <Typography>{group.aInterest}</Typography>
                  <Typography>{group.dArea}</Typography> */}
                  <Button
                    onClick={() => {
                      handleOpen3(group);
                    }}
                  >
                    Assign Group
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Box>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Lecturers</Typography>
          {console.log(evaluatorsOneList)}
          {evaluatorsOneList &&
            evaluatorsOneList.map((evaluator) => {
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
                      {/* {console.log(evaluator  )} */}
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
                          handleAssignOne(currentGroup.gId, evaluator._id._id);
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
          {evaluatorsOneList &&
            evaluatorsOneList.map((evaluator) => {
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
                          handleAssignOne(currentGroup.gId, evaluator._id._id);
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
          {evaluatorsOneList &&
            evaluatorsOneList.map((evaluator) => {
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
                          handleAssignOne(currentGroup.gId, evaluator._id._id);
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
          {evaluatorsOneList &&
            evaluatorsOneList.map((evaluator) => {
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
                          handleAssignOne(currentGroup.gId, evaluator._id._id);
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
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Lecturers</Typography>
          {console.log(evaluatorsPreList)}
          {evaluatorsPreList &&
            evaluatorsPreList.map((evaluator) => {
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
                          handleAssignPre(currentGroup.gId, evaluator._id._id);
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
          {evaluatorsPreList &&
            evaluatorsPreList.map((evaluator) => {
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
                          handleAssignPre(currentGroup.gId, evaluator._id._id);
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
          {evaluatorsPreList &&
            evaluatorsPreList.map((evaluator) => {
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
                          handleAssignPre(currentGroup.gId, evaluator._id._id);
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
          {evaluatorsPreList &&
            evaluatorsPreList.map((evaluator) => {
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
                        Development Field:{" "}
                        {evaluator._id.developmentField.map((field) => {
                          return <Typography>{field}</Typography>;
                        })}
                      </Typography>
                      <Button
                        onClick={() => {
                          handleAssignPre(currentGroup.gId, evaluator._id._id);
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
