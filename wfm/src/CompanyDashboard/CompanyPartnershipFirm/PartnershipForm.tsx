import React, { useState } from "react";
import { Link } from "react-router-dom";
import Flatpickr from 'react-flatpickr';
import BreadCrumb from "Common/BreadCrumb";
import Select from 'react-select';
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'

import dataa from './data.json';
// Icon
 

// Image
 
interface Node {
    path: string;
    [key: string]: any;
}
const onchange = (currentNode: Node, selectedNodes: Node[]) => {
    console.log("path::", currentNode.path);
};

const assignObjectPaths = (obj: Node, stack?: string) => {
    Object.keys(obj).forEach((k) => {
        const node = obj[k];
        if (typeof node === "object") {
            node.path = stack ? `${stack}.${k}` : k;
            assignObjectPaths(node, node.path);
        }
    });
};
const PartnershipForm = () => {
    // const [selectfiles, setSelectfiles] = useState([]);

    // const handleAcceptfiles = (files: any) => {
    //     files?.map((file: any) => {
    //         return Object.assign(file, {
    //             priview: URL.createObjectURL(file),
    //             formattedSize: formatBytes(file.size),
    //         });
    //     });
    //     setSelectfiles(files);
    // };

    // const formatBytes = (bytes: any, decimals = 2) => {
    //     if (bytes === 0) return "0 Bytes";
    //     const k = 1024;
    //     const dm = decimals < 0 ? 0 : decimals;
    //     const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    //     const i = Math.floor(Math.log(bytes) / Math.log(k));
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    // };

    // const options = [
    //     { value: '', label: 'Select Category' },
    //     { value: 'Mobiles, Computers', label: 'Mobiles, Computers' },
    //     { value: 'TV, Appliances, Electronics', label: 'TV, Appliances, Electronics' },
    //     { value: "Men's Fashion", label: "Men's Fashion" },
    //     { value: "Women's Fashion", label: "Women's Fashion" },
    //     { value: 'Home, Kitchen, Pets', label: 'Home, Kitchen, Pets' },
    //     { value: 'Beauty, Health, Grocery', label: 'Beauty, Health, Grocery' },
    //     { value: 'Books', label: 'Books' },
    // ];

    // const productTypeSelect = [
    //     { value: '', label: 'Select Type' },
    //     { value: 'Single', label: 'Single' },
    //     { value: 'Unit', label: 'Unit' },
    //     { value: 'Boxed', label: 'Boxed' },
    // ];

    const genderSelect = [
        { value: '', label: 'Select Gender' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Unisex', label: 'Unisex' },
    ];

    assignObjectPaths(dataa);


    // dynamic form 
    const [fields, setFields] = useState([{ name: '', address: '', email: '', mob: '' }]);
    const [staticField, setStaticField] = useState<string>('');

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const values = [...fields];
        (values[index] as { [key: string]: string })[e.target.name] = e.target.value;
        setFields(values);
    };
    const handleAddField = () => {
        setFields([...fields, { name: '', address: '', email: '', mob: '' }]);
    };
    // const handleChangeStaticField = (e: ChangeEvent<HTMLInputElement>): void => {
    //     setStaticField(e.target.value);
    // };

    const handleRemoveField = (index: number) => {
        const values = [...fields];
        values.splice(index, 1);
        setFields(values);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', fields);
    };
    // dynamic form 
    return (
        <React.Fragment>
            <BreadCrumb title='Add Partnership Firm' pageTitle='PartnershipFirm' />
            <div className="grid grid-cols-1 xl:grid-cols-12 ">
                <div className="xl:col-span-12">
                    <div className="card ">
                        <div className="card-body ">
                            <h6 className="mb-4 text-15">Create PartnershipFirm</h6>

                            <form action="#!" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                                    <div className="xl:col-span-6">
                                        <label htmlFor="partnerNameInput" className="inline-block mb-2 text-base font-medium">Partnership Firm Name</label>
                                        <input type="text" id="partnershipFirmName" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter  Name of Partnership Firm " required />

                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="taxApplicable" className="inline-block mb-2 text-base font-medium">Partnership Firm Category</label>
                                        <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="PartnershipFirmCategory" id="PartnershipFirmCategory">
                                            <option value="">Select</option>
                                            <option value="pvtlimited">Pvt. Limited</option>
                                            <option value="publiclimited">Public Limited </option>
                                            {/* <option value="Exclusive">MSME</option>
                                            <option value="Professional">GST</option>
                                            <option value="Entertainment">Proff Tax</option>
                                            <option value="Entertainment">Other</option> */}
                                        </select>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium">Partnership Firm Email ID</label>
                                        <input type="email" id="PartnershipFirmEmailId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Partnership Firm Email Id" required />

                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium">Partnership Firm Pan Card</label>
                                        <input type="text" id="PartnershipFirmPanCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Partnership Firm PanCard" required />

                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Partnership Firm GST No.</label>
                                        <input type="text" id="PartnershipFirmGstNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Partnership Firm GST No" required />
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Partnership Firm City</label>
                                        <input type="text" id="PartnershipFirmCity" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Partnership Firm City" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Partnership Firm State</label>
                                        <input type="text" id="PartnershipFirmState" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Partnership Firm State" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Partnership Firm PIN Code</label>
                                        <input type="number" id="PartnershipFirmPINCode" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Partnership Firm PIN Code" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Partnership Firm Mobile No</label>
                                        <input type="number" id="PartnershipFirmMobileNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Partnership Firm Mobile No" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Partnership Firm's Total Employees</label>
                                        <input type="number" id="PartnershipFirmTotalEmployees" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Partnership Firm's Total Employees " required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Date of Incorporation</label>
                                        <input type="date" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Date of Incorporation" required />


                                    </div>
                                     
                                    
                                    
                                    
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Other</label>
                                        <textarea id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Other Details" required ></textarea>
                                    </div>     
                                </div>
                                  <h6 className="mt-4 text-15">Create Person</h6>
                                {/* <form > */}
                                {fields.map((field, index) => (


                                    <div key={index} className="col-6  ">
                                        <div className="flex justify-end gap-2 mt-4">
                                        {fields.length !== 1 &&  <button type="button"
                                                className="text-white btn bg-rose-500 border-rose-500 hover:text-white hover:bg-rose-600 hover:border-rose-600 focus:text-white focus:bg-rose-600 focus:border-rose-600 focus:ring focus:ring-rose-100 active:text-white active:bg-rose-600 active:border-rose-600 active:ring active:ring-rose-100 dark:ring-rose-400/20 mt-3 " onClick={() => handleRemoveField(index)}>Remove</button>}
                                            <button type="button" className="text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 mt-3 mr-5" onClick={handleAddField}  >Add  Partner</button>
                                        </div>

                                        <div className=" ">
                                          <div className=" grid grid-cols-2 gap-2">
                                        <div className="lg:w-3/7 md:w-4/7 w-5/6" >
                                            <label htmlFor="Name" className="inline-block mb-2 text-base font-medium">Patner Name</label>
                                            <input
                                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                type="text"
                                                name="name"
                                                placeholder="Enter Your Patner Name"
                                                value={field.name}
                                                onChange={(e) => handleChange(index, e)}

                                            />
                                        </div>

                                        {/* <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                        <label htmlFor="productDescription" className="inline-block mb-2 text-base font-medium">Address</label>
                                        <textarea
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"

                                            name="address"
                                            placeholder="Enter Your Address"
                                            value={field.address}
                                            onChange={(e) => handleChange(index, e)}

                                        ></textarea>
                                        </div> */}

                                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                            <label htmlFor="productDescription" className="inline-block mb-2 text-base font-medium">Patner Email ID</label>
                                            <input
                                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"

                                                type="email"
                                                name="email"
                                                placeholder="Enter Your Patner Email ID"
                                                value={field.email}
                                                onChange={(e) => handleChange(index, e)}

                                            />
                                        </div>
                                         <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                            <label htmlFor="productDescription" className="inline-block mb-2 text-base font-medium">Patner Mobile No</label>
                                            <input
                                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                type="tel"
                                                name="mob"
                                                placeholder="Enter Your Patner Mobile No"
                                                value={field.mob}
                                                onChange={(e) => handleChange(index, e)}

                                            />
                                        </div> 
                                        
                                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                            <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium">Patner Aadhar Card</label>
                                            <input type="text" id="PatnerAadharCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Partner Aadhar" required />

                                        </div>
                                        

                                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                            <label htmlFor="productPrice" className="inline-block mb-2 text-base font-medium">Patner Pan Card</label>
                                            <input type="text" id="partnerPanCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Patner Pan Card" required />
                                        </div>

                                    
                                        
                                    </div>
                                    </div> 
                                    </div>
                                ))}

                                <div className="flex justify-end gap-2 mt-4">
                                    <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                                    <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">Create Company</button>

                                </div>

                                 
                            </form>
                        </div>
                    </div>
                </div>
                 
            </div>
        </React.Fragment>
    );
};

export default PartnershipForm;