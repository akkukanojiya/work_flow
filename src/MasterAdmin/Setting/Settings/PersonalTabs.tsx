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
                                <label htmlFor="inputValue" className="inline-block mb-2 text-base font-medium">User Name</label>
                                <input type="text" id="inputValueFirst" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Name"   />
                            </div>
                            
                            <div className="xl:col-span-4">
                                <label htmlFor="userId" className="inline-block mb-2 text-base font-medium">User Id</label>
                                <input type="text" id="userId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="User Id" />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="inputValue" className="inline-block mb-2 text-base font-medium">User Email</label>
                                <input type="email" id="inputValueEmail" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your email"   />
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