import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

export const registerUser = (username, email, pwd) => {
  if (typeof window === undefined) return;

  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
        username,
        email,
        pwd,
      })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
      })
      .catch((err) => reject(err));
  });
};

export const loginUser = (identifier, pwd) => {
  if (typeof window === undefined) return;

  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/`, {
        identifier,
        pwd,
      })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
      })
      .catch((err) => reject(err));
  });
};

export const logout = () => {
  Cookie.remove("token");
  delete window.__user;
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};
