import axios from "axios"


export const apiMock = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-type": "application/json",
  },
});

apiMock.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

apiMock.interceptors.request.use((config) => {
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

apiMock.interceptors.response.use((response) => {
  return response;
},
  (error) => {
    return Promise.reject(error);
  }
);

export default apiMock;