import axios from "axios";
import CryptoJS from "crypto-js";
const url = "http://localhost:8000";

const encryptionKey = "FYP Encryption Key";

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
        const ciphertext = CryptoJS.AES.encrypt(
          jwtToken,
          encryptionKey
        ).toString();

        sessionStorage.setItem("jwtToken", ciphertext);
        // console.log(ciphertext);
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

  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  console.log("Decrypted message:", decryptedText);

  return await axios
    .post(`${url}/getChatters`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/getGroupMembers`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/getStChatters`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/setChat`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/setGroupChat`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getMessages/get/${data}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getSupervisorGroups/${id}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/updateGroupMembers`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getSupervisorProposals/${id}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getGroupLeader/${id}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/updateProposalStatus/${approvalProposal}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/unUpdateProposalStatus/${unApprovalProposal}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/createMessage`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/assignTask`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/getTasks`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/fetchTasks`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/handleUploadTasks`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/updateTask`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/setPendingTask`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/setCompletedTask`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  try {
    return await axios.post(`${url}/file/upload`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getGroup/${id}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .delete(`${url}/deleteGroup/${id}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .delete(`${url}/removeFile/${id}/`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .delete(`${url}/removeProposal/${id}/`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/createProposal`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/createNotification`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createNotificationBroadcast = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/createNotificationBroadcast`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getNotifications = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/getNotifications`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/updateTaskApproval/${id}`,
      {
        taskValue: value,
      },
      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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

export const getUnAssignedProposals = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getUnAssignedProposals`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getReviewers = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getReviewers`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const unassignProposal = async (pid, rid) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/unassignProposal/${pid}/${rid}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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
export const assignProposal = async (pid, rid) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/assignProposal/${pid}/${rid}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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

export const getReviewerProposals = async (id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(
      `${url}/getReviewerProposals/${id}`,

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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

export const updateProposalReviewerStatus = async (pid, value) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/updateProposalReviewerStatus/${pid}/${value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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

export const createComment = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/createComment`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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
export const createTaskComment = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/createTaskComment`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
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

export const getComments = async (pid, fid) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getComments/${pid}/${fid}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteComment = async (cid) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .delete(`${url}/deleteComment/${cid}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getGroupProposal = async (gid) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getGroupProposal/${gid}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getGroupComments = async (pid) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getGroupComments/${pid}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getUnAssignedGroupsOne = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getUnAssignedGroupsOne`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const getUnAssignedPreGroups = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getUnAssignedPreGroups`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const getUnAssignedGroupsTwo = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getUnAssignedGroupsTwo`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const unassignGroupOne = async (gid, e_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/unassignGroupOne/${gid}/${e_Id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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
export const assignGroupOne = async (gid, e_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/assignGroupOne/${gid}/${e_Id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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

export const unassignPreGroup = async (gid, e_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/unassignPreGroup/${gid}/${e_Id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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
export const assignPreGroup = async (gid, e_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/assignPreGroup/${gid}/${e_Id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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

export const unassignGroupTwo = async (gid, e_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/unassignGroupTwo/${gid}/${e_Id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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
export const assignGroupTwo = async (gid, e_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .patch(
      `${url}/assignGroupTwo/${gid}/${e_Id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${decryptedText}`,
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

export const getEvaluatorsOne = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvaluatorsOne`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const getPreEvaluators = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getPreEvaluators`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const getEvaluatorsTwo = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvaluatorsTwo`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createEvent = async (data) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .post(`${url}/createEvent`, data, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEvents = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvents`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getActiveEvent = async () => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getActiveEvent`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEvaluatorOneGroups = async (e_ID) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvaluatorOneGroups/${e_ID}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEvaluatorPreGroups = async (e_ID) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvaluatorPreGroups/${e_ID}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEvaluatorTwoGroups = async (e_ID) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvaluatorTwoGroups/${e_ID}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEvaluatorOneChatter = async (g_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvaluatorOneChatter/${g_Id}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEvaluatorPreChatter = async (g_Id) => {
  const token = sessionStorage.getItem("jwtToken");
  const decryptedBytes = CryptoJS.AES.decrypt(token, encryptionKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return await axios
    .get(`${url}/getEvaluatorPreChatter/${g_Id}`, {
      headers: {
        Authorization: `Bearer ${decryptedText}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
