import { Api } from "./Middleware";
import { SiginFields } from "@/types/type";

// auth

export const onLogin = function (body: SiginFields) {
  return Api.post("/auth/login", body);
};

export const getStats = function () {
  return Api.get("/stats");
};

export const getUsers = function (
  page: number = 1,
  limit: number = 10,
  email?: string
) {
  return Api.get(`/user?page=${page}&limit=${limit}&email=${email}`);
};
