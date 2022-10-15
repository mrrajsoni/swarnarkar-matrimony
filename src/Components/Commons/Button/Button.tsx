export interface IButtonProps {
    name: string;
    onClick: () => void;
    theme?: string;
}
const Button = (props: IButtonProps) => {
    const { name, onClick, theme } = props;
    return (
        <div className={`button-wrapper ${theme}`}>
            <button onClick={onClick} title={name}>
                {name}
            </button>
        </div>
    );
};

export default Button;
