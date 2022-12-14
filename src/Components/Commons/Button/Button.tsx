export interface IButtonProps {
    name: string;
    onClick: () => void;
    theme?: string;
    type?: 'button' | 'submit' | 'reset';
}
const Button = (props: IButtonProps) => {
    const { name, onClick, theme, type } = props;
    return (
        <div className={`button-wrapper ${theme}`}>
            <button type={type ?? 'button'} onClick={onClick} title={name}>
                {name}
            </button>
        </div>
    );
};

export default Button;
