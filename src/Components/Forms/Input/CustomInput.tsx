import InputErrors from '../InputErrors';

interface ICustomInput {
    label: string;
    type: string;
    name?: string;
    id: string;
    value: string;
    onBlur: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
    onChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void;
    };
    fieldTouched: boolean;
    error: string;
    minValue?: string;
    isRequired?: boolean;
}
const CustomInput = ({ props }: { props: ICustomInput }) => {
    const {
        id,
        label,
        name,
        onBlur,
        onChange,
        type,
        value,
        minValue,
        isRequired,
        fieldTouched,
        error,
    } = props;
    return (
        <div className={`form-container`}>
            <div className={`input-container`}>
                <label className={`${isRequired ? 'required' : 'label'}`} htmlFor={id}>
                    {label}
                </label>
                <input
                    min={minValue}
                    id={id}
                    type={type}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    name={name}
                />
                <InputErrors error={error} fieldTouched={fieldTouched} />
            </div>
        </div>
    );
};

export default CustomInput;
