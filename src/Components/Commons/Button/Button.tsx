export interface IButtonProps {
    name: string;
    onClick: () => void;
    theme?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}
const Button = (props: IButtonProps) => {
    const { name, onClick, theme, type, disabled, className } = props;
    return (
        <div className={`button-wrapper ${theme} ${className}`}>
            <button disabled={disabled} type={type ?? 'button'} onClick={onClick} title={name}>
                {name}
            </button>
        </div>
    );
};

export default Button;
