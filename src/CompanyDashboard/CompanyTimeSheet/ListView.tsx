// import { Delete, DeleteIcon, Edit, Edit2Icon, View, Trash2, EyeIcon, FilterIcon, Search, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState } from "react";
// import { RiFileExcel2Line } from "react-icons/ri";
// import * as XLSX from 'xlsx';
// import filterDataBySearch from "CompanyDashboard/CompanyCommon/filterDataBySearch";





// // Dummy data for demonstration
// const data = [
//   { orderId: '#541254265', shop: 'Amazon', customer: 'Cleo Carson', price: '$4,521' },
//   { orderId: '#744145235', shop: 'Shoppers', customer: 'Juston Eichmann', price: '$7,546' },
//   { orderId: '#9855126598', shop: 'Flipkart', customer: 'Bettie Johson', price: '$1,350' },
//   { orderId: '#847512653', shop: 'Tailwick', customer: 'Maritza Blanda', price: '$4,521' },
//   { orderId: '#654145632', shop: 'Walmart', customer: 'John Doe', price: '$2,312' },
//   { orderId: '#784145698', shop: 'BestBuy', customer: 'Jane Doe', price: '$5,123' },
//   // Add more data as needed
// ];
// const CompanyTimeSheet = () => {
//   //  filter 
//   const [SelectedOptionFilter, setSelectedOptionFilter] = useState('weekly'); // For radio buttons
//   const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
//   const [showDateRange, setShowDateRange] = useState(false); // Toggle for custom date range
//   const [range, setRange] = useState({ from: '', to: '' }); // Range state for 'From' and 'To' dates

//   // Handle radio button selection
//   const handleSelection = (event: { target: { value: any; }; }) => {
//     const value = event.target.value;
//     setSelectedOptionFilter(value);
//     if (value === 'custom') {
//       setShowDateRange(true); // Show date range when "Custom" is selected
//     } else {
//       setShowDateRange(false); // Hide date range otherwise
//     }
//   };

//   // Handle range selection for 'From' and 'To' dates
//   const handleRangeChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     setRange({ ...range, [name]: value });
//   };

//   // Toggle the dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };


//   //  filter end

//   // choose client 
//   const [selectedOption, setSelectedOption] = useState<string>("");

//   // const clientData: TableData[] = [
//   //     { id: 1, name: "John Doe", email: "john@client.com", role: "Client" },
//   //     { id: 2, name: "Jane Smith", email: "jane@client.com", role: "Client" },
//   // ];

//   // const employeeData: TableData[] = [
//   //     { id: 1, name: "Mark Spencer", email: "mark@employee.com", role: "Employee" },
//   //     { id: 2, name: "Lisa Turner", email: "lisa@employee.com", role: "Employee" },
//   // ];

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedOption(event.target.value);
//   };

//   // const renderTable = () => {
//   //     const data = selectedOption === "Client" ? clientData : employeeData;
//   //     return (
//   //         <table className="min-w-full table-auto">
//   //             <thead>
//   //                 <tr>
//   //                     <th className="px-4 py-2">ID</th>
//   //                     <th className="px-4 py-2">Name</th>
//   //                     <th className="px-4 py-2">Email</th>
//   //                     <th className="px-4 py-2">Role</th>
//   //                 </tr>
//   //             </thead>
//   //             <tbody>
//   //                 {data.map((item) => (
//   //                     <tr key={item.id}>
//   //                         <td className="border px-4 py-2">{item.id}</td>
//   //                         <td className="border px-4 py-2">{item.name}</td>
//   //                         <td className="border px-4 py-2">{item.email}</td>
//   //                         <td className="border px-4 py-2">{item.role}</td>
//   //                     </tr>
//   //                 ))}
//   //             </tbody>
//   //         </table>
//   //     );
//   // };

//   // choose client end
//   // excel file 

//   const generateExcel = () => {
//     // Sample data to be written into the Excel file
//     const data = [
//       { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
//       { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
//       { name: 'Sam Johnson', age: 23, email: 'sam.johnson@example.com' },
//     ];

//     // Create a worksheet from the sample data
//     const worksheet = XLSX.utils.json_to_sheet(data);

//     // Create a new workbook and append the worksheet
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

//     // Generate an Excel file
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: 'xlsx',
//       type: 'array',
//     });

//     // Create a Blob object from the Excel buffer
//     const blob = new Blob([excelBuffer], {
//       type: 'application/octet-stream',
//     });

//     // Create a download link and click it programmatically
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'example.xlsx';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };
//   // excel file end


//   // Search Data
//   const filterSearchData = (e: any) => {
//     const search = e.target.value;
//     const keysToSearch = ['clientname', 'Email', 'pannumber', 'mobile',];
//     filterDataBySearch(search, keysToSearch,);
//   };



//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3; // You can set the number of items per page
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   // Get current page data
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

//   return (

//     <div className="card mt-4">
//       <div className="card-body">
//         <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
//           <div className="w-full md:w-3/4 py-2.1 card-body">

//             <div className="relative inline-block text-left col-span-2">
//               <div className="mb-1 mt-2">
//                 {/* <label className="block text-sm font-medium mb-1">Client</label> */}
//                 {/* <span className="mr-1" >Client Category</span> */}
//                 <select
//                   className="border rounded px-3 py-2"
//                   value={selectedOption}
//                   onChange={handleSelectChange}
//                 >
//                   <option value="">Client Category</option>
//                   <option value="all">All</option>
//                   <option value="Company">Company</option>
//                   <option value="Individual">Individual</option>
//                   <option value="Proprietor">Proprietor</option>
//                   <option value="Partnership">Partnership</option>
//                   <option value="Trust/AOP">Trust/AOP</option>
//                   <option value="Society">Society</option>
//                 </select>
//               </div>


//             </div>
//           </div>



//           <div className="w-full md:w-auto flex-shrink-0 flex space-x-3">
//             <div className="relative xl:col-span-1">
//               <input
//                 type="text"
//                 className="w-32 ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
//                 placeholder="Search"
//                 autoComplete="off"
//                 onChange={(e) => filterSearchData(e)}
//               />
//               <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zinc-200 fill-slate-100 dark:fill-zinc-600" />
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={toggleDropdown}
//                   className="bg-white text-custom-500 btn hover:text-custom-500 hover:bg-custom-50 focus:text-custom-600 focus:bg-custom-50 active:text-custom-600 active:bg-custom-50 dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
//                 >
//                   <span className="align-middle">
//                     Duration
//                   </span>
//                   <FilterIcon className="inline-block size-5" />
//                 </button>

//                 {isOpen && (
//                   <div className="absolute z-50 py-2 mt-1 bg-white rounded-md shadow-md min-w-[12rem] dark:bg-zinc-600">
//                     <form>
//                       {/* Radio Buttons */}
//                       <div className="flex items-center px-4 py-1.5">
//                         <input
//                           type="radio"
//                           id="weekly"
//                           name="subscription"
//                           value="weekly"
//                           checked={SelectedOptionFilter === 'weekly'}
//                           onChange={handleSelection}
//                           className="mr-2"
//                         />
//                         <label
//                           htmlFor="weekly"
//                           className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
//                         >
//                           1 Weekly
//                         </label>
//                       </div>

//                       <div className="flex items-center px-4 py-1.5">
//                         <input
//                           type="radio"
//                           id="monthly"
//                           name="subscription"
//                           value="monthly"
//                           checked={SelectedOptionFilter === 'monthly'}
//                           onChange={handleSelection}
//                           className="mr-2"
//                         />
//                         <label
//                           htmlFor="monthly"
//                           className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
//                         >
//                           1 Monthly
//                         </label>
//                       </div>

//                       <div className="flex items-center px-4 py-1.5">
//                         <input
//                           type="radio"
//                           id="three-monthly"
//                           name="subscription"
//                           value="three-monthly"
//                           checked={SelectedOptionFilter === 'three-monthly'}
//                           onChange={handleSelection}
//                           className="mr-2"
//                         />
//                         <label
//                           htmlFor="three-monthly"
//                           className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
//                         >
//                           3 Monthly
//                         </label>
//                       </div>

//                       <div className="flex items-center px-4 py-1.5">
//                         <input
//                           type="radio"
//                           id="six-monthly"
//                           name="subscription"
//                           value="six-monthly"
//                           checked={SelectedOptionFilter === 'six-monthly'}
//                           onChange={handleSelection}
//                           className="mr-2"
//                         />
//                         <label
//                           htmlFor="six-monthly"
//                           className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
//                         >
//                           6 Monthly
//                         </label>
//                       </div>

//                       <div className="flex items-center px-4 py-1.5">
//                         <input
//                           type="radio"
//                           id="yearly"
//                           name="subscription"
//                           value="yearly"
//                           checked={SelectedOptionFilter === 'yearly'}
//                           onChange={handleSelection}
//                           className="mr-2"
//                         />
//                         <label
//                           htmlFor="yearly"
//                           className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
//                         >
//                           Yearly
//                         </label>
//                       </div>

//                       {/* Custom Date Range Option */}
//                       <div className="flex items-center px-4 py-1.5">
//                         <input
//                           type="radio"
//                           id="custom"
//                           name="subscription"
//                           value="custom"
//                           checked={SelectedOptionFilter === 'custom'}
//                           onChange={handleSelection}
//                           className="mr-2"
//                         />
//                         <label
//                           htmlFor="custom"
//                           className="text-slate-600 hover:text-slate-500 focus:text-slate-500 dark:text-zinc-100 dark:hover:text-zinc-200"
//                         >
//                           Custom Date Range
//                         </label>
//                       </div>

//                       {/* Date Range Inputs (From - To) */}
//                       {showDateRange && (
//                         <>
//                           <div className="px-4 py-2">
//                             <label className="block text-slate-600 dark:text-zinc-100">From</label>
//                             <input
//                               type="date"
//                               name="from"
//                               value={range.from}
//                               onChange={handleRangeChange}
//                               placeholder="From date"
//                               className="w-full px-2 py-1 mt-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-500"
//                             />
//                           </div>

//                           <div className="px-4 py-2">
//                             <label className="block text-slate-600 dark:text-zinc-100">To</label>
//                             <input
//                               type="date"
//                               name="to"
//                               value={range.to}
//                               onChange={handleRangeChange}
//                               placeholder="To date"
//                               className="w-full px-2 py-1 mt-1 border rounded-md dark:bg-zinc-700 dark:border-zinc-500"
//                             />
//                           </div>
//                         </>
//                       )}
//                     </form>
//                   </div>
//                 )}
//               </div>
//             </div>



//             <button
//               className="bg-white   text-custom-500 btn   hover:text-custom-500 hover:bg-custom-50   focus:text-custom-600 focus:bg-custom-50   active:text-custom-600 active:bg-custom-50   dark:bg-zinc-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
//               onClick={generateExcel}
//             >
//               <span className="align-middle">
//                 Download
//               </span>
//               <RiFileExcel2Line className="inline-block size-5" />
//               {/* <span className="align-middle">Download Excel</span> */}
//             </button>

//           </div>



//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full border-separate table-custom border-spacing-y-1">
//             <thead className="ltr:text-left rtl:text-right">
//               <tr className="relative rounded-md bg-[#25476a]">
//                 <th className="px-3.5 py-2.5 font-semibold text-white">Order ID</th>
//                 <th className="px-3.5 py-2.5 font-semibold text-white">Shop</th>
//                 <th className="px-3.5 py-2.5 font-semibold text-white ">Customer</th>
//                 <th className="px-3.5 py-2.5 font-semibold text-white">Price</th>
//                 <th className="px-3.5 py-2.5 font-semibold text-white">Price</th>
//                 <th className="px-3.5 py-2.5 font-semibold text-white">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="relative rounded-md bg-slate-50 after:absolute after:border-l-2 after:left-0 after:top-0 after:bottom-0 after:border-transparent dark:bg-zink-600 [&.active]:after:border-green-500 active"
//                 >
//                   <td className="px-3.5 py-2.5">
//                     <a href="#!" className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600">
//                       {item.orderId}
//                     </a>
//                   </td>
//                   <td className="px-3.5 py-2.5">{item.shop}</td>
//                   <td className="px-3.5 py-2.5">{item.customer}</td>
//                   <td className="px-3.5 py-2.5">{item.price}</td>
//                   <td className="px-3.5 py-2.5">{item.price}</td>
//                   <td className="px-3.5 py-2.5 flex space-x-2">
//                     <button className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-green-500 dark:hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-500/20">
//                       <EyeIcon className="inline-block size-4 " />
//                     </button>
//                     <button className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20">
//                       <Edit2Icon className="inline-block size-4" />
//                     </button>
//                     <button className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 dark:bg-zink-600 dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20">
//                       <Trash2 className="inline-block size-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>


//           </table>
//         </div>

//         {/* Pagination Controls */}

//         <div className="flex justify-between items-center mt-4">
//           {/* external  */}
//           {/* <ul className="flex flex-wrap items-center gap-2">
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"><ChevronLeft className="size-4 mr-1 rtl:rotate-180" /> Prev</a>
//             </li>
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto">1</a>
//             </li>
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto active">2</a>
//             </li>
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto">3</a>
//             </li>
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto">4</a>
//             </li>
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto">5</a>
//             </li>
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto">6</a>
//             </li>
//             <li>
//               <a href="#!" className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto">Next <ChevronRight className="size-4 ml-1 rtl:rotate-180" /></a>
//             </li>
//           </ul> */}
//           {/* external end */}
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 bg-[#25476a] text-[#fff] rounded-md hover:bg-[#1e3d58] transition-all"
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 bg-[#25476a] text-[#fff] rounded-md hover:bg-[#1e3d58]"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyTimeSheet;









// // chat pop up 
// // import React, { useState } from 'react';
// // import { FaUser, FaVideo, FaPhone, FaCog, FaPaperPlane } from 'react-icons/fa';

// // const CompanyTimeSheet: React.FC = () => {
// //   const [isOpen, setIsOpen] = useState(false); // State to toggle chat popup
// //   const [messages, setMessages] = useState([
// //     { sender: 'Adam', text: 'hello', fromUser: false },
// //     { sender: 'Adam', text: 'how are you ???', fromUser: true },
// //     { sender: 'Adam', text: "I'm fine !!!", fromUser: false },
// //     { sender: 'Adam', text: 'Where are you ?', fromUser: false },
// //     { sender: 'Adam', text: 'at california', fromUser: true },
// //     { sender: 'Adam', text: 'and where are you ?', fromUser: true },
// //     { sender: 'Adam', text: "now i'm at new york city", fromUser: false }
// //   ]);

// //   const [newMessage, setNewMessage] = useState('');

// //   const handleSendMessage = () => {
// //     if (newMessage.trim()) {
// //       setMessages([...messages, { sender: 'User', text: newMessage, fromUser: true }]);
// //       setNewMessage('');
// //     }
// //   };

// //   return (
// //     <div className="fixed bottom-12 right-10">
// //       {!isOpen && (
// //         <button
// //           onClick={() => setIsOpen(true)}
// //           className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
// //         >
// //           Chat 
// //         </button>
// //       )}

// //       {isOpen && (
// //         <div className="fixed bottom-5 right-5 w-96 h-96 bg-white border rounded-lg shadow-lg flex flex-col">
// //           {/* Chat Header */}
// //           <div className="p-3 flex items-center justify-between bg-blue-500 text-white rounded-t-lg">
// //             <div className="flex items-center space-x-2">
// //               <FaUser className="rounded-full bg-white p-1" />
// //               <span>Adam Finn</span>
// //             </div>
// //             <div className="flex items-center space-x-2">
// //               <FaVideo />
// //               <FaPhone />
// //               <FaCog />
// //               <button onClick={() => setIsOpen(false)} className="text-lg font-bold">
// //                 X
// //               </button>
// //             </div>
// //           </div>

// //           {/* Messages */}
// //           <div className="flex-1 p-3 overflow-y-auto">
// //             {messages.map((message, index) => (
// //               <div key={index} className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}>
// //                 <div
// //                   className={`max-w-xs p-2 rounded-lg mb-2 ${
// //                     message.fromUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
// //                   }`}
// //                 >
// //                   {message.text}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Message Input */}
// //           <div className="p-3 flex items-center space-x-2 bg-gray-100">
// //             <input
// //               type="text"
// //               placeholder="Type a message..."
// //               className="flex-1 border border-gray-300 rounded-lg p-2"
// //               value={newMessage}
// //               onChange={(e) => setNewMessage(e.target.value)}
// //             />
// //             <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-lg">
// //               <FaPaperPlane />
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CompanyTimeSheet;

// // chat pop up end