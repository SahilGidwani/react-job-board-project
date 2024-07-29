import { baseApi } from "@/services/baseApi";

export function signup(email, password) {
  return baseApi
    .post("users/signup", { email, password })
    .then((res) => res.data);
}

export function login(email, password) {
  return baseApi
    .post("users/login", { email, password })
    .then((res) => res.data);
}

export function logout() {
  return baseApi.delete("users/logout");
}

export function getLoggedInUser() {
  return baseApi.get("users/session").then((res) => res.data ?? undefined);
}
