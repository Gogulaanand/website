import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
import dynamic from "next/dynamic";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useToasts } from "react-toast-notifications";
import { Divider } from "antd";

const SvgContact = dynamic(() => import("@/components/svg/SvgContact"));
const SvgLoading = dynamic(() => import("@/components/svg/SvgLoading"));
const SvgWhatsapp = dynamic(() => import("@/components/svg/SvgWhatsapp"));

export default function Contact() {
  return (
    <>
      <div id="contact">
        <div className="text-center mx-auto w-4/5 md:mt-5">
          <h1 className="md:text-5xl text-4xl font-bold mt-24 lg:mt-12 inline-block font-gray-900">
            Contact Us
          </h1>
          <p className="text-xl font-semibold text-gray-700 mt-4">
            Any question or remarks? Just write us a message!
          </p>
        </div>
        <div className="mx-auto my-12 lg:grid lg:grid-cols-6 md:flex md:flex-col w-4/5 justify-items-center">
          <SvgContact className="lg:col-span-3 hidden md:block mx-auto" />
          <div className="lg:col-span-2 mt-10 md:mx-auto w-auto md:w-3/5 lg:w-full">
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}

function Form() {
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
        openNotification(
          "warning",
          "Something went wrong, pls try after sometime! If the issue persists, pls write to us at sunfabb.website@gmail.com"
        );
        setloading(false);
        throw new Error("Contact form submission failed");
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
    throw new Error(`hCaptcha Error: ${err}`);
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
      <div className="pt-3 text-center sm:px-6">
        <button
          type="submit"
          className="my-8 inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium bg-white text-black rounded-full border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none"
        >
          {loading ? (
            <>
              <SvgLoading />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
      <Divider>or</Divider>
      <div className="flex justify-center">
        <p className="my-auto mr-4">Contact us via whatsapp: </p>
        <Link
          href="https://api.whatsapp.com/send?phone=917010735151?&text=Hi"
          passHref
        >
          <a rel="noopener" className="cursor-pointer">
            <SvgWhatsapp />
          </a>
        </Link>
      </div>
    </form>
  );
}
