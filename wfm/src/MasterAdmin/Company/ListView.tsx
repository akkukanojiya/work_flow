import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import BreadCrumb from 'Common/BreadCrumb';
import BreadCrumb from 'MasterAdmin/MasterCommon/BreadCrumb';
import { Link } from 'react-router-dom';
// import { Dropdown } from 'Common/Components/Dropdown';
import { Dropdown } from 'MasterAdmin/MasterCommon/Components/Dropdown';
// import TableContainer from 'Common/TableContainer';
import TableContainer from 'MasterAdmin/MasterCommon/TableContainer';
import Flatpickr from "react-flatpickr";
import moment from "moment";
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

import {
    getUserList as onGetUserList,
    addUserList as onAddUserList,
    updateUserList as onUpdateUserList,
    deleteUserList as onDeleteUserList
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';
import filterDataBySearch from 'Common/filterDataBySearch';
import * as XLSX from 'xlsx';
import { RiFileExcel2Line } from 'react-icons/ri';



const MasterCompany = () => {


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
            // img: (eventData && eventData.img) || '',
            companyid: (eventData && eventData.companyid) || '',
            name: (eventData && eventData.name) || '',
            companycategory: (eventData && eventData.companycategory) || '',
            companypancard: (eventData && eventData.companypancard) || '',
            companypincode: (eventData && eventData.companypincode) || '',
            location: (eventData && eventData.location) || '',
            email: (eventData && eventData.email) || '',
            companymobileno: (eventData && eventData.companymobileno) || '',
            companycity: (eventData && eventData.companycity) || '',
            companystate: (eventData && eventData.companystate) || '',
            numberofusers: (eventData && eventData.numberofusers) || '',
            CompanyLicenseDate: (eventData && eventData.CompanyLicenseDate) || '',
            LicensePurchaseYear: (eventData && eventData.LicensePurchaseYear) || '',
            CompanyRenewalDate: (eventData && eventData.CompanyRenewalDate) || '',
            addresstype: (eventData && eventData.addresstype) || '',
            address: (eventData && eventData.address) || '',
        },
        validationSchema: Yup.object({
            // img: Yup.string().required("Please Add Image"),
            // companyid: Yup.string().required("Please Enter Company Id"),
            name: Yup.string().required("Please Enter Name"),
            companycategory: Yup.string().required("Please Enter  Category"),
            companypancard: Yup.string().required("Please Enter   Pan Card  "),
            companypincode: Yup.string().required("Please Enter   Pin Code  "),
            location: Yup.string().required("Please Enter Location"),
            email: Yup.string().required("Please Enter Email"),
            companymobileno: Yup.string().required("Please Enter  Mobile Number"),
            companycity: Yup.string().required("Please Enter   City"),
            companystate: Yup.string().required("Please Enter   State"),
            numberofusers: Yup.string().required("Please Enter Number Of Users"),
            // CompanyLicenseDate: Yup.string().required("Please Enter   License Date"),
            // LicensePurchaseYear: Yup.string().required("Please Enter   License Purchase Year"),
            // CompanyRenewalDate: Yup.string().required("Please Enter Company Renewal Date"),
            addresstype: Yup.string().required('Address Type is required'),
            address: Yup.string().required('Address  is required'),
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
        const keysToSearch = ['name', 'designation', 'location', 'email', 'status'];
        filterDataBySearch(userList, search, keysToSearch, setUser);
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
        {
            header: " Id",
            accessorKey: "companyId",
            enableColumnFilter: false
        },

        {
            header: "Name",
            accessorKey: "companyname",
            enableColumnFilter: false
        },
        {
            header: "Email",
            accessorKey: "email",
            enableColumnFilter: false,
        },
        {
            header: "Mobile No.",
            accessorKey: "contectNumber",
            enableColumnFilter: false,
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
                //             <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!"><Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Overview</span></Link>
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


    // dynamic input field 
    // dynamic form 
    const [fields, setFields] = useState([{ addresstype: '', address: '', city: '', state: '', pincode: '' }]);
    // const [staticField, setStaticField] = useState<string>('');

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const values = [...fields];
        (values[index] as { [key: string]: string })[e.target.name] = e.target.value;

        setFields(values);
    };
    const handleAddField = () => {
        setFields([...fields, { addresstype: '', address: '', city: '', state: '', pincode: '' }]);
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

    // dynamic input field end 
    return (
        <React.Fragment>
            <BreadCrumb title='Company List' pageTitle='Companies' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12 ">
                <div className="xl:col-span-12">
                    <div className="card " id="usersTable">
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

                                {/* <h6 className="text-15 grow">Company List</h6> */}
                                <div className="w-full md:w-auto flex-shrink-0 flex space-x-4">
                                    <button className="bg-white   text-[#25476a] btn   hover:text-[#25476a] hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50  active:text-custom-600 active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20" onClick={generateExcel}>
                                        <span className="align-middle">Download</span>
                                        <RiFileExcel2Line className="inline-block size-5" />
                                    </button>
                                    <button type="button" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]" onClick={toggle}><Plus className="inline-block size-4" /> <span className="align-middle">Add Company</span></button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="!py-3.5 card-body border-y border-dashed border-slate-200 dark:border-zink-500">
                                <form action="#!">
                                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                        <div className="relative xl:col-span-3">
                                            <input type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search..." autoComplete="off" onChange={(e) => filterSearchData(e)} />
                                            <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
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
                                    divclassName="-mx-5 -mb-2 overflow-x-auto"
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
                dialogClassName="w-full md:w-[45rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-300/20"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Edit Company" : "Add Company"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto ">
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
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium">Company ID</label>
                            <input type="number" id="companyId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Company ID"
                                name="companyid"
                                onChange={validation.handleChange}
                                value={validation.values.companyid || ""}
                            />
                            {validation.touched.companyid && validation.errors.companyid ? (
                                <p className="text-red-400">{validation.errors.companyid}</p>
                            ) : null}
                        </div> */}
                        <div className="mb-3">
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium">Name</label>
                            <input type="text" id="userNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Name"
                                name="name"
                                onChange={validation.handleChange}
                                value={validation.values.name || ""}
                            />
                            {validation.touched.name && validation.errors.name ? (
                                <p className="text-red-400">{validation.errors.name}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium">Category</label>
                            <input type="text" id="userNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter   Category"
                                name="companycategory"
                                onChange={validation.handleChange}
                                value={validation.values.companycategory || ""}
                            />
                            {validation.touched.companycategory && validation.errors.companycategory ? (
                                <p className="text-red-400">{validation.errors.companycategory}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium">Pan Card</label>
                            <input type="text" id="CompanyPANCARD" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Pan Card"
                                name="companypancard"
                                onChange={validation.handleChange}
                                value={validation.values.companypancard || ""}
                            />
                            {validation.touched.companypancard && validation.errors.companypancard ? (
                                <p className="text-red-400">{validation.errors.companypancard}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium">GST No.</label>
                            <input type="text" id="companygstno" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter   GST No"
                                name="companygstno"
                                onChange={validation.handleChange}
                                value={validation.values.companygstno || ""}
                            />
                            {validation.touched.companygstno && validation.errors.companygstno ? (
                                <p className="text-red-400">{validation.errors.companygstno}</p>
                            ) : null}
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="companyemailid" className="inline-block mb-2 text-base font-medium"> Email Id</label>
                            <input type="email" id="companyemailid" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                required
                                placeholder="Enter   Email Id"
                                name="companyemailid"
                                onChange={validation.handleChange}
                                value={validation.values.companyemailid || ""}
                            />
                            {validation.touched.companyemailid && validation.errors.companyemailid ? (
                                <p className="text-red-400">{validation.errors.companyemailid}</p>
                            ) : null}
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="companycity" className="inline-block mb-2 text-base font-medium">Company City</label>
                            <input type="text" id="companycity" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Company City"
                                name="companycity"
                                onChange={validation.handleChange}
                                value={validation.values.companycity || ""}
                            />
                            {validation.touched.companycity && validation.errors.companycity ? (
                                <p className="text-red-400">{validation.errors.companycity}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="companystate" className="inline-block mb-2 text-base font-medium"> Company State</label>
                            <input type="text" id="companystate" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Company State"
                                name="companystate"
                                onChange={validation.handleChange}
                                value={validation.values.companystate || ""}
                            />
                            {validation.touched.companystate && validation.errors.companystate ? (
                                <p className="text-red-400">{validation.errors.companystate}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="companypincode" className="inline-block mb-2 text-base font-medium">Pin Code</label>
                            <input type="text" id="companypincode" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Company Pincode"
                                name="companypincode"
                                onChange={validation.handleChange}
                                value={validation.values.companypincode || ""}
                            />
                            {validation.touched.companypincode && validation.errors.companypincode ? (
                                <p className="text-red-400">{validation.errors.companypincode}</p>
                            ) : null}
                        </div> */}
                        <div className="mb-3">
                            <label htmlFor="companymobileno" className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                            <input type="text" id="companymobileno" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder=" Enter Mobile No."
                                name="companymobileno"
                                onChange={validation.handleChange}
                                value={validation.values.companymobileno || ""}
                            />
                            {validation.touched.companymobileno && validation.errors.companymobileno ? (
                                <p className="text-red-400">{validation.errors.companymobileno}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numberOfUsers" className="inline-block mb-2 text-base font-medium">Number Of Users</label>
                            <input type="number" id="numberOfUsers" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter   Number Of Users"
                                name="numberofusers"
                                onChange={validation.handleChange}
                                value={validation.values.numberofusers || ""}
                            />
                            {validation.touched.numberofusers && validation.errors.numberofusers ? (
                                <p className="text-red-400">{validation.errors.numberofusers}</p>
                            ) : null}
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="CompanyLicenseDate" className="inline-block mb-2 text-base font-medium">Company's License Date</label>
                            <Flatpickr
                                id="CompanyLicenseDate"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name="CompanyLicenseDate"
                                placeholder='Select Company License Date'
                                onChange={(date: any) => validation.setFieldValue("CompanyLicenseDate", moment(date[0]).format("DD MMMM ,YYYY"))}
                                value={validation.values.CompanyLicenseDate || ''}
                            />
                            {validation.touched.CompanyLicenseDate && validation.errors.CompanyLicenseDate ? (
                                <p className="text-red-400">{validation.errors.CompanyLicenseDate}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="LicensePurchaseYear" className="inline-block mb-2 text-base font-medium"> License Purchase Year</label>
                            <input type="number" id="LicensePurchaseYear" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter License Purchase Year"
                                name="LicensePurchaseYear"
                                onChange={validation.handleChange}
                                value={validation.values.LicensePurchaseYear || ""}
                            />
                            {validation.touched.LicensePurchaseYear && validation.errors.LicensePurchaseYear ? (
                                <p className="text-red-400">{validation.errors.LicensePurchaseYear}</p>
                            ) : null}
                        </div> */}
                        {/* <div className="mb-3">
                            <label htmlFor="CompanyRenewalDate" className="inline-block mb-2 text-base font-medium">Company's Renewal Date</label>
                            <Flatpickr
                                id="CompanyRenewalDate"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name="CompanyRenewalDate"
                                placeholder='Enter Company Renewal Date'
                                onChange={(date: any) => validation.setFieldValue("CompanyRenewalDate", moment(date[0]).format("DD MMMM ,YYYY"))}
                                value={validation.values.CompanyRenewalDate || ''}
                            />
                            {validation.touched.CompanyRenewalDate && validation.errors.CompanyRenewalDate ? (
                                <p className="text-red-400">{validation.errors.CompanyRenewalDate}</p>
                            ) : null}
                        </div> */}



                        {/* <div className="xl:col-span-6">
                            <div>
                                <label htmlFor="textArea" className="inline-block mb-2 text-base font-medium">Address</label>
                                <textarea className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" id="textArea"
                                    name="address"
                                    onChange={validation.handleChange}

                                >
                                </textarea>

                            </div>
                        </div> */}
                        {/* dynamic form  */}

                        {fields.map((field, index) => (


                            <div key={index} className="col-6  ">
                                <div className="flex justify-end gap-2 mt-4">
                                    {fields.length !== 1 && <button type="button"
                                        className="text-white btn bg-rose-500 border-rose-500 hover:text-white hover:bg-rose-600 hover:border-rose-600 focus:text-white focus:bg-rose-600 focus:border-rose-600 focus:ring focus:ring-rose-100 active:text-white active:bg-rose-600 active:border-rose-600 active:ring active:ring-rose-100 dark:ring-rose-400/20 mt-3 " onClick={() => handleRemoveField(index)}>Remove</button>}

                                    <button type="button" className="text-white btn bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/20 mt-3 mr-5" onClick={handleAddField}  >Add Field</button>
                                </div>
                                {/* <div className="xl:col-span-6">
                                    <label htmlFor="taxApplicable" className="inline-block mb-2 text-base font-medium">Address Type*</label>
                                    <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="addrestype"
                                            name="addresstype"
                                            value={field.addrestype}
                                            onChange={(e) => handleChange(index, e)}>
                                        <option value="">Address Type</option>
                                        <option value="regtOffice">Regt. Office</option>
                                        <option value="headoffice">Head Office</option>
                                        <option value="branchoffice">Branch Office</option>
                                    </select>
                                    {validation.touched.addresstype && validation.errors.addresstype ? (
                                            <p className="text-red-400">{validation.errors.addresstype}</p>
                                        ) : null}
                                </div> */}

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor={`addresstype-${index}`} className="inline-block mb-2 text-base font-medium">
                                            Address Type*
                                        </label>
                                        <select
                                            className="form-input border-slate-300 focus:outline-none focus:border-custom-500"
                                            id={`addresstype-${index}`}
                                            name="addresstype"
                                            value={field.addresstype}
                                            onChange={(e) => handleChange(index, e)}
                                        >
                                            <option value="">Address Type</option>
                                            <option value="regtOffice">Regt. Office</option>
                                            <option value="headoffice">Head Office</option>
                                            <option value="branchoffice">Branch Office</option>
                                        </select>
                                        {validation.touched?.[index]?.addresstype && validation.errors?.[index]?.addresstype ? (
                                            <p className="text-red-400">{validation.errors[index].addresstype}</p>
                                        ) : null}
                                    </div>

                                </div>


                                {/* City Field */}
                                <div className="mb-3">
                                    <label htmlFor={`city-${index}`} className="inline-block mb-2 text-base font-medium">City</label>
                                    <input
                                        type="text"
                                        className="form-input border-slate-200 focus:outline-none focus:border-custom-500"
                                        id={`city-${index}`}
                                        name="city"
                                        placeholder="Enter City"
                                        value={field.city}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>

                                {/* State Field */}
                                <div className="mb-3">
                                    <label htmlFor={`state-${index}`} className="inline-block mb-2 text-base font-medium">State</label>
                                    <input
                                        type="text"
                                        className="form-input border-slate-200 focus:outline-none focus:border-custom-500"
                                        id={`state-${index}`}
                                        name="state"
                                        placeholder="Enter State"
                                        value={field.state}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>

                                {/* Pin Code Field */}
                                <div className="mb-3">
                                    <label htmlFor={`pincode-${index}`} className="inline-block mb-2 text-base font-medium">Pin Code</label>
                                    <input
                                        type="text"
                                        className="form-input border-slate-200 focus:outline-none focus:border-custom-500"
                                        id={`pincode-${index}`}
                                        name="pincode"
                                        placeholder="Enter Pin Code"
                                        value={field.pincode}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="inline-block mb-2 text-base font-medium">Address</label>
                                    <textarea
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                        id="address"
                                        name="address"
                                        placeholder="Enter Your Address"
                                        value={field.address}
                                        onChange={(e) => handleChange(index, e)}
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                        {/* dynamic form  end */}


                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" data-modal-close="addDocuments" className="text-red-500 transition-all duration-200 ease-linear bg-white border-white btn hover:text-red-600 focus:text-red-600 active:text-red-600 dark:bg-zink-500 dark:border-zink-500" onClick={toggle}>Cancel</button>
                            <button type="submit" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">
                                {!!isEdit ? "Update Company" : "Add Company"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default MasterCompany;
