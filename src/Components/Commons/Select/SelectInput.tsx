import Select, { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';

export interface ISelectInput {
    options: OptionsOrGroups<unknown, GroupBase<unknown>>;
    id: string;
    value: selectValue;
    name?: string;
    onChange?: (data: selectValue) => void;
    defaultValue?: selectValue;
    placeHolder?: string;
}

export interface selectValue {
    label: string;
    value: string;
}
const SelectInput = (props: ISelectInput) => {
    const { options, id, onChange, name, defaultValue, value, placeHolder } = props;
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
        />
    );
};

export default SelectInput;
