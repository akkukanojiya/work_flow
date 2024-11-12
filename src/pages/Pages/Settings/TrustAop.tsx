import React from "react";
import Select from 'react-select';
import Flatpickr from "react-flatpickr";

interface Option { label: string; value: string; isDisabled?: boolean };

const DefaultOptions: Option[] = [
    { label: "Choice 1", value: "Choice 1" },
    { label: "Choice 2", value: "Choice 2" },
    { label: "Choice 3", value: "Choice 3" },
    { label: "Choice 2", value: "Choice 2" },
    { label: "Choice 3", value: "Choice 3" },
    { label: "Choice 4", value: "Choice 4" },
];

const cityOptions: Option[] = [
    { value: 'Madrid', label: 'Madrid' },
    { value: 'Toronto', label: 'Toronto' },
    { value: 'Vancouver', label: 'Vancouver' },
    { value: 'London', label: 'London' },
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Liverpool', label: 'Liverpool' },
    { value: 'Paris', label: 'Paris' },
    { value: 'Malaga', label: 'Malaga' },
    { value: 'Washington', label: 'Washington', isDisabled: true },
    { value: 'Lyon', label: 'Lyon' },
    { value: 'Marseille', label: 'Marseille' },
    { value: 'Hamburg', label: 'Hamburg' },
    { value: 'Munich', label: 'Munich' },
    { value: 'Barcelona', label: 'Barcelona' },
    { value: 'Berlin', label: 'Berlin' },
    { value: 'Montreal', label: 'Montreal' },
    { value: 'New York', label: 'New York' },
    { value: 'Michigan', label: 'Michigan' },
];

const countryOptions: Option[] = [
    { value: 'USA', label: 'USA' },
    { value: 'Toronto', label: 'Toronto' },
    { value: 'Vancouver', label: 'Vancouver' },
    { value: 'London', label: 'London' },
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Liverpool', label: 'Liverpool' },
    { value: 'Paris', label: 'Paris' },
    { value: 'Malaga', label: 'Malaga' },
    { value: 'Washington', label: 'Washington', isDisabled: true },
    { value: 'Lyon', label: 'Lyon' },
    { value: 'Marseille', label: 'Marseille' },
    { value: 'Hamburg', label: 'Hamburg' },
    { value: 'Munich', label: 'Munich' },
    { value: 'Barcelona', label: 'Barcelona' },
    { value: 'Berlin', label: 'Berlin' },
    { value: 'Montreal', label: 'Montreal' },
    { value: 'New York', label: 'New York' },
    { value: 'Michigan', label: 'Michigan' },
];

const zipOptions: Option[] = [
    { value: '00012', label: '00012' },
    { value: '00014', label: '00014' },
    { value: '00016', label: '00016' },
    { value: '88800', label: '88800' },
    { value: '00100', label: '00100' },
    { value: '00001', label: '00001' },
];

const TrustAopTab = () => {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-1 text-15">Trust/AOP Information</h6>
                    <p className="mb-4 text-slate-500 dark:text-zink-200">Update your photo and personal details here easily.</p>
                    <form action="#!">
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                            <div className="xl:col-span-4">
                                <label htmlFor="name_of_trust_aop" className="inline-block mb-2 text-base font-medium">Name of Trust / AOP </label>
                                <input type="text" id="name_of_trust_aop" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Trust / AOP" required />

                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="name_of_trustee_member" className="inline-block mb-2 text-base font-medium">Name of Trustee / Member</label>
                                <input type="text" id="name_of_trustee_member" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Trustee / Member" required />

                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="registration_no." className="inline-block mb-2 text-base font-medium">Registration No.</label>
                                <input type="number" id="registration_no." className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Registration No." required />

                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="gst_no" className="inline-block mb-2 text-base font-medium">GST No </label>
                                <input type="number" id="gst_no" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter GST No" required />

                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="email" className="inline-block mb-2 text-base font-medium">Email</label>
                                <input type="email" id="email" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Email" />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="companyCategoryType" className="inline-block mb-2 text-base font-medium"> Company Category/Type</label>
                                <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="companyCategoryType"
                                    name="companyCategoryType"

                                >
                                    <option value="">Select Company Category  </option>
                                    <option value="">#</option>
                                    <option value="">#</option>

                                </select>

                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="MSMERegNo" className="inline-block mb-2 text-base font-medium">MSME Reg. No.</label>
                                <input type="text" id="MSMERegNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your MSME Reg. No." />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="mobile_No." className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                                <input type="text" id="mobile_No" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Mobile No." />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor=" pan_card" className="inline-block mb-2 text-base font-medium">PAN Card</label>
                                <input type="text" id="pan_card" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your PAN Card" />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="ProfessionalTax/Gumasta" className="inline-block mb-2 text-base font-medium">Professional Tax/ Gumasta</label>
                                <input type="text" id="ProfessionalTax/Gumasta" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Professional Tax/ Gumasta" />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="date_of_birth" className="inline-block mb-2 text-base font-medium">Date of Birth</label>
                                <input type="date" id="date_of_birth" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Date of Birth" />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="Group" className="inline-block mb-2 text-base font-medium">Group</label>
                                <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="Group" id="Group">
                                    <option value="">Select </option>
                                    <option value=" ">#</option>
                                    <option value=" ">#</option>
                                    <option value=" ">#</option>

                                </select>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="serviceCategory" className="inline-block mb-2 text-base font-medium">Service Category </label>
                                <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="serviceCategory"
                                    name="serviceCategory"

                                >
                                    <option value="">Select Service Category</option>
                                    <option value=" "> #</option>
                                    <option value=" "> #</option>
                                    <option value="  "> # </option>
                                    <option value=" "> #</option>
                                    <option value=" "> #</option>
                                    <option value=" "> #</option>
                                </select>

                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="Address" className="inline-block mb-2 text-base font-medium">Address</label>
                                <textarea id="Addresss" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Address" required ></textarea>


                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="other" className="inline-block mb-2 text-base font-medium">Other</label>
                                <input type="text" id="other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Other Details" />
                            </div>

                        </div>
                        <div className="flex justify-end mt-6 gap-x-4">
                            <button type="button" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Updates</button>
                            <button type="button" className="text-red-500 bg-red-100 btn hover:text-white hover:bg-red-600 focus:text-white focus:bg-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:ring active:ring-red-100 dark:bg-red-500/20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:bg-red-500 dark:focus:text-white dark:active:bg-red-500 dark:active:text-white dark:ring-red-400/20">Cancel</button>
                        </div>
                    </form>
                </div>
            </div >
        </React.Fragment >
    );
}

export default TrustAopTab;