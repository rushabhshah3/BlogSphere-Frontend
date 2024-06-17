import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_CALL } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";
const API_URL = "https://blogsphere-backend-5s0l.onrender.com/";
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { authorization: getAccessToken() },
});
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["authorization"] = getAccessToken();
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Stop global loader here
    return processResponse(response);
  },
  (error) => {
    // Stop global loader here
    return Promise.reject(processError(error));
  }
);

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
//////////////////////////////
const processError = async (error) => {
  if (error.response) {
    // Request made and server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.data.clearToken) {
      sessionStorage.clear();
      alert("Please login again!");
      window.location.href = "blogospheree.netlify.app";
    }
    console.log("ERROR IN RESPONSE", error);
    return {
      isError: "true",
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.code,
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.log("ERROR IN REQUEST", error);
    return {
      isError: "true",
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("ERROR IN NETWORK", error);
    return {
      isError: "true",
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (let [key, value] of Object.entries(SERVICE_CALL)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    return axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      TYPE: getType(value, body),

      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
  };
}
export { API };
