import Select, { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import { selectValue } from '../../../Types/GlobalTypes';

export interface ISelectInput {
    options: OptionsOrGroups<unknown, GroupBase<unknown>>;
    id: string;
    value: selectValue;
    label: string;
    name?: string;
    onChange?: (data: selectValue) => void;
    defaultValue?: selectValue;
    placeHolder?: string;
    disabled?: boolean;
    isRequired?: boolean;
}

const SelectInput = (props: ISelectInput) => {
    const {
        options,
        id,
        onChange,
        name,
        defaultValue,
        value,
        placeHolder,
        disabled,
        label,
        isRequired,
    } = props;
    const customStyles: StylesConfig = {
        option: (base, state) => ({
            ...base,
            padding: 15,
            '&:hover': {
                background: '#ffafcc',
                color: 'white',
            },
            backgroundColor: state.isSelected ? '#ffafcc' : '',
        }),
        control: (base, state) => ({
            ...base,
            border: '1px solid #d9d9d9',
            boxShadow: state.menuIsOpen ? '0px 3px 15px rgb(0 0 0 / 20%)' : 'none',
            '&:hover': {
                border: '1px solid #d9d9d9',
            },
            padding: 3.5,
        }),
    };
    return (
        <div className="form-container">
            <div className="input-container">
                <label className={`${isRequired ? 'required' : 'label'}`} htmlFor={id}>
                    {label}
                </label>
                <Select
                    className="react-select-container"
                    id={id}
                    defaultValue={defaultValue}
                    name={name}
                    onChange={onChange}
                    options={options}
                    styles={customStyles}
                    value={value}
                    isSearchable
                    placeholder={placeHolder}
                    isDisabled={disabled}
                />
            </div>
        </div>
    );
};

export default SelectInput;
