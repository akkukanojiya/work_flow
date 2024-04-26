import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import BreadCrumb from 'Common/BreadCrumb';
import BreadCrumb from 'CompanyDashboard/CompanyCommon/BreadCrumb';
import { Link } from 'react-router-dom';
// import { Dropdown } from 'Common/Components/Dropdown';
import { Dropdown } from 'CompanyDashboard/CompanyCommon/Components/Dropdown';
import TableContainer from 'Common/TableContainer';
 
import Select from 'react-select';
import { FileUploader } from "react-drag-drop-files";
const fileTypes: string[] = ["JPEG", "PNG", "GIF"];
// Icons
import { Search, Eye, Trash2, Plus, MoreHorizontal, FileEdit, CheckCircle, Loader, X, Download, SlidersHorizontal, ImagePlus } from 'lucide-react';
// import Modal from 'Common/Components/Modal';
import Modal from 'CompanyDashboard/CompanyCommon/Components/Modal';
// import DeleteModal from 'Common/DeleteModal';
import DeleteModal from 'CompanyDashboard/CompanyCommon/DeleteModal';

// Images
import dummyImg from "assets/images/users/user-dummy-img.jpg";

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
// import filterDataBySearch from 'Common/filterDataBySearch';
import filterDataBySearch from 'CompanyDashboard/CompanyCommon/filterDataBySearch';


import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
  import datas from './datas.json'


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

const CompanyClient = () => {

    assignObjectPaths(datas);
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
            panCard: (eventData && eventData.panCard) || '',
            AadharCard: (eventData && eventData.AadharCard) || '',
            qualification: (eventData && eventData.qualification) || '',
            occupation: (eventData && eventData.occupation) || '',
            dateOfBirth: (eventData && eventData.dateOfBirth) || '',
            nationality: (eventData && eventData.nationality) || '',
            gander: (eventData && eventData.gander) || '',
            serviceCategory: (eventData && eventData.serviceCategory) || '',
            passportNumber: (eventData && eventData.passportNumber) || '',
            // location: (eventData && eventData.location) || '',
            email: (eventData && eventData.email) || '',
            mobNo: (eventData && eventData.mobNo) || '',
            phoneNumber: (eventData && eventData.phoneNumber) || '',
            // joiningDate: (eventData && eventData.joiningDate) || '',
            typeofbussinass: (eventData && eventData.typeofbussinass) || '',
        },
        validationSchema: Yup.object({
            img: Yup.string().required("Please Add Image"),
            name: Yup.string().required("Please Enter Name"),
            panCard: Yup.string().required("Please Enter PAN Card"),
            AadharCard: Yup.string().required("Please Enter Aadhar Card"),
            qualification: Yup.string().required("Please Enter qualification"),
            occupation: Yup.string().required("Please Enter Occupation"),
            dateOfBirth: Yup.string().required("Please Enter date Of Birth"),
            nationality: Yup.string().required("Please Enter Nationality"),
            gander: Yup.string().required("Please Enter Gander"),
            serviceCategory: Yup.string().required("Please Enter Service Category"),
            passportNumber: Yup.string().required("Please Enter Passport Number"),
            // location: Yup.string().required("Please Enter Location"),
            email: Yup.string().required("Please Enter Email"),
            mobNo: Yup.string().required("Please Enter  Mobile Number"),
            phoneNumber: Yup.string().required("Please Enter Phone Number"),
            // joiningDate: Yup.string().required("Please Enter Joining Date"),
            typeofbussinass: Yup.string().required("Please Enter Type Of Bussinass")
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
        const keysToSearch = ['name', 'email', 'panCard', 'bankName', 'AccountNumber', 'ifscCode'];
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
        {
            header: (
                <div className="flex items-center h-full">
                    <input id="CheckboxAll" className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer" type="checkbox" />
                </div>
            ),
            enableSorting: false,
            id: "checkAll",
            cell: (cell: any) => {
                return (
                    <div className="flex items-center h-full">
                        <input id="Checkbox1" className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer" type="checkbox" />
                    </div>
                );
            }
        },
        {
            header: "Client ID",
            accessorKey: "userId",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <Link to="#!" className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600 user-id">{cell.getValue()}</Link>
            ),
        },
        {
            header: "Name",
            accessorKey: "name",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-10 font-medium rounded-full shrink-0 bg-slate-200 text-slate-800 dark:text-zink-50 dark:bg-zink-600">
                        {cell.row.original.img ? <img src={cell.row.original.img} alt="" className="h-10 rounded-full" /> : (cell.getValue().split(' ').map((word: any) => word.charAt(0)).join(''))}
                    </div>
                    <div className="grow">
                        <h6 className="mb-1"><Link to="#!" className="name">{cell.getValue()}</Link></h6>
                        <p className="text-slate-500 dark:text-zink-200">{cell.row.original.designation}</p>
                    </div>
                </div>
            ),
        },
        {
            header: "Email",
            accessorKey: "email",
            enableColumnFilter: false,
        },
        {
            header: "PAN Card",
            accessorKey: "location",
            enableColumnFilter: false
        },

        {
            header: "Phone Number",
            accessorKey: "phoneNumber",
            enableColumnFilter: false,
        },
        {
            header: "Bank Name",
            accessorKey: "joiningDate",
            enableColumnFilter: false,
        },
        {
            header: "Account Number",
            accessorKey: "status",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                <Status item={cell.getValue()} />
            ),
        },
        {
            header: "IFSC Code",
            accessorKey: "joiningDate",
            enableColumnFilter: false,
        },
        {
            header: "Action",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                <Dropdown className="relative">
                    <Dropdown.Trigger className="flex items-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20" id="usersAction1">
                        <MoreHorizontal className="size-3" />
                    </Dropdown.Trigger>
                    <Dropdown.Content placement="right-end" className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600" aria-labelledby="usersAction1">
                        <li>
                            <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="/pages-account"><Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Overview</span></Link>
                        </li>
                        <li>
                            <Link data-modal-target="addUserModal" className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!"
                                onClick={() => {
                                    const data = cell.row.original;
                                    handleUpdateDataClick(data);
                                }}>
                                <FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Edit</span></Link>
                        </li>
                        <li>
                            <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!" onClick={() => {
                                const orderData = cell.row.original;
                                onClickDelete(orderData);
                            }}><Trash2 className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Delete</span></Link>
                        </li>
                    </Dropdown.Content>
                </Dropdown>
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
    return (
        <React.Fragment>
            <BreadCrumb title=' Clients' pageTitle='Clients' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12 ">
                <div className="xl:col-span-12 ">
                    <div className="card" id="usersTable ">
                        <div className="card-body ">
                            <div className="flex items-center">
                                <h6 className="text-15 grow">Clients List</h6>
                                <div className="shrink-0">
                                    <button type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20" onClick={toggle}><Plus className="inline-block size-4" /> <span className="align-middle">Add Clients</span></button>
                                </div>
                            </div>
                        </div>
                        <div className="!py-3.5 card-body border-y border-dashed border-slate-200 dark:border-zink-500">
                            <form action="#!">
                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                    <div className="relative xl:col-span-2">
                                        <input type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search for name, email, phone number etc..." autoComplete="off" onChange={(e) => filterSearchData(e)} />
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
                                    theadclassName="text-left relative rounded-md bg-slate-100 dark:bg-zink-600 after:absolute ltr:after:border-l-2 rtl:after:border-r-2 ltr:after:left-0 rtl:after:right-0 after:top-0 after:bottom-0 after:border-transparent [&.active]:after:border-custom-500 [&.active]:bg-slate-100 dark:[&.active]:bg-zink-600"
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
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-4 border-b dark:border-zink-300/20"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Edit Client" : "Add Client"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <form action="#!" onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}>
                        <div className="mb-3">
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
                        </div>

                        <div className="mb-3">
                            <label htmlFor="userId" className="inline-block mb-2 text-base font-medium">Client ID</label>
                            <input type="text" id="userId" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                value={validation.values.userId || '#TW1500004'}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="userNameInput" className="inline-block mb-2 text-base font-medium">Name</label>
                            <input type="text" id="userNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter name"
                                name="name"
                                onChange={validation.handleChange}
                                value={validation.values.name || ""}
                            />
                            {validation.touched.name && validation.errors.name ? (
                                <p className="text-red-400">{validation.errors.name}</p>
                            ) : null}
                        </div>
                        <div className="xl:col-span-12">
                            <label htmlFor="ganderSelect" className="inline-block mb-2 text-base font-medium">Gander</label>
                            <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="typeSelect"
                                name="gander"
                                onChange={validation.handleChange}
                                value={validation.values.gander || ""}
                            >
                                <option value="Gander">Gander</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>

                            </select>
                            {validation.touched.gander && validation.errors.gander ? (
                                <p className="text-red-400">{validation.errors.gander}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="NationalityInput" className="inline-block mb-2 text-base font-medium">Nationality</label>
                            <input type="text" id="userNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Nationality"
                                name="nationality"
                                onChange={validation.handleChange}
                                value={validation.values.nationality || ""}
                            />
                            {validation.touched.nationality && validation.errors.nationality ? (
                                <p className="text-red-400">{validation.errors.nationality}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobNoInput" className="inline-block mb-2 text-base font-medium">Mobile No.</label>
                            <input type="text" id="userNameInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter  Mobile Number"
                                name="mobNo"
                                onChange={validation.handleChange}
                                value={validation.values.mobNo || ""}
                            />
                            {validation.touched.mobNo && validation.errors.mobNo ? (
                                <p className="text-red-400">{validation.errors.mobNo}</p>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="emailInput" className="inline-block mb-2 text-base font-medium">Email</label>
                            <input type="email" id="emailInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter email"
                                name="email"
                                onChange={validation.handleChange}
                                value={validation.values.email || ""}
                            />
                            {validation.touched.email && validation.errors.email ? (
                                <p className="text-red-400">{validation.errors.email}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="panCardInput" className="inline-block mb-2 text-base font-medium">PAN Card</label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your PAN Card"
                                name="panCard"
                                onChange={validation.handleChange}
                                value={validation.values.panCard || ""}
                            />
                            {validation.touched.panCard && validation.errors.panCard ? (
                                <p className="text-red-400">{validation.errors.panCard}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="aadharCardInput" className="inline-block mb-2 text-base font-medium">Aadhar Card </label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Aadhar Card"
                                name="AadharCard"
                                onChange={validation.handleChange}
                                value={validation.values.AadharCard || ""}
                            />
                            {validation.touched.AadharCard && validation.errors.AadharCard ? (
                                <p className="text-red-400">{validation.errors.AadharCard}</p>
                            ) : null}
                        </div>


                        {/* <div className="mb-3">
                            <label htmlFor="serviceCategoryInput" className="inline-block mb-2 text-base font-medium">Service Category</label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Service Category"
                                name="serviceCategory"
                                onChange={validation.handleChange}
                                value={validation.values.serviceCategory || ""}
                            />
                            {validation.touched.serviceCategory && validation.errors.serviceCategory ? (
                                <p className="text-red-400">{validation.errors.serviceCategory}</p>
                            ) : null}
                        </div> */}

                        <div className='mb-3'>
                            <label htmlFor="services" className="inline-block mb-2 text-base font-medium">Services</label>
                            <DropdownTreeSelect
                                data={datas}
                                onChange={onchange}
                                className="mdl-demo"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passportNumberInput" className="inline-block mb-2 text-base font-medium">Passport Number</label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Passport Number"
                                name="passportNumber"
                                onChange={validation.handleChange}
                                value={validation.values.passportNumber || ""}
                            />
                            {validation.touched.passportNumber && validation.errors.passportNumber ? (
                                <p className="text-red-400">{validation.errors.passportNumber}</p>
                            ) : null}
                        </div>
                        <div className="xl:col-span-12">
                            <label htmlFor="businessRegistrationSelect" className="inline-block mb-2 text-base font-medium"> Nature Of Business / Business Category </label>
                            <select className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="typeSelect"
                                name="businessRegistration"
                                onChange={validation.handleChange}
                                value={validation.values.businessRegistration || ""}
                            >
                                <option value="Choose">Choose</option>
                                <option value="MSME">MSME</option>
                                <option value="GST">GST</option>
                                <option value="Proff Tax">Proff. Tax</option>

                            </select>
                            {validation.touched.businessRegistration && validation.errors.businessRegistration ? (
                                <p className="text-red-400">{validation.errors.businessRegistration}</p>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="QualificationInput" className="inline-block mb-2 text-base font-medium">Qualification</label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your  Qualification"
                                name="qualification"
                                onChange={validation.handleChange}
                                value={validation.values.qualification || ""}
                            />
                            {validation.touched.qualification && validation.errors.qualification ? (
                                <p className="text-red-400">{validation.errors.qualification}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="occupationInput" className="inline-block mb-2 text-base font-medium">Occupation</label>
                            <input type="text" id="designationInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Occupation"
                                name="occupation"
                                onChange={validation.handleChange}
                                value={validation.values.occupation || ""}
                            />
                            {validation.touched.occupation && validation.errors.occupation ? (
                                <p className="text-red-400">{validation.errors.occupation}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ifscInput" className="inline-block mb-2 text-base font-medium"> Date Of Birth</label>
                            <input type="date" id="dateOfBirthInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter Your Date Of Birth"
                                name="dateOfBirth"
                                onChange={validation.handleChange}
                                value={validation.values.dateOfBirth || ""}
                            />
                            {validation.touched.dateOfBirth && validation.errors.dateOfBirth ? (
                                <p className="text-red-400">{validation.errors.dateOfBirth}</p>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="typeOfBussinassSelect" className="inline-block mb-2 text-base font-medium">Type of Bussinass</label>
                            <select className="form-input border-slate-300 focus:outline-none focus:border-custom-500" data-choices data-choices-search-false id="statusSelect"
                                name="typeofbussinass"
                                onChange={validation.handleChange}
                                value={validation.values.typeofbussinass || ""}
                            >
                                <option value="">Select Type Of Bussinass</option>
                                <option value="SoleProprietorship">Sole Proprietorship</option>
                                <option value="PartnershipFirm">Partnership Firm</option>
                                <option value="LimitedLiabilityPartnership(LLP)">Limited Liability Partnership (LLP)</option>
                                <option value="PrivateLimitedCompany">Private Limited Company</option>
                                <option value="PublicLimitedCompany">Public Limited Company</option>
                                <option value="Section8Company(Non-Profit)/CharitableTrust/EducationTrustetc">Section 8 Company (Non-Profit)/ Charitable Trust/ Education Trust etc</option>
                            </select>
                            {validation.touched.typeofbussinass && validation.errors.typeofbussinass ? (
                                <p className="text-red-400">{validation.errors.typeofbussinass}</p>
                            ) : null}
                        </div> 

                        {/* trag and drop  */}

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

                        {/* <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> */}

                        {/* trag and drop  end  */}

                        
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
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" data-modal-close="addDocuments" className="text-red-500 transition-all duration-200 ease-linear bg-white border-white btn hover:text-red-600 focus:text-red-600 active:text-red-600 dark:bg-zink-500 dark:border-zink-500" onClick={toggle}>Cancel</button>
                            <button type="submit" className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                {!!isEdit ? "Update Client" : "Add Client"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default CompanyClient;
