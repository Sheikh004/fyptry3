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
        console.log(authHeader);
        // console.log(authHeader); // logs the JWT token extracted from the response header
        // console.log(response.data);
        console.log(jwtToken);
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
