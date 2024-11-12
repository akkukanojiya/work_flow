import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";


const Pagination = ({ data, currentPage, setCurrentPage, perPageData, currentdata }: any) => {

    const handleClick = (e: any) => {
        setCurrentPage(e);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data?.length / perPageData); i++) {
        pageNumbers.push(i);
    }
    const handleprevPage = () => {
        let prevPage = currentPage - 1;
        setCurrentPage(prevPage);
    };
    const handlenextPage = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    };

    useEffect(() => {
        if (pageNumbers.length && pageNumbers.length < currentPage) {
            setCurrentPage(pageNumbers.length);
        }

    }, [pageNumbers.length, currentPage, setCurrentPage]);
    return (
        <React.Fragment>
            <div className="flex flex-col items-center mb-5 md:flex-row">
    <div className="mb-4 grow md:mb-0">
        <p className="text-slate-500 dark:text-zink-200">
            Showing <b>{currentdata.length}</b> of <b>{data.length}</b> Results
        </p>
    </div>
    <ul className="flex flex-wrap items-center gap-2 shrink-0">
        {currentPage <= 1 ? (
            <Link
                className="inline-flex items-center justify-center bg-[#25476a] dark:bg-[#25476a] h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-white dark:text-white hover:text-black dark:hover:text-black hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 disabled:text-slate-400 dark:disabled:text-zink-300 disabled:cursor-auto"
                to="#!"
            >
                <ChevronLeft className="size-4 mr-1 rtl:rotate-180" /> Prev
            </Link>
        ) : (
            <li className={currentPage <= 1 ? "disabled" : ""}>
                <Link
                    to="#!"
                    className={`inline-flex items-center justify-center h-8 px-3 transition-all duration-150 ease-linear border rounded ${
                        currentPage === 1 ? "bg-[#25476a] text-white border-[#25476a]" : "bg-white text-slate-500 border-slate-200 dark:bg-zink-700 dark:text-zink-200 dark:border-zink-500"
                    } hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10`}
                    onClick={handleprevPage}
                >
                    <ChevronLeft className="size-4 mr-1 rtl:rotate-180" /> Prev
                </Link>
            </li>
        )}

        {pageNumbers.map((item, key) => (
            <React.Fragment key={key}>
                <li>
                    <Link
                        to="#!"
                        className={`inline-flex items-center justify-center h-8 px-3 transition-all duration-150 ease-linear border rounded ${
                            currentPage === item ? "bg-[#25476a] text-white border-[#25476a]" : "bg-white text-slate-500 border-slate-200 dark:bg-zink-700 dark:text-zink-200 dark:border-zink-500"
                        } hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10`}
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </Link>
                </li>
            </React.Fragment>
        ))}

        {currentPage >= pageNumbers.length ? (
            <Link
                className="inline-flex items-center justify-center bg-[#25476a] dark:bg-[#25476a] h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-white dark:text-white hover:text-black dark:hover:text-black hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 disabled:text-slate-400 dark:disabled:text-zink-300 disabled:cursor-auto"
                to="#!"
            >
                Next <ChevronRight className="size-4 ml-1 rtl:rotate-180" />
            </Link>
        ) : (
            <li className={currentPage <= 1 ? "disabled" : ""}>
                <Link
                    to="#!"
                    className={`inline-flex items-center justify-center h-8 px-3 transition-all duration-150 ease-linear border rounded ${
                        currentPage === pageNumbers.length ? "bg-[#25476a] text-white border-[#25476a]" : "bg-white text-slate-500 border-slate-200 dark:bg-zink-700 dark:text-zink-200 dark:border-zink-500"
                    } hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10`}
                    onClick={handlenextPage}
                >
                    Next <ChevronRight className="size-4 ml-1 rtl:rotate-180" />
                </Link>
            </li>
        )}
    </ul>
</div>

        </React.Fragment>
    );
};

export default Pagination;
