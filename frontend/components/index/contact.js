import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
import dynamic from "next/dynamic";
import HCaptcha from "@hcaptcha/react-hcaptcha";
const SvgContact = dynamic(() => import("../svg/SvgContact"));
const SvgLoading = dynamic(() => import("../svg/SvgLoading"));
import { useToasts } from "react-toast-notifications";

export default function ContactForm() {
  const [loading, setloading] = useState(false);
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const { addToast } = useToasts();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: () => {
      if (loading) return;
      setloading(true);
      captchaRef.current.execute();
    },
  });

  const sendFormData = (templateParams) => {
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
            "Message sent successfully! We will get you back to you shortly"
          );

          setloading(false);
          formik.resetForm();
        }
      })
      .catch((e) => {
        console.log(e);
        openNotification(
          "warning",
          "Something went wrong, pls try after sometime! If the issue persists, pls write to us at sunfabb.website@gmail.com"
        );
        setloading(false);
      });
  };

  const openNotification = (type, message) => {
    addToast(message, {
      appearance: type,
      autoDismiss: true,
    });
  };

  const onExpire = () => {
    console.log("hCaptcha Token Expired");
  };

  const onError = (err) => {
    console.log(`hCaptcha Error: ${err}`);
  };

  useEffect(() => {
    if (token && loading) {
      let templateParams = {
        from_name: formik.values.name,
        to_name: "Company",
        message_html: `<table>
                        <tr><th>Subject</th><td>${formik.values.name} contacting from Company website</td></tr>
                        <tr><th>Phone</th><td>${formik.values.phone}</td></tr>
                        <tr><th>Email</th><td>${formik.values.email}</td></tr>
                        <tr><th>Message</th><td>${formik.values.message}</td></tr>`,
      };
      sendFormData(templateParams);
    }
  }, [token]);

  return (
    <>
      <div id="contact">
        <div className="text-center mx-auto w-4/5 md:mt-5">
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl font-bold mt-12 inline-block font-gray-900">
            Contact Us
          </h1>
          <p className="text-xl font-semibold text-gray-700 mt-4">
            Any question or remarks? Just write us a message!
          </p>
        </div>
        <div className="mx-auto my-12 lg:grid lg:grid-cols-6 md:flex md:flex-col w-4/5 justify-items-center">
          <SvgContact className="lg:col-span-3 hidden md:block mx-auto" />
          <div className="lg:col-span-2 mt-10 md:mx-auto w-auto md:w-3/5 lg:w-full">
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
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                onVerify={setToken}
                onExpire={onExpire}
                onError={onError}
                ref={captchaRef}
              />
              <div className="py-3 text-center sm:px-6">
                {loading ? (
                  <button
                    type="submit"
                    className="my-8 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium bg-white text-black border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    <SvgLoading />
                    Sending...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="my-8 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium bg-white text-black border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Send Message
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
