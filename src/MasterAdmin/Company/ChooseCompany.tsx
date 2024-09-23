import React, { useState } from 'react';

const ChooseCompany: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('techcreature');
  const [dynamicInputs, setDynamicInputs] = useState<string[]>(['']); // Initial state with one empty field

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...dynamicInputs];
    updatedInputs[index] = value;
    setDynamicInputs(updatedInputs);
  };

  const addField = () => {
    setDynamicInputs([...dynamicInputs, '']);
  };

  const removeField = (index: number) => {
    const updatedInputs = dynamicInputs.filter((_, i) => i !== index);
    setDynamicInputs(updatedInputs);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Selected Option:', selectedOption);
    console.log('Dynamic Inputs:', dynamicInputs);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Welcom To OffiQuick</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="options" className="block text-sm font-medium text-gray-700">Choose Company:</label>
          <select
            id="options"
            value={selectedOption}
            onChange={handleSelectChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="techcreature">Techcreature</option>
            <option value="skyweb">Skyweb</option>
            <option value="tatasky">Tatasky</option>
          </select>
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Add manual Company:</label>
          {dynamicInputs.map((input, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-600 bg-white rounded-md shadow-sm text-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addField}
            className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-600 bg-white rounded-md shadow-sm text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Add Field
          </button>
        </div> */}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChooseCompany;
