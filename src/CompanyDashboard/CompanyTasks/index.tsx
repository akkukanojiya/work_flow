
// select end
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { Calendar } from "lucide-react";
import { RiFileExcel2Line } from "react-icons/ri";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
interface Option {
    readonly label: string;
    readonly value?: string;
    readonly options?: Option[];
    readonly isDisabled?: boolean
}
// SearchableSelect
// import SearchableSelect from './SearchableSelectService';
// const options = [
//     { value: '1', label: 'Accouunting' },
//     { value: '2', label: 'GST' },
//     { value: '3', label: 'Service Tax' },
//     { value: '4', label: 'Income Tax' },
//     { value: '5', label: 'Custom' },
//     { value: '6', label: 'Import' },
//     { value: '7', label: 'Export' },
//     { value: '8', label: 'PAN Card' },
//     { value: '9', label: 'Business Registration' },
//     { value: '10', label: 'Audit' },
//     { value: '11', label: 'MCA / ROC' },
//     { value: '12', label: 'Certification' },
//     { value: '13', label: 'Consulting' },
//     { value: '14', label: 'Deeds & Agreements' },
//     { value: '15', label: 'VAT' },
//     { value: '16', label: 'DSC' },
//     { value: '17', label: 'Financial Services' },

// ];


//   SearchableSelect sub Services 
// import SearchableSubSelect from './SearchableSelectSubService';
// const optionSub = [
//     { value: '1', label: 'Individual ' },
//     { value: '2', label: 'Proprietorship' },
//     { value: '3', label: 'Partnership' },
//     { value: '4', label: 'LLP' },
//     { value: '5', label: 'Private Limited/ Limited' },
//     { value: '6', label: 'Trust / AOP' },
//     { value: '7', label: 'Society' },
//     { value: '8', label: 'Registration' },
//     { value: '9', label: 'Return Filing' },
//     { value: '10', label: 'Reply to Notice' },
//     { value: '11', label: 'Appeal' },
//     { value: '12', label: 'LUT' },
//     { value: '13', label: 'Refund' },
//     { value: '14', label: 'Other Consultancy' },
//     { value: '15', label: 'Form 15 CA / CB' },
//     { value: '16', label: 'IEC application' },
//     { value: '17', label: 'IEC renewal' },
//     { value: '18', label: 'Other online Forms' },
//     { value: '19', label: 'New Application' },
//     { value: '20', label: 'Correction' },
//     { value: '21', label: 'Cancellation' },
//     { value: '22', label: 'PAN Aadhar Link' },
//     { value: '23', label: 'GST' },
//     { value: '24', label: 'Professional Tax' },
//     { value: '25', label: 'Gumasta' },
//     { value: '26', label: 'Partnership - ROF' },
//     { value: '27', label: 'Company - PVT LTD' },
//     { value: '28', label: 'Company - Public LTD' },
//     { value: '29', label: 'Trust' },
//     { value: '30', label: 'AOP' },
//     { value: '31', label: 'FSSAI /Food License' },
//     { value: '32', label: 'Other Registrations' },
//     { value: '33', label: 'Tax Audit' },
//     { value: '34', label: 'Company Audit' },
//     { value: '35', label: 'Trust Audit - Charity Commissioner' },
//     { value: '36', label: 'AOP Audit' },
//     { value: '37', label: 'Society Audit' },
//     { value: '38', label: 'Bank Staturoty Audit' },
//     { value: '39', label: 'Bank Concurrent Audit' },
//     { value: '40', label: 'Bank System Audit' },
//     { value: '41', label: 'Bank Stock Audit' },
//     { value: '42', label: 'Internal Audit' },
//     { value: '43', label: 'Other Audit' },
//     { value: '44', label: 'PVT Ltd /Public Ltd Form Filing' },
//     { value: '45', label: 'LLP Form Filing' },
//     { value: '46', label: 'Other MCA Related Service' },
//     { value: '47', label: 'Certificate for Subsidy' },
//     { value: '48', label: 'Networth Certificate' },
//     { value: '49', label: 'Stock Statatement ' },
//     { value: '50', label: 'Other Certificates' },
//     { value: '51', label: 'Tax Planning' },
//     { value: '52', label: 'Investment Planning' },
//     { value: '53', label: 'Business Consultancy' },
//     { value: '54', label: 'Add New Sub Category' },
//     { value: '55', label: 'Partnership Deed' },
//     { value: '56', label: 'Trust Deed' },
//     { value: '57', label: 'Rent Agreement' },
//     { value: '58', label: 'Business Agreement' },
//     { value: '59', label: 'LLP / Company MOA - AOA' },
//     { value: '60', label: 'Other Agreements' },
//     { value: '61', label: 'Normal DSC' },
//     { value: '62', label: 'DGFT DCS' },
//     { value: '63', label: 'Home Loan' },
//     { value: '64', label: 'Business Loan' },
//     { value: '65', label: 'Machinery Loan' },
//     { value: '66', label: 'Personal Loan' },
//     { value: '67', label: 'MSME Loan' },
//     { value: '68', label: 'PMEGP Loan' },
//     { value: '69', label: 'Loan Against Property' },
//     { value: '70', label: 'Car Loan' },
//     { value: '70', label: 'Other Financial Services' },
//     // add more options as needed
// ];
//   SearchableSelect sub Services end


// Icons
import { Search, Plus, Trash2, MoreHorizontal, Star, FileEdit, Eye, User2, Download } from 'lucide-react';
import { Dropdown } from 'Common/Components/Dropdown';
import { Link } from 'react-router-dom';
import DeleteModal from 'Common/DeleteModal';
import Modal from 'Common/Components/Modal';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import * as XLSX from 'xlsx';
import {
    getNotes as onGetNotes,
    addNotes as onAddNotes,
    updateNotes as onUpdateNotes,
    deleteNotes as onDeleteNotes
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';
import filterDataBySearch from 'Common/filterDataBySearch';
// import Pagination from 'Common/Pagination';
import Pagination from 'CompanyDashboard/CompanyCommon/Pagination';


import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css'
import './index.css'
// import datass from './data.json';
interface Node {
    path: string;
    [key: string]: any;
}


// const onchange = (currentNode: Node, selectedNodes: Node[]) => {
//     console.log("path::", currentNode.path);
// };

// const assignObjectPaths = (obj: Node, stack?: string) => {
//     Object.keys(obj).forEach((k) => {
//         const node = obj[k];
//         if (typeof node === "object") {
//             node.path = stack ? `${stack}.${k}` : k;
//             assignObjectPaths(node, node.path);
//         }
//     });
// };

// ==============

// multi dropdown 
import MultiSelect, { Option } from "./MultiSelect";
// import "./styles.css";

const optionss = [
    { value: 0, label: "Jaimin" },
    { value: 1, label: "Akash" },
    { value: 2, label: "Harshil" },
    { value: 3, label: "Divyang" },
    { value: 4, label: "Shivam" },
    { value: 5, label: "Suresh" },
];
// const optionssBulk = [
//     { value: 0, label: "Jaimin" },
//     { value: 1, label: "Akash" },
//     { value: 2, label: "Harshil" },
//     { value: 3, label: "Divyang" },
//     { value: 4, label: "Shivam" },
//     { value: 5, label: "Suresh" },
// ];
// multi dropdown end




const Tasks = () => {

    // service 
    const Service: Option[] = [
        { value: '1', label: 'Accouunting' },
        { value: '2', label: 'GST' },
        { value: '3', label: 'Service Tax' },
        { value: '4', label: 'Income Tax' },
        { value: '5', label: 'Custom' },
        { value: '6', label: 'Import' },
        { value: '7', label: 'Export' },
        { value: '8', label: 'PAN Card' },
        { value: '9', label: 'Business Registration' },
        { value: '10', label: 'Audit' },
        { value: '11', label: 'MCA / ROC' },
        { value: '12', label: 'Certification' },
        { value: '13', label: 'Consulting' },
        { value: '14', label: 'Deeds & Agreements' },
        { value: '15', label: 'VAT' },
        { value: '16', label: 'DSC' },
        { value: '17', label: 'Financial Services' },
        // add more options as needed
    ];


    // Custom  createservice
    const handleCreate = (inputValue: string) => {
        const newOption = { value: inputValue, label: inputValue };
        Service.push(newOption); // Update options with the new value
    };

    // Custom  createservice end

    // service end
    // sub service 
    const SubService: Option[] = [
        { value: '1', label: 'Individual ' },
        { value: '2', label: 'Proprietorship' },
        { value: '3', label: 'Partnership' },
        { value: '4', label: 'LLP' },
        { value: '5', label: 'Private Limited/ Limited' },
        { value: '6', label: 'Trust / AOP' },
        { value: '7', label: 'Society' },
        { value: '8', label: 'Registration' },
        { value: '9', label: 'Return Filing' },
        { value: '10', label: 'Reply to Notice' },
        { value: '11', label: 'Appeal' },
        { value: '12', label: 'LUT' },
        { value: '13', label: 'Refund' },
        { value: '14', label: 'Other Consultancy' },
        { value: '15', label: 'Form 15 CA / CB' },
        { value: '16', label: 'IEC application' },
        { value: '17', label: 'IEC renewal' },
        { value: '18', label: 'Other online Forms' },
        { value: '19', label: 'New Application' },
        { value: '20', label: 'Correction' },
        { value: '21', label: 'Cancellation' },
        { value: '22', label: 'PAN Aadhar Link' },
        { value: '23', label: 'GST' },
        { value: '24', label: 'Professional Tax' },
        { value: '25', label: 'Gumasta' },
        { value: '26', label: 'Partnership - ROF' },
        { value: '27', label: 'Company - PVT LTD' },
        { value: '28', label: 'Company - Public LTD' },
        { value: '29', label: 'Trust' },
        { value: '30', label: 'AOP' },
        { value: '31', label: 'FSSAI /Food License' },
        { value: '32', label: 'Other Registrations' },
        { value: '33', label: 'Tax Audit' },
        { value: '34', label: 'Company Audit' },
        { value: '35', label: 'Trust Audit - Charity Commissioner' },
        { value: '36', label: 'AOP Audit' },
        { value: '37', label: 'Society Audit' },
        { value: '38', label: 'Bank Staturoty Audit' },
        { value: '39', label: 'Bank Concurrent Audit' },
        { value: '40', label: 'Bank System Audit' },
        { value: '41', label: 'Bank Stock Audit' },
        { value: '42', label: 'Internal Audit' },
        { value: '43', label: 'Other Audit' },
        { value: '44', label: 'PVT Ltd /Public Ltd Form Filing' },
        { value: '45', label: 'LLP Form Filing' },
        { value: '46', label: 'Other MCA Related Service' },
        { value: '47', label: 'Certificate for Subsidy' },
        { value: '48', label: 'Networth Certificate' },
        { value: '49', label: 'Stock Statatement ' },
        { value: '50', label: 'Other Certificates' },
        { value: '51', label: 'Tax Planning' },
        { value: '52', label: 'Investment Planning' },
        { value: '53', label: 'Business Consultancy' },
        { value: '54', label: 'Add New Sub Category' },
        { value: '55', label: 'Partnership Deed' },
        { value: '56', label: 'Trust Deed' },
        { value: '57', label: 'Rent Agreement' },
        { value: '58', label: 'Business Agreement' },
        { value: '59', label: 'LLP / Company MOA - AOA' },
        { value: '60', label: 'Other Agreements' },
        { value: '61', label: 'Normal DSC' },
        { value: '62', label: 'DGFT DCS' },
        { value: '63', label: 'Home Loan' },
        { value: '64', label: 'Business Loan' },
        { value: '65', label: 'Machinery Loan' },
        { value: '66', label: 'Personal Loan' },
        { value: '67', label: 'MSME Loan' },
        { value: '68', label: 'PMEGP Loan' },
        { value: '69', label: 'Loan Against Property' },
        { value: '70', label: 'Car Loan' },
        { value: '70', label: 'Other Financial Services' },
        // add more options as needed
    ];
  

    // create sub handle 
    const handleSubCreate = (inputValue: string) => {
        const newOption = { value: inputValue, label: inputValue };
        SubService.push(newOption); // Update options with the new value
    };
    // create sub handle end
    // sub service end

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
        (state: any) => state.Notes,
        (state) => ({
            dataList: state.notes
        })
    );
    const { dataList } = useSelector(selectDataList);
    const [eventData, setEventData] = useState<any>();


    const [show, setShow] = useState<boolean>(false);
    const [shows, setShows] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [Overviewshow, setOverview] = useState<boolean>(false);

    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState<number>(1);

    const [toggleDesctipton, setToggleDesctipton] = useState<any>([]);


    // const [startTime, setStartTime] = useState('');
    // const [endTime, setEndTime] = useState('');


    // Get Data
    useEffect(() => {
        dispatch(onGetNotes());
    }, [dispatch]);

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
            dispatch(onDeleteNotes(eventData.id));
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

    // Overview Notes Modal
    const handleOverviewDataClick = (ele: any) => {
        setEventData({ ...ele });
        setOverview(!Overviewshow);
    };

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            category: (eventData && eventData.category) || '',
            clientType: (eventData && eventData.clientType) || '',
            Assignee_Team: (eventData && eventData.Assignee_Team) || '',
            // Client: (eventData && eventData.Client) || '',
            service: (eventData && eventData.service) || '',
            TaskName: (eventData && eventData.TaskName) || '',
            description: (eventData && eventData.description) || '',
            clientname: (eventData && eventData.clientname) || '',
            // img: (eventData && eventData.img) || '',
            // location: (eventData && eventData.location) || '',
            PriorityType: (eventData && eventData.PriorityType) || '',
            date: (eventData && eventData.date) || ''
        },
        validationSchema: Yup.object({
            category: Yup.string().required("Please Enter Category"),
            clientType: Yup.string().required("Please Enter Client Type"),
            Assignee_Team: Yup.string().required("Please Enter Assignee Team"),
            // Client: Yup.string().required("Please Enter Client"),
            service: Yup.string().required("Please Enter Service"),
            TaskName: Yup.string().required("Please Enter Task Name"),
            description: Yup.string().required("Please Enter Description"),
            clientname: Yup.string().required("Please Enter Client Name"),
            //   img: Yup.string().required("Please Add Company Image"),
            // location: Yup.string().required("Please Enter Location"),
            PriorityType: Yup.string().required("Please Enter Priority Type"),
            date: Yup.string().required("Please Enter Due Date"),
        }),

        onSubmit: (values) => {
            if (isEdit) {
                const updateUser = {
                    id: eventData ? eventData.id : 0,
                    ...values,
                };
                // update user
                dispatch(onUpdateNotes(updateUser));
            } else {
                const newUser = {
                    ...values,
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                };
                // save new user
                dispatch(onAddNotes(newUser));
            }
            toggle();
        },
    });


    // 
    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData("");
            setIsEdit(false);
        } else {
            setShow(true);
            setEventData("");
            validation.resetForm();
        }
    }, [show, validation]);

    // popup Model 
    const toggleBar = useCallback(() => {
        if (shows) {
            setShows(false);
            setEventData("");
            setIsEdit(false);
        } else {
            setShows(true);
            setEventData("");
            validation.resetForm();
        }
    }, [shows, validation]);

    // popup Model end

    // toggleOverview
    const toggleOverview = useCallback(() => {
        if (Overviewshow) {
            setOverview(!Overviewshow);
            setEventData("");
        }
    }, [Overviewshow]);

    const handleReadMore = (key: any) => {
        setToggleDesctipton((prev: any) => {
            const Data = [...prev];
            if (Data[key]) {
                Data[key] = { key: !Data[key].key };
            } else {
                Data[key] = { key: true };
            }

            return Data;
        });
    };


    // Search Data
    const filterSearchData = (e: any) => {
        const search = e.target.value;
        const keysToSearch = ['category', 'title', 'description', 'name', 'date', 'project', 'Assignee_Team', 'Client', 'service'];
        filterDataBySearch(dataList, search, keysToSearch, setData);
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState<any>(1);

    const perPageData = 8;
    const indexOfLast = currentPage * perPageData;
    const indexOfFirst = indexOfLast - perPageData;
    const currentdata = useMemo(() => dataList?.slice(indexOfFirst, indexOfLast), [dataList, indexOfFirst, indexOfLast]);

    useEffect(() => {
        setData(currentdata);
    }, [currentdata]);


    // columns

    const Category = ({ item }: any) => {
        switch (item) {
            case "personal":
                return (
                    <Dropdown.Trigger
                        className="size-4  border border-dashed rounded-full dropdown-toggle shrink-0 bg-sky-100 border-sky-500 dark:bg-sky-500/20 category-dropdown "
                        id="notesAction1" data-bs-toggle="dropdown">
                        <div></div>
                    </Dropdown.Trigger>
                );
            case "business":
                return (<Dropdown.Trigger
                    className="size-4  border border-dashed rounded-full shrink-0 category-dropdown bg-orange-100 border-orange-500 dark:bg-orange-500/20"
                    id="notesAction1" data-bs-toggle="dropdown">
                    <div></div>
                </Dropdown.Trigger>);
            case "social":
                return (<Dropdown.Trigger
                    className="size-4  border border-dashed rounded-full shrink-0 category-dropdown bg-purple-100 border-purple-500 dark:bg-purple-500/20"
                    id="notesAction1" data-bs-toggle="dropdown">
                    <div></div>
                </Dropdown.Trigger>);
            case "home":
                return (<Dropdown.Trigger
                    className="size-4  border border-dashed rounded-full shrink-0 category-dropdown bg-green-100 border-green-500 dark:bg-green-500/20"
                    id="notesAction1" data-bs-toggle="dropdown">
                    <div></div>
                </Dropdown.Trigger>);
            default:
                return (<Dropdown.Trigger
                    className="size-4  border border-dashed rounded-full shrink-0 category-dropdown bg-sky-100 border-sky-500 dark:bg-sky-500/20"
                    id="notesAction1" data-bs-toggle="dropdown">
                    <div></div>
                </Dropdown.Trigger>);
        }
    };

    const toggleTab = (tab: any, cate: any) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            let filteredNotes = dataList;
            if (cate !== "all") {
                filteredNotes = dataList.filter((notes: any) => notes.category === cate);
            }
            setData(filteredNotes);
        }
    };

    const truncateText = (text: any, numberOfWords: number) => {
        // Split the text into an array of words
        const words = text.split(' ');

        // Take only the specified number of words
        const truncatedWords = words.slice(0, numberOfWords);

        // Join the words back into a string
        const truncatedText = truncatedWords.join(' ');

        // Append three dots if there are more words in the original text
        const ellipsis = words.length > numberOfWords ? '...' : '';

        return truncatedText + ellipsis;
    };



    // multi select dropdown

    const [optionSelecteds, setSelecteds] = useState<Option[] | null>();
    const handleChange = (selected: Option[]) => {
        setSelecteds(selected);
    };
    const [optionBulkSelecteds, setBulkSelecteds] = useState<Option[] | null>();
    const handleBulkChange = (selected: Option[]) => {
        setBulkSelecteds(selected);
    };



    // SearchableSelect 
    const handleOptionChange = (option: Option | null) => {
        console.log('Selected option:', option);
    };

    // SearchableSelect end
    // SearchableSubSelect
    const handleOptionChanges = (option: Option | null) => {
        console.log('Selected option:', option);
    };
    // SearchableSubSelect end

    return (
        <React.Fragment>
            <BreadCrumb title='Tasks' pageTitle='Tasks' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card">
                <div className="card-body">
                    {/* <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                         
                       <div className="xl:col-start-10 xl:col-span-3">
                            <div className="flex gap-3">
                                <div className="relative grow">
                                    <input type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search" autoComplete="off" onChange={(e) => filterSearchData(e)} />
                                    <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                                </div>
                                <div className="shrink-0">
                                    <button data-modal-target="addNotesModal" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20" onClick={toggle}>
                                        <Plus className="inline-block size-4" /> <span className="align-middle">Add Task</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div> */}
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-3/4 py-2.1 card-body   dark:border-zinc-500">
                            <form action="#!">
                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                    <div className="relative xl:col-span-3">
                                        <input
                                            type="text"
                                            className="w-full ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"

                                            autoComplete="off"
                                            onChange={(e) => filterSearchData(e)}
                                        />
                                        <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zinc-200 fill-slate-100 dark:fill-zinc-600" />
                                    </div>
                                    {/* <div className="xl:col-span-2">
                        <Select
                            className="border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                            options={options}
                            isSearchable={false}
                            defaultValue={options[0]}
                            onChange={(event: any) => handleChange(event)}
                            id="choices-single-default"
                        />
                    </div> */}
                                    {/* <div className="xl:col-span-3 xl:col-start-10">
                        <div className="flex gap-2 xl:justify-end">
                            <div>
                                <button type="button" className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20">
                                    <Download className="inline-block size-4" /> <span className="align-middle">Import</span>
                                </button>
                            </div>
                            <button className="flex items-center justify-center size-[37.5px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20">
                                <SlidersHorizontal className="size-4" />
                            </button>
                        </div>
                    </div> */}
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex-shrink-0 flex space-x-4">
                            <button className="bg-white   text-[#2a5179] btn   hover:text-[#25476a] hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50   active:text-[#25476a] active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20" onClick={generateExcel}>
                                <span className="align-middle">Download</span>
                                <RiFileExcel2Line className="inline-block size-5" />
                            </button>
                            <button type="button" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]" onClick={toggle}>
                                <Plus className="inline-block size-4" />
                                <span className="align-middle">Add Tasks</span>
                            </button>
                            {/* <button type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20" onClick={toggleBar}>
                                <Plus className="inline-block size-4" />
                                <span className="align-middle">Add Bulk Tasks</span>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-4" id="notes-list">


                {(data || []).map((item: any, key: number) => {

                    return (
                        <div className="card product-item personal" key={key}>
                            <div className="flex flex-col h-full card-body">
                                <div>
                                    <Dropdown className="relative ltr:float-right rtl:float-left">
                                        <Dropdown.Trigger className="flex items-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20" id="categoryNotes1" data-bs-toggle="dropdown">
                                            <MoreHorizontal className="size-3" />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content placement="right-end" className="absolute z-50 py-2 mt-1 text-left list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600" aria-labelledby="categoryNotes1">
                                            <li>
                                                <Link to="#" data-modal-target="overviewNotesModal"
                                                    className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 
                                             hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200
                                             "
                                                    onClick={() => {
                                                        handleOverviewDataClick(item);
                                                    }}
                                                >
                                                    <Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" />
                                                    <span className="align-middle">Overview</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" data-modal-target="addNotesModal" className="edit-item-btn block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                                                    onClick={() => {
                                                        handleUpdateDataClick(item);
                                                    }}>
                                                    <FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" />
                                                    <span className="align-middle">Edit</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" className="remove-item-btn block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                                                    onClick={() => onClickDelete(item)}>
                                                    <Trash2 className="inline-block size-3 ltr:mr-1 rtl:ml-1" />
                                                    <span className="align-middle">Delete</span>
                                                </Link>
                                            </li>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>);
                }
                )}

            </div>

            <Pagination
                perPageData={perPageData}
                data={dataList}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentdata={currentdata}
            />

            {/* Notes Modal */}
            <Modal show={show} onHide={toggle} id="defaultModal" modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-full xl:w-[55rem] bg-white shadow rounded-md dark:bg-zink-600">
                <Modal.Header className="flex items-center justify-between p-5 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500">
                    <Modal.Title className="text-16">{!!isEdit ? "Edit Tasks" : "Create Tasks"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto p-5">
                    <form noValidate className="create-form" onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}>
                        <input type="hidden" value="" name="id" id="id" />
                        <input type="hidden" value="add" name="action" id="action" />
                        <input type="hidden" id="id-field" />
                        <div id="alert-error-msg" className="hidden px-4 py-3 text-sm text-red-500 border border-transparent rounded-md bg-red-50 dark:bg-red-400/20"></div>
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">

                            {/* <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Task Name</label>
                                <input type="text" id="notesTitleInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Task Name"
                                    name="TaskName"
                                    onChange={validation.handleChange}
                                    value={validation.values.TaskName || ""}
                                />
                                {validation.touched.TaskName && validation.errors.TaskName ? (
                                    <p className="text-red-400">{validation.errors.TaskName}</p>
                                ) : null}
                            </div> */}
                            {/* service  */}
                            {/* <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Services</label>
                                <Select
                                    className="border-[#25476a] dark:border-[#25476a] focus:outline-none focus:border-[#25476a] disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-[#25476a] placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    id="choices-single-no-sorting"
                                    name="choices-single-no-sorting"
                                    data-choices data-choices-sorting-false
                                    options={Service} />

                            </div> */}
                            <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Services</label>
                                <CreatableSelect
                                    classNamePrefix="select"
                                    isClearable
                                    options={Service}
                                    onCreateOption={handleCreate}
                                    placeholder="Select service"
                                    className="border-[#25476a] dark:border-[#25476a] focus:outline-none focus:border-[#25476a] disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-[#25476a] placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                />
                            </div>
                            {/* service end */}
                            {/* <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Sub Services</label>
                                <SearchableSubSelect options={optionSub} onChange={handleOptionChange} />
                            </div> */}
                            {/* sub service  */}
                            {/* <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Sub Services</label>
                                <Select
                                    className="border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    id="choices-single-no-sorting"
                                    name="choices-single-no-sorting"
                                    data-choices data-choices-sorting-false
                                    options={SubService} />

                            </div> */}

                            <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Sub Services</label>
                                <CreatableSelect
                                    classNamePrefix="select"
                                    isClearable
                                    options={SubService}
                                    onCreateOption={handleSubCreate}
                                    placeholder="Select Sub service"
                                    className="border-[#25476a] dark:border-[#25476a] focus:outline-none focus:border-[#25476a] disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-[#25476a] placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                />
                            </div>
                            {/* sub service end */}
                            <div className="xl:col-span-4">

                                <div>
                                    <label htmlFor="ClientName" className="inline-block mb-2 text-base font-medium">Client Name</label>
                                    <select className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="ClientName"
                                        name="clientname"
                                        onChange={validation.handleChange}
                                        value={validation.values.clientname || ""}
                                    >
                                        <option value="">Select Client Name</option>
                                        <option value="#"> #</option>
                                        <option value="#"> #</option>
                                        <option value=" #"> #</option>

                                    </select>
                                    {validation.touched.clientname && validation.errors.clientname ? (
                                        <p className="text-red-400">{validation.errors.clientname}</p>
                                    ) : null}
                                </div>
                            </div>

                            {/* <h1>{"\u2728"} MultiSelect example</h1> */}
                            <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Assign Team(Assignee/Group)</label>
                                <MultiSelect
                                    key="example_id"
                                    options={optionss}
                                    onChange={handleChange}
                                    value={optionSelecteds}
                                    isSelectAll={true}
                                    menuPlacement={"bottom"}
                                />
                            </div>

                            {/* <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Services</label>
                                <SearchableSelect options={options} onChange={handleOptionChange} />
                            </div> */}


                            {/* <div className="xl:col-span-4">
                            <label htmlFor="DateandTimeInput" className="inline-block mb-2 text-base font-medium">Deadline</label>
                                <Flatpickr
                                    options={{
                                        enableTime: true,
                                        dateFormat: "d.m.y H:i",
                                    }}
                                    placeholder="Select date-time"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                />
                            </div> */}
                            <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Alloted Time</label>
                                <Flatpickr
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true
                                    }}
                                    placeholder="Select Time"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                />
                            </div>
                            <div className="xl:col-span-4">
                                <label htmlFor="notesTitleInput" className="inline-block mb-2 text-base font-medium">Deadline Date</label>
                                <Flatpickr
                                    options={{
                                        dateFormat: "d M, Y",
                                    }}
                                    placeholder="Select Date"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                />
                            </div>

                            <div className="xl:col-span-4">
                                <label htmlFor="officialdueDateInput" className="inline-block mb-2 text-base font-medium">Official Due Date</label>
                                <Flatpickr
                                    id="officialdueDateInput"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                    placeholder='Select Due date'
                                    onChange={(date: any) => validation.setFieldValue("date", moment(date[0]).format("DD MMMM ,YYYY"))}
                                    value={validation.values.date || ''}
                                />
                                {validation.touched.date && validation.errors.date ? (
                                    <p className="text-red-400">{validation.errors.date}</p>
                                ) : null}
                            </div>

                            {/* Custom Due Date */}


                            {/* <div className="xl:col-span-4">
                                <label htmlFor="dueDateInput" className="inline-block mb-2 text-base font-medium">Custom Due Date</label>
                                <Flatpickr
                                    id="dueDateInput"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                    placeholder='Select Custom Due date'
                                    onChange={(date: any) => validation.setFieldValue("date", moment(date[0]).format("DD MMMM ,YYYY"))}
                                    value={validation.values.date || ''}
                                />
                                {validation.touched.date && validation.errors.date ? (
                                    <p className="text-red-400">{validation.errors.date}</p>
                                ) : null}
                            </div> */}

                            {/* Custom Due Date end */}
                            {/* <div className="xl:col-span-4">
                                <div>
                                    <label htmlFor="categorySelect" className="inline-block mb-2 text-base font-medium">Client Type</label>
                                    <select className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="statusSelect"
                                        name="clientType"
                                        onChange={validation.handleChange}
                                        value={validation.values.clientType || ""}
                                    >
                                        <option value="">Select Client</option>
                                        <option value="individual"> Individual</option>
                                        <option value="company"> Company</option>

                                    </select>
                                    {validation.touched.clientType && validation.errors.clientType ? (
                                        <p className="text-red-400">{validation.errors.clientType}</p>
                                    ) : null}
                                </div>
                            </div> */}

                            {/* <div className="xl:col-span-4">
                                <label htmlFor="clientNameInput" className="inline-block mb-2 text-base font-medium">Client Name</label>
                                <input type="text" id="notesTitleInput" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="clientName"
                                    name="clientName"
                                    onChange={validation.handleChange}
                                    value={validation.values.clientName || ""}
                                />
                                {validation.touched.clientName && validation.errors.clientName ? (
                                    <p className="text-red-400">{validation.errors.clientName}</p>
                                ) : null}
                            </div> */}

                            {/* <div className='xl:col-span-4 '>

                                <label htmlFor="services" className="inline-block mb-2 text-base font-medium">Services</label>


                                <DropdownTreeSelect
                                    data={datass}
                                    onChange={onchange}
                                    className="mdl-demo"
                                />
                            </div> */}

                            <div className="xl:col-span-4">
                                <div>
                                    <label htmlFor="PriorityTypeSelect" className="inline-block mb-2 text-base font-medium">Priority</label>
                                    <select className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" data-choices data-choices-search-false id="statusSelect"
                                        name="PriorityType"
                                        onChange={validation.handleChange}
                                        value={validation.values.PriorityType || ""}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="Low"> Low</option>
                                        <option value="Medium"> Medium</option>
                                        <option value=" High"> High</option>

                                    </select>
                                    {validation.touched.PriorityType && validation.errors.PriorityType ? (
                                        <p className="text-red-400">{validation.errors.PriorityType}</p>
                                    ) : null}
                                </div>
                            </div>
                            {/* <div className="xl:col-span-4">
                                <label className="inline-block mb-2 text-base font-medium" htmlFor="start-time">
                                    Start Time:
                                </label>
                                <input
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    type="time"
                                    id="start-time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                     
                                />
                            </div> */}
                            {/* <div className="xl:col-span-4">
                                <label className="inline-block mb-2 text-base font-medium" htmlFor="end-time">
                                    End Time:
                                </label>
                                <input
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    type="time"
                                    id="end-time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                     
                                />
                            </div> */}


                            <div className="xl:col-span-12">
                                <div>
                                    <label htmlFor="textArea" className="inline-block mb-2 text-base font-medium">Task Description</label>
                                    <textarea className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" id="textArea" rows={6}
                                        name="description"
                                        onChange={validation.handleChange}
                                        value={new DOMParser().parseFromString(validation.values.description, 'text/html').body.textContent || ""}
                                    >
                                    </textarea>
                                    {validation.touched.description && validation.errors.description ? (
                                        <p className="text-red-400">{validation.errors.description}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="xl:col-span-4">
                                <label htmlFor="other" className="inline-block mb-2 text-base font-medium">Other's</label>
                                <input type="text" id="other" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Enter  Other's Details"
                                    name="other"
                                    onChange={validation.handleChange}
                                    value={validation.values.other || ""}
                                />
                                {validation.touched.other && validation.errors.other ? (
                                    <p className="text-red-400">{validation.errors.other}</p>
                                ) : null}
                            </div> 

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="reset" data-modal-close="addNotesModal" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                                onClick={toggle}>Cancel</button>
                            <button type="submit" id="addNew" className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]">
                                {!!isEdit ? "Update" : "Add Tasks"}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* bulk task  */}
            {/* show pop uo */}


            {/* Overview Notes Modal */}
            <Modal show={Overviewshow} onHide={toggleOverview} id="overviewNotesModal" modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen xl:w-[48rem] bg-white shadow rounded-md dark:bg-zink-600"
            >
                <Modal.Header className="flex items-center justify-between p-5 border-b dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <div className="flex items-center gap-2">
                        <Dropdown className="flex relative ">
                            <Category item={'personal'} />
                            <Dropdown.Content placement="start-end" className="absolute z-50 hidden py-2 mt-1 text-left list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600" aria-labelledby="notesAction1">
                                <li>
                                    <a className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" href="#!">Personal</a>
                                </li>
                                <li>
                                    <a className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" href="#!">Business</a>
                                </li>
                                <li>
                                    <a className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" href="#!">Social</a>
                                </li>
                                <li>
                                    <a className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" href="#!">Home</a>
                                </li>
                            </Dropdown.Content>
                        </Dropdown>
                        <Modal.Title className="text-20">{eventData?.title}</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] overflow-y-auto p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <h6 className="text-sm font-normal grow">
                            <User2 className="inline-block size-4 mr-1 align-middle text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500" />
                            <span className="align-middle">Admin</span></h6>
                        <h6 className="text-sm font-normal shrink-0"><Calendar className="inline-block size-4 mr-1 align-middle text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500" />
                            <span className="align-middle">{eventData?.date}</span></h6>
                    </div>
                    <p className="mb-2 text-slate-500 dark:text-zink-200" dangerouslySetInnerHTML={{ __html: eventData?.description }}></p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 
                         active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 
                         dark:active:bg-red-500/10"
                            onClick={toggleOverview}
                        >Cancel</button>
                        <button data-modal-close="overviewNotesModal"
                            className="text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]"
                            onClick={() => { handleUpdateDataClick(eventData); setOverview(!Overviewshow); }}
                        >Edit Task</button>
                    </div>
                </Modal.Body>
            </Modal>

        </React.Fragment>
    );
};

export default Tasks;