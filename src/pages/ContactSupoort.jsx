import React, { useState } from "react";

const ContactSupport = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await fetch(
        "https://formsubmit.co/aegismailaegis@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="flex justify-center items-center py-12">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="text-center flex flex-col gap-2 px-2">
            <h1 className="text-3xl md:text-4xl text-[#2F2F2F] font-inter font-medium tracking-tighter">
              Contact Support
            </h1>
            <p className="text-gray-800 p-2 text-md">
              Need help? Reach out to our team and we’ll get back to you
              shortly.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 w-screen md:w-[840px]">
            <div className="flex-1 p-4">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-4 p-8 shadow-md rounded-md bg-white">
                  <h2 className="text-2xl text-[#2F2F2F] font-inter font-medium tracking-tight">
                    We've got your message!
                  </h2>
                  <p className="text-gray-400 text-md max-w-md">
                    Thank you for contacting us. Our support team will review
                    your query and reach out to you within a few hours. Stay
                    connected!
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col py-8 shadow-md rounded-md px-4"
                >
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name" className="font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="phone" className="font-medium">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="9876543210"
                      required
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-medium">
                      Problem Description
                    </label>
                    <textarea
                      name="message"
                      placeholder="Describe your issue or question"
                      rows="5"
                      required
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <input type="hidden" name="_captcha" value="false" />

                  <button
                    type="submit"
                    className="bg-orange-500 font-medium mx-auto mt-6 w-[96%] flex justify-center text-white px-8 py-2 rounded-3xl hover:bg-orange-600"
                  >
                    Submit Query
                  </button>
                </form>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-4 p-4">
              <h2 className="text-3xl text-[#2F2F2F] font-inter font-medium tracking-tight">
                We're here to help!
              </h2>
              <p className="text-gray-400 text-md">
                Whether you're stuck during signup, facing issues accessing your
                dashboard, or just want to speak with our team — we’re all ears.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">24x7</p>
                  <p className="text-sm text-[#2F2F2F]">Support Availability</p>
                </div>
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">10k+</p>
                  <p className="text-sm text-[#2F2F2F]">Queries Resolved</p>
                </div>
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">5 min</p>
                  <p className="text-sm text-[#2F2F2F]">Avg Response Time</p>
                </div>
                <div className="flex flex-col p-2 shadow-md rounded-md">
                  <p className="font-medium text-xl text-[#EB6505]">Trusted</p>
                  <p className="text-sm text-[#2F2F2F]">
                    By Students Nationwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactSupport;
