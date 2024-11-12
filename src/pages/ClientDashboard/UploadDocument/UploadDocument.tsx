// import React, { useState } from "react";
// import axios from "axios";


import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import Dropzone, { FileRejection } from "react-dropzone"
import { UploadCloud } from "lucide-react";




interface FilePreview {
  name: string;
  preview: string;
  formattedSize: string;
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



  const [description, setDescription] = useState('');
  // upload doc 
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png'
  ];

  const handleAcceptedFiles = (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      formattedSize: `${(file.size / 1024).toFixed(2)} KB`,
    }));
    setSelectedFiles((prevFiles: any) => [...prevFiles, ...validFiles]);
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };
  // upload doc end

  return (
    // <div className="flex justify-start items-center min-h-56 bg-gray-100 pt-10">
    //   <div className="p-6 border rounded-md shadow-lg bg-white w-[600px]">
    //     <h2 className="text-lg font-bold mb-4 text-center">Upload Documents</h2>
    //     <input
    //       type="file"
    //       onChange={handleFileChange}
    //       accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
    //       className="mb-4 w-full"
    //       multiple
    //     />
    //     {selectedFiles.length > 0 && (
    //       <div className="mb-4 text-center">
    //         {selectedFiles.map((file, index) => (
    //           <p key={index}>File: {file.name}</p>
    //         ))}
    //       </div>
    //     )}
    //     {uploadProgress.length > 0 && (
    //       <p className="text-center">
    //         Uploading: {uploadProgress[uploadProgress.length - 1]}%
    //       </p>
    //     )}
    //     {error && <p className="text-red-500 text-center">{error}</p>}
    //     <textarea
    //       placeholder="Enter description (optional)"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       className="w-full p-2 mb-4 border rounded"
    //       rows={3}
    //     />
    //     <button
    //       onClick={handleUpload}
    //       className="bg-[#25476a] text-white w-full py-2 px-4 rounded hover:bg-[#2a5179]"
    //     >
    //       Upload
    //     </button>
    //   </div>
    // </div>



    // upload doc 
    <React.Fragment>
      <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
        <BreadCrumb title="File Upload" pageTitle="Forms" />
        <div className="card">
          <div className="card-body">
          <div className="mb-4">
          <label htmlFor="description" className="mb-4 text-15">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Enter a description for your files"
            className="w-full px-3 py-2 border rounded-md text-slate-700 bg-slate-50 border-slate-200 dark:bg-zink-600 dark:border-zink-500 dark:text-zink-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
            <h6 className="mb-4 text-15">Dropzone</h6>
            <div className="flex items-center justify-center border rounded-md cursor-pointer bg-slate-100 dropzone border-slate-200 dark:bg-zink-600 dark:border-zink-500 dz-clickable">


           
              <Dropzone
                onDrop={(acceptedFiles: File[], _fileRejections: FileRejection[]) => handleAcceptedFiles(acceptedFiles)}
                accept={allowedFileTypes.join(',')}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    className="w-full py-5 text-lg text-center dz-message needsclick"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="mb-3">
                      <UploadCloud className="block size-12 mx-auto text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500" />
                    </div>
                    <h5 className="mb-0 font-normal text-slate-500 text-15">
                      Drag and drop your files or <a href="#!">browse</a> your files
                    </h5>
                  </div>
                )}
              </Dropzone>
            </div>

            <ul className="mb-0" id="dropzone-preview">
              {selectedFiles.map((file, index) => (
                <li className="mt-2" id="dropzone-preview-list" key={`${index}-file`}>
                  <div className="border rounded border-slate-200 dark:border-zink-500">
                    <div className="flex p-2">
                      <div className="shrink-0 me-3">
                        <div className="p-2 rounded-md size-14 bg-slate-100 dark:bg-zink-600">
                          <img data-dz-thumbnail className="block w-full h-full rounded-md" src={file.preview} alt={file.name} />
                        </div>
                      </div>
                      <div className="grow">
                        <div className="pt-1">
                          <h5 className="mb-1 text-15" data-dz-name>{file.name}</h5>
                          <p className="mb-0 text-slate-500 dark:text-zink-200" data-dz-size>{file.formattedSize}</p>
                        </div>
                      </div>
                      <div className="shrink-0 ms-3">
                        <button
                          data-dz-remove
                          className="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20"
                          onClick={() => handleDeleteFile(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
    // upload doc end
  );
};

export default UploadDocument;








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


