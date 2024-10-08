import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { RootState, store } from "@/store/store";
import { removeUser } from "@/store/actions/userAction";

const development = "http://localhost:5000";
const dev = "http://goollooper.yameenyousuf.com/api";
const production = "http://44.202.123.121/api";

export const BASE_URL = `${dev}`;

const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(async (config: any) => {
  const accessToken: RootState = store.getState()?.user?.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      error?.response?.data?.msg && toast.error(error?.response?.data?.msg);
      store.dispatch(removeUser());
      const router = useRouter();
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export { Api };
