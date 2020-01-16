import  axios from "axios";

let instance = axios.create({
    baseURL: "http://dev.api.staller.show",
    headers: {
		'Content-Type': 'application/json'
	}
});

instance.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = window.localStorage.getItem("accessToken")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default  instance;