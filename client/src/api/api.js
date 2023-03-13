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
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
};
