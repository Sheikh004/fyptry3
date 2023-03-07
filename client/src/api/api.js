import axios from "axios";

const url = "http://localhost:8000";

export const getUser = async (data) => {
  // console.log(data);
  try {
    let response = await axios.post(`${url}/getUser`, data);
    console.log("good job");
    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.log(error.message);
    console.log("error");
  }
};
