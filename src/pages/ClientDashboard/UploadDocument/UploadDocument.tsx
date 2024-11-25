// import React, { useState } from "react";
// import axios from "axios";


import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
 





interface FieldData {
  name: string;
  description: string;
  file: File | null;
  errors: {
    name?: string;
    description?: string;
    file?: string;
  };
}
const UploadDocument: React.FC = () => {
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  // const [error, setError] = useState<string>("");
  // const [description, setDescription] = useState<string>("");

  // const allowedFileTypes = [
  //   "application/pdf", // PDF
  //   "application/msword", // .doc
  //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  //   "application/vnd.ms-excel", // .xls
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  //   "image/jpeg", // JPG
  //   "image/png", // PNG
  // ];

  // // Handle file selection
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files || []);
  //   const validFiles = files.filter((file) => allowedFileTypes.includes(file.type));

  //   if (validFiles.length > 0) {
  //     setSelectedFiles(validFiles);
  //     setError("");
  //   } else {
  //     setSelectedFiles([]);
  //     setError("Invalid file types. Only PDF, Word, Excel, and image files are allowed.");
  //   }
  // };

  // // Handle file upload
  // const handleUpload = async () => {
  //   if (selectedFiles.length === 0) {
  //     setError("Please select at least one valid file to upload.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   selectedFiles.forEach((file) => formData.append("files", file));
  //   formData.append("description", description);

  //   try {
  //     const response = await axios.post("/upload", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       onUploadProgress: (progressEvent) => {
  //         if (progressEvent.total) {
  //           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //           setUploadProgress((prev) => [...prev, percentCompleted]);
  //         }
  //       },
  //     });

  //     console.log(response.data.fileUrls); // Handle the successful upload, e.g., show success or file URLs
  //     setError(""); // Clear error on success
  //     setDescription(""); // Reset description
  //   } catch (err) {
  //     setError("Error uploading the files.");
  //   }
  // };

// drag and drop option start///////////////////////////////////////////
 
  // upload doc end





  // name description choose file 
  const [fields, setFields] = useState<FieldData[]>([
    { name: '', description: '', file: null, errors: {} },
  ]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [name]: value, errors: { ...field.errors, [name]: '' } } : field
      )
    );
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];
      
      setFields((prevFields) =>
        prevFields.map((field, i) => {
          if (i === index) {
            const isValidFileType = allowedTypes.includes(file.type);
            return {
              ...field,
              file: isValidFileType ? file : null,
              errors: {
                ...field.errors,
                file: isValidFileType ? '' : 'File must be PDF, Word, Excel, JPEG, or PNG format.',
              },
            };
          }
          return field;
        })
      );
    }
  };

  const addField = () => {
    setFields([...fields, { name: '', description: '', file: null, errors: {} }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const validateFields = () => {
    const updatedFields = fields.map((field) => {
      const errors: FieldData['errors'] = {};
      if (!field.name) errors.name = 'Name is required.';
      if (!field.description) errors.description = 'Description is required.';
      if (!field.file) errors.file = 'File is required.';
      return { ...field, errors };
    });
    setFields(updatedFields);
    return updatedFields.every((field) => !field.errors.name && !field.errors.description && !field.errors.file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      console.log('Form Data:', fields);
      // Add your submit logic here
    }
  };

  // name description choose file end
  return (
    // upload doc 
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="Upload Document" pageTitle="Upload" />
        <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field, index) => (
        <div key={index} className="border-b pb-4">
          <h3 className="text-lg font-medium">{index + 1}</h3>

          <div className="mt-2">
            <label htmlFor={`name-${index}`} className="inline-block mb-2 text-base font-medium">
              Name
            </label>
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={field.name}
              onChange={(e) => handleChange(index, e)}
              className="form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200"
            />
            {field.errors.name && (
              <p className="text-red-500 text-sm mt-1">{field.errors.name}</p>
            )}
          </div>

          <div className="mt-2">
            <label htmlFor={`description-${index}`} className="inline-block mb-2 text-base font-medium">
              Description
            </label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={field.description}
              onChange={(e) => handleChange(index, e)}
              className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
            />
            {field.errors.description && (
              <p className="text-red-500 text-sm mt-1">{field.errors.description}</p>
            )}
          </div>

          <div className="mt-2">
            <label htmlFor={`file-${index}`} className="inline-block mb-2 text-base font-medium">
              Choose File
            </label>
            <input
              type="file"
              id={`file-${index}`}
              name="file"
              accept=".pdf, .doc, .docx, .xls, .xlsx, .jpeg, .jpg, .png"
              onChange={(e) => handleFileChange(index, e)}
              className="cursor-pointer form-file border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500"
            />
            {field.errors.file  && (
              <p className="text-red-500 text-sm mt-1">{field.errors.file}</p>
            )}
          </div>
          {fields.length > 1 && index !== 0 && (
          <button
            type="button"
            onClick={() => removeField(index)}
            className="text-white btn bg-rose-500 border-rose-500 hover:text-white hover:bg-rose-600 hover:border-rose-600 focus:text-white focus:bg-rose-600 focus:border-rose-600 focus:ring focus:ring-rose-100 active:text-white active:bg-rose-600 active:border-rose-600 active:ring active:ring-rose-100 dark:ring-rose-400/20 mt-3"
          >
            Remove
          </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add Field
      </button>

      <button
        type="submit"
        className=" ml-4 text-white btn bg-[#25476a] border-[#2a5179] hover:text-white hover:bg-[#2a5179] hover:border-[#2a5179] focus:text-white focus:bg-[#2a5179] focus:border-[#2a5179] focus:ring focus:ring-[#2a5179] active:text-white active:bg-[#25476a] active:border-[#25476a] active:ring active:ring-[#2a5179] dark:ring-[#2a5179]"
      >
        Submit
      </button>
    </form>

      </div>
    </React.Fragment>
    // upload doc end
  );
};

export default UploadDocument;



// name description choose file input 


// import React, { useState } from 'react';

// interface FieldData {
//   name: string;
//   description: string;
//   file: File | null;
// }

// const UploadDocument: React.FC = () => {
//   const [fields, setFields] = useState<FieldData[]>([
//     { name: '', description: '', file: null },
//   ]);

//   const handleChange = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFields((prevFields) =>
//       prevFields.map((field, i) =>
//         i === index ? { ...field, [name]: value } : field
//       )
//     );
//   };

//   const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const file = e.target.files[0];
//       setFields((prevFields) =>
//         prevFields.map((field, i) =>
//           i === index ? { ...field, file } : field
//         )
//       );
//     }
//   };

//   const addField = () => {
//     setFields([...fields, { name: '', description: '', file: null }]);
//   };

//   const removeField = (index: number) => {
//     setFields(fields.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form Data:', fields);
//     // Add your submit logic here
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {fields.map((field, index) => (
//         <div key={index} className="border-b pb-4">
//           <h3 className="text-lg font-medium">Field Set {index + 1}</h3>

//           <div className="mt-2">
//             <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id={`name-${index}`}
//               name="name"
//               value={field.name}
//               onChange={(e) => handleChange(index, e)}
//               required
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//           </div>

//           <div className="mt-2">
//             <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               id={`description-${index}`}
//               name="description"
//               value={field.description}
//               onChange={(e) => handleChange(index, e)}
//               required
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//           </div>

//           <div className="mt-2">
//             <label htmlFor={`file-${index}`} className="block text-sm font-medium text-gray-700">
//               Choose File
//             </label>
//             <input
//               type="file"
//               id={`file-${index}`}
//               name="file"
//               onChange={(e) => handleFileChange(index, e)}
//               required
//               className="mt-1"
//             />
//           </div>

//           <button
//             type="button"
//             onClick={() => removeField(index)}
//             className="mt-3 px-3 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={addField}
//         className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//       >
//         Add Field Set
//       </button>

//       <button
//         type="submit"
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default UploadDocument;

// name description choose file input end 






// import React, { useState } from "react";

// interface FileUploadProps {
//   allowedTypes?: string[];
//   maxFileSize?: number; // in MB
// }

// const UploadDocument: React.FC<FileUploadProps> = ({
//   allowedTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"],
//   maxFileSize = 5, // default max size 5MB
// }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [errors, setErrors] = useState<string[]>([]);

//   const validateFile = (file: File) => {
//     const fileType = file.name.split(".").pop()?.toLowerCase();
//     const fileSize = file.size / (1024 * 1024); // Convert bytes to MB
//     const isValidType = allowedTypes.includes(`.${fileType}`);
//     const isValidSize = fileSize <= maxFileSize;

//     if (!isValidType) {
//       return `Invalid file type: ${file.name}. Only ${allowedTypes.join(", ")} are allowed.`;
//     }
//     if (!isValidSize) {
//       return `File too large: ${file.name}. Max size is ${maxFileSize} MB.`;
//     }
//     return null;
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     const validationErrors: string[] = [];

//     const validFiles = selectedFiles.filter((file) => {
//       const error = validateFile(file);
//       if (error) {
//         validationErrors.push(error);
//         return false;
//       }
//       return true;
//     });

//     setFiles([...files, ...validFiles]);
//     setErrors(validationErrors);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     const validationErrors: string[] = [];

//     const validFiles = droppedFiles.filter((file) => {
//       const error = validateFile(file);
//       if (error) {
//         validationErrors.push(error);
//         return false;
//       }
//       return true;
//     });

//     setFiles([...files, ...validFiles]);
//     setErrors(validationErrors);
//     e.dataTransfer.clearData();
//   };

//   const handleRemoveFile = (index: number) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     setFiles(updatedFiles);
//   };

//   return (
//     <div
//       className="flex items-center justify-center h-screen"
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={handleDrop}
//     >
//       <div className="relative w-96 p-6 bg-white rounded-lg border-dashed border-2 border-gray-300 text-center shadow-md">
//         <input
//           type="file"
//           accept={allowedTypes.join(",")}
//           className="hidden"
//           id="fileInput"
//           multiple
//           onChange={handleFileChange}
//         />
//         <label
//           htmlFor="fileInput"
//           className="cursor-pointer flex flex-col items-center justify-center space-y-3"
//         >
//           <svg
//             className="w-16 h-16 text-blue-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M3 16v-6a9 9 0 0118 0v6M16 12l-4 4m0 0l-4-4m4 4V4"
//             ></path>
//           </svg>
//           <span className="text-blue-500 font-bold">Select</span>
//           <p className="text-gray-500">OR DROP FILES HERE</p>
//         </label>

//         {errors.length > 0 && (
//           <div className="mt-4 text-red-500 text-sm">
//             {errors.map((error, index) => (
//               <p key={index}>{error}</p>
//             ))}
//           </div>
//         )}

//         {files.length > 0 && (
//           <div className="mt-4 space-y-2">
//             {files.map((file, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-2 bg-gray-100 rounded"
//               >
//                 <div className="flex items-center space-x-2">
//                   {file.type.startsWith("image/") && (
//                     <img
//                       src={URL.createObjectURL(file)}
//                       alt={file.name}
//                       className="w-10 h-10 object-cover rounded"
//                     />
//                   )}
//                   <span>{file.name}</span>
//                 </div>
//                 <button
//                   onClick={() => handleRemoveFile(index)}
//                   className="text-red-500 text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadDocument;





// validation
// import React, { useState } from "react";

// interface FileUploadProps {
//   allowedTypes?: string[];
//   maxFileSize?: number; // in MB
// }

// const UploadDocument: React.FC<FileUploadProps> = ({
//   allowedTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"],
//   maxFileSize = 5, // Default max size 5MB
// }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [errors, setErrors] = useState<string[]>([]);

//   const validateFile = (file: File): string | null => {
//     const fileType = file.name.split(".").pop()?.toLowerCase();
//     const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
//     const isValidType = allowedTypes.includes(`.${fileType}`);
//     const isValidSize = fileSizeMB <= maxFileSize;

//     if (!isValidType) {
//       return `Invalid file type: ${file.name}. Allowed types are ${allowedTypes.join(", ")}.`;
//     }
//     if (!isValidSize) {
//       return `File too large: ${file.name}. Max size is ${maxFileSize} MB.`;
//     }
//     return null;
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     const newErrors: string[] = [];

//     const validFiles = selectedFiles.filter((file) => {
//       const error = validateFile(file);
//       if (error) {
//         newErrors.push(error);
//         return false;
//       }
//       return true;
//     });

//     setFiles((prevFiles) => [...prevFiles, ...validFiles]);
//     setErrors(newErrors);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     const newErrors: string[] = [];

//     const validFiles = droppedFiles.filter((file) => {
//       const error = validateFile(file);
//       if (error) {
//         newErrors.push(error);
//         return false;
//       }
//       return true;
//     });

//     setFiles((prevFiles) => [...prevFiles, ...validFiles]);
//     setErrors(newErrors);
//     e.dataTransfer.clearData();
//   };

//   const handleRemoveFile = (index: number) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   return (
//     <div
//       className="flex items-center justify-center h-screen"
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={handleDrop}
//     >
//       <div className="relative w-96 p-6 bg-white rounded-lg border-dashed border-2 border-gray-300 text-center shadow-md">
//         <input
//           type="file"
//           accept={allowedTypes.join(",")}
//           className="hidden"
//           id="fileInput"
//           multiple
//           onChange={handleFileChange}
//         />
//         <label
//           htmlFor="fileInput"
//           className="cursor-pointer flex flex-col items-center justify-center space-y-3"
//         >
//           <svg
//             className="w-16 h-16 text-blue-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M3 16v-6a9 9 0 0118 0v6M16 12l-4 4m0 0l-4-4m4 4V4"
//             ></path>
//           </svg>
//           <span className="text-blue-500 font-bold">Select</span>
//           <p className="text-gray-500">OR DROP FILES HERE</p>
//         </label>

//         {errors.length > 0 && (
//           <div className="mt-4 text-red-500 text-sm">
//             {errors.map((error, index) => (
//               <p key={index}>{error}</p>
//             ))}
//           </div>
//         )}

//         {files.length > 0 && (
//           <div className="mt-4 space-y-2">
//             {files.map((file, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-2 bg-gray-100 rounded"
//               >
//                 <div className="flex items-center space-x-2">
//                   {file.type.startsWith("image/") && (
//                     <img
//                       src={URL.createObjectURL(file)}
//                       alt={file.name}
//                       className="w-10 h-10 object-cover rounded"
//                     />
//                   )}
//                   <span>{file.name}</span>
//                 </div>
//                 <button
//                   onClick={() => handleRemoveFile(index)}
//                   className="text-red-500 text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadDocument;

// validation

















// import React, { useState } from "react";
// import axios from "axios";

// const UploadDocument: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [fileType, setFileType] = useState<string>(""); // For selecting file type
//   const [error, setError] = useState<string>("");

//   // Handle file type change
//   const handleFileTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFileType(e.target.value);
//     setSelectedFile(null); // Clear any previously selected file
//     setError("");
//   };

//   // Handle file selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setError("");
//     } else {
//       setSelectedFile(null);
//     }
//   };

//   // Get the accept attribute value based on selected file type
//   const getFileAcceptType = () => {
//     switch (fileType) {
//       case "pdf":
//         return ".pdf";
//       case "word":
//         return ".doc,.docx";
//       case "excel":
//         return ".xls,.xlsx";
//       case "image":
//         return ".jpg,.jpeg,.png";
//       case "rar":
//         return ".rar";
//       default:
//         return ""; // No file type selected
//     }
//   };

//   // Handle file upload
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a valid file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           }
//         },
//       });

//       console.log(response.data.fileUrl); // Handle the successful upload, e.g., show success or file URL
//       setError(""); // Clear error on success
//     } catch (err) {
//       setError("Error uploading the file.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="p-6 border rounded-md shadow-md bg-white w-[500px] h-[450px]">
//         <h2 className="text-lg font-bold mb-4 text-center">Upload Document</h2>

//         {/* Select file type */}
//         <div className="mb-4">
//           <label className="block mb-2">Select File Type:</label>
//           <select
//             value={fileType}
//             onChange={handleFileTypeChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">-- Select File Type --</option>
//             <option value="pdf">PDF</option>
//             <option value="word">Word Docs</option>
//             <option value="excel">Excel</option>
//             <option value="image">Images</option>
//             <option value="rar">RAR Files</option>
//           </select>
//         </div>

//         {/* File input */}
//         {fileType && (
//           <div className="mb-4">
//             <input
//               type="file"
//               onChange={handleFileChange}
//               accept={getFileAcceptType()}
//               className="w-full p-2 border"
//             />
//           </div>
//         )}

//         {selectedFile && (
//           <div className="mb-4 text-center">
//             <p>File: {selectedFile.name}</p>
//           </div>
//         )}

//         {uploadProgress > 0 && <p className="text-center">Uploading: {uploadProgress}%</p>}
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <button
//           onClick={handleUpload}
//           disabled={!fileType || !selectedFile}
//           className={`w-full py-2 px-4 rounded ${
//             !fileType || !selectedFile ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
//           }`}
//         >
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadDocument;


