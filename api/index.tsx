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

export const getSubadmin = function (
  page: number = 1,
  limit: number = 10,
  email?: string
) {
  return Api.get(`/sub-admin?page=${page}&limit=${limit}&email=${email}`);
};

export const onAddSubAdmin = function (body: any) {
  return Api.post("/sub-admin/create", body);
};
