import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import BreadCrumb from 'Common/BreadCrumb';
import BreadCrumb from 'MasterAdmin/MasterCommon/BreadCrumb';
import { Link } from 'react-router-dom';
// import { Dropdown } from 'Common/Components/Dropdown';
import { Dropdown } from 'MasterAdmin/MasterCommon/Components/Dropdown';
// import TableContainer from 'Common/TableContainer';
import TableContainer from 'MasterAdmin/MasterCommon/TableContainer';
// import Flatpickr from "react-flatpickr";
// import moment from "moment";
import Select from 'react-select';
// Icons
import { Search, Eye, Trash2, Plus, MoreHorizontal, FileEdit, CheckCircle, Loader, X, Download, SlidersHorizontal, ImagePlus, EyeIcon, Pencil } from 'lucide-react';
// import Modal from 'Common/Components/Modal';
import Modal from 'MasterAdmin/MasterCommon/Components/Modal';
// import DeleteModal from 'Common/DeleteModal';
import DeleteModal from 'MasterAdmin/MasterCommon/DeleteModal';

// Images
// import dummyImg from "assets/images/users/user-dummy-img.jpg";

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import * as XLSX from 'xlsx';
import {
    getUserList as onGetUserList,
    addUserList as onAddUserList,
    updateUserList as onUpdateUserList,
    deleteUserList as onDeleteUserList
} from 'MasterAdmin/Masterslices/thunk';
import { ToastContainer } from 'react-toastify';
import filterDataBySearch from 'MasterAdmin/MasterCommon/filterDataBySearch';
import { RiFileExcel2Line } from 'react-icons/ri';
// import { Country, State, City } from 'country-state-city';
const Countrys = () => {


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

    //  country state city 
    // const addressFromik = useFormik({
    //     initialValues: {
    //         country: "India",
    //         state: null,
    //         city: null
    //     },
    //     onSubmit: (values: { country: string; state: State | null; city: City | null }) =>
    //         console.log(JSON.stringify(values))
    // });

    // const countries: Country[] = Country.getAllCountries();


    // const updatedCountries = countries.map((country) => ({
    //     label: country.name,
    //     value: country.id,
    //     ...country
    // }));
    // const updatedStates = (countryId: string) =>
    //     State
    //         .getStatesOfCountry(countryId)
    //         .map((state) => ({ label: state.name, value: state.id, ...state }));
    // const updatedCities = (stateId: string) =>
    //     City
    //         .getCitiesOfState(stateId)
    //         .map((city) => ({ label: city.name, value: city.id, ...city }));

    // const { values, handleSubmit, setFieldValue, setValues } = addressFromik;

    // useEffect(() => { }, [values]);


    // =========================

    // const addressFormik = useFormik({
    //     initialValues: {
    //         country: null,
    //         state: null,
    //         city: null
    //     },
    //     onSubmit: (values) => console.log(JSON.stringify(values))
    // });

    // const countries = Country.getAllCountries();

    // const updatedCountries = countries.map((country) => ({
    //     label: country.name,
    //     value: country.isoCode,
    //     ...country
    // }));

    // const updatedStates = (countryIsoCode: string) =>
    //     State.getStatesOfCountry(countryIsoCode).map((state) => ({
    //         label: state.name,
    //         value: state.isoCode,
    //         ...state
    //     }));

    // const updatedCities = (stateIsoCode: string) =>
    //     City.getCitiesOfState(stateIsoCode).map((city) => ({
    //         label: city.name,
    //         value: city.name,
    //         ...city
    //     }));

    // const { values, handleSubmit, setFieldValue, setValues } = addressFormik;

    //  country state city end 


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
    // 

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
            img: (eventData && eventData.img) || '',
            userId: (eventData && eventData.userId) || '',
            name: (eventData && eventData.name) || '',
            designation: (eventData && eventData.designation) || '',
            location: (eventData && eventData.location) || '',
            email: (eventData && eventData.email) || '',
            phoneNumber: (eventData && eventData.phoneNumber) || '',
            joiningDate: (eventData && eventData.joiningDate) || '',
            status: (eventData && eventData.status) || '',
        },
        validationSchema: Yup.object({
            img: Yup.string().required("Please Add Image"),
            name: Yup.string().required("Please Enter Name"),
            designation: Yup.string().required("Please Enter Designation"),
            location: Yup.string().required("Please Enter Location"),
            email: Yup.string().required("Please Enter Email"),
            phoneNumber: Yup.string().required("Please Enter Phone Number"),
            joiningDate: Yup.string().required("Please Enter Joining Date"),
            status: Yup.string().required("Please Enter Status")
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
        const keysToSearch = ['location'];
        filterDataBySearch(userList, search, keysToSearch, setUser);
    };

    // columns
    const Status = ({ item }: any) => {
        switch (item) {
            case "Active":
                return (<span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status"><CheckCircle className="size-3 mr-1.5" />{item}</span>);
            // case "Waiting":
            //     return (<span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-slate-100 border-transparent text-slate-500 dark:bg-slate-500/20 dark:text-zink-200 dark:border-transparent status"><Loader className="size-3 mr-1.5" />{item}</span>);
            case "Deactive":
                return (<span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent status"><X className="size-3 mr-1.5" />{item}</span>);
            // default:
            //     return (<span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status"><CheckCircle className="size-3 mr-1.5" />{item}</span>);
        }
    };

    const columns = useMemo(() => [
        // {
        //     header: (
        //         <div className="flex items-center h-full">
        //             <input id="CheckboxAll" className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer" type="checkbox" />
        //         </div>
        //     ),
        //     enableSorting: true,
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
        //     header: "Sr No.",
        //     // accessorKey: "userId",
        //     enableColumnFilter: false,
        //     cell: (cell: any) => (
        //         <Link to="#!" className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600 user-id">{cell.getValue()}</Link>
        //     ),
        // },
        // {
        //     header: "Name",
        //     accessorKey: "name",
        //     enableColumnFilter: false,
        //     cell: (cell: any) => (
        //         <div className="flex items-center gap-2">
        //             <div className="flex items-center justify-center size-10 font-medium rounded-full shrink-0 bg-slate-200 text-slate-800 dark:text-zink-50 dark:bg-zink-600">
        //                 {cell.row.original.img ? <img src={cell.row.original.img} alt="" className="h-10 rounded-full" /> : (cell.getValue().split(' ').map((word: any) => word.charAt(0)).join(''))}
        //             </div>
        //             <div className="grow">
        //                 <h6 className="mb-1"><Link to="#!" className="name">{cell.getValue()}</Link></h6>
        //                 <p className="text-slate-500 dark:text-zink-200">{cell.row.original.designation}</p>
        //             </div>
        //         </div>
        //     ),
        // },
        {
            header: "Country",
            accessorKey: "location",
            enableColumnFilter: false
        },
        // {
        //     header: "Email",
        //     accessorKey: "email",
        //     enableColumnFilter: false,
        // },
        // {
        //     header: "Phone Number",
        //     accessorKey: "phoneNumber",
        //     enableColumnFilter: false,
        // },
        // {
        //     header: "Joining Date",
        //     accessorKey: "joiningDate",
        //     enableColumnFilter: false,
        // },
        {
            header: "Status",
            accessorKey: "status",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                <Status item={cell.getValue()} />
            ),
        },
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
                //             <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!"
                //             onClick={() => {
                //                 const data = cell.row.original;
                //                 handleUpdateDataClick(data);
                //             }}><Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Overview</span></Link>
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
                    <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-green-500 dark:hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-500/20"><EyeIcon className="size-4" /></Link>
                    <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20" onClick={() => {
                        const data = cell.row.original;
                        handleUpdateDataClick(data);
                    }} ><Pencil className="size-4" /></Link>
                    <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20" onClick={() => {
                        const data = cell.row.original;
                        onClickDelete(data);
                    }}><Trash2 className="size-4" /></Link>

                </div>
            ),
        }
    ], []
    );

    // const options = [
    //     { value: 'Select Status', label: 'Select Status' },
    //     { value: 'Active', label: 'Active' },
    //     { value: 'Waiting', label: 'Waiting' },
    //     { value: 'Rejected', label: 'Rejected' },
    //     { value: 'Hidden', label: 'Hidden' },
    // ];

    // const handleChange = (selectedOption: any) => {
    //     if (selectedOption.value === 'Select Status' || selectedOption.value === 'Hidden') {
    //         setUser(userList);
    //     } else {
    //         const filteredUsers = userList.filter((data: any) => data.status === selectedOption.value);
    //         setUser(filteredUsers);
    //     }
    // };

    return (
        <React.Fragment>
            <BreadCrumb title='Country List' pageTitle='Country' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12 ">
                <div className="xl:col-span-12">
                    <div className="card" id="usersTable">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="w-full md:w-3/4 py-2.1 card-body border-y border-dashed border-slate-200 dark:border-zinc-500">
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
                                            {/* <div className="xl:col-span-3 xl:col-start-10">
                                        <div className="flex gap-2 xl:justify-end"> */}
                                            {/* <div>
                                                <button type="button" className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"><Download className="inline-block size-4" /> <span className="align-middle">Import</span></button>
                                            </div> */}
                                            {/* <button className="flex items-center justify-center size-[37.5px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"><SlidersHorizontal className="size-4" /></button> */}
                                            {/* </div> */}
                                            {/* </div> */}
                                        </div>
                                    </form>
                                </div>
                                {/* <h6 className="text-15 grow">Country List</h6> */}
                                <div className="w-full md:w-auto flex-shrink-0 flex space-x-4">
                                    <button className="bg-white   text-[#25476a] btn   hover:text-[#25476a] hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50  active:text-custom-600 active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20" onClick={generateExcel}>
                                        <span className="align-middle">Download</span>
                                        <RiFileExcel2Line className="inline-block size-5" />
                                    </button>
                                    <button type="button" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]" onClick={toggle}><Plus className="inline-block size-4" /> <span className="align-middle">Add Country</span></button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="!py-3.5 card-body border-y border-dashed border-slate-200 dark:border-zink-500">
                            <form action="#!">
                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                    <div className="relative xl:col-span-3">
                                        <input type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search..." autoComplete="off" onChange={(e) => filterSearchData(e)} />
                                        <Search className="inline-block size-3 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                                    </div>
                                     <div className="xl:col-span-2">
                                        <Select
                                            className="border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            options={options}
                                            isSearchable={false}
                                            defaultValue={options[0]}
                                            onChange={(event: any) => handleChange(event)}
                                            id="choices-single-default"
                                        />
                                    </div> 
                                    <div className="xl:col-span-3 xl:col-start-10">
                                        <div className="flex gap-2 xl:justify-end">
                                             <div>
                                                <button type="button" className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"><Download className="inline-block size-4" /> <span className="align-middle">Import</span></button>
                                            </div> 
                                             <button className="flex items-center justify-center size-[37.5px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"><SlidersHorizontal className="size-4" /></button> 
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div> */}
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
                    <Modal.Title className="text-16">{!!isEdit ? "Edit Country" : "Add Country"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">

                    {/* <form onSubmit={handleSubmit}>
                    <label htmlFor=""> Country</label>
                        <Select
                            id="country"
                            name="country"
                            label="country"
                            options={updatedCountries}
                            value={values.country}
                            onChange={(value) => {
                                setValues({ country: value, state: null, city: null }, false);
                            }}
                        />
                        <label htmlFor=""> State</label>
                        <Select
                            id="state"
                            name="state"
                            options={
                                values.country ? updatedStates(values.country.value) : []
                            }
                            value={values.state}
                            onChange={(value) => {
                                setValues({ ...values, state: value, city: null }, false);
                            }}
                        />
                        <label htmlFor=""> City</label>
                        <Select
                            id="city"
                            name="city"
                            options={values.state ? updatedCities(values.state.value) : []}
                            value={values.city}
                            onChange={(value) => setFieldValue("city", value)}
                        />
                        <button type="submit">Submit</button>
                    </form> */}
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
                            <label htmlFor="userId" className="inline-block mb-2 text-base font-medium">Company GST No.</label>
                            <input type="text" id="userId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" disabled
                                value={validation.values.userId || '#TW1500004'}
                            />
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="joiningDateInput" className="inline-block mb-2 text-base font-medium">Joining Date</label>
                            <Flatpickr
                                id="joiningDateInput"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name="joiningDate"
                                placeholder='Select date'
                                onChange={(date: any) => validation.setFieldValue("joiningDate", moment(date[0]).format("DD MMMM ,YYYY"))}
                                value={validation.values.joiningDate || ''}
                            />
                            {validation.touched.joiningDate && validation.errors.joiningDate ? (
                                <p className="text-red-400">{validation.errors.joiningDate}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium">Company Name</label>
                            <input type="text" id="userNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter name"
                                name="name"
                                onChange={validation.handleChange}
                                value={validation.values.name || ""}
                            />
                            {validation.touched.name && validation.errors.name ? (
                                <p className="text-red-400">{validation.errors.name}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="designationInput" className="inline-block mb-2 text-base font-medium">Designation</label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter designation"
                                name="designation"
                                onChange={validation.handleChange}
                                value={validation.values.designation || ""}
                            />
                            {validation.touched.designation && validation.errors.designation ? (
                                <p className="text-red-400">{validation.errors.designation}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="emailInput" className="inline-block mb-2 text-base font-medium"> Email</label>
                            <input type="email" id="emailInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter email"
                                name="email"
                                onChange={validation.handleChange}
                                value={validation.values.email || ""}
                            />
                            {validation.touched.email && validation.errors.email ? (
                                <p className="text-red-400">{validation.errors.email}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="phoneNumberInput" className="inline-block mb-2 text-base font-medium">Contect Number</label>
                            <input type="text" id="phoneNumberInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="12345 67890"
                                name="phoneNumber"
                                onChange={validation.handleChange}
                                value={validation.values.phoneNumber || ""}
                            />
                            {validation.touched.phoneNumber && validation.errors.phoneNumber ? (
                                <p className="text-red-400">{validation.errors.phoneNumber}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="statusSelect" className="inline-block mb-2 text-base font-medium">Company Category</label>
                            <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="statusSelect"
                                name="status"
                                onChange={validation.handleChange}
                                value={validation.values.status || ""}
                            >
                                <option value="">Select Company Category</option>
                                <option value="Active">Active</option>
                                <option value="Waiting">Waiting</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                            {validation.touched.status && validation.errors.status ? (
                                <p className="text-red-400">{validation.errors.status}</p>
                            ) : null}
                        </div> */}
                        <div className="mb-3">
                            <label htmlFor="country" className="inline-block mb-2 text-base font-medium">Country*</label>
                            <input type="text" id="country" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Add Country"
                                name="country"
                                onChange={validation.handleChange}
                                value={validation.values.country || ""}
                            />
                            {validation.touched.country && validation.errors.country ? (
                                <p className="text-red-400">{validation.errors.country}</p>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="other" className="inline-block mb-2 text-base font-medium">Other's</label>
                            <input type="text" id="other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Add other's Details"
                                name="other"
                                onChange={validation.handleChange}
                                value={validation.values.other || ""}
                            />
                            {validation.touched.other && validation.errors.other ? (
                                <p className="text-red-400">{validation.errors.other}</p>
                            ) : null}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" data-modal-close="addDocuments" className="text-red-500 transition-all duration-200 ease-linear bg-white border-white btn hover:text-red-600 focus:text-red-600 active:text-red-600 dark:bg-zink-500 dark:border-zink-500" onClick={toggle}>Cancel</button>
                            <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">
                                {!!isEdit ? "Update Country" : "Add Country"}
                            </button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

        </React.Fragment>
    );
};

export default Countrys;