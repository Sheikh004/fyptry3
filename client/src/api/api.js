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
