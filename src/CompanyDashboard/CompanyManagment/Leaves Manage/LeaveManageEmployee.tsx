import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import TableContainer from 'Common/TableContainer';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

// Icons
import { Search, Plus, Pencil, Info, FileBarChart2, CalendarDays, Stethoscope, Anchor } from 'lucide-react';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import {
    getLeaveManageEmployee as onGetLeaveManageEmployee
} from 'slices/thunk';
import filterDataBySearch from 'Common/filterDataBySearch';

const LeaveManageEmployee = () => {

    const dispatch = useDispatch<any>();

    const selectDataList = createSelector(
        (state: any) => state.HRManagment,
        (state) => ({
            dataList: state.leaveManageEmployeelist
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<any>([]);

    // Get Data
    useEffect(() => {
        dispatch(onGetLeaveManageEmployee());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

    // Search Data
    const filterSearchData = (e: any) => {
        const search = e.target.value;
        const keysToSearch = ['leaveType', 'reason', 'noOfDays', 'from', 'to', 'approvedBy', 'status'];
        filterDataBySearch(dataList, search, keysToSearch, setData);
    };

    // Table Head Action On Right
    useEffect(() => {
        const tableHead = document.querySelectorAll("th");
        const lastTheadElement = tableHead[tableHead.length - 1];
        lastTheadElement?.classList.add("ltr:text-right", "rtl:text-left");

        return () => {
            lastTheadElement?.classList.remove("ltr:text-right", "rtl:text-left");
        };
    });


    const Status = ({ item }: any) => {
        switch (item) {
            case "Approved":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">{item}</span>);
            case "Pending":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-yellow-100 border-transparent text-yellow-500 dark:bg-yellow-500/20 dark:border-transparent">{item}</span>);
            case "Declined":
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">{item}</span>);
            default:
                return (<span className="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">{item}</span>);
        }
    };

    const columns = useMemo(() => [
        {
            header: "#",
            accessorKey: "id",
            enableColumnFilter: false
        },
        {
            header: "Leave Type",
            accessorKey: "leaveType",
            enableColumnFilter: false,
        },
        {
            header: "Reason",
            accessorKey: "reason",
            enableColumnFilter: false,
        },
        {
            header: "No Of Days",
            accessorKey: "noOfDays",
            enableColumnFilter: false,
        },
        {
            header: "From",
            accessorKey: "from",
            enableColumnFilter: false,
        },
        {
            header: "To",
            accessorKey: "to",
            enableColumnFilter: false,
        },
        {
            header: "Approved By",
            accessorKey: "approvedBy",
            enableColumnFilter: false,
        },
        {
            header: "Status",
            accessorKey: "status",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <Status item={cell.getValue()} />
            ),
        },
        {
            header: "Action",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => (
                <div className="flex justify-end gap-2">
                    {/* {cell.row.original.status === "Pending" && <Link to="#!" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md text-slate-500 bg-slate-100 hover:text-white hover:bg-slate-500 dark:text-zink-200 dark:bg-zink-600 dark:hover:text-white dark:hover:bg-zink-400"><Pencil className="size-4" /></Link>} */}
                    <Link to="#!" data-modal-target="leaveOverviewModal" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md text-custom-500 bg-custom-100 hover:text-white hover:bg-custom-500 dark:bg-custom-500/20 dark:hover:bg-custom-500"><Info className="size-4" /></Link>
                </div>
            ),
        }
    ], []
    );

    return (
        <React.Fragment>
            <BreadCrumb title='Leave Manage (Employee)' pageTitle='Leaves Manage' />
            <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-12">
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 text-red-500 bg-red-100 rounded-md text-15 dark:bg-red-500/20 shrink-0"><FileBarChart2 /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={23} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zink-200">Total Leave Balance</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 text-green-500 bg-green-100 rounded-md text-15 dark:bg-green-500/20 shrink-0"><CalendarDays /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={12} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zink-200">Annual Leave</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 text-purple-500 bg-purple-100 rounded-md text-15 dark:bg-purple-500/20 shrink-0"><Stethoscope /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={4} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zink-200">Medical Leave</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3">
                    <div className="card">
                        <div className="flex items-center gap-3 card-body">
                            <div className="flex items-center justify-center size-12 rounded-md text-sky-500 bg-sky-100 text-15 dark:bg-sky-500/20 shrink-0"><Anchor /></div>
                            <div className="grow">
                                <h5 className="mb-1 text-16">
                                    <CountUp end={11} className="counter-value" />
                                </h5>
                                <p className="text-slate-500 dark:text-zink-200">Remaining Leave</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" id="ordersTable">
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 mb-5 lg:grid-cols-2 xl:grid-cols-12">
                        <div className="xl:col-span-3">
                            <div className="relative">
                                <input type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search for ..." autoComplete="off" onChange={(e) => filterSearchData(e)} />
                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                            </div>
                        </div>
                        <div className="xl:col-span-2 xl:col-start-11">
                            <div className="ltr:lg:text-right rtl:lg:text-left">
                                <Link to="/company-employee-leave" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><Plus className="inline-block size-4" /> <span className="align-middle">Add Leave</span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {data && data.length > 0 ?
                            <TableContainer
                                isPagination={true}
                                columns={(columns || [])}
                                data={(data || [])}
                                customPageSize={10}
                                divclassName="overflow-x-auto"
                                tableclassName="w-full whitespace-nowrap"
                                theadclassName="ltr:text-left rtl:text-right bg-slate-100 text-slate-500 dark:bg-zink-600 dark:text-zink-200"
                                thclassName="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500"
                                tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500"
                                PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
                            />
                            :
                            (<div className="noresult">
                                <div className="py-6 text-center">
                                    <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                                    <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                                    <p className="mb-0 text-slate-500 dark:text-zink-200">We've searched more than 5+ Departments We did not find any Departments for you search.</p>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LeaveManageEmployee;
