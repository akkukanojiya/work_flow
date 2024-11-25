import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';

const LeavePlicy = () => {

    const options = [
        { value: '', label: 'Select Employee' },
        { value: 'Willie Torres', label: 'Willie Torres' },
        { value: 'Patricia Garcia', label: 'Patricia Garcia' },
        { value: 'Juliette Fecteau', label: 'Juliette Fecteau' },
        { value: 'Thomas Hatfield', label: 'Thomas Hatfield' },
        { value: 'Willie Torres', label: 'Willie Torres' },
        { value: 'Juliette Fecteau', label: 'Juliette Fecteau' },
        { value: 'Nancy Reynolds', label: 'Nancy Reynolds' },
        { value: 'Holly Kavanaugh', label: 'Holly Kavanaugh' },
        { value: 'Jonas Frederiksen', label: 'Jonas Frederiksen' },
    ];

    const leaveOptions = [
        { value: '', label: 'Select Leave Type' },
        { value: 'Medical Leave', label: 'Medical Leave' },
        { value: 'Casual Leave', label: 'Casual Leave' },
        { value: 'Sick Leave', label: 'Sick Leave' },
        { value: 'Annual Leave', label: 'Annual Leave' },
    ];

    const leaveOptions1 = [
        { value: '', label: 'Select Leave Day' },
        { value: 'Full Day', label: 'Full Day' },
        { value: 'Half Day', label: 'Half Day' },
    ];


    // dynamic form 


    const [fields, setFields] = React.useState([{ leaveType: '', totalLeave: '' }]);

    const handleFieldChange = (
        index: number,
        field: keyof typeof fields[number],
        value: string
    ) => {
        const updatedFields = [...fields];
        updatedFields[index][field] = value; // This is now type-safe
        setFields(updatedFields);
    };

    const removeField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const addField = () => {
        setFields([...fields, { leaveType: '', totalLeave: '' }]);
    };


    // dynamic form end
    return (
        <React.Fragment>
            <BreadCrumb title='Add Leave (Policy)' pageTitle='Leaves Policy' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-12">
                    <div className="card">
                        <div className="card-body">
                            <form action="#!">
                                {fields.map((field, index) => (
                                    <div key={index} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
                                        <div className="flex items-end gap-5 xl:col-span-12">
                                            {/* Leave Type */}
                                            <div className="col-4 mb-4">
                                                <label
                                                    htmlFor={`leaveType-${index}`}
                                                    className="inline-block mb-2 text-base font-medium"
                                                >
                                                    Leave Type
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-input w-full border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                    placeholder="Leave Type"
                                                    id={`leaveType-${index}`}
                                                    value={field.leaveType}
                                                    onChange={(e) => handleFieldChange(index, "leaveType", e.target.value)}
                                                    required
                                                />
                                            </div>

                                            {/* Total Leave */}
                                            <div className="col-4 mb-4">
                                                <label
                                                    htmlFor={`totalLeave-${index}`}
                                                    className="inline-block mb-2 text-base font-medium"
                                                >
                                                    Total Leave
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-input w-full border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                                    placeholder="Total Leaves"
                                                    id={`totalLeave-${index}`}
                                                    value={field.totalLeave}
                                                    onChange={(e) => handleFieldChange(index, "totalLeave", e.target.value)}
                                                />
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-3 mb-4">
                                                {fields.length !== 1 && (
                                                    <button
                                                        type="button"
                                                        className="text-white btn bg-rose-500 border-rose-500 hover:text-white hover:bg-rose-600 focus:ring focus:ring-rose-100"
                                                        onClick={() => removeField(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 focus:ring focus:ring-green-100"
                                                    onClick={() =>
                                                        setFields([...fields, { leaveType: "", totalLeave: "" }])
                                                    }
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="reset"
                                        className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179]"
                                    >
                                        Submit Leave
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LeavePlicy;
