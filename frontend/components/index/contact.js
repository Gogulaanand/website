import React, { useState } from "react";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
import { notification } from "antd";
import dynamic from "next/dynamic";
const SvgContact = dynamic(() => import("../svg/SvgContact"));

export default function contactForm() {
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (loading) return;
      setloading(true);
      let templateParams = {
        from_name: values.name,
        to_name: "Company",
        message_html: `<table>
                        <tr><th>Subject</th><td>${values.name} contacting from Company website</td></tr>
                        <tr><th>Phone</th><td>${values.phone}</td></tr>
                        <tr><th>Email</th><td>${values.email}</td></tr>
                        <tr><th>Message</th><td>${values.message}</td></tr>`,
      };
      emailjs
        .send(
          "gmail",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
        .then((resp) => {
          if (resp.status === 200) {
            openNotification(
              "success",
              "Message sent successfully !",
              "We will get you back to you shortly"
            );
            resetForm({});
            setloading(false);
          }
        })
        .catch((e) => {
          console.log(e);
          openNotification(
            "warning",
            "Something went wrong, pls try after sometime!",
            "If the issue persists, pls write to us at abc@gmail.com"
          );
          setloading(false);
        });
    },
  });

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  return (
    <div id="contact">
      <script>
        {function onSubmit(token) {
          document.getElementById("contact_form").submit();
        }}
      </script>

      <div className="text-center mx-auto w-4/5 md:mt-5">
        <h1 className="lg:text-5xl md:text-4xl sm:text-3xl font-large mt-12 inline-block">
          Contact Us
        </h1>
        <p className="text-md font-medium text-gray-700 mt-4">
          Any question or remarks? Just write us a message!
        </p>
      </div>
      <div className="mx-auto my-12 grid grid-cols-6 w-4/5">
        <SvgContact className="lg:col-span-3 col-span-3 hidden md:flex" />
        <div className="lg:col-span-2 col-span-6 mt-10 md:mx-auto">
          <form onSubmit={formik.handleSubmit} id="contact_form">
            <label htmlFor="name" className="inline-block mb-1 font-medium">
              Name
            </label>
            <input
              placeholder="John"
              required
              type="text"
              className="w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none"
              id="name"
              name="name"
              autoComplete="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label htmlFor="email" className="inline-block mb-1 font-medium">
              E-mail
            </label>
            <input
              placeholder="john.doe@example.org"
              required
              type="email"
              className="w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none "
              id="email"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor="phone" className="inline-block mb-1 font-medium">
              Phone
            </label>
            <input
              placeholder="+123 456 789"
              type="text"
              className="w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none "
              id="phone"
              name="phone"
              autoComplete="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />

            <label htmlFor="message" className="mb-1 font-medium">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              required
              type="textarea"
              className="h-32 w-full px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none "
              id="message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
            />
            <div className="py-3 text-center sm:px-6">
              {loading ? (
                <button
                  type="submit"
                  className="my-8 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium bg-white text-black border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="mr-2 animate-spin"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                  </svg>
                  Sending...
                </button>
              ) : (
                <button
                  type="submit"
                  data-sitekey="6LflhHsaAAAAALORhCm3tAguZR_BvAmCakZlUaep"
                  data-callback="onSubmit"
                  data-action="submit"
                  className="my-8 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium bg-white text-black border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Send Message
                </button>
              )}
            </div>
          </form>
          <script src="https://www.google.com/recaptcha/api.js"></script>
        </div>
      </div>
    </div>
  );
}
