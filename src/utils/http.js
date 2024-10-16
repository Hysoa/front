import axios from "axios";

const http = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-access-token"] = token;
  }

  return axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: headers,
    mode: "cors",
  });
};

export default http;