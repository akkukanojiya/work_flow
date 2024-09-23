// import React, { useState } from 'react';
// // import FormTable from './FormTable'; // Import the new FormTable component
// import FormTable from 'CompanyDashboard/CompanyTasks/DataTable';
// const options = [
//   { value: 'form1', label: 'Form 1' },
//   { value: 'form2', label: 'Form 2' },
//   { value: 'form3', label: 'Form 3' },
// ];

// const Form1 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
//   const [field1, setField1] = useState('');
//   const [field2, setField2] = useState('');

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     onSubmit({ type: 'Form 1', field1, field2 });
//     setField1('');
//     setField2('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <table>
//         <tbody>
//           <tr>
//             <td><label htmlFor="field1">Field 1</label></td>
//             <td><input type="text" id="field1" value={field1} onChange={(e) => setField1(e.target.value)} /></td>
//           </tr>
//           <tr>
//             <td><label htmlFor="field2">Field 2</label></td>
//             <td><input type="text" id="field2" value={field2} onChange={(e) => setField2(e.target.value)} /></td>
//           </tr>
//           <tr>
//             <td colSpan={2}><button type="submit">Submit Form 1</button></td>
//           </tr>
//         </tbody>
//       </table>
//     </form>
//   );
// };

// const Form2 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
//   const [fieldA, setFieldA] = useState('');
//   const [fieldB, setFieldB] = useState('');

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     onSubmit({ type: 'Form 2', fieldA, fieldB });
//     setFieldA('');
//     setFieldB('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <table>
//         <tbody>
//           <tr>
//             <td><label htmlFor="fieldA">Field A</label></td>
//             <td><input type="text" id="fieldA" value={fieldA} onChange={(e) => setFieldA(e.target.value)} /></td>
//           </tr>
//           <tr>
//             <td><label htmlFor="fieldB">Field B</label></td>
//             <td><input type="text" id="fieldB" value={fieldB} onChange={(e) => setFieldB(e.target.value)} /></td>
//           </tr>
//           <tr>
//             <td colSpan={2}><button type="submit">Submit Form 2</button></td>
//           </tr>
//         </tbody>
//       </table>
//     </form>
//   );
// };

// const Form3 = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
//   const [fieldX, setFieldX] = useState('');
//   const [fieldY, setFieldY] = useState('');

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     onSubmit({ type: 'Form 3', fieldX, fieldY });
//     setFieldX('');
//     setFieldY('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <table>
//         <tbody>
//           <tr>
//             <td><label htmlFor="fieldX">Field X</label></td>
//             <td><input type="text" id="fieldX" value={fieldX} onChange={(e) => setFieldX(e.target.value)} /></td>
//           </tr>
//           <tr>
//             <td><label htmlFor="fieldY">Field Y</label></td>
//             <td><input type="text" id="fieldY" value={fieldY} onChange={(e) => setFieldY(e.target.value)} /></td>
//           </tr>
//           <tr>
//             <td colSpan={2}><button type="submit">Submit Form 3</button></td>
//           </tr>
//         </tbody>
//       </table>
//     </form>
//   );
// };

// const MultiFormDemo: React.FC = () => {
//   const [selectedForm, setSelectedForm] = useState<string>('form1');
//   const [formData, setFormData] = useState<{ [key: string]: any }>({});

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedForm(event.target.value);
//   };

//   const handleFormSubmit = (data: any) => {
//     setFormData(prevData => ({ ...prevData, [data.type]: data }));
//     setSelectedForm('form1');
//   };

//   return (
//     <div>
//       <table>
//         <tbody>
//           <tr>
//             <td><label htmlFor="formSelector">Select a form:</label></td>
//             <td>
//               <select id="formSelector" onChange={handleChange} value={selectedForm}>
//                 {options.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {selectedForm === 'form1' && <Form1 onSubmit={handleFormSubmit} />}
//       {selectedForm === 'form2' && <Form2 onSubmit={handleFormSubmit} />}
//       {selectedForm === 'form3' && <Form3 onSubmit={handleFormSubmit} />}

//       <h2>Submitted Forms</h2>
//       <FormTable formData={formData} /> {/* Use the new FormTable component */}
//     </div>
//   );
// };

// export default MultiFormDemo;
