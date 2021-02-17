import React, { useContext, useState } from "react";
import { registerUser } from "../lib/auth";
import { useFormik } from "formik";
import AppContext from "../context/AppContext";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const appContext = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      pwd: "",
    },
    onSubmit: (values, { resetForm }) => {
      consolelog(values);
      if (loading) return;
      setLoading(true);
      registerUser(values.username, values.email, values.pwd);
      resetForm({});
      setloading(false);
    },
  });

  return (
    <>
      <div className="mx-auto my-auto h-3/5 w-2/5 border-2">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}
