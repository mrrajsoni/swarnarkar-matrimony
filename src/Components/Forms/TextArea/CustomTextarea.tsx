interface ICustomTextarea {
    label: string;
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
    isRequired?: boolean;
    name?: string;
    subLabel?: string;
}
const CustomTextarea = ({ props }: { props: ICustomTextarea }) => {
    const { label, onBlur, onChange, value, isRequired, id, name, subLabel } = props;
    return (
        <div className="form-container">
            <div className="input-container">
                <label className={`${isRequired ? 'required' : 'label'}`} htmlFor={id}>
                    {label}
                </label>
                {subLabel ? (
                    <p className="sub-label">
                        Please don&lsquo;t put your social media handles, or something meaningless
                    </p>
                ) : null}
                <textarea
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    rows={4}
                    id={id}
                    name={name}
                />
            </div>
        </div>
    );
};

export default CustomTextarea;
