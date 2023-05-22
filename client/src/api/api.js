import axios from "axios";

const url = "http://localhost:8000";

export const getUser = async (data) => {
  // console.log(data);
  try {
    return await axios
      .post(`${url}/getUser`, data)
      .then((response) => {
        const authHeader = response.headers["authorization"];
        const jwtToken = authHeader.split(" ")[1];

        // console.log(authHeader); // logs the JWT token extracted from the response header
        // console.log(response.data);

        sessionStorage.setItem("jwtToken", jwtToken);

        return response;
      })
      .catch((error) => {
        console.error(error);
        return error.response.data.message;
      });

    // console.log(response);
  } catch (error) {
    console.log("error");
  }
};

export const getChatters = async (data) => {
  const token = sessionStorage.getItem("jwtToken");

  return await axios
    .post(`${url}/getChatters`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response.data.user);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getGroupMembers = async (data) => {
  const token = sessionStorage.getItem("jwtToken");

  return await axios
    .post(`${url}/getGroupMembers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response.data.user);
      return response.data.message;
    })
    .catch((error) => {
      return error.response.data.message;
    });
};

export const getStChatters = async (data) => {
  const token = sessionStorage.getItem("jwtToken");

  return await axios
    .post(`${url}/getStChatters`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response.data.user);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const setChat = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/setChat`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const setGroupChat = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/setGroupChat`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getMessages = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .get(`${url}/getMessages/get/${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getSupervisorGroups = async (id) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .get(`${url}/getSupervisorGroups/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateGroupMembers = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/updateGroupMembers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getSupervisorProposals = async (id) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .get(`${url}/getSupervisorProposals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getGroupLeader = async (id) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .get(`${url}/getGroupLeader/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateProposalStatus = async (approvalProposal) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .get(`${url}/updateProposalStatus/${approvalProposal}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const unUpdateProposalStatus = async (unApprovalProposal) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .get(`${url}/unUpdateProposalStatus/${unApprovalProposal}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createMessage = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/createMessage`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const assignTask = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/assignTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getTasks = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/getTasks`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchTasks = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/fetchTasks`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const handleUploadTasks = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/handleUploadTasks`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateTask = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/updateTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const setPendingTask = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/setPendingTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const setCompletedTask = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/setCompletedTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const uploadFile = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    return await axios.post(`${url}/file/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error while calling uploadFile API ", error);
  }
};

export const forgotPasswordEmail = async (data) => {
  return await axios
    .post(`${url}/fEmail`, data)
    .then((response) => {
      const authHeaderForPass = response.headers["authorization"];
      const jwtTokenForPass = authHeaderForPass.split(" ")[1];

      localStorage.setItem("jwtTokenForPass", jwtTokenForPass);

      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const setNewPassword = async (newPassword) => {
  const token = localStorage.getItem("jwtTokenForPass");
  console.log(token);
  return await axios
    .post(`${url}/reset-password`, newPassword, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getGroup = async (id) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .get(`${url}/getGroup/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteGroup = async (id) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .delete(`${url}/deleteGroup/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const removeFile = async (id, name) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .delete(`${url}/removeFile/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const removeProposal = async (id, name) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .delete(`${url}/removeProposal/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createProposal = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/createProposal`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const registerSupervisor = async (data) => {
  return await axios
    .post(`${url}/register-supervisor`, data)
    .then((response) => {
      // console.log(response.data.message);
      return response;
    })
    .catch((error) => {
      // console.log(error.response.data.message);
      return error;
    });
};

export const createNotification = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/createNotification`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getNotifications = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .post(`${url}/getNotifications`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateTaskApproval = async (value, id) => {
  const token = sessionStorage.getItem("jwtToken");
  return await axios
    .patch(
      `${url}/updateTaskApproval/${id}`,
      {
        taskValue: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};
