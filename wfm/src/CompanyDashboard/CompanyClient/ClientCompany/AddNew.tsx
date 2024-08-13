import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Flatpickr from 'react-flatpickr';
// import BreadCrumb from "Common/BreadCrumb";
import BreadCrumb from "CompanyDashboard/CompanyCommon/BreadCrumb";
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
const CompanyFormIndividual = () => {

    const genderSelect = [
        { value: '', label: 'Select Gender' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Unisex', label: 'Unisex' },
    ];


    assignObjectPaths(dataa);

    // dynamic form 
    const [fields, setFields] = useState([{
        name: '',
        address: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        placeOfBirth: '',
        pan: '',
        aadhar: '',
        nationality: '',
        passportNumber: '',
        qualification: '',
        occupation: '',
        services: []
    }]);
    // const [staticField, setStaticField] = useState<string>('');

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...fields];
        values[index] = {
            ...values[index],
            [e.target.name]: e.target.value
        };
        setFields(values);
    };
    const handleAddField = () => {
        setFields([...fields, {
            name: '',
            address: '',
            email: '',
            gender: '',
            dateOfBirth: '',
            placeOfBirth: '',
            pan: '',
            aadhar: '',
            nationality: '',
            passportNumber: '',
            qualification: '',
            occupation: '',
            services: []
        }]);
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
            <BreadCrumb title='Add Company' pageTitle='Company' />
            <div className="grid grid-cols-1 xl:grid-cols-12 ">
                <div className="xl:col-span-12 ">
                    <div className="card ">
                        <div className="card-body ">
                            <h6 className="mb-4 text-15">Create Company</h6>

                            <form action="#!" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                                    <div className="xl:col-span-6">
                                        <label htmlFor="productNameInput" className="inline-block mb-2 text-base font-medium">Name of Company</label>
                                        <input type="text" id="companyNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Name of Company" required />

                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="taxApplicable" className="inline-block mb-2 text-base font-medium">Business Registration </label>
                                        <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="taxApplicable" id="taxApplicable">
                                            <option value="">Select Registration</option>
                                            <option value="none">Trademark</option>
                                            <option value="Exclusive">MSME</option>
                                            <option value="Professional">GST</option>
                                            <option value="Entertainment">Proff Tax</option>
                                            <option value="Entertainment">Other</option>
                                        </select>
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium"> Company Mail </label>
                                        <input type="email" id="mailInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium">CIN</label>
                                        <input type="text" id="productCodeInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your CIN" required />

                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">PAN</label>
                                        <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  PAN" required />
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">TAN</label>
                                        <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  TAN" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Nature of Business</label>
                                        <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Nature of Business" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Date of Incorporation</label>
                                        <input type="date" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Date of Incorporation" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Bank Name</label>
                                        <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Bank Name" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium"> Branch Name</label>
                                        <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Branch Name" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Account Number</label>
                                        <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Account Number" required />


                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">IFSC Code</label>
                                        <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  IFSC Code" required />


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
                                            {fields.length !== 1 && <button type="button"
                                                className="text-white btn bg-rose-500 border-rose-500 hover:text-white hover:bg-rose-600 hover:border-rose-600 focus:text-white focus:bg-rose-600 focus:border-rose-600 focus:ring focus:ring-rose-100 active:text-white active:bg-rose-600 active:border-rose-600 active:ring active:ring-rose-100 dark:ring-rose-400/20 mt-3 " onClick={() => handleRemoveField(index)}>Remove</button>}
                                            <button type="button" className="text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 mt-3 mr-5" onClick={handleAddField}  >Add Person</button>
                                        </div>

                                        <div className=" ">
                                            <div className=" grid grid-cols-2 gap-2">
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6" >
                                                    <label htmlFor="Name" className="inline-block mb-2 text-base font-medium">Name</label>
                                                    <input
                                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                        type="text"
                                                        name="name"
                                                        placeholder="Enter Your Name"
                                                        value={field.name}
                                                        onChange={(e) => handleChange(index, e)}

                                                    />
                                                </div>

                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="productDescription" className="inline-block mb-2 text-base font-medium">Address</label>
                                                    <textarea
                                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"

                                                        name="address"
                                                        placeholder="Enter Your Address"
                                                        value={field.address}
                                                        onChange={(e) => handleChange(index, e)}

                                                    ></textarea>
                                                </div>

                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="productDescription" className="inline-block mb-2 text-base font-medium">Email</label>
                                                    <input
                                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"

                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter Your  email"
                                                        value={field.email}
                                                        onChange={(e) => handleChange(index, e)}

                                                    />
                                                </div>

                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="genderSelect" className="inline-block mb-2 text-base font-medium">Gender</label>
                                                    <Select
                                                        className="border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                        options={genderSelect}
                                                        isSearchable={false} // To disable search
                                                        name="genderSelect"
                                                        id="genderSelect"

                                                    />
                                                </div>
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="dateOfBirth" className="inline-block mb-2 text-base font-medium">Date of  Birth</label>
                                                    <input
                                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                        type="date" placeholder="Enter Your  Date Of Birth"
                                                        name="dateofbirth"
                                                        onChange={(e) => handleChange(index, e)}
                                                    />
                                                </div>
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="productTag" className="inline-block mb-2 text-base font-medium">Place of Birth</label>
                                                    <input className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" id="productTag" data-choices data-choices-text-unique-true type="text" placeholder=" Enter Your Place of Birth" />
                                                </div>
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">PAN</label>
                                                    <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  PAN" required />
                                                </div>
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium">Aadhar</label>
                                                    <input type="text" id="productCodeInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Aadhar" required />

                                                </div>
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="brandInput" className="inline-block mb-2 text-base font-medium">Nationality</label>
                                                    <input type="text" id="brandInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder=" Enter Your Nationality" required />
                                                </div>

                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="productPrice" className="inline-block mb-2 text-base font-medium">Passport Number</label>
                                                    <input type="text" id="productPrice" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Passport Number" required />
                                                </div>

                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="productPrice" className="inline-block mb-2 text-base font-medium">Qualification</label>
                                                    <input type="text" id="productPrice" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Qualification" required />
                                                </div>
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="productPrice" className="inline-block mb-2 text-base font-medium">Occupation</label>
                                                    <input type="text" id="productPrice" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Occupation" required />

                                                </div>
                                                <div className="lg:w-3/7 md:w-4/7 w-5/6">
                                                    <label htmlFor="services" className="inline-block mb-1 text-base font-medium">Services</label>
                                                    <DropdownTreeSelect
                                                        data={dataa}
                                                        onChange={onchange}
                                                        className="mdl-demo"
                                                    />
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

export default CompanyFormIndividual;