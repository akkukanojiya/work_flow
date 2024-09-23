import { useState, useRef } from "react";
import ReactSelect, { components, InputAction } from "react-select";
 
export type Option = {
  value: number | string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  value: Option[];
  onChange: (selected: Option[]) => void;
  isSelectAll?: boolean;
  components?: any;
  menuPlacement?: "auto" | "bottom" | "top";
}

const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  const [selectInput, setSelectInput] = useState<string>("");
  const isAllSelected = useRef<boolean>(false);
  const selectAllLabel = useRef<string>("Select all");
  const allOption: Option = { value: "*", label: selectAllLabel.current };

  const filterOptions = (options: Option[], input: string) =>
    options?.filter(({ label }) =>
      label.toLowerCase().includes(input.toLowerCase())
    );

  const comparator = (v1: Option, v2: Option) =>
    (v1.value as number) - (v2.value as number);

  let filteredOptions = filterOptions(props.options, selectInput);
  let filteredSelectedOptions = filterOptions(props.value, selectInput);

  const Option = (optionProps: any) => (
    <components.Option {...optionProps}>
      {optionProps.value === "*" &&
      !isAllSelected.current &&
      filteredSelectedOptions?.length > 0 ? (
        <input
          key={optionProps.value}
          type="checkbox"
          ref={(input) => {
            if (input) input.indeterminate = true;
          }}
        />
      ) : (
        <input
          key={optionProps.value}
          type="checkbox"
          checked={optionProps.isSelected || isAllSelected.current}
          onChange={() => {}}
        />
      )}
      <label style={{ marginLeft: "5px" }}>{optionProps.label}</label>
    </components.Option>
  );

  const Input = (inputProps: any) => (
    <>
      {selectInput.length === 0 ? (
        <components.Input autoFocus={inputProps.selectProps.menuIsOpen} {...inputProps}>
          {inputProps.children}
        </components.Input>
      ) : (
        <div style={{ border: "1px dotted gray" }}>
          <components.Input autoFocus={inputProps.selectProps.menuIsOpen} {...inputProps}>
            {inputProps.children}
          </components.Input>
        </div>
      )}
    </>
  );

  const customFilterOption = ({ value, label }: Option, input: string) =>
    (value !== "*" && label.toLowerCase().includes(input.toLowerCase())) ||
    (value === "*" && filteredOptions?.length > 0);

  const onInputChange = (
    inputValue: string,
    event: { action: InputAction }
  ) => {
    if (event.action === "input-change") setSelectInput(inputValue);
    else if (event.action === "menu-close" && selectInput !== "")
      setSelectInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.key === " " || e.key === "Enter") && !selectInput)
      e.preventDefault();
  };

  const handleChange = (selected: Option[]) => {
    if (
      selected.length > 0 &&
      !isAllSelected.current &&
      (selected[selected.length - 1].value === allOption.value ||
        JSON.stringify(filteredOptions) ===
          JSON.stringify(selected.sort(comparator)))
    )
      return props.onChange(
        [
          ...(props.value ?? []),
          ...props.options.filter(
            ({ label }) =>
              label.toLowerCase().includes(selectInput?.toLowerCase()) &&
              (props.value ?? []).filter((opt) => opt.label === label)
                .length === 0
          ),
        ].sort(comparator)
      );
    else if (
      selected.length > 0 &&
      selected[selected.length - 1].value !== allOption.value &&
      JSON.stringify(selected.sort(comparator)) !==
        JSON.stringify(filteredOptions)
    )
      return props.onChange(selected);
    else
      return props.onChange([
        ...props.value?.filter(
          ({ label }) =>
            !label.toLowerCase().includes(selectInput?.toLowerCase())
        ),
      ]);
  };

  const customStyles = {
    multiValueLabel: (def: any) => ({
      ...def,
      backgroundColor: "lightgray",
    }),
    multiValueRemove: (def: any) => ({
      ...def,
      backgroundColor: "lightgray",
    }),
    valueContainer: (base: any) => ({
      ...base,
      maxHeight: "65px",
      overflow: "auto",
    }),
    option: (styles: any, { isSelected, isFocused }: any) => {
      return {
        ...styles,
        backgroundColor:
          isSelected && !isFocused
            ? null
            : isFocused && !isSelected
            ? styles.backgroundColor
            : isFocused && isSelected
            ? "#DEEBFF"
            : null,
        color: isSelected ? null : null,
      };
    },
    menu: (def: any) => ({ ...def, zIndex: 9999 }),
  };

  if (props.isSelectAll && props.options.length !== 0) {
    isAllSelected.current =
      JSON.stringify(filteredSelectedOptions) ===
      JSON.stringify(filteredOptions);

    if (filteredSelectedOptions?.length > 0) {
      if (filteredSelectedOptions?.length === filteredOptions?.length)
        selectAllLabel.current = `All (${filteredOptions.length}) selected`;
      else
        selectAllLabel.current = `${filteredSelectedOptions?.length} / ${filteredOptions.length} selected`;
    } else selectAllLabel.current = "Select all";

    allOption.label = selectAllLabel.current;

    return (
      <ReactSelect
        {...props}
        inputValue={selectInput}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        options={[allOption, ...props.options]}
        onChange={handleChange}
        components={{
          Option: Option,
          Input: Input,
          ...props.components,
        }}
        filterOption={customFilterOption}
        menuPlacement={props.menuPlacement ?? "auto"}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        backspaceRemovesValue={false}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
      />
    );
  }

  return (
    <ReactSelect
      {...props}
      inputValue={selectInput}
      onInputChange={onInputChange}
      filterOption={customFilterOption}
      components={{
        Input: Input,
        ...props.components,
      }}
      menuPlacement={props.menuPlacement ?? "auto"}
      onKeyDown={onKeyDown}
      tabSelectsValue={false}
      hideSelectedOptions={true}
      backspaceRemovesValue={false}
      blurInputOnSelect={true}
    />
  );
};

export default MultiSelect;
