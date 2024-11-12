import React, { useState } from "react";
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

     //    shift change 
     const [selectedShift, setSelectedShift] = useState('');
     const [showTimeInputs, setShowTimeInputs] = useState(false);
 
     const handleShiftChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
         const shift = event.target.value;
         setSelectedShift(shift);
         setShowTimeInputs(shift !== '');
     };
     //    shift change end
 
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-1 text-15">Personal Information</h6>
                    <p className="mb-4 text-slate-500 dark:text-zink-200">Update your photo and personal details here easily.</p>
                    <form action="#!">
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                            <div className="xl:col-span-4">
                                <label htmlFor="name" className="inline-block mb-2 text-base font-medium"> Name</label>
                                <input type="text" id="name" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your Name"   />
                            </div>
                            
                            <div className="xl:col-span-4">
                                <label htmlFor="date_of_birth" className="inline-block mb-2 text-base font-medium">Date Of Birth</label>
                                <input type="date" id="date_of_birth" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Date Of Birth" />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="designation" className="inline-block mb-2 text-base font-medium">Designation</label>
                                <input type="text" id="designation" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Read Only Designation" readOnly />
                            </div>
                           
                            <div className="xl:col-span-4">
                                <label htmlFor="inputValue" className="inline-block mb-2 text-base font-medium">Email</label>
                                <input type="email" id="inputValueEmail" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter your email"   />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="mobile_no" className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                                <input type="text" id="mobile_no" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Mobile No." />
                            </div>
                            <div className="xl:col-span-4">
                            <label htmlFor="state" className="inline-block mb-2 text-base font-medium">Choose State</label>
                            <select
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                data-choices
                                data-choices-search-false
                                id="state"
                                name="state" // Removed the leading space
                                
                            >
                                <option value="">Select State</option>
                                <option value="Andra Pradesh">Andra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                 
                            </select>
                             
                        </div>
                            <div className="xl:col-span-4">
                            <label htmlFor="city" className="inline-block mb-2 text-base font-medium">Choose City</label>
                            <select
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                data-choices
                                data-choices-search-false
                                id="city"
                                name="city" // Removed the leading space
                                
                            >
                                <option value="">Select City</option>
                                <option value="Andra Pradesh">Andra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                 
                            </select>
                             
                        </div>
                        <div className="xl:col-span-4">
                            <label htmlFor="pincode" className="inline-block mb-2 text-base font-medium"> Pin Code</label>
                            <input type="text" id=" pincode" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Pin Code"
                                name="pincode"
                                 
                            />
                            
                        </div>

                        <div className="xl:col-span-4">
                            <label htmlFor="role" className="inline-block mb-2 text-base font-medium">Role</label>
                            <input type="text" id="role" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Read Only Role"
                                name="role"
                                readOnly
                                
                            />
                             
                        </div>

                        <div className="xl:col-span-4">
                            {/* Shift selection dropdown */}
                            <label htmlFor="shift" className="inline-block mb-2 text-base font-medium">
                                Select Shift:
                            </label>
                            <select
                                
                                id="shift"
                                value={selectedShift}
                                onChange={handleShiftChange}
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            >
                                <option value="">-- Select Shift --</option>
                                <option value="morning">Morning Shift</option>
                                {/* <option value="afternoon">Afternoon Shift</option> */}
                                <option value="night">Night Shift</option>
                            </select>

                            {/* In Time and Out Time input fields */}
                            {showTimeInputs && (
                                <div  className="xl:col-span-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="inTime" className="inline-block mb-2 text-base font-medium">
                                            In Time:
                                        </label>
                                        <input
                                            readOnly
                                            type="time"
                                            id="inTime"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="outTime" className="inline-block mb-2 text-base font-medium">
                                            Out Time:
                                        </label>
                                        <input
                                            readOnly
                                            type="time"
                                            id="outTime"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="xl:col-span-4">
                            <label htmlFor="joiningDate" className="inline-block mb-2 text-base font-medium">Joining Date</label>
                            <Flatpickr
                                id="joiningDate"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                placeholder='Read Only Selected date'
                                name='joinDate'
                                readOnly
                                 
                                 
                            />
                             
                        </div>
                        <div className="xl:col-span-4">
                            <label htmlFor="experience" className="inline-block mb-2 text-base font-medium">Experience</label>
                            <input type="number" id="experience" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Read Only Experience"
                                name="experience"
                                readOnly
                            />
                            
                        </div>
                        <div className="xl:col-span-4">
                            <label htmlFor="pastCompany" className="inline-block mb-2 text-base font-medium"> Past Company Details If Any </label>
                            <input type=" text" id="pastCompany" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Past company Details if Any"
                                name="pastCampany"
                                 
                            />
                             
                        </div>
                        <div className="xl:col-span-4">
                            <label htmlFor="emergencycontactno" className="inline-block mb-2 text-base font-medium"> Emergency Contact No </label>
                            <input type=" text" id="emergencycontactno" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Emergency Contact No"
                                name="emergencycontactno"
                                 
                            />
                             
                        </div>
                        <div className="xl:col-span-4">
                            <label htmlFor="bloodgroup" className="inline-block mb-2 text-base font-medium">Blood Group</label>
                            <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="bloodgroup"
                                name="bloodgroup"
                                 
                            >
                                <option>Select...</option>
                                <option>A Positive</option>
                                <option>A Negative</option>
                                <option>A Unknown</option>
                                <option>B Positive</option>
                                <option>B Negative</option>
                                <option>B Unknown</option>
                                <option>AB Positive</option>
                                <option>AB Negative</option>
                                <option>AB Unknown</option>
                                <option>O Positive</option>
                                <option>O Negative</option>
                                <option>O Unknown</option>
                                <option>Unknown</option>
                            </select>
                             
                        </div>
                        <div className="xl:col-span-4">
                            <label htmlFor="other" className="inline-block mb-2 text-base font-medium">Other</label>
                            <input type=" text" id="other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Other Details"
                                name="other"
                                 
                            />
                             
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