import axios from "axios";
const createAxiosInstance = (token) => {
  const BASE_URL = "http://localhost:5000/api";
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      token: token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return axiosInstance;
};

const getData = async (method, url, data = {}, setData) => {
  const token = localStorage.getItem("token");
  const axiosInstance = createAxiosInstance(token);
  try {
    const result = await axiosInstance[method](url, { ...data });
    if (setData) {
      setData(result.data);
      return;
    }
    return result;
  } catch (error) {
    return error;
  }
};

export default getData;
