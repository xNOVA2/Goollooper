import axios from "axios";

import { RootState, store } from "@/store/store";

const development = "http://localhost:5000";
const dev = "http://goollooper.yameenyousuf.com/api";
const production = "http://44.202.123.121/api";

const BASE_URL = `${dev}/admin`;

const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(async (config: any) => {
  const accessToken: RootState = store.getState()?.userReducer?.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export { Api };
