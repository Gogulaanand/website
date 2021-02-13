import React, { useState } from "react";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
import { toaster } from "evergreen-ui";

export default function contactForm() {
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
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
                        <tr><th>Address</th><td>${values.address}</td></tr>
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
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1 grid items-center bg-indigo-600 rounded-md">
                <div className="px-4 sm:px-0">
                  <h1 className="text-2xl leading-6 text-white text-center">
                    Contact Information
                  </h1>
                  <p className="mt-3 text-md text-white text-center mx-4">
                    Fill up the form and we will get back to you within 24
                    hours.
                  </p>
                  <div className="grid grid-cols-5 grid-gap-2 mt-9">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 mx-auto col-start-2 col-end-3 stoke-current text-peach"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <p className="text-lg font-small text-white text-center mx-auto col-start-3 col-end-5">
                      +123 456 789
                    </p>
                  </div>
                  <div className="grid grid-cols-5 grid-gap-2 mt-9">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6 mx-auto col-start-2 col-end-3 stroke-current text-peach"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p className="text-lg font-small text-white text-center mx-auto col-start-3 col-end-5">
                      abc@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="md:col-span-2 border-2 rounded-md"
                style={{ backdropFilter: "blur(5px)" }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <div className="shadow-md overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="md:mt-1 col-span-6 lg:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <input
                            type="name"
                            name="name"
                            id="name"
                            autoComplete="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="h-9 mt-1 pt-0.5 pl-2 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          {formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                          ) : null}
                        </div>
                        <div className="md:mt-1 col-span-6 lg:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="h-9 mt-1 pt-0.5 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          {formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                          ) : null}
                        </div>
                        <div className="mt-3 md:mt-1 col-span-6 lg:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
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
                            className="h-9 mt-1 pt-0.5 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mt-3 md:mt-1 col-span-6 lg:col-span-3">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            autoComplete="address"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            className="h-9 mt-1 pt-0.5 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mt-3 md:mt-1 col-span-6 lg:col-span-4">
                          <label htmlFor="message">Message</label>
                          <textarea
                            name="message"
                            id="message"
                            type="message"
                            autoComplete="message"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            placeholder="Write your message..."
                            className="resize h-16 mt-1 pt-1 pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          {formik.errors.message ? (
                            <div>{formik.errors.message}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      {loading ? (
                        <button
                          type="submit"
                          className="inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submit
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Submit
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