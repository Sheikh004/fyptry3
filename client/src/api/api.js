import axios from "axios";

const url = "http://localhost:8000";

export const getUser = async (data) => {
  // console.log(data);
  try {
    let response = await axios
      .post(`${url}/getUser`, data)
      .then((response) => {
        console.log(response.headers);
        const authHeader = response.headers["authorization"];
        // const jwtToken = authHeader.split(" ")[1];
        console.log(authHeader); // logs the JWT token extracted from the response header
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(response);
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
};

export const getChatters = async (data) => {
  // console.log(data);

  return await axios
    .post(`${url}/getChatters`, data)
    .then((response) => {
      // console.log(response.data.user);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const setChat = async (data) => {
  return await axios
    .post(`${url}/setChat`, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};
