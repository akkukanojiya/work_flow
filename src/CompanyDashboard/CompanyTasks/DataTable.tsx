// import React from 'react';

// interface FormData {
//   type: string;
//   field1?: string;
//   field2?: string;
//   fieldA?: string;
//   fieldB?: string;
//   fieldX?: string;
//   fieldY?: string;
// }

// interface SubmittedDataTableProps {
//   formData: { [key: string]: FormData };
// }

// const FormTable: React.FC<SubmittedDataTableProps> = ({ formData }) => {
//   return (
//     <div>
//       <h3>Form 1 Data</h3>
//       {formData['Form 1'] && (
//         <table>
//           <thead>
//             <tr>
//               <th>Form Type</th>
//               <th>Field 1</th>
//               <th>Field 2</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{formData['Form 1'].type}</td>
//               <td>{formData['Form 1'].field1 ?? 'N/A'}</td>
//               <td>{formData['Form 1'].field2 ?? 'N/A'}</td>
//             </tr>
//           </tbody>
//         </table>
//       )}

//       <h3>Form 2 Data</h3>
//       {formData['Form 2'] && (
//         <table>
//           <thead>
//             <tr>
//               <th>Form Type</th>
//               <th>Field A</th>
//               <th>Field B</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{formData['Form 2'].type}</td>
//               <td>{formData['Form 2'].fieldA ?? 'N/A'}</td>
//               <td>{formData['Form 2'].fieldB ?? 'N/A'}</td>
//             </tr>
//           </tbody>
//         </table>
//       )}

//       <h3>Form 3 Data</h3>
//       {formData['Form 3'] && (
//         <table>
//           <thead>
//             <tr>
//               <th>Form Type</th>
//               <th>Field X</th>
//               <th>Field Y</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{formData['Form 3'].type}</td>
//               <td>{formData['Form 3'].fieldX ?? 'N/A'}</td>
//               <td>{formData['Form 3'].fieldY ?? 'N/A'}</td>
//             </tr>
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default FormTable;
