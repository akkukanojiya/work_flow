import React, { useEffect, useMemo, useState, useRef } from "react";
// import BreadCrumb from "Common/BreadCrumb";
import BreadCrumb from "CompanyDashboard/CompanyCommon/BreadCrumb";
import Flatpickr from 'react-flatpickr';
import DatePicker from "react-datepicker";
import { ChevronDown, EyeIcon, Pencil } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
// import { Dropdown } from "Common/Components/Dropdown";
import { Dropdown } from "CompanyDashboard/CompanyCommon/Components/Dropdown";

import { RiFileExcel2Line } from "react-icons/ri";
import { FilterIcon, MoreVertical, TrendingUp } from 'lucide-react';
import { MoreHorizontal, Eye, FileEdit, Trash2, Search, LucideFile } from 'lucide-react';

// import TableContainer from "Common/TableContainer";
import TableContainer from "CompanyDashboard/CompanyCommon/TableContainer";
// import DeleteModal from "Common/DeleteModal";
import DeleteModal from "CompanyDashboard/CompanyCommon/DeleteModal";

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import * as XLSX from 'xlsx';
import {
    getProductList as onGetProductList,
    deleteProductList as onDeleteProductList
} from 'slices/thunk';
import { ToastContainer } from "react-toastify";
// import filterDataBySearch from "Common/filterDataBySearch";
import filterDataBySearch from "CompanyDashboard/CompanyCommon/filterDataBySearch";
// import { jsPDF } from "jspdf";
// import 'jspdf-autotable';



interface CompanyData {
    NameofCompany: string;
    BusinessRegistration: string;
    CompanyMail: string;
    PAN: string;
    BankName: string;
    id: number;
}
const WorkAllocationReport = () => {

    //  filter 
    const [SelectedOptionFilter, setSelectedOptionFilter] = useState('weekly'); // For radio buttons
    const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
    const [showDateRange, setShowDateRange] = useState(false); // Toggle for custom date range
    const [range, setRange] = useState({ from: '', to: '' }); // Range state for 'From' and 'To' dates

    // Handle radio button selection
    const handleSelection = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setSelectedOptionFilter(value);
        if (value === 'custom') {
            setShowDateRange(true); // Show date range when "Custom" is selected
        } else {
            setShowDateRange(false); // Hide date range otherwise
        }
    };

    // Handle range selection for 'From' and 'To' dates
    const handleRangeChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setRange({ ...range, [name]: value });
    };

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    //  filter end

    // choose client 
    const [selectedOption, setSelectedOption] = useState<string>("");

    // const clientData: TableData[] = [
    //     { id: 1, name: "John Doe", email: "john@client.com", role: "Client" },
    //     { id: 2, name: "Jane Smith", email: "jane@client.com", role: "Client" },
    // ];

    // const employeeData: TableData[] = [
    //     { id: 1, name: "Mark Spencer", email: "mark@employee.com", role: "Employee" },
    //     { id: 2, name: "Lisa Turner", email: "lisa@employee.com", role: "Employee" },
    // ];

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    // const renderTable = () => {
    //     const data = selectedOption === "Client" ? clientData : employeeData;
    //     return (
    //         <table className="min-w-full table-auto">
    //             <thead>
    //                 <tr>
    //                     <th className="px-4 py-2">ID</th>
    //                     <th className="px-4 py-2">Name</th>
    //                     <th className="px-4 py-2">Email</th>
    //                     <th className="px-4 py-2">Role</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {data.map((item) => (
    //                     <tr key={item.id}>
    //                         <td className="border px-4 py-2">{item.id}</td>
    //                         <td className="border px-4 py-2">{item.name}</td>
    //                         <td className="border px-4 py-2">{item.email}</td>
    //                         <td className="border px-4 py-2">{item.role}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     );
    // };

    // choose client end

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


    // // pdf download 
    // const generatePDF = () => {
    //     const doc = new jsPDF();
    //     const tableColumn = ["Name of Company", "Business Registration", "Company Mail", "PAN", "Bank Name"];
    //     const tableRows: string[][] = [];

    //     data.forEach((item: CompanyData) => {
    //         const itemData = [
    //             item.NameofCompany,
    //             item.BusinessRegistration,
    //             item.CompanyMail,
    //             item.PAN,
    //             item.BankName
    //         ];
    //         tableRows.push(itemData);
    //     });

    //     doc.autoTable({
    //         head: [tableColumn],
    //         body: tableRows,
    //         startY: 20
    //     });
    //     doc.text("Company Report", 14, 15);
    //     doc.save('company_report.pdf');
    // };
    // // pdf download end
    const dispatch = useDispatch<any>();

    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.productList
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<any>([]);
    const [eventData, setEventData] = useState<any>();

    // Get Data
    useEffect(() => {
        dispatch(onGetProductList());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

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
            dispatch(onDeleteProductList(eventData.id));
            setDeleteModal(false);
        }
    };

    // Search Data
    const filterSearchData = (e: any) => {
        const search = e.target.value;
        const keysToSearch = ['clientname', 'Email', 'pannumber', 'mobile',];
        filterDataBySearch(dataList, search, keysToSearch, setData);
    };

    const Status = ({ item }: any) => {
        switch (item) {
            case "Publish":
                return (<span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">{item}</span>);
            case "Scheduled":
                return (<span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-orange-100 border-transparent text-orange-500 dark:bg-orange-500/20 dark:border-transparent">{item}</span>);
            case "Inactive":
                return (<span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">{item}</span>);
            default:
                return (<span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">{item}</span>);
        }
    };

    const columns = useMemo(() => [
        {
            header: "Client Name",
            accessorKey: " clientname",
            enableColumnFilter: false,
            // cell: (cell: any) => (
            //     <Link to="#" className="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">{cell.getValue()}</Link>
            // ),
        },
        {
            header: "Assign Team",
            accessorKey: "assignteam",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                <Link to="/#" className="flex items-center gap-2">
                    {/* <img src={cell.row.original.img} alt="Product images" className="h-6" /> */}
                    <h6 className="product_name">{cell.getValue()}</h6>
                </Link>
            ),
        },

        {
            header: "Alloted Time",
            accessorKey: "allotedtime",
            enableColumnFilter: false,
            enableSorting: true,
        },  
        {
            header: "Deadline Date",
            accessorKey: "deadlinedate",
            enableColumnFilter: false,
            enableSorting: true,
            // cell: (cell: any) => (
            //     <span className="category px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-500/20 dark:border-slate-500/20 dark:text-zink-200">{cell.getValue()}</span>
            // ),
        },

        {
            header: "Due Date",
            accessorKey: "duedate",
            enableColumnFilter: false,
            enableSorting: true,
        },
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
                // <Dropdown className="relative dropdown">
                //     <Dropdown.Trigger className="flex items-center justify-center size-[30px] dropdown-toggle p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20" id="productAction1" data-bs-toggle="dropdown">
                //         <MoreHorizontal className="size-3" />
                //     </Dropdown.Trigger>
                //     <Dropdown.Content placement={cell.row.index ? "top-end" : "right-end"} className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600" aria-labelledby="productAction1">
                //         <li>
                //             <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="/#"><Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Overview</span></Link>
                //         </li>
                //         <li>
                //             <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="/#"><FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Edit</span></Link>
                //         </li>
                //         <li>
                //             <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!" onClick={() => {
                //                 const data = cell.row.original;
                //                 onClickDelete(data);
                //             }}><Trash2 className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Delete</span></Link>
                //         </li>
                //     </Dropdown.Content>
                // </Dropdown>
                <div className="flex gap-2">
                    <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-green-500 dark:hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-500/20"><EyeIcon className="size-4" /></Link>
                    <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/20" ><Pencil className="size-4" /></Link>
                    <Link to="#" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20" onClick={() => {
                        const data = cell.row.original;
                        onClickDelete(data);
                    }}><Trash2 className="size-4" /></Link>

                </div>
            ),
        }
    ], []
    );



    // const [startDate, setStartDate] = useState<Date | null>(null);
    // const [endDate, setEndDate] = useState<Date | null>(null);





    return (
        <React.Fragment>
            <BreadCrumb title='Work Allocation Reports' pageTitle='Reports' />
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="productListTable">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-3/4 py-2.1 card-body">
                            <form action="#!">
                                <div className="grid grid-cols-2 gap-4 xl:grid-cols-12">
                                    {/* <div className="relative xl:col-span-1">
                                        <input
                                            type="text"
                                            className="w-56 ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                            placeholder="Search"
                                            autoComplete="off"
                                            onChange={(e) => filterSearchData(e)}
                                        />
                                        <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zinc-200 fill-slate-100 dark:fill-zinc-600" />
                                    </div> */}

                                </div>

                            </form>


                            {/* <div className="relative inline-block text-left col-span-2">
                                <div className="mb-1 mt-2">
                                     
                                    <select
                                        className="border rounded px-3 py-2"
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Client Category</option>
                                        <option value="all">All</option>
                                        <option value="Company">Company</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Proprietor">Proprietor</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Trust/AOP">Trust/AOP</option>
                                        <option value="Society">Society</option>
                                    </select>
                                </div>

                                 
                            </div> */}
                        </div>

                        {/* client choose  */}

                        {/* client choose end */}

                        {/* filter  */}
                        {/* <div className="relative inline-block text-left">
                           
                            <button
                                onClick={handleButtonClick}
                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FilterIcon/>
                                
                            </button>

                            
                            {showOptions && (
                                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                                    <div className="py-1">
                                         
                                        <div className="relative group">
                                            <button
                                                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between"
                                                onMouseEnter={() => setShowAttendanceSubmenu(true)}
                                                onMouseLeave={() => setShowAttendanceSubmenu(false)}
                                            >
                                                Attendance  
                                            </button>

                                            
                                            {showAttendanceSubmenu && (
                                                <div className="absolute left-full top-0 mt-0 w-40 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg">
                                                    <div className="py-1">
                                                        <button
                                                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => handleAttendanceClick('Weekly')}
                                                        >
                                                            Weekly
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => handleAttendanceClick('Monthly')}
                                                        >
                                                            Monthly
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => handleAttendanceClick('Yearly')}
                                                        >
                                                            Yearly
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                         
                                        <button
                                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleOptionClick('Performance')}
                                        >
                                            Performance
                                        </button>
                                        <button
                                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleOptionClick('Analysis')}
                                        >
                                            Analysis
                                        </button>
                                        <button
                                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleOptionClick('Work Allocation')}
                                        >
                                            Work Allocation
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div> */}
                        {/* filter end */}

                        <div className="w-full md:w-auto flex-shrink-0 flex space-x-3">
                            <div className="relative xl:col-span-1">
                                <input
                                    type="text"
                                    className="w-24 ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
                                    placeholder="Search"
                                    autoComplete="off"
                                    onChange={(e) => filterSearchData(e)}
                                />
                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zinc-200 fill-slate-100 dark:fill-zinc-600" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={toggleDropdown}
                                        className="bg-white   text-[#2a5179] btn   hover:text-[#25476a] hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50   active:text-[#25476a] active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                                    >
                                        <span className="align-middle">
                                            Duration
                                        </span>
                                        <FilterIcon className="inline-block size-5" />
                                    </button>

                                    {isOpen && (
                                        <div className="absolute z-50 py-2 mt-1 bg-white rounded-md shadow-md min-w-[12rem] dark:bg-zinc-600">
                                            <form>
                                                {/* Radio Buttons */}
                                                <div className="flex items-center px-4 py-1.5">
                                                    <input
                                                        type="radio"
                                                        id="weekly"
                                                        name="subscription"
                                                        value="weekly"
                                                        checked={SelectedOptionFilter === 'weekly'}
                                                        onChange={handleSelection}
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor="weekly"
                                                        className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
                                                    >
                                                        1 Weekly
                                                    </label>
                                                </div>

                                                <div className="flex items-center px-4 py-1.5">
                                                    <input
                                                        type="radio"
                                                        id="monthly"
                                                        name="subscription"
                                                        value="monthly"
                                                        checked={SelectedOptionFilter === 'monthly'}
                                                        onChange={handleSelection}
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor="monthly"
                                                        className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
                                                    >
                                                        1 Monthly
                                                    </label>
                                                </div>

                                                <div className="flex items-center px-4 py-1.5">
                                                    <input
                                                        type="radio"
                                                        id="three-monthly"
                                                        name="subscription"
                                                        value="three-monthly"
                                                        checked={SelectedOptionFilter === 'three-monthly'}
                                                        onChange={handleSelection}
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor="three-monthly"
                                                        className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
                                                    >
                                                        3 Monthly
                                                    </label>
                                                </div>

                                                <div className="flex items-center px-4 py-1.5">
                                                    <input
                                                        type="radio"
                                                        id="six-monthly"
                                                        name="subscription"
                                                        value="six-monthly"
                                                        checked={SelectedOptionFilter === 'six-monthly'}
                                                        onChange={handleSelection}
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor="six-monthly"
                                                        className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
                                                    >
                                                        6 Monthly
                                                    </label>
                                                </div>

                                                <div className="flex items-center px-4 py-1.5">
                                                    <input
                                                        type="radio"
                                                        id="yearly"
                                                        name="subscription"
                                                        value="yearly"
                                                        checked={SelectedOptionFilter === 'yearly'}
                                                        onChange={handleSelection}
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor="yearly"
                                                        className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
                                                    >
                                                        Yearly
                                                    </label>
                                                </div>

                                                {/* Custom Date Range Option */}
                                                <div className="flex items-center px-4 py-1.5">
                                                    <input
                                                        type="radio"
                                                        id="custom"
                                                        name="subscription"
                                                        value="custom"
                                                        checked={SelectedOptionFilter === 'custom'}
                                                        onChange={handleSelection}
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor="custom"
                                                        className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
                                                    >
                                                        Custom Date Range
                                                    </label>
                                                </div>

                                                {/* Date Range Inputs (From - To) */}
                                                {showDateRange && (
                                                    <>
                                                        <div className="px-4 py-2">
                                                            <label className="block text-slate-600 dark:text-zinc-100">From</label>
                                                            <input
                                                                type="date"
                                                                name="from"
                                                                value={range.from}
                                                                onChange={handleRangeChange}
                                                                placeholder="From date"
                                                                className="w-full px-2 py-1 mt-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-500"
                                                            />
                                                        </div>

                                                        <div className="px-4 py-2">
                                                            <label className="block text-slate-600 dark:text-zinc-100">To</label>
                                                            <input
                                                                type="date"
                                                                name="to"
                                                                value={range.to}
                                                                onChange={handleRangeChange}
                                                                placeholder="To date"
                                                                className="w-full px-2 py-1 mt-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-500"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* expot date picker  */}
                            {/* <div id="date-range-picker" className="flex items-center">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <DatePicker
                                        id="datepicker-range-start"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsStart
                                        placeholderText="Select date start"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <span className="mx-4 text-gray-500">to</span>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <DatePicker
                                        id="datepicker-range-end"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsEnd
                                        minDate={startDate}
                                        placeholderText="Select date end"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div> */}
                            {/* expot date picker end */}
                            {/* filter  */}
                            {/* 
                            <div className="flex items-center gap-2">

                                <Dropdown className="relative dropdown shrink-0">
                                    <Dropdown.Trigger type="button" className="px-2 py-1.5 text-xs bg-text-slate-500 btn       focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20 dropdown-toggle" id="emailDataDropdown" data-bs-toggle="dropdown">
                                        Client Wise<ChevronDown className="inline-block size-4 ltr:ml-1 rlt:mr-1"></ChevronDown>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content placement="right-end" className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600" aria-labelledby="emailDataDropdown">
                                        <li>
                                            <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!">Weekly</Link>
                                        </li>
                                        <li>
                                            <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!">Monthly</Link>
                                        </li>
                                        <li>
                                            <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!">Company Category  </Link>
                                        </li>
                                         
                                    </Dropdown.Content>
                                </Dropdown>
                            </div> */}

                            {/* filter end */}

                            {/* time duration  */}
                            {/* <div className="relative flex items-center gap-2" ref={dropdownRef}>
                                
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="px-2 py-1.5 text-xs   text-black btn focus:ring focus:ring-slate-100 rounded-md"
                                >
                                    Time Duration <ChevronDown className="inline-block size-4 ml-1" />
                                </button>
 
                                {isOpen && (
                                    <div className="absolute z-50 py-2 mt-1 bg-white rounded-md shadow-md min-w-[12rem] right-0 ">
                                        <div className="p-4">
                                             
                                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Start Time:</label>
                                            <input
                                                type="time"
                                                className="block w-full px-2 py-1.5 text-base border border-gray-300 rounded-md  dark:text-white"
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                            />
                                        </div>

                                        <div className="p-4">
                                          
                                            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">End Time:</label>
                                            <input
                                                type="time"
                                                className="block w-full px-2 py-1.5 text-base border border-gray-300 rounded-md   dark:text-white"
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                            />
                                        </div>

                                        <div className="p-4">
                                            
                                            <button
                                                className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                onClick={handleTimeFilter}
                                            >
                                                Apply Filter
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div> */}
                            {/* time duration end */}
                            {/* <div className="xl:col-span-3 max-w-24"> */}
                            {/* <div className="xl:col-span-1">
                                <span className="align-middle">From</span>
                            <Flatpickr
                                id="companyReport"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y",
                                    mode: "range",
                                }}
                                placeholder='Select date'
                                 
                            />
                             
                        </div> */}

                            {/* </div>   */}
                            {/* <div className="xl:col-span-1">
                                <span className="align-middle">From to To</span> 
                            <Flatpickr
                                id="companyReport"
                                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                options={{
                                    dateFormat: "d M, Y",
                                    mode: "range",
                                }}
                                placeholder='Select date'
                                 
                            />
                            
                        </div> */}
                            <button
                                className="bg-white   text-[#2a5179] btn   hover:text-[#25476a] hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50   active:text-[#25476a] active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                                onClick={generateExcel}
                            >
                                <span className="align-middle">Download</span>
                                <RiFileExcel2Line className="inline-block size-5" />
                            </button>
                            {/* <button className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20" onClick={generatePDF}>
                            <LucideFile  className="inline-block size-5" />
                        </button> */}
                            {/* <Link
                                to="/company-time-sheet-form"
                                type="button"
                                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                            >
                                <Plus className="inline-block size-4" /> <span className="align-middle">Add Time Sheet</span>
                            </Link> */}

                        </div>
                        {/* <div className="flex items-center mb-3">
                        <Dropdown className="relative shrink-0">
                            <Dropdown.Trigger type="button" className="flex items-center justify-center size-[30px] p-0 bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-700 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10 dropdown-toggle" id="sellingProductDropdown" data-bs-toggle="dropdown">
                                <MoreVertical className="inline-block size-4"></MoreVertical>
                                <FilterIcon/>
                            </Dropdown.Trigger>

                            <Dropdown.Content placement="right-end" className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600" aria-labelledby="sellingProductDropdown">
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!">Attandance</Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!">work</Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!">Performance Analysis</Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!">work allocation</Link>
                                </li>
                                 
                            </Dropdown.Content>
                        </Dropdown>
                    </div> */}


                    </div>

                </div>
                <div className="!pt-1 card-body">
                    {data && data.length > 0 ?
                        <TableContainer
                            isPagination={true}
                            columns={(columns || [])}
                            data={(data || [])}
                            customPageSize={7}
                            divclassName="overflow-x-auto"
                            tableclassName="w-full whitespace-nowrap"
                            theadclassName="ltr:text-left rtl:text-right bg-[#25476a] text-[#fff]"
                            thclassName="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500"
                            tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500"
                            PaginationClassName="flex flex-col items-center gap-4 px-4 mt-4 md:flex-row"
                        />
                        :
                        (<div className="noresult">
                            <div className="py-6 text-center">
                                <Search className="size-6 mx-auto mb-3 text-sky-500 fill-sky-100 dark:fill-sky-500/20" />
                                <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                                <p className="mb-0 text-slate-500 dark:text-zink-200">We've searched more than 199+ product We did not find any product for you search.</p>
                            </div>
                        </div>)}
                </div>
            </div>
        </React.Fragment>
    );
};

export default WorkAllocationReport;