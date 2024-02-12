import axios from "axios";
import { useRouter } from "next/router";

import { RootState, store } from "@/store/store";
import { removeUser } from "@/store/actions/userAction";

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

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const router = useRouter();
      store.dispatch(removeUser());
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export { Api };
