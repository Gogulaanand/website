import React, { useState } from "react";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
import { toaster } from "evergreen-ui";
import SvgLoading from "./svg/SvgLoading";

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
            toaster.success("Message sent successfully !", {
              description: "We will get you back to you shortly",
            });
            resetForm({});
            setloading(false);
          }
        })
        .catch((e) => {
          console.log(e);
          toaster.danger("Something went wrong, pls try after sometime!", {
            description:
              "If the issue persists, pls write to us at abc@gmail.com",
            duration: 10,
          });
          setloading(false);
        });
    },
  });

  return (
    <>
      <div className="text-center mx-auto w-4/5" id="contact">
        <h1 className="lg:text-5xl md:text-4xl sm:text-3xl font-large mt-12 inline-block">
          Contact Us
        </h1>
        <p className="text-md font-medium text-gray-700 mt-4">
          Any question or remarks? Just write us a message!
        </p>
      </div>
      <div className="lg:m-28 md:m-16 sm:m-8 bg-inherit pb-12">
        <div className="flex justify-center rounded-md">
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-6">
              <div className="grid items-center bg-purple rounded-md">
                <div className="px-4 sm:px-0">
                  <h1 className="text-2xl leading-6 text-white text-left ml-8">
                    Contact Information
                  </h1>
                  <p className="mt-4 text-md text-white text-left ml-8 text-wrap w-4/5">
                    Fill up the form and we will get back to you within 24
                    hours.
                  </p>
                  <div className="grid grid-cols-5 grid-gap-2 mt-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 mx-auto col-start-1 col-end-2 stoke-current text-peach"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <p className="text-lg font-small text-white text-left mx-auto col-start-2 col-end-4">
                      +123 456 789
                    </p>
                  </div>
                  <div className="grid grid-cols-5 grid-gap-2 mt-9">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6 mx-auto col-start-1 col-end-2 stroke-current text-peach"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p className="text-lg font-small text-white text-left mx-auto col-start-2 col-end-4">
                      abc@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-2 rounded-md">
                <form onSubmit={formik.handleSubmit}>
                  <div className="shadow-md overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-2 gap-6 row-span-5">
                        <div className="md:mt-1 col-span-2 lg:col-span-2 row-start-1 row-end-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="h-9 mt-1 pt-0.5 pl-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-indigo-700 block w-full sm:text-sm"
                          />
                          {formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                          ) : null}
                        </div>
                        <div className="md:mt-1 col-span-2 lg:col-span-2 row-start-2 row-end-3">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                          >
                            Mail
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="h-9 mt-1 pt-0.5 pl-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-indigo-700 block w-full sm:text-sm"
                          />
                          {formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                          ) : null}
                        </div>
                        <div className="mt-4 md:mt-1 col-span-2 lg:col-span-2 row-start-3 row-end-4">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            className="h-9 mt-1 pt-0.5 pl-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-indigo-700 block w-full sm:text-sm"
                          />
                        </div>
                        <div className="mt-4 md:mt-1 col-span-2">
                          <label htmlFor="message">Message</label>
                          <textarea
                            name="message"
                            id="message"
                            type="textarea"
                            autoComplete="message"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            placeholder="Write your message..."
                            className="resize h-16 mt-2 pt-1 pl-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-indigo-700 block w-full sm:text-sm"
                          />
                          {formik.errors.message ? (
                            <div>{formik.errors.message}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 text-left sm:px-6">
                      {loading ? (
                        <button
                          type="submit"
                          className="my-8 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                        >
                          <SvgLoading />
                          Sending...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="my-8 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                        >
                          Send Message
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
