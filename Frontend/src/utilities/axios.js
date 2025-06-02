import axios from "axios";

export const axios_function = async (method, url, data) => {
  let response = await axios({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + localStorage.getItem("access-token"),
    },
    data,
  }).catch((err) => {
    console.log(err);
    if (err.message == "Network Error") console.log(err.message);
    return false;
  });
  console.log(response.data);
  return response.data;
};
