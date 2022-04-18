import axios from "axios";
import { store } from "../redux/store";
axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(
  function (config) {
    // 显示loading
    store.dispatch({
      type: "change_loading",
      payload: true,
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    store.dispatch({
      type: "change_loading",
      payload: false,
    });

    //隐藏loading
    return response;
  },
  function (error) {
    store.dispatch({
      type: "change_loading",
      payload: false,
    });

    //隐藏loading
    return Promise.reject(error);
  }
);
