import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

function setCookie(res) {
  Cookie.set("token", res.data.jwt, { sameSite: "None", secure: true });
  Router.push("/");
}

export const registerUser = (username, email, password) => {
  if (typeof window === undefined) return;

  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        setCookie(res);
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const loginUser = (identifier, password) => {
  if (typeof window === undefined) return;

  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/`, {
        identifier,
        password,
      })
      .then((res) => {
        setCookie(res);
        resolve(res);
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
