import { useState } from 'react';

interface IMultiCheckboxProps {
    options: {
        label: string;
        value: string;
    }[];
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const MultiCheckbox = ({ options, name, onChange }: IMultiCheckboxProps) => {
    const [checkedState, setCheckedState] = useState<boolean[]>(
        new Array(options.length).fill(false),
    );

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item,
        );
        setCheckedState(updatedCheckedState);
        onChange(event);
    };
    return (
        <ul>
            {options.map((option, index) => (
                <li className="flex gap-2" key={`${option.label}-${index}`}>
                    <input
                        id={`${option.label}-${index}`}
                        checked={checkedState[index]}
                        type="checkbox"
                        name={name}
                        value={option.value}
                        onChange={(ev) => handleOnChange(ev, index)}
                    />
                    <label htmlFor={`${option.label}-${index}`}>{option.label}</label>
                </li>
            ))}
        </ul>
    );
};

export default MultiCheckbox;
