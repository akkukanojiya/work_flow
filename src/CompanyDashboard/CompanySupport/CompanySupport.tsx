import React, { useCallback, useEffect, useMemo, useState } from 'react';

import BreadCrumb from 'CompanyDashboard/CompanyCommon/BreadCrumb';
import { Link } from 'react-router-dom';
import { Dropdown } from 'CompanyDashboard/CompanyCommon/Components/Dropdown';
import TableContainer from 'CompanyDashboard/CompanyCommon/TableContainer';
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Select from 'react-select';
// import FileDrop from './DragDrop';

//  darg and drop 
import Dropzone from "react-dropzone"
import { DownloadIcon, EyeIcon, Pencil, UploadCloud } from "lucide-react";

// Icons
import { Search, Eye, Trash2, Plus, MoreHorizontal, FileEdit, CheckCircle, Loader, X, Download, } from 'lucide-react';

import Modal from 'CompanyDashboard/CompanyCommon/Components/Modal';
import DeleteModal from 'CompanyDashboard/CompanyCommon/DeleteModal';

// Images
// import dummyImg from "assets/images/users/user-dummy-img.jpg";

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    getUserList as onGetUserList,
    addUserList as onAddUserList,
    updateUserList as onUpdateUserList,
    deleteUserList as onDeleteUserList
} from 'CompanyDashboard/Companyslices/thunk';

import { ToastContainer } from 'react-toastify';
import filterDataBySearch from 'CompanyDashboard/CompanyCommon/filterDataBySearch';
import * as XLSX from 'xlsx';
import { RiFileExcel2Line } from 'react-icons/ri';
const SupportRevert = () => {

    //    shift change 
    const [selectedShift, setSelectedShift] = useState('');
    const [showTimeInputs, setShowTimeInputs] = useState(false);

    const handleShiftChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const shift = event.target.value;
        setSelectedShift(shift);
        setShowTimeInputs(shift !== '');
    };
    //    shift change end

    // excel file 

    const generateExcel = () => {
        // Sample data to be written into the Excel file
        const data = [
            { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
            { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
            { name: 'Sam Johnson', age: 23, email: 'sam.johnson@example.com' },
        ];

        // Create a worksheet from the sample data
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate an Excel file
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        // Create a Blob object from the Excel buffer
        const blob = new Blob([excelBuffer], {
            type: 'application/octet-stream',
        });

        // Create a download link and click it programmatically
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'example.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    // excel file end 
    const dispatch = useDispatch<any>();

    const selectDataList = createSelector(
        (state: any) => state.Users,
        (user) => ({
            userList: user.userList
        })
    );

    const { userList } = useSelector(selectDataList);
    const [user, setUser] = useState<any>([]);
    const [eventData, setEventData] = useState<any>();

    const [show, setShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Get Data
    useEffect(() => {
        dispatch(onGetUserList());
    }, [dispatch]);

    useEffect(() => {
        setUser(userList);
    }, [userList]);

    // Delete Modal
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    // Delete Data
    const onClickDelete = (cell: any) => {
        setDeleteModal(true);
        if (cell.id) {
            setEventData(cell);
        }
    };

    const handleDelete = () => {
        if (eventData) {
            dispatch(onDeleteUserList(eventData.id));
            setDeleteModal(false);
        }
    };

    // Update Data
    const handleUpdateDataClick = (ele: any) => {
        setEventData({ ...ele });
        setIsEdit(true);
        setShow(true);
    };

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            // img: (eventData && eventData.img) || '',
            userId: (eventData && eventData.userId) || '',
            employeename: (eventData && eventData.employeename) || '',
            employeedesignation: (eventData && eventData.employeedesignation) || '',
            // location: (eventData && eventData.location) || '',
            employeemail: (eventData && eventData.employeemail) || '',
            employeecity: (eventData && eventData.employeecity) || '',
            employeestate: (eventData && eventData.employeestate) || '',
            employeecountry: (eventData && eventData.employeecountry) || '',
            pincode: (eventData && eventData.pincode) || '',
            role: (eventData && eventData.role) || '',
            shift: (eventData && eventData.shift) || '',
            joinDate: (eventData && eventData.joinDate) || '',
            phoneNumber: (eventData && eventData.phoneNumber) || '',
            birthDate: (eventData && eventData.birthDate) || '',
            leaveDate: (eventData && eventData.leaveDate) || '',
            experience: (eventData && eventData.experience) || '',
            pastCampanydetails: (eventData && eventData.pastCampanydetails) || '',
            EmergencyContactNo: (eventData && eventData.EmergencyContactNo) || '',
            bloodGroup: (eventData && eventData.bloodGroup) || '',
            password: (eventData && eventData.bloodGroup) || '',
        },
        validationSchema: Yup.object({
            // img: Yup.string().required("Please Add Image"),
            employeename: Yup.string().required("Please Enter  Name"),
            employeedesignation: Yup.string().required("Please Enter  Designation"),
            // location: Yup.string().required("Please Enter Location"),
            employeemail: Yup.string().required("Please Enter  Email"),
            employeecity: Yup.string().required("Please Enter  City"),
            employeestate: Yup.string().required("Please Enter  State"),
            employeecountry: Yup.string().required("Please Enter  Country"),
            pincode: Yup.string().required("Please Enter  pincode"),
            role: Yup.string().required("Please Enter  Role"),
            shift: Yup.string().required("Please Enter  Shift"),
            phoneNumber: Yup.string().required("Please Enter Phone Number"),
            birthDate: Yup.string().required("Please Enter  Birth Date"),
            joinDate: Yup.string().required("Please Enter  Joining Date"),
            leaveDate: Yup.string().required("Please Enter  Leave Date"),
            experience: Yup.string().required("Please Enter Experience"),
            pastCampanydetails: Yup.string().required("Please Enter Past Campany Details"),
            EmergencyContactNo: Yup.string().required("Please EnterEmergency Contact No"),
            bloodGroup: Yup.string().required("Please Enter blood Group "),
            password: Yup.string().required("Please Enter Password "),
        }),

        onSubmit: (values) => {
            if (isEdit) {
                const updateUser = {
                    id: eventData ? eventData.id : 0,
                    ...values,
                };
                // update user
                dispatch(onUpdateUserList(updateUser));
            } else {
                const newUser = {
                    ...values,
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    userId: "#TW15000" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                };
                // save new user
                dispatch(onAddUserList(newUser));
            }
            toggle();
        },
    });

    // Image
    const [selectedImage, setSelectedImage] = useState<any>();
    const handleImageChange = (event: any) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                validation.setFieldValue('img', e.target.result);
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 
    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData("");
            setIsEdit(false);
            setSelectedImage('');
        } else {
            setShow(true);
            setEventData("");
            setSelectedImage('');
            validation.resetForm();
        }
    }, [show, validation]);

    // Search Data
    const filterSearchData = (e: any) => {
        const search = e.target.value;
        const keysToSearch = ['employeeId', 'name', 'designation', 'location', 'email', 'joiningDate'];
        filterDataBySearch(userList, search, keysToSearch, setUser);
    };

    // columns
    const Status = ({ item }: any) => {
        switch (item) {
            case "Verified":
                return (<span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status"><CheckCircle className="size-3 mr-1.5" />{item}</span>);
            case "Waiting":
                return (<span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-slate-100 border-transparent text-slate-500 dark:bg-slate-500/20 dark:text-zink-200 dark:border-transparent status"><Loader className="size-3 mr-1.5" />{item}</span>);
            case "Rejected":
                return (<span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent status"><X className="size-3 mr-1.5" />{item}</span>);
            default:
                return (<span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status"><CheckCircle className="size-3 mr-1.5" />{item}</span>);
        }
    };

    const columns = useMemo(() => [
        // {
        //     header: (
        //         <div className="flex items-center h-full">
        //             <input id="CheckboxAll" className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer" type="checkbox" />
        //         </div>
        //     ),
        //     enableSorting: false,
        //     id: "checkAll",
        //     cell: (cell: any) => {
        //         return (
        //             <div className="flex items-center h-full">
        //                 <input id="Checkbox1" className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer" type="checkbox" />
        //             </div>
        //         );
        //     }
        // },
        // {
        //     header: " ID",
        //     accessorKey: "employeeId",
        //     enableColumnFilter: false,
        //     cell: (cell: any) => (
        //         <Link to="#!" className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600 user-id">{cell.getValue()}</Link>
        //     ),
        // },
        {
            header: "Name",
            accessorKey: "name",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <div className="flex items-center gap-2">
                    {/* <div className="flex items-center justify-center size-10 font-medium rounded-full shrink-0 bg-slate-200 text-slate-800 dark:text-zink-50 dark:bg-zink-600">
                        {cell.row.original.img ? <img src={cell.row.original.img} alt="" className="h-10 rounded-full" /> : (cell.getValue().split(' ').map((word: any) => word.charAt(0)).join(''))}
                    </div> */}
                    {/* <div className="grow">
                        <h6 className="mb-1"><Link to="#!" className="name">{cell.getValue()}</Link></h6>
                        <p className="text-slate-500 dark:text-zink-200">{cell.row.original.designation}</p>
                    </div> */}
                </div>
            ),
        },
        // {
        //     header: "Location",
        //     accessorKey: "location",
        //     enableColumnFilter: false
        // },
        // {
        //     header: "Email",
        //     accessorKey: "email",
        //     enableColumnFilter: false,
        // },
        {
            header: "Description ",
            accessorKey: "description",
            enableColumnFilter: false,
        },
        {
            header: "View",
            accessorKey: "view",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <div>
                    <button className="bg-white  text-[#2a5179] btn hover:text-[#25476a] hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50   active:text-[#25476a] active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20" >
                        {/* <span className="align-middle">Download</span> */}
                        <EyeIcon className="inline-block size-5" />
                    </button>
                </div>
            )


        },
        // {
        //     header: "Status",
        //     accessorKey: "status",
        //     enableColumnFilter: false,
        //     enableSorting: true,
        //     cell: (cell: any) => (
        //         <Status item={cell.getValue()} />
        //     ),
        // },
        {
            header: "Action",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                // <Dropdown className="relative">
                //     <Dropdown.Trigger className="flex items-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20" id="usersAction1">
                //         <MoreHorizontal className="size-3" />
                //     </Dropdown.Trigger>
                //     <Dropdown.Content placement="right-end" className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600" aria-labelledby="usersAction1">
                //         <li>
                //             <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="/pages-account"><Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Overview</span></Link>
                //         </li>
                //         <li>
                //             <Link data-modal-target="addUserModal" className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!"
                //                 onClick={() => {
                //                     const data = cell.row.original;
                //                     handleUpdateDataClick(data);
                //                 }}>
                //                 <FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Edit</span></Link>
                //         </li>
                //         <li>
                //             <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!" onClick={() => {
                //                 const orderData = cell.row.original;
                //                 onClickDelete(orderData);
                //             }}><Trash2 className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Delete</span></Link>
                //         </li>
                //     </Dropdown.Content>
                // </Dropdown>
                <div className="flex gap-2">
                    {/* <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-green-500 dark:hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-500/20"><EyeIcon className="size-4" /></Link> */}
                    {/* <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20" onClick={() => {
                        const data = cell.row.original;
                        handleUpdateDataClick(data);
                    }} ><Pencil className="size-4" /></Link> */}
                    {/* <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20" onClick={() => {
                        const data = cell.row.original;
                        onClickDelete(data);
                    }}><Trash2 className="size-4" /></Link> */}
                    <button type="button" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]" onClick={toggle}><Plus className="inline-block size-4" /> <span className="align-middle">Add Support Revert</span></button>
                </div>
            ),
        }
    ], []
    );

    const options = [
        { value: 'Select Status', label: 'Select Status' },
        { value: 'Verified', label: 'Verified' },
        { value: 'Waiting', label: 'Waiting' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Hidden', label: 'Hidden' },
    ];

    const handleChange = (selectedOption: any) => {
        if (selectedOption.value === 'Select Status' || selectedOption.value === 'Hidden') {
            setUser(userList);
        } else {
            const filteredUsers = userList.filter((data: any) => data.status === selectedOption.value);
            setUser(filteredUsers);
        }
    };

    const [file, setFile] = useState<File | null>(null);
    const handleChanges = (file: File[]): void => {
        setFile(file[0]);
    };


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
            <BreadCrumb title='Support Revert' pageTitle='Revert' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
                <div className="xl:col-span-12">
                    <div className="card" id="usersTable">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="w-full md:w-3/4 py-2.1 card-body  ">
                                    <form action="#!">
                                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                            <div className="relative xl:col-span-3">
                                                <input type="text" className="w-full ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200" placeholder="Search" autoComplete="off" onChange={(e) => filterSearchData(e)} />
                                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zinc-200 fill-slate-100 dark:fill-zinc-600" />
                                            </div>
                                            {/* <div className="xl:col-span-2">
                                        <Select
                                            className="border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            options={options}
                                            isSearchable={false}
                                            defaultValue={options[0]}
                                            onChange={(event: any) => handleChange(event)}
                                            id="choices-single-default"
                                        />
                                    </div> */}
                                            {/* <div className="xl:col-span-3 xl:col-start-10"> */}
                                            {/* <div className="flex gap-2 xl:justify-end">
                                            <div>
                                                <button type="button" className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"><Download className="inline-block size-4" /> <span className="align-middle">Import</span></button>
                                            </div>
                                            <button className="flex items-center justify-center size-[37.5px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"><SlidersHorizontal className="size-4" /></button>
                                        </div> */}
                                            {/* </div> */}
                                        </div>
                                    </form>
                                </div>


                                <div className="w-full md:w-auto flex-shrink-0 flex space-x-4">
                                    {/* <button className="bg-white  text-[#2a5179] btn hover:text-[#25476a] hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50   active:text-[#25476a] active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20" onClick={generateExcel}>
                                        <span className="align-middle">Download</span>
                                        <RiFileExcel2Line className="inline-block size-5" />
                                    </button> */}
                                    {/* <button type="button" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]" onClick={toggle}><Plus className="inline-block size-4" /> <span className="align-middle">Add Support Revert</span></button> */}
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            {user && user.length > 0 ?
                                <TableContainer
                                    isPagination={true}
                                    columns={(columns || [])}
                                    data={(user || [])}
                                    customPageSize={10}
                                    divclassName="-mx-5 -mb-5 overflow-x-auto"
                                    tableclassName="w-full border-separate table-custom border-spacing-y-1 whitespace-nowrap"
                                    theadclassName="text-left relative rounded-md bg-[#25476a] text-[#fff] after:absolute ltr:after:border-l-2 rtl:after:border-r-2 ltr:after:left-0 rtl:after:right-0 after:top-0 after:bottom-0 after:border-transparent [&.active]:after:border-custom-500 [&.active]:bg-slate-100 dark:[&.active]:bg-zink-600"
                                    thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold"
                                    tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5"
                                    PaginationClassName="flex flex-col items-center mt-8 md:flex-row"
                                />
                                :
                                (<div className="noresult">
                                    <div className="py-6 text-center">
                                        <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                                        <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                                        <p className="mb-0 text-slate-500 dark:text-zink-200">We've searched more than 199+ users We did not find any users for you search.</p>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>


            {/* User Modal  */}
            <Modal show={show} onHide={toggle} id="defaultModal" modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-full md:w-[55rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-300/20"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Edit Support Revert" : "Add Support Revert"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}>
                        {/* <div className="mb-3">
                            <div className="relative size-24 mx-auto mb-4 rounded-full shadow-md bg-slate-100 profile-user dark:bg-zink-500">
                                <img src={selectedImage || validation.values.img || dummyImg} alt="" className="object-cover w-full h-full rounded-full user-profile-image" />
                                <div className="absolute bottom-0 flex items-center justify-center size-8 rounded-full ltr:right-0 rtl:left-0 profile-photo-edit">
                                    <input
                                        id="profile-img-file-input"
                                        name="profile-img-file-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden profile-img-file-input"
                                        onChange={handleImageChange} />
                                    <label htmlFor="profile-img-file-input" className="flex items-center justify-center size-8 bg-white rounded-full shadow-lg cursor-pointer dark:bg-zink-600 profile-photo-edit">
                                        <ImagePlus className="size-4 text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500" />
                                    </label>
                                </div>
                            </div>
                            {validation.touched.img && validation.errors.img ? (
                                <p className="text-red-400">{validation.errors.img}</p>
                            ) : null}
                        </div> */}

                        {/* <div className="mb-3">
                            <label htmlFor="employeeId" className="inline-block mb-2 text-base font-medium">Employee ID</label>
                            <input type="text" id="employeeId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                value={validation.values.userId || '#TW1500004'}
                            />
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium"> Name</label>
                            <input type="text" id="employeeNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Employee Name"
                                name="employeename"
                                onChange={validation.handleChange}
                                value={validation.values.employeename || ""}
                            />
                            {validation.touched.employeename && validation.errors.employeename ? (
                                <p className="text-red-400">{validation.errors.employeename}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor=" DateofBirthInput" className="inline-block mb-2 text-base font-medium">Date Of Birth</label>
                            <Flatpickr
                                id="birthDateInput"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name="birthDate"
                                placeholder='Select date'
                                onChange={(date: any) => validation.setFieldValue("birthDate", moment(date[0]).format("DD MMMM ,YYYY"))}
                                value={validation.values.birthDate || ''}
                            />
                            {validation.touched.birthDate && validation.errors.birthDate ? (
                                <p className="text-red-400">{validation.errors.birthDate}</p>
                            ) : null}
                        </div> */}

                        {/* <div className="mb-3">
                            <label htmlFor="designationInput" className="inline-block mb-2 text-base font-medium">  Designation</label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter   Designation"
                                name="employeedesignation"
                                onChange={validation.handleChange}
                                value={validation.values.employeedesignation || ""}
                            />
                            {validation.touched.employeedesignation && validation.errors.employeedesignation ? (
                                <p className="text-red-400">{validation.errors.employeedesignation}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="emailInput" className="inline-block mb-2 text-base font-medium">  Email ID</label>
                            <input type="email" id="employeeEmailInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter   Email ID"
                                name="employeemail"
                                onChange={validation.handleChange}
                                value={validation.values.employeemail || ""}
                            />
                            {validation.touched.employeemail && validation.errors.employeemail ? (
                                <p className="text-red-400">{validation.errors.employeemail}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="phoneNumberInput" className="inline-block mb-2 text-base font-medium">  Mobile No</label>
                            <input type="text" id="phoneNumberInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your   Mobile No"
                                name="employeeMobNumber"
                                onChange={validation.handleChange}
                                value={validation.values.employeeMobNumber || ""}
                            />
                            {validation.touched.employeeMobNumber && validation.errors.employeeMobNumber ? (
                                <p className="text-red-400">{validation.errors.employeeMobNumber}</p>
                            ) : null}
                        </div> */}
                        {/* country  */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="country" className="inline-block mb-2 text-base font-medium">Choose Country</label>
                            <select
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                data-choices
                                data-choices-search-false
                                id="country"
                                name="employeecountry" // Removed the leading space
                                onChange={validation.handleChange}
                                value={validation.values.employeecountry || ""}
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                 
                            </select>
                            {validation.touched.employeecountry && validation.errors.employeecountry ? (
                                <p className="text-red-400">{validation.errors.employeecountry}</p>
                            ) : null}
                        </div> */}
                        {/* State  */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="state" className="inline-block mb-2 text-base font-medium">Choose State</label>
                            <select
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                data-choices
                                data-choices-search-false
                                id="typeSelect"
                                name="employeestate" // Removed the leading space
                                onChange={validation.handleChange}
                                value={validation.values.employeestate || ""}
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
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madya Pradesh">Madya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Orissa">Orissa</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttaranchal">Uttaranchal</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Lakshadeep">Lakshadeep</option>
                                <option value="Pondicherry">Pondicherry</option>
                            </select>
                            {validation.touched.employeestate && validation.errors.employeestate ? (
                                <p className="text-red-400">{validation.errors.employeestate}</p>
                            ) : null}
                        </div> */}
                        {/* city  */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="city" className="inline-block mb-2 text-base font-medium">Choose City</label>
                            <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="typeSelect"
                                name="employeecity"
                                onChange={validation.handleChange}
                                value={validation.values.employeecity || ""}
                            >

                                <option value=" ">Select City</option>
                                <option value="Adilabad">Adilabad</option>
                                <option value="Agra">Agra</option> <option value="Ahmedabad">Ahmedabad</option> <option value="Ahmednagar">Ahmednagar</option> <option value="Aizawl">Aizawl</option> <option value="Ajitgarh(Mohali)">Ajitgarh (Mohali)</option>
                                <option value="Ajmer">Ajmer</option> <option value="Akola">Akola</option> <option value="Alappuzha">Alappuzha</option> <option value="Aligarh">Aligarh</option> <option value="Alirajpur">Alirajpur</option> <option value="Allahabad">Allahabad</option> <option value="Almora">Almora</option> <option value="Alwar">Alwar</option> <option value="Ambala">Ambala</option> <option value="AmbedkarNagar">Ambedkar Nagar</option> <option value="Amravati">Amravati</option> <option value="Amrelidistrict">Amreli district</option> <option value="Amritsar">Amritsar</option> <option value="Anand">Anand</option> <option value="Anantapur">Anantapur</option> <option value="Anantnag">Anantnag</option> <option value="Angul">Angul</option> <option value="Anjaw">Anjaw</option> <option value="Anuppur">Anuppur</option> <option value="Araria">Araria</option> <option value="Ariyalur">Ariyalur</option> <option value="Arwal">Arwal</option> <option value="AshokNagar">Ashok Nagar</option> <option value="Auraiya">Auraiya</option> <option value="Aurangabad">Aurangabad</option> <option value="Aurangabad">Aurangabad</option> <option value="Azamgarh">Azamgarh</option> <option value="Badgam">Badgam</option> <option value="Bagalkot">Bagalkot</option> <option value="Bageshwar">Bageshwar</option> <option value="Bagpat">Bagpat</option> <option value="Bahraich">Bahraich</option> <option value="Baksa">Baksa</option> <option value="Balaghat">Balaghat</option> <option value="Balangir">Balangir</option> <option value="Balasore">Balasore</option> <option value="Ballia">Ballia</option> <option value="Balrampur">Balrampur</option> <option value="Banaskantha">Banaskantha</option> <option value="Banda">Banda</option> <option value="Bandipora">Bandipora</option> <option value="BangaloreRural">Bangalore Rural</option> <option value="BangaloreUrban">Bangalore Urban</option> <option value="Banka">Banka</option> <option value="Bankura">Bankura</option> <option value="Banswara">Banswara</option> <option value="Barabanki">Barabanki</option> <option value="Baramulla">Baramulla</option> <option value="Baran">Baran</option> <option value="Bardhaman">Bardhaman</option> <option value="Bareilly">Bareilly</option> <option value="Bargarh(Baragarh)">Bargarh (Baragarh)</option> <option value="Barmer">Barmer</option> <option value="Barnala">Barnala</option> <option value="Barpeta">Barpeta</option> <option value="Barwani">Barwani</option> <option value="Bastar">Bastar</option> <option value="Basti">Basti</option> <option value="Bathinda">Bathinda</option> <option value="Beed">Beed</option> <option value="Begusarai">Begusarai</option> <option value="Belgaum">Belgaum</option> <option value="Bellary">Bellary</option> <option value="Betul">Betul</option> <option value="Bhadrak">Bhadrak</option> <option value="Bhagalpur">Bhagalpur</option> <option value="Bhandara">Bhandara</option> <option value="Bharatpur">Bharatpur</option> <option value="Bharuch">Bharuch</option> <option value="Bhavnagar">Bhavnagar</option> <option value="Bhilwara">Bhilwara</option> <option value="Bhind">Bhind</option> <option value="Bhiwani">Bhiwani</option> <option value="Bhojpur">Bhojpur</option> <option value="Bhopal">Bhopal</option> <option value="Bidar">Bidar</option> <option value="Bijapur">Bijapur</option> <option value="Bijapur">Bijapur</option> <option value="Bijnor">Bijnor</option> <option value="Bikaner">Bikaner</option> <option value="Bilaspur">Bilaspur</option> <option value="Bilaspur">Bilaspur</option> <option value="Birbhum">Birbhum</option> <option value="Bishnupur">Bishnupur</option> <option value="Bokaro">Bokaro</option> <option value="Bongaigaon">Bongaigaon</option> <option value="Boudh(Bauda)">Boudh (Bauda)</option> <option value="Budaun">Budaun</option> <option value="Bulandshahr">Bulandshahr</option> <option value="Buldhana">Buldhana</option> <option value="Bundi">Bundi</option> <option value="Burhanpur">Burhanpur</option> <option value="Buxar">Buxar</option> <option value="Cachar">Cachar</option> <option value="CentralDelhi">Central Delhi</option> <option value="Chamarajnagar">Chamarajnagar</option> <option value="Chamba">Chamba</option> <option value="Chamoli">Chamoli</option> <option value="Champawat">Champawat</option> <option value="Champhai">Champhai</option> <option value="Chandauli">Chandauli</option> <option value="Chandel">Chandel</option> <option value="Chandigarh">Chandigarh</option> <option value="Chandrapur">Chandrapur</option> <option value="Changlang">Changlang</option> <option value="Chatra">Chatra</option> <option value="Chennai">Chennai</option> <option value="Chhatarpur">Chhatarpur</option> <option value="ChhatrapatiShahujiMaharajNagar"> Chhatrapati Shahuji Maharaj Nagar </option> <option value="Chhindwara">Chhindwara</option> <option value="Chikkaballapur">Chikkaballapur</option> <option value="Chikkamagaluru">Chikkamagaluru</option> <option value="Chirang">Chirang</option> <option value="Chitradurga">Chitradurga</option> <option value="Chitrakoot">Chitrakoot</option> <option value="Chittoor">Chittoor</option> <option value="Chittorgarh">Chittorgarh</option> <option value="Churachandpur">Churachandpur</option> <option value="Churu">Churu</option> <option value="Coimbatore">Coimbatore</option> <option value="CoochBehar">Cooch Behar</option> <option value="Cuddalore">Cuddalore</option> <option value="Cuttack">Cuttack</option> <option value="DadraandNagarHaveli"> Dadra and Nagar Haveli </option> <option value="Dahod">Dahod</option> <option value="DakshinDinajpur">Dakshin Dinajpur</option> <option value="DakshinaKannada">Dakshina Kannada</option> <option value="Daman">Daman</option> <option value="Damoh">Damoh</option> <option value="Dantewada">Dantewada</option> <option value="Darbhanga">Darbhanga</option> <option value="Darjeeling">Darjeeling</option> <option value="Darrang">Darrang</option> <option value="Datia">Datia</option> <option value="Dausa">Dausa</option> <option value="Davanagere">Davanagere</option> <option value="Debagarh(Deogarh)">Debagarh (Deogarh)</option> <option value="Dehradun">Dehradun</option> <option value="Deoghar">Deoghar</option> <option value="Deoria">Deoria</option> <option value="Dewas">Dewas</option> <option value="Dhalai">Dhalai</option> <option value="Dhamtari">Dhamtari</option> <option value="Dhanbad">Dhanbad</option> <option value="Dhar">Dhar</option> <option value="Dharmapuri">Dharmapuri</option> <option value="Dharwad">Dharwad</option> <option value="Dhemaji">Dhemaji</option> <option value="Dhenkanal">Dhenkanal</option> <option value="Dholpur">Dholpur</option> <option value="Dhubri">Dhubri</option> <option value="Dhule">Dhule</option> <option value="DibangValley">Dibang Valley</option> <option value="Dibrugarh">Dibrugarh</option> <option value="DimaHasao">Dima Hasao</option> <option value="Dimapur">Dimapur</option> <option value="Dindigul">Dindigul</option> <option value="Dindori">Dindori</option> <option value="Diu">Diu</option> <option value="Doda">Doda</option> <option value="Dumka">Dumka</option> <option value="Dungapur">Dungapur</option> <option value="Durg">Durg</option> <option value="EastChamparan">East Champaran</option> <option value="EastDelhi">East Delhi</option> <option value="EastGaroHills">East Garo Hills</option> <option value="EastKhasiHills">East Khasi Hills</option> <option value="EastSiang">East Siang</option> <option value="EastSikkim">East Sikkim</option> <option value="EastSinghbhum">East Singhbhum</option> <option value="Eluru">Eluru</option> <option value="Ernakulam">Ernakulam</option> <option value="Erode">Erode</option> <option value="Etah">Etah</option> <option value="Etawah">Etawah</option> <option value="Faizabad">Faizabad</option> <option value="Faridabad">Faridabad</option> <option value="Faridkot">Faridkot</option> <option value="Farrukhabad">Farrukhabad</option> <option value="Fatehabad">Fatehabad</option> <option value="FatehgarhSahib">Fatehgarh Sahib</option> <option value="Fatehpur">Fatehpur</option> <option value="Fazilka">Fazilka</option> <option value="Firozabad">Firozabad</option> <option value="Firozpur">Firozpur</option> <option value="Gadag">Gadag</option> <option value="Gadchiroli">Gadchiroli</option> <option value="Gajapati">Gajapati</option> <option value="Ganderbal">Ganderbal</option> <option value="Gandhinagar">Gandhinagar</option> <option value="Ganganagar">Ganganagar</option> <option value="Ganjam">Ganjam</option> <option value="Garhwa">Garhwa</option> <option value="GautamBuddhNagar">Gautam Buddh Nagar</option> <option value="Gaya">Gaya</option> <option value="Ghaziabad">Ghaziabad</option> <option value="Ghazipur">Ghazipur</option> <option value="Giridih">Giridih</option> <option value="Goalpara">Goalpara</option> <option value="Godda">Godda</option> <option value="Golaghat">Golaghat</option> <option value="Gonda">Gonda</option> <option value="Gondia">Gondia</option> <option value="Gopalganj">Gopalganj</option> <option value="Gorakhpur">Gorakhpur</option> <option value="Gulbarga">Gulbarga</option> <option value="Gumla">Gumla</option> <option value="Guna">Guna</option> <option value="Guntur">Guntur</option> <option value="Gurdaspur">Gurdaspur</option> <option value="Gurgaon">Gurgaon</option> <option value="Gwalior">Gwalior</option> <option value="Hailakandi">Hailakandi</option> <option value="Hamirpur">Hamirpur</option> <option value="Hamirpur">Hamirpur</option> <option value="Hanumangarh">Hanumangarh</option> <option value="Harda">Harda</option> <option value="Hardoi">Hardoi</option> <option value="Haridwar">Haridwar</option> <option value="Hassan">Hassan</option> <option value="Haveridistrict">Haveri district</option> <option value="Hazaribag">Hazaribag</option> <option value="Hingoli">Hingoli</option> <option value="Hissar">Hissar</option> <option value="Hooghly">Hooghly</option> <option value="Hoshangabad">Hoshangabad</option> <option value="Hoshiarpur">Hoshiarpur</option> <option value="Howrah">Howrah</option> <option value="Hyderabad">Hyderabad</option> <option value="Hyderabad">Hyderabad</option> <option value="Idukki">Idukki</option> <option value="ImphalEast">Imphal East</option> <option value="ImphalWest">Imphal West</option> <option value="Indore">Indore</option> <option value="Jabalpur">Jabalpur</option> <option value="Jagatsinghpur">Jagatsinghpur</option> <option value="JaintiaHills">Jaintia Hills</option> <option value="Jaipur">Jaipur</option> <option value="Jaisalmer">Jaisalmer</option> <option value="Jajpur">Jajpur</option> <option value="Jalandhar">Jalandhar</option> <option value="Jalaun">Jalaun</option> <option value="Jalgaon">Jalgaon</option> <option value="Jalna">Jalna</option> <option value="Jalore">Jalore</option> <option value="Jalpaiguri">Jalpaiguri</option> <option value="Jammu">Jammu</option> <option value="Jamnagar">Jamnagar</option> <option value="Jamtara">Jamtara</option> <option value="Jamui">Jamui</option> <option value="Janjgir-Champa">Janjgir-Champa</option> <option value="Jashpur">Jashpur</option> <option value="Jaunpurdistrict">Jaunpur district</option> <option value="Jehanabad">Jehanabad</option> <option value="Jhabua">Jhabua</option> <option value="Jhajjar">Jhajjar</option> <option value="Jhalawar">Jhalawar</option> <option value="Jhansi">Jhansi</option> <option value="Jharsuguda">Jharsuguda</option> <option value="Jhunjhunu">Jhunjhunu</option> <option value="Jind">Jind</option> <option value="Jodhpur">Jodhpur</option> <option value="Jorhat">Jorhat</option> <option value="Junagadh">Junagadh</option> <option value="JyotibaPhuleNagar">Jyotiba Phule Nagar</option> <option value="Kabirdham(formerlyKawardha)"> Kabirdham (formerly Kawardha) </option> <option value="Kadapa">Kadapa</option> <option value="Kaimur">Kaimur</option> <option value="Kaithal">Kaithal</option> <option value="Kakinada">Kakinada</option> <option value="Kalahandi">Kalahandi</option> <option value="Kamrup">Kamrup</option> <option value="KamrupMetropolitan">Kamrup Metropolitan</option> <option value="Kanchipuram">Kanchipuram</option> <option value="Kandhamal">Kandhamal</option> <option value="Kangra">Kangra</option> <option value="Kanker">Kanker</option> <option value="Kannauj">Kannauj</option> <option value="Kannur">Kannur</option> <option value="Kanpur">Kanpur</option> <option value="KanshiRamNagar">Kanshi Ram Nagar</option> <option value="Kanyakumari">Kanyakumari</option> <option value="Kapurthala">Kapurthala</option> <option value="Karaikal">Karaikal</option> <option value="Karauli">Karauli</option> <option value="KarbiAnglong">Karbi Anglong</option> <option value="Kargil">Kargil</option> <option value="Karimganj">Karimganj</option> <option value="Karimnagar">Karimnagar</option> <option value="Karnal">Karnal</option> <option value="Karur">Karur</option> <option value="Kasaragod">Kasaragod</option> <option value="Kathua">Kathua</option> <option value="Katihar">Katihar</option> <option value="Katni">Katni</option> <option value="Kaushambi">Kaushambi</option> <option value="Kendrapara">Kendrapara</option> <option value="Kendujhar(Keonjhar)"> Kendujhar (Keonjhar) </option> <option value="Khagaria">Khagaria</option> <option value="Khammam">Khammam</option> <option value="Khandwa(EastNimar)">Khandwa (East Nimar)</option> <option value="Khargone(WestNimar)"> Khargone (West Nimar) </option> <option value="Kheda">Kheda</option> <option value="Khordha">Khordha</option> <option value="Khowai">Khowai</option> <option value="Khunti">Khunti</option> <option value="Kinnaur">Kinnaur</option> <option value="Kishanganj">Kishanganj</option> <option value="Kishtwar">Kishtwar</option> <option value="Kodagu">Kodagu</option> <option value="Koderma">Koderma</option> <option value="Kohima">Kohima</option> <option value="Kokrajhar">Kokrajhar</option> <option value="Kolar">Kolar</option> <option value="Kolasib">Kolasib</option> <option value="Kolhapur">Kolhapur</option> <option value="Kolkata">Kolkata</option> <option value="Kollam">Kollam</option> <option value="Koppal">Koppal</option> <option value="Koraput">Koraput</option> <option value="Korba">Korba</option> <option value="Koriya">Koriya</option> <option value="Kota">Kota</option> <option value="Kottayam">Kottayam</option> <option value="Kozhikode">Kozhikode</option> <option value="Krishna">Krishna</option> <option value="Kulgam">Kulgam</option> <option value="Kullu">Kullu</option> <option value="Kupwara">Kupwara</option> <option value="Kurnool">Kurnool</option> <option value="Kurukshetra">Kurukshetra</option> <option value="KurungKumey">Kurung Kumey</option> <option value="Kushinagar">Kushinagar</option> <option value="Kutch">Kutch</option> <option value="LahaulandSpiti">Lahaul and Spiti</option> <option value="Lakhimpur">Lakhimpur</option> <option value="LakhimpurKheri">Lakhimpur Kheri</option> <option value="Lakhisarai">Lakhisarai</option> <option value="Lalitpur">Lalitpur</option> <option value="Latehar">Latehar</option> <option value="Latur">Latur</option> <option value="Lawngtlai">Lawngtlai</option> <option value="Leh">Leh</option> <option value="Lohardaga">Lohardaga</option> <option value="Lohit">Lohit</option> <option value="LowerDibangValley">Lower Dibang Valley</option> <option value="LowerSubansiri">Lower Subansiri</option> <option value="Lucknow">Lucknow</option> <option value="Ludhiana">Ludhiana</option> <option value="Lunglei">Lunglei</option> <option value="Madhepura">Madhepura</option> <option value="Madhubani">Madhubani</option> <option value="Madurai">Madurai</option> <option value="MahamayaNagar">Mahamaya Nagar</option> <option value="Maharajganj">Maharajganj</option> <option value="Mahasamund">Mahasamund</option> <option value="Mahbubnagar">Mahbubnagar</option> <option value="Mahe">Mahe</option> <option value="Mahendragarh">Mahendragarh</option> <option value="Mahoba">Mahoba</option> <option value="Mainpuri">Mainpuri</option> <option value="Malappuram">Malappuram</option> <option value="Maldah">Maldah</option> <option value="Malkangiri">Malkangiri</option> <option value="Mamit">Mamit</option> <option value="Mandi">Mandi</option> <option value="Mandla">Mandla</option> <option value="Mandsaur">Mandsaur</option> <option value="Mandya">Mandya</option> <option value="Mansa">Mansa</option> <option value="Marigaon">Marigaon</option> <option value="Mathura">Mathura</option> <option value="Mau">Mau</option> <option value="Mayurbhanj">Mayurbhanj</option> <option value="Medak">Medak</option> <option value="Meerut">Meerut</option> <option value="Mehsana">Mehsana</option> <option value="Mewat">Mewat</option> <option value="Mirzapur">Mirzapur</option> <option value="Moga">Moga</option> <option value="Mokokchung">Mokokchung</option> <option value="Mon">Mon</option> <option value="Moradabad">Moradabad</option> <option value="Morena">Morena</option> <option value="MumbaiCity">Mumbai City</option> <option value="Mumbaisuburban">Mumbai suburban</option> <option value="Munger">Munger</option> <option value="Murshidabad">Murshidabad</option> <option value="Muzaffarnagar">Muzaffarnagar</option> <option value="Muzaffarpur">Muzaffarpur</option> <option value="Mysore">Mysore</option> <option value="Nabarangpur">Nabarangpur</option>
                                <option value="Nadia">Nadia</option> <option value="Nagaon">Nagaon</option> <option value="Nagapattinam">Nagapattinam</option> <option value="Nagaur">Nagaur</option> <option value="Nagpur">Nagpur</option> <option value="Nainital">Nainital</option> <option value="Nalanda">Nalanda</option> <option value="Nalbari">Nalbari</option> <option value="Nalgonda">Nalgonda</option> <option value="Namakkal">Namakkal</option> <option value="Nanded">Nanded</option>
                                <option value="Nandurbar">Nandurbar</option> <option value="Narayanpur">Narayanpur</option> <option value="Narmada">Narmada</option> <option value="Narsinghpur">Narsinghpur</option> <option value="Nashik">Nashik</option> <option value="Navsari">Navsari</option> <option value="Nawada">Nawada</option> <option value="Nawanshahr">Nawanshahr</option> <option value="Nayagarh">Nayagarh</option> <option value="Neemuch">Neemuch</option> <option value="Nellore">Nellore</option> <option value="NewDelhi">New Delhi</option> <option value="Nilgiris">Nilgiris</option> <option value="Nizamabad">Nizamabad</option> <option value="North24Parganas">North 24 Parganas</option> <option value="NorthDelhi">North Delhi</option> <option value="NorthEastDelhi">North East Delhi</option> <option value="NorthGoa">North Goa</option> <option value="NorthSikkim">North Sikkim</option> <option value="NorthTripura">North Tripura</option> <option value="NorthWestDelhi">North West Delhi</option> <option value="Nuapada">Nuapada</option> <option value="Ongole">Ongole</option> <option value="Osmanabad">Osmanabad</option> <option value="Pakur">Pakur</option> <option value="Palakkad">Palakkad</option> <option value="Palamu">Palamu</option> <option value="Pali">Pali</option> <option value="Palwal">Palwal</option> <option value="Panchkula">Panchkula</option> <option value="Panchmahal">Panchmahal</option> <option value="PanchsheelNagardistrict(Hapur)"> Panchsheel Nagar district (Hapur) </option> <option value="Panipat">Panipat</option> <option value="Panna">Panna</option> <option value="PapumPare">Papum Pare</option> <option value="Parbhani">Parbhani</option> <option value="PaschimMedinipur">Paschim Medinipur</option> <option value="Patan">Patan</option> <option value="Pathanamthitta">Pathanamthitta</option> <option value="Pathankot">Pathankot</option> <option value="Patiala">Patiala</option> <option value="Patna">Patna</option> <option value="PauriGarhwal">Pauri Garhwal</option> <option value="Perambalur">Perambalur</option> <option value="Phek">Phek</option> <option value="Pilibhit">Pilibhit</option> <option value="Pithoragarh">Pithoragarh</option> <option value="Pondicherry">Pondicherry</option> <option value="Poonch">Poonch</option> <option value="Porbandar">Porbandar</option> <option value="Pratapgarh">Pratapgarh</option> <option value="Pratapgarh">Pratapgarh</option> <option value="Pudukkottai">Pudukkottai</option> <option value="Pulwama">Pulwama</option> <option value="Pune">Pune</option> <option value="PurbaMedinipur">Purba Medinipur</option> <option value="Puri">Puri</option> <option value="Purnia">Purnia</option> <option value="Purulia">Purulia</option> <option value="Raebareli">Raebareli</option> <option value="Raichur">Raichur</option> <option value="Raigad">Raigad</option> <option value="Raigarh">Raigarh</option> <option value="Raipur">Raipur</option> <option value="Raisen">Raisen</option> <option value="Rajauri">Rajauri</option> <option value="Rajgarh">Rajgarh</option> <option value="Rajkot">Rajkot</option> <option value="Rajnandgaon">Rajnandgaon</option> <option value="Rajsamand">Rajsamand</option> <option value="RamabaiNagar(KanpurDehat)"> Ramabai Nagar (Kanpur Dehat) </option> <option value="Ramanagara">Ramanagara</option> <option value="Ramanathapuram">Ramanathapuram</option> <option value="Ramban">Ramban</option> <option value="Ramgarh">Ramgarh</option> <option value="Rampur">Rampur</option> <option value="Ranchi">Ranchi</option> <option value="Ratlam">Ratlam</option> <option value="Ratnagiri">Ratnagiri</option> <option value="Rayagada">Rayagada</option> <option value="Reasi">Reasi</option> <option value="Rewa">Rewa</option> <option value="Rewari">Rewari</option> <option value="RiBhoi">Ri Bhoi</option> <option value="Rohtak">Rohtak</option> <option value="Rohtas">Rohtas</option> <option value="Rudraprayag">Rudraprayag</option> <option value="Rupnagar">Rupnagar</option> <option value="Sabarkantha">Sabarkantha</option> <option value="Sagar">Sagar</option> <option value="Saharanpur">Saharanpur</option> <option value="Saharsa">Saharsa</option> <option value="Sahibganj">Sahibganj</option> <option value="Saiha">Saiha</option> <option value="Salem">Salem</option> <option value="Samastipur">Samastipur</option> <option value="Samba">Samba</option> <option value="Sambalpur">Sambalpur</option> <option value="Sangli">Sangli</option> <option value="Sangrur">Sangrur</option> <option value="SantKabirNagar">Sant Kabir Nagar</option> <option value="SantRavidasNagar">Sant Ravidas Nagar</option> <option value="Saran">Saran</option> <option value="Satara">Satara</option> <option value="Satna">Satna</option> <option value="SawaiMadhopur">Sawai Madhopur</option> <option value="Sehore">Sehore</option> <option value="Senapati">Senapati</option> <option value="Seoni">Seoni</option> <option value="SeraikelaKharsawan">Seraikela Kharsawan</option> <option value="Serchhip">Serchhip</option> <option value="Shahdol">Shahdol</option> <option value="Shahjahanpur">Shahjahanpur</option> <option value="Shajapur">Shajapur</option> <option value="Shamli">Shamli</option> <option value="Sheikhpura">Sheikhpura</option> <option value="Sheohar">Sheohar</option> <option value="Sheopur">Sheopur</option> <option value="Shimla">Shimla</option> <option value="Shimoga">Shimoga</option> <option value="Shivpuri">Shivpuri</option> <option value="Shopian">Shopian</option> <option value="Shravasti">Shravasti</option> <option value="Sibsagar">Sibsagar</option> <option value="Siddharthnagar">Siddharthnagar</option> <option value="Sidhi">Sidhi</option> <option value="Sikar">Sikar</option> <option value="Simdega">Simdega</option> <option value="Sindhudurg">Sindhudurg</option> <option value="Singrauli">Singrauli</option> <option value="Sirmaur">Sirmaur</option> <option value="Sirohi">Sirohi</option> <option value="Sirsa">Sirsa</option> <option value="Sitamarhi">Sitamarhi</option> <option value="Sitapur">Sitapur</option> <option value="Sivaganga">Sivaganga</option> <option value="Siwan">Siwan</option> <option value="Solan">Solan</option> <option value="Solapur">Solapur</option> <option value="Sonbhadra">Sonbhadra</option> <option value="Sonipat">Sonipat</option> <option value="Sonitpur">Sonitpur</option> <option value="South24Parganas">South 24 Parganas</option> <option value="SouthDelhi">South Delhi</option> <option value="SouthGaroHills">South Garo Hills</option> <option value="SouthGoa">South Goa</option> <option value="SouthSikkim">South Sikkim</option> <option value="SouthTripura">South Tripura</option> <option value="SouthWestDelhi">South West Delhi</option> <option value="SriMuktsarSahib">Sri Muktsar Sahib</option> <option value="Srikakulam">Srikakulam</option> <option value="Srinagar">Srinagar</option> <option value="Subarnapur(Sonepur)"> Subarnapur (Sonepur) </option> <option value="Sultanpur">Sultanpur</option> <option value="Sundergarh">Sundergarh</option> <option value="Supaul">Supaul</option> <option value="Surat">Surat</option> <option value="Surendranagar">Surendranagar</option> <option value="Surguja">Surguja</option> <option value="Tamenglong">Tamenglong</option> <option value="TarnTaran">Tarn Taran</option> <option value="Tawang">Tawang</option> <option value="TehriGarhwal">Tehri Garhwal</option> <option value="Thane">Thane</option> <option value="Thanjavur">Thanjavur</option> <option value="TheDangs">The Dangs</option> <option value="Theni">Theni</option> <option value="Thiruvananthapuram">Thiruvananthapuram</option> <option value="Thoothukudi">Thoothukudi</option> <option value="Thoubal">Thoubal</option> <option value="Thrissur">Thrissur</option> <option value="Tikamgarh">Tikamgarh</option> <option value="Tinsukia">Tinsukia</option> <option value="Tirap">Tirap</option> <option value="Tiruchirappalli">Tiruchirappalli</option> <option value="Tirunelveli">Tirunelveli</option> <option value="Tirupur">Tirupur</option> <option value="Tiruvallur">Tiruvallur</option> <option value="Tiruvannamalai">Tiruvannamalai</option> <option value="Tiruvarur">Tiruvarur</option> <option value="Tonk">Tonk</option> <option value="Tuensang">Tuensang</option> <option value="Tumkur">Tumkur</option> <option value="Udaipur">Udaipur</option> <option value="Udalguri">Udalguri</option> <option value="UdhamSinghNagar">Udham Singh Nagar</option> <option value="Udhampur">Udhampur</option> <option value="Udupi">Udupi</option> <option value="Ujjain">Ujjain</option> <option value="Ukhrul">Ukhrul</option> <option value="Umaria">Umaria</option> <option value="Una">Una</option> <option value="Unnao">Unnao</option> <option value="UpperSiang">Upper Siang</option> <option value="UpperSubansiri">Upper Subansiri</option> <option value="UttarDinajpur">Uttar Dinajpur</option> <option value="UttaraKannada">Uttara Kannada</option> <option value="Uttarkashi">Uttarkashi</option> <option value="Vadodara">Vadodara</option> <option value="Vaishali">Vaishali</option> <option value="Valsad">Valsad</option> <option value="Varanasi">Varanasi</option> <option value="Vellore">Vellore</option> <option value="Vidisha">Vidisha</option> <option value="Viluppuram">Viluppuram</option> <option value="Virudhunagar">Virudhunagar</option> <option value="Visakhapatnam">Visakhapatnam</option>
                                <option value="Vizianagaram">Vizianagaram</option> <option value="Vyara">Vyara</option>
                                <option value="Warangal">Warangal</option> <option value="Wardha">Wardha</option> <option value="Washim">Washim</option> <option value="Wayanad">Wayanad</option>
                                <option value="WestChamparan">West Champaran</option>
                                <option value="WestDelhi">West Delhi</option> <option value="WestGaroHills">West Garo Hills</option> <option value="WestKameng">West Kameng</option>
                                <option value="WestKhasiHills">West Khasi Hills</option> <option value="WestSiang">West Siang</option> <option value="WestSikkim">West Sikkim</option>
                                <option value="WestSinghbhum">West Singhbhum</option>
                                <option value="WestTripura">West Tripura</option> <option value="Wokha">Wokha</option> <option value="Yadgir">Yadgir</option> <option value="YamunaNagar">Yamuna Nagar</option> <option value="Yanam">Yanam</option> <option value="Yavatmal">Yavatmal</option> <option value="Zunheboto">Zunheboto</option>


                            </select>
                            {validation.touched.employeecity && validation.errors.employeecity ? (
                                <p className="text-red-400">{validation.errors.employeecity}</p>
                            ) : null}
                        </div> */}


                        {/* <div className="xl:col-span-6">
                            <label htmlFor="pinCodeInput" className="inline-block mb-2 text-base font-medium"> Pin Code</label>
                            <input type="number" id=" pinCodeInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter  Pin Code"
                                name="pincode"
                                onChange={validation.handleChange}
                                value={validation.values.pincode || ""}
                            />
                            {validation.touched.pincode && validation.errors.pincode ? (
                                <p className="text-red-400">{validation.errors.pincode}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="role" className="inline-block mb-2 text-base font-medium">Role</label>
                            <input type="text" id="role" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Employee Role"
                                name="role"
                                onChange={validation.handleChange}
                                value={validation.values.role || ""}
                            />
                            {validation.touched.role && validation.errors.role ? (
                                <p className="text-red-400">{validation.errors.role}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="shift" className="inline-block mb-2 text-base font-medium">Shift</label>
                            <input type="text" id="shift" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Employee Shift"
                                name="shift"
                                onChange={validation.handleChange}
                                value={validation.values.shift || ""}
                            />
                            {validation.touched.shift && validation.errors.shift ? (
                                <p className="text-red-400">{validation.errors.shift}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="xl:col-span-6">
                             
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
                                 
                                <option value="night">Night Shift</option>
                            </select>

                             
                            {showTimeInputs && (
                                <div  className="xl:col-span-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="inTime" className="inline-block mb-2 text-base font-medium">
                                            In Time:
                                        </label>
                                        <input
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
                                            type="time"
                                            id="outTime"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                        />
                                    </div>
                                </div>
                            )}
                        </div> */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="joiningDate" className="inline-block mb-2 text-base font-medium">Joining Date</label>
                            <Flatpickr
                                id="joiningDate"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                placeholder='Select date'
                                name='joinDate'
                                onChange={(date: any) => validation.setFieldValue("joinDate", moment(date[0]).format("DD MMMM ,YYYY"))}
                                value={validation.values.joinDate || ''}
                            />
                            {validation.touched.joinDate && validation.errors.joinDate ? (
                                <p className="text-red-400">{validation.errors.joinDate}</p>
                            ) : null}
                        </div> */}

                        {/* leave date  */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="leaveDateInput" className="inline-block mb-2 text-base font-medium">Leave Date</label>
                            <Flatpickr
                                id="leaveDateInput"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                placeholder='Select date'
                                name='leaveDate'
                                onChange={(date: any) => validation.setFieldValue("leaveDate", moment(date[0]).format("DD MMMM ,YYYY"))}
                                value={validation.values.leaveDate || ''}
                            />
                            {validation.touched.leaveDate && validation.errors.leaveDate ? (
                                <p className="text-red-400">{validation.errors.leaveDate}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="experienceInput" className="inline-block mb-2 text-base font-medium">Experience</label>
                            <input type="number" id="experienceInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="0.0"
                                name="experience"
                                onChange={validation.handleChange}
                                value={validation.values.experience || ""}
                            />
                            {validation.touched.experience && validation.errors.experience ? (
                                <p className="text-red-400">{validation.errors.experience}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="xl:col-span-6">
                            <label htmlFor="pastCompanyInput" className="inline-block mb-2 text-base font-medium"> Past Company Details If Any </label>
                            <input type=" text" id="pastCompanyInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Past company Details if Any"
                                name="pastCampanydetails"
                                onChange={validation.handleChange}
                                value={validation.values.pastCampanydetails || ""}
                            />
                            {validation.touched.pastCampanydetails && validation.errors.pastCampanydetails ? (
                                <p className="text-red-400">{validation.errors.pastCampanydetails}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="EmergencyContactNoInput" className="inline-block mb-2 text-base font-medium">Emergency Contact No</label>
                            <input type="text" id="EmergencyContactNoInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Employee Mobile No"
                                name="EmergencyContactNo"
                                onChange={validation.handleChange}
                                value={validation.values.EmergencyContactNo || ""}
                            />
                            {validation.touched.EmergencyContactNo && validation.errors.EmergencyContactNo ? (
                                <p className="text-red-400">{validation.errors.EmergencyContactNo}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="xl:col-span-6 mb-3">
                            <label htmlFor="bloodGroupInput" className="inline-block mb-2 text-base font-medium">Blood Group</label>
                            <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="typeSelect"
                                name="bloodGroup"
                                onChange={validation.handleChange}
                                value={validation.values.bloodGroup || ""}
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
                            {validation.touched.bloodGroup && validation.errors.bloodGroup ? (
                                <p className="text-red-400">{validation.errors.bloodGroup}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="xl:col-span-6 mb-3">
                            <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Password</label>
                            <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="password"
                                name="password"
                                onChange={validation.handleChange}
                                value={validation.values.password || ""}
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
                            {validation.touched.password && validation.errors.password ? (
                                <p className="text-red-400">{validation.errors.password}</p>
                            ) : null}
                        </div> */}

                        <div className="xl:col-span-6 mb-3">
                            <label htmlFor="Description" className="inline-block mb-2 text-base font-medium">Description</label>
                            <textarea
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                name="reason"
                                placeholder="Enter Your Description"
                            ></textarea>
                        </div>


                        <div className="xl:col-span-6">
                            <label htmlFor="other" className="inline-block mb-2 text-base font-medium"> Other's</label>
                            <input type=" text" id="other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder=" Enter Other's Details"
                                name="other"
                                onChange={validation.handleChange}
                                value={validation.values.other || ""}
                            />
                            {validation.touched.other && validation.errors.other ? (
                                <p className="text-red-400">{validation.errors.other}</p>
                            ) : null}
                        </div>
                        {/* leave date end  */}
                        {/* State end */}
                        {/* city end  */}
                        {/* <div className="mb-3">
                            <label htmlFor="statusSelect" className="inline-block mb-2 text-base font-medium">Employee Type</label>
                            <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="statusSelect"
                                name="employee"
                                onChange={validation.handleChange}
                                value={validation.values.employee || ""}
                            >
                                <option value=""> Employee Type</option>
                                <option value="regular">Regular</option>
                                <option value="temporary">Temporary</option>
                                <option value="contract">Contract</option>
                            </select>
                            {validation.touched.employee && validation.errors.employee ? (
                                <p className="text-red-400">{validation.errors.employee}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="locationInput" className="inline-block mb-2 text-base font-medium">Location</label>
                            <input type="text" id="locationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Location"
                                name="location"
                                onChange={validation.handleChange}
                                value={validation.values.location || ""}
                            />
                            {validation.touched.location && validation.errors.location ? (
                                <p className="text-red-400">{validation.errors.location}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <FileUploader
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
                        {/* drag&drop  */}
                        {/* <div className="card">
                            <div className="card-body">
                                <h6 className="mb-4 text-15">Dropzone</h6>
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
                        </div> */}
                        {/* drag&drop end */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" data-modal-close="addDocuments" className="text-red-500 transition-all duration-200 ease-linear bg-white border-white btn hover:text-red-600 focus:text-red-600 active:text-red-600 dark:bg-zink-500 dark:border-zink-500" onClick={toggle}>Cancel</button>
                            <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">
                                {!!isEdit ? "Update Support Revert" : "Add Support Revert"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default SupportRevert;
