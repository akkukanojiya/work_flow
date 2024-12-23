import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// Image imports
import Support1 from "assets/images/Support1-jpg.webp";
import Support2 from "assets/images/Support2.jpg";
import Support3 from "assets/images/Support3.png";

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueCategory: '',
    description: '',
    file: null, // Added file state
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target;

    if (name === "file" && files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit form data to the server via an API
    console.log(formData);
  };

  return (
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Client Support" pageTitle="Support" />

        <section className="relative pb-20 xl:pb-25 pt-4 xl:pt-8">
          <div className="absolute top-0 left-0 size-64 bg-custom-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 size-64 bg-purple-500/10 blur-3xl"></div>
          <div className="container 2xl:max-w-[87.5rem] px-4 mx-auto">
            <div className="grid items-center grid-cols-12 gap-5 2xl:grid-cols-12">
              <div className="col-span-12 xl:col-span-5 2xl:col-span-5">
                <h1 className="mb-4 !leading-normal lg:text-5xl 2xl:text-6xl dark:text-zinc-100">Client Support 24/7</h1>
                <p className="text-lg mb-7 text-slate-500 dark:text-zinc-400">
                  A section where users can view their past and ongoing support tickets, track their progress, and follow up on unresolved issues.
                </p>
              </div>
              <div className="col-span-12 xl:col-span-7 2xl:col-start-8 2xl:col-span-6">
                <div className="relative mt-10 xl:mt-0">
                  <div className="support-form p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Client Support Request</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="inline-block mb-2 text-base font-medium">Issue Title</label>
                        <input
                          type="text"
                          name="issue_title"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                          placeholder="Your Issue Title"
                          required
                        />
                      </div>
                      {/* <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 w-full"
                          placeholder="Your Email"
                          required
                        />
                      </div> */}
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                          placeholder="Describe your issue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Choose File (optional)</label>
                        <input
                          type="file"
                          name="file"
                          accept="image/*" // Accept only image files
                          onChange={handleChange}
                          className="cursor-pointer form-file border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]"
                      >
                        Submit Request
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Support;
