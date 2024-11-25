import React, { useState } from 'react';
import BreadCrumb from 'CompanyDashboard/CompanyCommon/BreadCrumb';
import { Search, Plus, Download } from 'lucide-react';

import FileDrop from './FileDrop';

// import { FileUploader } from "react-drag-drop-files";
// const fileTypes: string[] = ["JPEG", "PNG", "GIF"];
// import TableContainer from 'CompanyDashboard/CompanyCommon/TableContainer';
// import filterDataBySearch from 'CompanyDashboard/CompanyCommon/filterDataBySearch';


// impot external ddata 
// import BreadCrumb from "CompanyDashboard/CompanyCommon/BreadCrumb";
import Select from 'react-select';
interface Option {
  readonly label: string;
  readonly value?: string;
  readonly options?: Option[];
  readonly isDisabled?: boolean
}
// import DropdownTreeSelect from "react-dropdown-tree-select";
// import 'react-dropdown-tree-select/dist/styles.css'

// import dataa from './data.json';
// Icon


// Image

interface Node {
  path: string;
  [key: string]: any;
}
const onchange = (currentNode: Node, selectedNodes: Node[]) => {
  console.log("path::", currentNode.path);
};

// const assignObjectPaths = (obj: Node, stack?: string) => {
//     Object.keys(obj).forEach((k) => {
//         const node = obj[k];
//         if (typeof node === "object") {
//             node.path = stack ? `${stack}.${k}` : k;
//             assignObjectPaths(node, node.path);
//         }
//     });
// };
// impot external ddata end

import { ToastContainer } from 'react-toastify';
const options = [
  { value: 'form1', label: 'Company' },
  { value: 'form2', label: 'Individual' },
  { value: 'form3', label: 'Proprietor' },
  { value: 'form4', label: 'Partnership' },
  { value: 'form5', label: 'Trust/AOP' },
  { value: 'form6', label: 'Society' },
  { value: 'form7', label: 'Other' },

];

// import SearchableSelect from './SearchableSelectDasignation';

// const option = [
//   { value: '1', label: 'Director' },
//   { value: '2', label: 'Partner' },
//   { value: '3', label: 'Trustee' },
//   { value: '4', label: 'Member' },
//   { value: '5', label: 'Manager' },
//   { value: '6', label: 'Other' },

// ];

// const MultipleOptions: Option[] = [
//   { label: "Director  ", value: "Director" },
//   { label: "Partner  ", value: "Partner" },
//   { label: "Trustee ", value: "Trustee" },
//   { label: "Member  ", value: "Member" },
//   { label: "Manager ", value: "Manager" },
//   { label: "Other  ", value: "Other" }
// ];
// add more options as needed


interface FormField {
  name: string;
  address: string;
  email: string;
  gender: string | null;
  dateOfBirth: string;
  placeOfBirth: string;
  pan: string;
  aadhar: string;
  nationality: string;
  passportNumber: string;
  qualification: string;
  occupation: string;
  designation: any; // Update this with appropriate type based on SearchableSelect options
}
const Form1 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  // dasignation 

  const Designation: Option[] = [
    { label: "Director  ", value: "Director" },
    { label: "Partner  ", value: "Partner" },
    { label: "Trustee ", value: "Trustee" },
    { label: "Member  ", value: "Member" },
    { label: "Manager ", value: "Manager" },
    { label: "Other  ", value: "Other" }

    // add more options as needed
  ];
  // dasignation 
  // external data 
  const genderSelect = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Unisex', label: 'Unisex' },
  ];


  // assignObjectPaths(dataa);

  // dynamic form 
  const [fields, setFields] = useState<FormField[]>([
    { name: '', address: '', email: '', gender: null, dateOfBirth: '', placeOfBirth: '', pan: '', aadhar: '', nationality: '', passportNumber: '', qualification: '', occupation: '', designation: null }
  ]);
  // const [staticField, setStaticField] = useState<string>('');

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const values = [...fields];
    const { name, value } = event.target;
    values[index][name as keyof FormField] = value;
    setFields(values);
  };
  const handleAddField = () => {
    setFields([...fields, {
      name: '', address: '', email: '', gender: null, dateOfBirth: '', placeOfBirth: '', pan: '', aadhar: '', nationality: '', passportNumber: '', qualification: '', occupation: '', designation: null,

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
    onSubmit({ type: 'company', field1, field2 });
    setField1('');
    setField2('');
    console.log('Form submitted:', fields);
  };
  // dynamic form
  // external data end


  // SearchableSelect designation

  type Option = {
    label: string;
    value: string;
  };
  const handleOptionChange = (option: Option | null) => {
    console.log('Selected option:', option);
  };

  // SearchableSelect designation end

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  //   const handleSubmit = (event: React.FormEvent) => {
  //     event.preventDefault();
  //     onSubmit({ type: 'company', field1, field2 });
  //     setField1('');
  //     setField2('');
  //   };


  return (
    <React.Fragment>
      <BreadCrumb title=' Company List' pageTitle='Company' />
      <ToastContainer closeButton={false} limit={1} />
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
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="taxApplicable" id="taxApplicable"
                    >
                      <option value="">Select Registration</option>
                      <option value="none">Trademark</option>
                      <option value="Exclusive">MSME</option>
                      <option value="Professional">GST</option>
                      <option value="Entertainment">Proff Tax</option>
                      <option value="Entertainment">Other</option>
                    </select>
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium">   Mail </label>
                    <input type="email" id="mailInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Password</label>
                    <input type="password" id="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Password" required />

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


                  <div key={index} className="col-6">
                    <div className="flex justify-end gap-2 mt-4">
                      {fields.length !== 1 && <button type="button"
                        className="text-white btn bg-rose-500 border-rose-500 hover:text-white hover:bg-rose-600 hover:border-rose-600 focus:text-white focus:bg-rose-600 focus:border-rose-600 focus:ring focus:ring-rose-100 active:text-white active:bg-rose-600 active:border-rose-600 active:ring active:ring-rose-100 dark:ring-rose-400/20 mt-3 " onClick={() => handleRemoveField(index)}>Remove</button>}
                      <button type="button" className="text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 mt-3 mr-5" onClick={handleAddField}  >Add Person</button>
                    </div>

                    <div className=" ">
                      <div className=" grid grid-cols-2 gap-2">
                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`name-${index}`} className="inline-block mb-2 text-base font-medium">
                            Name
                          </label>
                          <input
                            id={`name-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={field.name}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`address-${index}`} className="inline-block mb-2 text-base font-medium">
                            Address
                          </label>
                          <textarea
                            id={`address-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            name="address"
                            placeholder="Enter Your Address"
                            value={field.address}
                            onChange={(e) => handleChange(index, e)}
                          ></textarea>
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`email-${index}`} className="inline-block mb-2 text-base font-medium">
                            Email
                          </label>
                          <input
                            id={`email-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            value={field.email}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`genderSelect-${index}`} className="inline-block mb-2 text-base font-medium">
                            Gender
                          </label>
                          <Select
                            id={`genderSelect-${index}`}
                            className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            options={genderSelect}
                            isSearchable={true}
                            name="genderSelect"
                            value={genderSelect.find(option => option.value === field.gender)} // Match by value
                            onChange={(option) => handleChange(index, { target: { name: 'gender', value: option?.value } })}
                          />
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`dateOfBirth-${index}`} className="inline-block mb-2 text-base font-medium">
                            Date of Birth
                          </label>
                          <input
                            id={`dateOfBirth-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter Your Date Of Birth"
                            value={field.dateOfBirth}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`placeOfBirth-${index}`} className="inline-block mb-2 text-base font-medium">
                            Place of Birth
                          </label>
                          <input
                            id={`placeOfBirth-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="placeOfBirth"
                            placeholder="Enter Your Place of Birth"
                            value={field.placeOfBirth}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor="pan" className="inline-block mb-2 text-base font-medium">PAN</label>
                          <input
                            id={`pan-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="pan"
                            placeholder="Enter Your PAN"
                            value={field.pan}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`aadhar-${index}`} className="inline-block mb-2 text-base font-medium">Aadhar</label>
                          <input
                            id={`aadhar-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="aadhar"
                            placeholder="Enter Your Aadhar"
                            required
                            value={field.aadhar}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`nationality-${index}`} className="inline-block mb-2 text-base font-medium">Nationality</label>
                          <input
                            id={`nationality-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="nationality"
                            placeholder="Enter Your Nationality"
                            required
                            value={field.nationality}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>
                        {/* dasignation  */}
                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor="Designation" className="inline-block mb-2 text-base font-medium">Designation</label>
                          <Select
                            className="border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            id="choices-single-no-sorting"
                            name="choices-single-no-sorting"
                            data-choices data-choices-sorting-false
                            options={Designation}
                          />

                        </div>
                        {/* dasignation end */}

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`passportNumber-${index}`} className="inline-block mb-2 text-base font-medium">Passport Number</label>
                          <input
                            id={`passportNumber-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="passportNumber"
                            placeholder="Enter Your Passport Number"
                            required
                            value={field.passportNumber}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`qualification-${index}`} className="inline-block mb-2 text-base font-medium">Qualification</label>
                          <input
                            id={`qualification-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="qualification"
                            placeholder="Enter Your Qualification"
                            required
                            value={field.qualification}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>

                        <div className="lg:w-3/7 md:w-4/7 w-5/6">
                          <label htmlFor={`occupation-${index}`} className="inline-block mb-2 text-base font-medium">Occupation</label>
                          <input
                            id={`occupation-${index}`}
                            className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            type="text"
                            name="occupation"
                            placeholder="Enter Your Occupation"
                            required
                            value={field.occupation}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </div>


                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end gap-2 mt-4">
                  <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                  <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Create Company</button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="field1">Field 1</label></td>
            <td><input type="text" id="field1" value={field1} onChange={(e) => setField1(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="field2">Field 2</label></td>
            <td><input type="text" id="field2" value={field2} onChange={(e) => setField2(e.target.value)} /></td>
          </tr>
          <tr>
            <td colSpan={2}><button type="submit">Submit company</button></td>
          </tr>
        </tbody>
      </table>
    </form> */}
    </React.Fragment>
  );
};



//  darg and drop 
import Dropzone from "react-dropzone"
import { UploadCloud } from "lucide-react";
const Form2 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [fieldA, setFieldA] = useState('');
  const [fieldB, setFieldB] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ type: 'Individual', fieldA, fieldB });
    setFieldA('');
    setFieldB('');
  };



  // const [file, setFile] = useState<File | null>(null);

  // const handleChanges = (file: File[]): void => {
  //   setFile(file[0]);
  // };


  // drag&drop 
  const [selectedFiles, setSelectedFiles] = React.useState<any>([])

  const handleAcceptedFiles = (files: any) => {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setSelectedFiles(files)
  }
  const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  // drag&drop end


  return (

    <React.Fragment>
      <BreadCrumb title=' Individual List' pageTitle='Individual' />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 xl:grid-cols-12 ">
        <div className="xl:col-span-12 ">
          <div className="card ">
            <div className="card-body ">
              <h6 className="mb-4 text-15">Create Individual Client</h6>

              <form action="#!" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                  <div className="xl:col-span-6">
                    <label htmlFor="name" className="inline-block mb-2 text-base font-medium">Name</label>
                    <input type="text" id="name" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Name" required />

                  </div>

                  <div className="xl:col-span-6">
                    <label htmlFor="clientGender" className="inline-block mb-2 text-base font-medium">Gender </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="clientGender" id="clientGender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>

                    </select>
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium">   Email </label>
                    <input type="email" id="mailInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium">password</label>
                    <input type="password" id="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Password" required />

                  </div>
                  <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium">   Category</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="clientCategory"
                      name="clientCategory"

                    >
                      <option value="">Select Client Category  </option>
                      <option value="Individual">Individual</option>
                      <option value="Proprietor">Proprietor </option>
                      <option value="Partnership Firm">Partnership Firm</option>
                      <option value="LLP">LLP</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="AOP/ BOI">AOP/ BOI</option>
                      <option value="Trust">Trust</option>
                      <option value="Society">Society</option>
                      <option value="HUF">HUF</option>
                    </select>

                  </div>
                  <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium">  Industry Type</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="industryType"
                      name="industryType"

                    >
                      <option value="">Select Industry Type </option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Trading">Trading </option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Job Work">Job Work</option>
                      <option value="Professionals">Professionals</option>

                    </select>

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="nationality" className="inline-block mb-2 text-base font-medium">Nationality</label>
                    <input type="text" id="nationality" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Nationality" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="mobileNo." className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                    <input type="number" id="mobileNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Mobile No" required />
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="panCard" className="inline-block mb-2 text-base font-medium">PAN Card</label>
                    <input type="text" id="panCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Pan Card" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="aadharCard" className="inline-block mb-2 text-base font-medium">Aadhar Card</label>
                    <input type="text" id="aadharCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Aadhar Card" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="dateOfBirth" className="inline-block mb-2 text-base font-medium">Date of Birth</label>
                    <input type="date" id="dateOfBirth" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Date of Date Of Birth" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="passportNumber" className="inline-block mb-2 text-base font-medium">Passport Number</label>
                    <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Passport Number" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="NatureOfBusinessBusinessCategory" className="inline-block mb-2 text-base font-medium">Nature Of Business / Business Category </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="clientGender" id="NatureOfBusinessBusinessCategory">
                      <option value="">Select </option>
                      <option value="msme">MSME</option>
                      <option value="gst">GST</option>
                      <option value="proffTex">Proff. Tex</option>

                    </select>
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="QualificationInput" className="inline-block mb-2 text-base font-medium">Qualification</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Qualification"
                      name="qualification"

                    />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="occupationInput" className="inline-block mb-2 text-base font-medium">Occupation</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Occupation"
                      name="occupation"

                    />

                  </div>
                  <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium">Type of Bussinass</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="statusSelect"
                      name="typeofbussinass"

                    >
                      <option value="">Select Type Of Bussinass</option>
                      <option value="SoleProprietorship">Sole Proprietorship</option>
                      <option value="PartnershipFirm">Partnership Firm</option>
                      <option value="LimitedLiabilityPartnership(LLP)">Limited Liability Partnership (LLP)</option>
                      <option value="PrivateLimitedCompany">Private Limited Company</option>
                      <option value="PublicLimitedCompany">Public Limited Company</option>
                      <option value="Section8Company(Non-Profit)/CharitableTrust/EducationTrustetc">Section 8 Company (Non-Profit)/ Charitable Trust/ Education Trust etc</option>
                    </select>

                  </div>


                  <div className="xl:col-span-6">
                    <label htmlFor="other" className="inline-block mb-2 text-base font-medium">Other</label>
                    <input type="text" id="other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter  Other's Details"
                      name="other"

                    />

                  </div>
                  {/* drag&drop  */}
                  <div className="xl:col-span-6">

                    <label htmlFor="Dropzone" className="inline-block mb-2 text-base font-medium">Dropzone</label>
                    <div className="flex items-center justify-center border rounded-md cursor-pointer bg-slate-100 dropzone border-slate-200 dark:bg-zink-600 dark:border-zink-500 dz-clickable">

                      <Dropzone
                        onDrop={(acceptedFiles: any) => {
                          handleAcceptedFiles(acceptedFiles)
                        }}
                      >
                        {({ getRootProps, getInputProps }: any) => (
                          <div
                            className="w-full py-5 text-lg text-center dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <UploadCloud className="block size-12 mx-auto text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500"></UploadCloud>
                            </div>

                            <h5 className="mb-0 font-normal text-slate-500 text-15">Drag and drop your files or <a href="#!">browse</a> your files</h5>
                          </div>
                        )}
                      </Dropzone>
                    </div>

                    <ul className="mb-0" id="dropzone-preview">
                      {
                        (selectedFiles || [])?.map((f: any, i: any) => {
                          return (
                            <li className="mt-2" id="dropzone-preview-list" key={i + "-file"}>
                              <div className="border rounded border-slate-200 dark:border-zink-500">
                                <div className="flex p-2">
                                  <div className="shrink-0 me-3">
                                    <div className="p-2 rounded-md size-14 bg-slate-100 dark:bg-zink-600">
                                      <img data-dz-thumbnail className="block w-full h-full rounded-md" src={f.preview} alt={f.name} />
                                    </div>
                                  </div>
                                  <div className="grow">
                                    <div className="pt-1">
                                      <h5 className="mb-1 text-15" data-dz-name>{f.name}</h5>
                                      <p className="mb-0 text-slate-500 dark:text-zink-200" data-dz-size>{f.formattedSize}</p>
                                    </div>
                                  </div>
                                  <div className="shrink-0 ms-3">
                                    <button data-dz-remove
                                      className="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
                                      onClick={() => {
                                        const newImages = [...selectedFiles];
                                        newImages.splice(i, 1);
                                        setSelectedFiles(newImages);
                                      }}
                                    >Delete</button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>

                  </div>
                  {/* drag&drop end */}

                  {/* drag and drop  */}
                  {/* <div className="w-auto max-w-md">                         <FileUploader
                    multiple={true}
                    handleChange={<FileUploader
                      multiple={true}
                      handleChange={handleChanges}
                      name="file"
                      types={fileTypes}
                    />}
                    name="file"
                    types={fileTypes}
                  />
                  </div> */}




                </div>




                {/* <form > */}


                <div className="flex justify-end gap-2 mt-4">
                  <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                  <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Create Individual  Client</button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="fieldA">Field A</label></td>
            <td><input type="text" id="fieldA" value={fieldA} onChange={(e) => setFieldA(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="fieldB">Field B</label></td>
            <td><input type="text" id="fieldB" value={fieldB} onChange={(e) => setFieldB(e.target.value)} /></td>
          </tr>
          <tr>
            <td colSpan={2}><button type="submit">Submit Individual</button></td>
          </tr>
        </tbody>
      </table>
    </form> */}
    </React.Fragment>
  );
};

// ++++++++++=====================================++++++++++++++



const Form3 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [proprietorA, setProprietorA] = useState('');
  const [proprietorB, setProprietorB] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ type: 'Proprietor', proprietorA, proprietorB });
    setProprietorA('');
    setProprietorB('');
  };



  // const [file, setFile] = useState<File | null>(null);

  // const handleChanges = (file: File[]): void => {
  //   setFile(file[0]);
  // };

  return (

    <React.Fragment>
      <BreadCrumb title=' Proprietor List' pageTitle='Proprietor' />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 xl:grid-cols-12 ">
        <div className="xl:col-span-12 ">
          <div className="card ">
            <div className="card-body ">
              <h6 className="mb-4 text-15">Create Proprietor</h6>

              <form action="#!" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientId" className="inline-block mb-2 text-base font-medium">Name</label>
                    <input type="text" id="clientId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Name" required />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofProprietor" className="inline-block mb-2 text-base font-medium">Name of Proprietor </label>
                    <input type="text" id="NameofProprietor" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Proprietor" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofFirm" className="inline-block mb-2 text-base font-medium">Name of Firm </label>
                    <input type="text" id="NameofFirm" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Firm" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="GSTNo" className="inline-block mb-2 text-base font-medium">GST No </label>
                    <input type="number" id="GSTNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter GST No" required />

                  </div>

                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientGender" className="inline-block mb-2 text-base font-medium">Gender </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="clientGender" id="clientGender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>

                    </select>
                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="proprietorEmail" className="inline-block mb-2 text-base font-medium"> Email </label>
                    <input type="email" id="proprietorEmail" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium"> Password </label>
                    <input type="password" id="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                  </div>
                  <div className="xl:col-span-6 mb-3">
                    <label htmlFor="companyCategoryType" className="inline-block mb-2 text-base font-medium"> Company Category/Type</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="companyCategoryType"
                      name="companyCategoryType"

                    >
                      <option value="">Select Company Category  </option>
                      <option value="">#</option>
                      <option value="">#</option>

                    </select>

                  </div>
                  {/* <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium"> Industry Type</label>
                    <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="industryType"
                      name="industryType"

                    >
                      <option value="">Select Industry Type </option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Trading">Trading </option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Job Work">Job Work</option>
                      <option value="Professionals">Professionals</option>

                    </select>

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="MSMERegNo" className="inline-block mb-2 text-base font-medium">MSME Reg. No.</label>
                    <input type="text" id="MSMERegNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your MSME Reg. No." required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="mobileNo." className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                    <input type="number" id="mobileNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Mobile No" required />
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="panCard" className="inline-block mb-2 text-base font-medium">PAN Card</label>
                    <input type="text" id="panCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Pan Card" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="ProfessionalTax/Gumasta" className="inline-block mb-2 text-base font-medium">Professional Tax/ Gumasta</label>
                    <input type="text" id="ProfessionalTax/Gumasta" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Professional Tax/ Gumasta" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="dateOfBirth" className="inline-block mb-2 text-base font-medium">Date of Birth</label>
                    <input type="date" id="dateOfBirth" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Date of Date Of Birth" required />


                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="passportNumber" className="inline-block mb-2 text-base font-medium">Passport Number</label>
                    <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Bank Name" required />


                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="Group" className="inline-block mb-2 text-base font-medium">Group</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="Group" id="Group">
                      <option value="">Select </option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>

                    </select>
                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="QualificationInput" className="inline-block mb-2 text-base font-medium">Qualification</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Qualification"
                      name="qualification"

                    />

                  </div> */}
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="occupationInput" className="inline-block mb-2 text-base font-medium">Occupation</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Occupation"
                      name="occupation"

                    />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="serviceCategory" className="inline-block mb-2 text-base font-medium">Service Category </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="serviceCategory"
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


                  <div className="xl:col-span-6">
                    <label htmlFor="Address" className="inline-block mb-2 text-base font-medium">Address</label>
                    <textarea id="Addresss" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Address" required ></textarea>


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="Other" className="inline-block mb-2 text-base font-medium">Other</label>
                    <textarea id="Other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Other Details" required ></textarea>


                  </div>

                </div>




                {/* <form > */}


                <div className="flex justify-end gap-2 mt-4">
                  <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                  <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Create Proprietor</button>

                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="fieldA">Field A</label></td>
            <td><input type="text" id="fieldA" value={fieldA} onChange={(e) => setFieldA(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="fieldB">Field B</label></td>
            <td><input type="text" id="fieldB" value={fieldB} onChange={(e) => setFieldB(e.target.value)} /></td>
          </tr>
          <tr>
            <td colSpan={2}><button type="submit">Submit Individual</button></td>
          </tr>
        </tbody>
      </table>
    </form> */}
    </React.Fragment>
  );
};


// ===============================================================
const Form4 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [partnershipA, setPartnershipA] = useState('');
  const [partnershipB, setPartnershipB] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ type: 'Partnership', partnershipA, partnershipB });
    setPartnershipA('');
    setPartnershipB('');
  };



  // const [file, setFile] = useState<File | null>(null);

  // const handleChanges = (file: File[]): void => {
  //   setFile(file[0]);
  // };


  return (

    <React.Fragment>
      <BreadCrumb title=' Partnership List' pageTitle='Partnership' />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 xl:grid-cols-12 ">
        <div className="xl:col-span-12 ">
          <div className="card ">
            <div className="card-body ">
              <h6 className="mb-4 text-15">Create Partnership</h6>

              <form action="#!" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                  <div className="xl:col-span-6">
                    <label htmlFor="partnerNameInput" className="inline-block mb-2 text-base font-medium"> Firm Name</label>
                    <input type="text" id="partnershipFirmName" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter  Name of Partnership Firm " required />

                  </div>

                  <div className="xl:col-span-6">
                    <label htmlFor="taxApplicable" className="inline-block mb-2 text-base font-medium"> Firm Category</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="PartnershipFirmCategory" id="PartnershipFirmCategory">
                      <option value="">Select</option>
                      <option value="pvtlimited">Pvt. Limited</option>
                      <option value="publiclimited">Public Limited </option>

                    </select>
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="productCodeInput" className="inline-block mb-2 text-base font-medium"> Firm Email</label>
                    <input type="email" id="PartnershipFirmEmailId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm Email" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium"> Firm Password</label>
                    <input type="password" id="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm Password" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="partnershipFirmPanCard" className="inline-block mb-2 text-base font-medium">  Firm Pan Card</label>
                    <input type="text" id="PartnershipFirmPanCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm Pan Card" required />

                  </div>

                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientGender" className="inline-block mb-2 text-base font-medium">Gender </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="clientGender" id="clientGender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>

                    </select>
                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium"> Firm GST No.</label>
                    <input type="text" id="PartnershipFirmGstNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm GST No" required />
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">  Firm State</label>
                    <input type="text" id="PartnershipFirmState" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm State" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">  Firm City</label>
                    <input type="text" id="PartnershipFirmCity" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm City" required />


                  </div>
                  {/* <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium"> Industry Type</label>
                    <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="industryType"
                      name="industryType"

                    >
                      <option value="">Select Industry Type </option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Trading">Trading </option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Job Work">Job Work</option>
                      <option value="Professionals">Professionals</option>

                    </select>

                  </div> */}
                
                  <div className="xl:col-span-6">
                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">  Firm PIN Code</label>
                    <input type="number" id="PartnershipFirmPINCode" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm PIN Code" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">  Firm Mobile No</label>
                    <input type="number" id="PartnershipFirmMobileNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm Mobile No" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">  Firm's Total Employees</label>
                    <input type="number" id="PartnershipFirmTotalEmployees" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Firm's Total Employees " required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Date of Incorporation</label>
                    <input type="date" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Date of Incorporation" required />


                  </div>



                  <div className="xl:col-span-6">
                    <label htmlFor="Other" className="inline-block mb-2 text-base font-medium">Other</label>
                    <textarea id="Other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Other Details" required ></textarea>


                  </div>

                </div>
                {/* <form > */}


                <div className="flex justify-end gap-2 mt-4">
                  <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                  <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Create  Partnership</button>

                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="fieldA">Field A</label></td>
            <td><input type="text" id="fieldA" value={fieldA} onChange={(e) => setFieldA(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="fieldB">Field B</label></td>
            <td><input type="text" id="fieldB" value={fieldB} onChange={(e) => setFieldB(e.target.value)} /></td>
          </tr>
          <tr>
            <td colSpan={2}><button type="submit">Submit Individual</button></td>
          </tr>
        </tbody>
      </table>
    </form> */}
    </React.Fragment>
  );
};

// =============================================================

const Form5 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [TrustaopA, setTrustaopA] = useState('');
  const [TrustaopB, setTrustaopB] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ type: 'Trust/AOP', TrustaopA, TrustaopB });
    setTrustaopA('');
    setTrustaopB('');
  };



  // const [file, setFile] = useState<File | null>(null);

  // const handleChanges = (file: File[]): void => {
  //   setFile(file[0]);
  // };

  return (

    <React.Fragment>
      <BreadCrumb title='Trust/AOP List' pageTitle='Trust/AOP' />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 xl:grid-cols-12 ">
        <div className="xl:col-span-12 ">
          <div className="card ">
            <div className="card-body ">
              <h6 className="mb-4 text-15">Create Trust/AOP</h6>

              <form action="#!" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientId" className="inline-block mb-2 text-base font-medium">Client ID </label>
                    <input type="number" id="clientId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Client Id" required />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofTrustAop" className="inline-block mb-2 text-base font-medium">Name of Trust / AOP </label>
                    <input type="text" id="NameofTrustAop" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Trust / AOP" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofTrusteeMember" className="inline-block mb-2 text-base font-medium">Name of Trustee / Member</label>
                    <input type="text" id="NameofTrusteeMember" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Trustee / Member" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofRegistrationNo" className="inline-block mb-2 text-base font-medium">Registration No.</label>
                    <input type="text" id="NameofRegistrationNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Registration No." required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="GSTNo" className="inline-block mb-2 text-base font-medium">GST No </label>
                    <input type="number" id="GSTNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter GST No" required />

                  </div>

                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientGender" className="inline-block mb-2 text-base font-medium">Gender </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="clientGender" id="clientGender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>

                    </select>
                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="proprietorEmail" className="inline-block mb-2 text-base font-medium"> Email </label>
                    <input type="email" id="proprietorEmail" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium"> Password </label>
                    <input type="password" id="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Password" required />

                  </div>
                  <div className="xl:col-span-6 mb-3">
                    <label htmlFor="companyCategoryType" className="inline-block mb-2 text-base font-medium"> Company Category/Type</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="companyCategoryType"
                      name="companyCategoryType"

                    >
                      <option value="">Select Company Category  </option>
                      <option value="Pvt. Ltd.">Pvt. Ltd.</option>
                      <option value="Public Ltd.">Public Ltd.</option>
                      <option value="Section 8">Section 8</option>
                      <option value="Other">Other</option>

                    </select>

                  </div>
                  {/* <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium"> Industry Type</label>
                    <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="industryType"
                      name="industryType"

                    >
                      <option value="">Select Industry Type </option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Trading">Trading </option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Job Work">Job Work</option>
                      <option value="Professionals">Professionals</option>

                    </select>

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="MSMERegNo" className="inline-block mb-2 text-base font-medium">MSME Reg. No.</label>
                    <input type="text" id="MSMERegNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your MSME Reg. No." required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="mobileNo." className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                    <input type="number" id="mobileNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Mobile No" required />
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="panCard" className="inline-block mb-2 text-base font-medium">PAN Card</label>
                    <input type="text" id="panCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Pan Card" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="ProfessionalTax/Gumasta" className="inline-block mb-2 text-base font-medium">Professional Tax/ Gumasta</label>
                    <input type="text" id="ProfessionalTax/Gumasta" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Professional Tax/ Gumasta" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="dateOfBirth" className="inline-block mb-2 text-base font-medium">Date of Birth</label>
                    <input type="date" id="dateOfBirth" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Date Of Birth" required />


                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="passportNumber" className="inline-block mb-2 text-base font-medium">Passport Number</label>
                    <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Bank Name" required />


                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="Group" className="inline-block mb-2 text-base font-medium">Group</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="Group" id="Group">
                      <option value="">Select </option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>

                    </select>
                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="QualificationInput" className="inline-block mb-2 text-base font-medium">Qualification</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Qualification"
                      name="qualification"

                    />

                  </div> */}
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="occupationInput" className="inline-block mb-2 text-base font-medium">Occupation</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Occupation"
                      name="occupation"

                    />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="serviceCategory" className="inline-block mb-2 text-base font-medium">Service Category </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="serviceCategory"
                      name="serviceCategory"

                    >
                      <option value="">Select Service Category</option>
                      <option value="Financial Statement Preparation "> Financial Statement Preparation</option>
                      <option value=" Audit Services">Audit Services</option>
                      <option value=" Taxation Services "> Taxation Services</option>
                      <option value="Bookkeeping and Accounting "> Bookkeeping and Accounting</option>
                      <option value=" Financial Planning and Analysis"> Financial Planning and Analysis</option>
                      <option value="Compliance and Regulatory Advice "> Compliance and Regulatory Advice</option>
                      <option value="Internal Controls and Risk Management "> Internal Controls and Risk Management</option>
                      <option value=" Management Consulting"> Management Consulting</option>
                      <option value=" Member Accounting"> Member Accounting</option>
                      <option value="Funding and Investment Advice "> Funding and Investment Advice</option>
                      <option value="Payroll Management ">Payroll Management</option>
                      <option value=" Training and Development"> Training and Development</option>
                      <option value=" Governance and Policy Advisory"> Governance and Policy Advisory</option>
                      <option value="Dispute Resolution "> Dispute Resolution</option>
                      <option value=" Donor Accounting"> Donor Accounting</option>
                      <option value="Grant Management "> Grant Management</option>
                      <option value="Impact Reporting "> Impact Reporting</option>
                      <option value=" Trustee Support"> Trustee Support</option>
                      <option value=" Registration Services">Registration Services</option>
                      <option value=" PAN Card Application"> PAN Card Application</option>
                      <option value="FCRA Registration "> FCRA Registration</option>
                      <option value=" 12A / 80G Registration"> 12A / 80G Registration</option>
                      <option value=" Tax Planning"> Tax Planning</option>
                      <option value=" Income Tax Return Filing"> Income Tax Return Filing</option>
                    </select>

                  </div>


                  <div className="xl:col-span-6">
                    <label htmlFor="Address" className="inline-block mb-2 text-base font-medium">Address</label>
                    <textarea id="Addresss" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Address" required ></textarea>


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="Other" className="inline-block mb-2 text-base font-medium">Other</label>
                    <textarea id="Other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Other Details" required ></textarea>


                  </div>

                </div>




                {/* <form > */}


                <div className="flex justify-end gap-2 mt-4">
                  <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                  <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Create Trust/AOP</button>

                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="fieldA">Field A</label></td>
            <td><input type="text" id="fieldA" value={fieldA} onChange={(e) => setFieldA(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="fieldB">Field B</label></td>
            <td><input type="text" id="fieldB" value={fieldB} onChange={(e) => setFieldB(e.target.value)} /></td>
          </tr>
          <tr>
            <td colSpan={2}><button type="submit">Submit Individual</button></td>
          </tr>
        </tbody>
      </table>
    </form> */}
    </React.Fragment>
  );
};

// =================================================================

const Form6 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [SocietyA, setSocietyA] = useState('');
  const [SocietyB, setSocietyB] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ type: 'Society', SocietyA, SocietyB });
    setSocietyA('');
    setSocietyB('');
  };



  // const [file, setFile] = useState<File | null>(null);

  // const handleChanges = (file: File[]): void => {
  //   setFile(file[0]);
  // };

  return (

    <React.Fragment>
      <BreadCrumb title='Society List' pageTitle='Society' />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 xl:grid-cols-12 ">
        <div className="xl:col-span-12 ">
          <div className="card ">
            <div className="card-body ">
              <h6 className="mb-4 text-15">Create Society</h6>

              <form action="#!" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientId" className="inline-block mb-2 text-base font-medium">Client ID </label>
                    <input type="number" id="clientId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Client Id" required />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofTSociety" className="inline-block mb-2 text-base font-medium">Name of Society </label>
                    <input type="text" id="NameofTSociety" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Society" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofAuthorisedPerson" className="inline-block mb-2 text-base font-medium">Name of Authorised Person</label>
                    <input type="text" id="NameofAuthorisedPerson" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Authorised Person" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofRegistrationNo" className="inline-block mb-2 text-base font-medium">Registration No.</label>
                    <input type="text" id="NameofRegistrationNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Registration No." required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="GSTNo" className="inline-block mb-2 text-base font-medium">GST No </label>
                    <input type="number" id="GSTNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter GST No" required />

                  </div>

                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientGender" className="inline-block mb-2 text-base font-medium">Gender </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="clientGender" id="clientGender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>

                    </select>
                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="proprietorEmail" className="inline-block mb-2 text-base font-medium"> Email </label>
                    <input type="email" id="proprietorEmail" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium"> Password </label>
                    <input type="password" id="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Password" required />

                  </div>
                  <div className="xl:col-span-6 mb-3">
                    <label htmlFor="companyCategoryType" className="inline-block mb-2 text-base font-medium"> Company Category/Type</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="companyCategoryType"
                      name="companyCategoryType"

                    >
                      <option value="">Select Company Category  </option>
                      <option value="Pvt. Ltd.">Pvt. Ltd.</option>
                      <option value="Public Ltd.">Public Ltd.</option>
                      <option value="Section 8">Section 8</option>
                      <option value="Other">Other</option>

                    </select>

                  </div>
                  {/* <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium"> Industry Type</label>
                    <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="industryType"
                      name="industryType"

                    >
                      <option value="">Select Industry Type </option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Trading">Trading </option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Job Work">Job Work</option>
                      <option value="Professionals">Professionals</option>

                    </select>

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="MSMERegNo" className="inline-block mb-2 text-base font-medium">MSME Reg. No.</label>
                    <input type="text" id="MSMERegNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your MSME Reg. No." required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="mobileNo." className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                    <input type="number" id="mobileNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Mobile No" required />
                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="panCard" className="inline-block mb-2 text-base font-medium">PAN Card</label>
                    <input type="text" id="panCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Pan Card" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="ProfessionalTax/Gumasta" className="inline-block mb-2 text-base font-medium">Professional Tax/ Gumasta</label>
                    <input type="text" id="ProfessionalTax/Gumasta" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Professional Tax/ Gumasta" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="dateOfBirth" className="inline-block mb-2 text-base font-medium">Date of Birth</label>
                    <input type="date" id="dateOfBirth" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Date Of Birth" required />


                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="passportNumber" className="inline-block mb-2 text-base font-medium">Passport Number</label>
                    <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Bank Name" required />


                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="Group" className="inline-block mb-2 text-base font-medium">Group</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="Group" id="Group">
                      <option value="">Select </option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>

                    </select>
                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="QualificationInput" className="inline-block mb-2 text-base font-medium">Qualification</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Qualification"
                      name="qualification"

                    />

                  </div> */}
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="occupationInput" className="inline-block mb-2 text-base font-medium">Occupation</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Occupation"
                      name="occupation"

                    />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="serviceCategory" className="inline-block mb-2 text-base font-medium">Service Category </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="serviceCategory"
                      name="serviceCategory"

                    >
                      <option value="">Select Service Category</option>
                      <option value="Financial Statement Preparation">Financial Statement Preparation</option>
                      <option value=" Audit Services"> Audit Services</option>
                      <option value=" Taxation Services "> Taxation Services</option>
                      <option value="Bookkeeping and Accounting "> Bookkeeping and Accounting</option>
                      <option value="Financial Planning and Analysis "> Financial Planning and Analysis</option>
                      <option value="Compliance and Regulatory Advice "> Compliance and Regulatory Advice</option>
                      <option value="Internal Controls and Risk Management ">Internal Controls and Risk Management</option>
                      <option value="Management Consulting ">Management Consulting</option>
                      <option value="Member Accounting ">Member Accounting</option>
                      <option value="Funding and Investment Advice ">Funding and Investment Advice</option>
                      <option value="Payroll Management ">Payroll Management</option>
                      <option value="Training and Development">Training and Development</option>
                      <option value="Governance and Policy Advisory">Governance and Policy Advisory</option>
                      <option value="Dispute Resolution">Dispute Resolution</option>
                    </select>

                  </div>


                  <div className="xl:col-span-6">
                    <label htmlFor="Address" className="inline-block mb-2 text-base font-medium">Address</label>
                    <textarea id="Addresss" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Address" required ></textarea>


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="Other" className="inline-block mb-2 text-base font-medium">Other</label>
                    <textarea id="Other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Other Details" required ></textarea>


                  </div>

                </div>




                {/* <form > */}


                <div className="flex justify-end gap-2 mt-4">
                  <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                  <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Create Society</button>

                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="fieldA">Field A</label></td>
            <td><input type="text" id="fieldA" value={fieldA} onChange={(e) => setFieldA(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="fieldB">Field B</label></td>
            <td><input type="text" id="fieldB" value={fieldB} onChange={(e) => setFieldB(e.target.value)} /></td>
          </tr>
          <tr>
            <td colSpan={2}><button type="submit">Submit Individual</button></td>
          </tr>
        </tbody>
      </table>
    </form> */}
    </React.Fragment>
  );
};

const Form7 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [OtherA, setOtherA] = useState('');
  const [OtherB, setOtherB] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ type: 'Other', OtherA, OtherB });
    setOtherA('');
    setOtherB('');
  };



  // const [file, setFile] = useState<File | null>(null);

  // const handleChanges = (file: File[]): void => {
  //   setFile(file[0]);
  // };

  return (

    <React.Fragment>
      <BreadCrumb title='Other List' pageTitle='Other' />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 xl:grid-cols-12 ">
        <div className="xl:col-span-12 ">
          <div className="card ">
            <div className="card-body ">
              <h6 className="mb-4 text-15">Create Other</h6>

              <form action="#!" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12  place-content-center ">
                  <div className="xl:col-span-6">
                    <label htmlFor="name" className="inline-block mb-2 text-base font-medium">Name</label>
                    <input type="text" id="name" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Name" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="mobile" className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                    <input type="text" id="mobile" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter    Mobile No." required />

                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="NameofAuthorisedPerson" className="inline-block mb-2 text-base font-medium">Name of Authorized Person</label>
                    <input type="text" id="NameofAuthorisedPerson" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Authorized Person" required />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="NameofRegistrationNo" className="inline-block mb-2 text-base font-medium">Registration No.</label>
                    <input type="text" id="NameofRegistrationNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name of Registration No." required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="GSTNo" className="inline-block mb-2 text-base font-medium">GST No </label>
                    <input type="number" id="GSTNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter GST No" required />

                  </div>

                  {/* <div className="xl:col-span-6">
                    <label htmlFor="clientGender" className="inline-block mb-2 text-base font-medium">Gender </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="clientGender" id="clientGender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>

                    </select>
                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="proprietorEmail" className="inline-block mb-2 text-base font-medium"> Email </label>
                    <input type="email" id="proprietorEmail" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Email" required />

                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Password</label>
                    <input type="password" id="password" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Password" required />

                  </div>
                  <div className="xl:col-span-6 mb-3">
                    <label htmlFor="companyCategoryType" className="inline-block mb-2 text-base font-medium"> Company Category/Type</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="companyCategoryType"
                      name="companyCategoryType"

                    >
                      <option value="">Select Company Category  </option>
                      <option value="Pvt. Ltd.">Pvt. Ltd.</option>
                      <option value="Public Ltd.">Public Ltd.</option>
                      <option value="Section 8">Section 8</option>
                      <option value="Other">Other</option>

                    </select>

                  </div>
                  {/* <div className="xl:col-span-6 mb-3">
                    <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium"> Industry Type</label>
                    <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="industryType"
                      name="industryType"

                    >
                      <option value="">Select Industry Type </option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Trading">Trading </option>
                      <option value="Service Provider">Service Provider</option>
                      <option value="Job Work">Job Work</option>
                      <option value="Professionals">Professionals</option>

                    </select>

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="MSMERegNo" className="inline-block mb-2 text-base font-medium">MSME Reg. No.</label>
                    <input type="text" id="MSMERegNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your MSME Reg. No." required />

                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="mobileNo." className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                    <input type="number" id="mobileNo" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Mobile No" required />
                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="panCard" className="inline-block mb-2 text-base font-medium">PAN Card</label>
                    <input type="text" id="panCard" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Pan Card" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="ProfessionalTax/Gumasta" className="inline-block mb-2 text-base font-medium">Professional Tax/ Gumasta</label>
                    <input type="text" id="ProfessionalTax/Gumasta" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Professional Tax/ Gumasta" required />


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="dateOfBirth" className="inline-block mb-2 text-base font-medium">Date of Birth</label>
                    <input type="date" id="dateOfBirth" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Date Of Birth" required />


                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="passportNumber" className="inline-block mb-2 text-base font-medium">Passport Number</label>
                    <input type="text" id="qualityInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Bank Name" required />


                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="Group" className="inline-block mb-2 text-base font-medium">Group</label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false name="Group" id="Group">
                      <option value="">Select </option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>
                      <option value=" ">#</option>

                    </select>
                  </div>
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="QualificationInput" className="inline-block mb-2 text-base font-medium">Qualification</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Qualification"
                      name="qualification"

                    />

                  </div> */}
                  {/* <div className="xl:col-span-6">
                    <label htmlFor="occupationInput" className="inline-block mb-2 text-base font-medium">Occupation</label>
                    <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Occupation"
                      name="occupation"

                    />

                  </div> */}
                  <div className="xl:col-span-6">
                    <label htmlFor="serviceCategory" className="inline-block mb-2 text-base font-medium">Service Category </label>
                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="serviceCategory"
                      name="serviceCategory"

                    >
                      <option value="">Select Service Category</option>
                      <option value="Financial Statement Preparation">Financial Statement Preparation</option>
                      <option value=" Audit Services"> Audit Services</option>
                      <option value=" Taxation Services "> Taxation Services</option>
                      <option value="Bookkeeping and Accounting "> Bookkeeping and Accounting</option>
                      <option value="Financial Planning and Analysis "> Financial Planning and Analysis</option>
                      <option value="Compliance and Regulatory Advice "> Compliance and Regulatory Advice</option>
                      <option value="Internal Controls and Risk Management ">Internal Controls and Risk Management</option>
                      <option value="Management Consulting ">Management Consulting</option>
                      <option value="Member Accounting ">Member Accounting</option>
                      <option value="Funding and Investment Advice ">Funding and Investment Advice</option>
                      <option value="Payroll Management ">Payroll Management</option>
                      <option value="Training and Development">Training and Development</option>
                      <option value="Governance and Policy Advisory">Governance and Policy Advisory</option>
                      <option value="Dispute Resolution">Dispute Resolution</option>
                    </select>

                  </div>


                  <div className="xl:col-span-6">
                    <label htmlFor="Address" className="inline-block mb-2 text-base font-medium">Address</label>
                    <textarea id="Addresss" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Address" required ></textarea>


                  </div>
                  <div className="xl:col-span-6">
                    <label htmlFor="Other" className="inline-block mb-2 text-base font-medium">Other</label>
                    <textarea id="Other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Other Details" required ></textarea>


                  </div>

                </div>




                {/* <form > */}


                <div className="flex justify-end gap-2 mt-4">
                  <button type="reset" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10">Reset</button>
                  <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">Create Other</button>

                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="fieldA">Field A</label></td>
            <td><input type="text" id="fieldA" value={fieldA} onChange={(e) => setFieldA(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="fieldB">Field B</label></td>
            <td><input type="text" id="fieldB" value={fieldB} onChange={(e) => setFieldB(e.target.value)} /></td>
          </tr>
          <tr>
            <td colSpan={2}><button type="submit">Submit Individual</button></td>
          </tr>
        </tbody>
      </table>
    </form> */}
    </React.Fragment>
  );
};




const MultiForm: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>('form1');
  const [formData, setFormData] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(event.target.value);
  };

  const handleFormSubmit = (data: any) => {
    setFormData(prevData => [...prevData, data]);
    setSelectedForm('form1');
  };

  return (
    <div>
      <label htmlFor="formSelector">Select a form:</label>
      <select
        className="w-40 form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
        id="formSelector"
        onChange={handleChange}
        value={selectedForm ?? ""} // Provide fallback for null
      >
        <option value="" disabled>
          Select a form
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>


      {selectedForm === 'form1' && <Form1 onSubmit={handleFormSubmit} />}
      {selectedForm === 'form2' && <Form2 onSubmit={handleFormSubmit} />}
      {selectedForm === 'form3' && <Form3 onSubmit={handleFormSubmit} />}
      {selectedForm === 'form4' && <Form4 onSubmit={handleFormSubmit} />}
      {selectedForm === 'form5' && <Form5 onSubmit={handleFormSubmit} />}
      {selectedForm === 'form6' && <Form6 onSubmit={handleFormSubmit} />}
      {selectedForm === 'form7' && <Form7 onSubmit={handleFormSubmit} />}


      {/* <h2>Submitted Forms</h2> */}
      {/* {formData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Form Type</th>
              <th>Field 1</th>
              <th>Field 2</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td>{data.type}</td>
                <td>{data.field1 || data.fieldA || data.fieldX}</td>
                <td>{data.field2 || data.fieldB || data.fieldY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No forms submitted yet.</p>
      )} */}
    </div>
  );
};

export default MultiForm;
