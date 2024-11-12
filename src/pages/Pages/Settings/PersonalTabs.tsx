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

const PersonalTabs = () => {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-1 text-15">Personal Information</h6>
                    <p className="mb-4 text-slate-500 dark:text-zink-200">Update your photo and personal details here easily.</p>
                    <form action="#!">
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                            <div className="xl:col-span-4">
                                <label htmlFor="name" className="inline-block mb-2 text-base font-medium">Name</label>
                                <input type="text" id="name" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Name"/>
                            </div>
                            
                            <div className="xl:col-span-4">
                                <label htmlFor="business_registration" className="inline-block mb-2 text-base font-medium">Business Registration</label>
                                <input type="text" id="business_registration" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Business Registration"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="email" className="inline-block mb-2 text-base font-medium"> Email</label>
                                <input type="email" id="email" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your email"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="cin" className="inline-block mb-2 text-base font-medium">CIN</label>
                                <input type="text" id="cin" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your CIN"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="pan" className="inline-block mb-2 text-base font-medium">PAN</label>
                                <input type="text" id="pan" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your PAN"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="tan" className="inline-block mb-2 text-base font-medium">TAN</label>
                                <input type="text" id="tan" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your TAN"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="nature_of_business" className="inline-block mb-2 text-base font-medium">Nature of Business</label>
                                <input type="text" id="nature_of_business" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Nature of Business"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor=" date_of_incorporation" className="inline-block mb-2 text-base font-medium"> Date Of Incorporation</label>
                                <input type="date" id="date_of_incorporation" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Date Of Incorporation"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="bank_name" className="inline-block mb-2 text-base font-medium">Bank Name</label>
                                <input type="text" id="bank_name" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Bank Name"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="branch_name" className="inline-block mb-2 text-base font-medium">Branch Name</label>
                                <input type="text" id="branch_name" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Branch Name"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="account_number" className="inline-block mb-2 text-base font-medium">Account Number</label>
                                <input type="text" id="account_number" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Account Number"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="ifsc_code" className="inline-block mb-2 text-base font-medium">IFSC Code</label>
                                <input type="text" id="ifsc_code" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your IFSC Code"/>
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="other" className="inline-block mb-2 text-base font-medium">Other</label>
                                <input type="text" id="other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Other Details"/>
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

export default PersonalTabs;