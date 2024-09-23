import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  onChange: (selectedOption: Option | null) => void;
}

const SearchableSubSelect: React.FC<SearchableSelectProps> = ({ options, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="border border-gray-300 p-2 rounded cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOption ? selectedOption.label : 'Select Sub Services'}
      </div>
      {isDropdownOpen && (
        <div className="absolute mt-1 border border-gray-300 rounded bg-white shadow-lg w-full">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.map(option => (
              <li
                key={option.value}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="p-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSubSelect;
