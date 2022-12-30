export interface ITitleProps {
    title: string;
    className?: string;
    showUnderline?: boolean;
}
const Title = ({ props }: { props: ITitleProps }) => {
    const { title, className, showUnderline } = props;

    return (
        <h2 className={`title-heading ${className ? className : ''}`}>
            <span className={showUnderline ? 'tapered-underline' : ''}>{title}</span>
        </h2>
    );
};

export default Title;
