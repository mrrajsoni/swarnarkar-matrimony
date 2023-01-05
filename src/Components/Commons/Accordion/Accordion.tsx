import { useState } from 'react';
import './Accordion.scss';
import { ReactComponent as DownArrow } from './../../../Assets/Svg/down-arrow.svg';

interface IAccordionProps {
    tabTitle: string;
    content: JSX.Element;
}
const Accordion = ({ tabTitle, content }: IAccordionProps) => {
    const [toggleOpen, setToggleOpen] = useState(false);

    const onToggleContent = () => {
        setToggleOpen((prevState) => !prevState);
    };

    return (
        <div className="accordion-container">
            <span className="accordion-title" onClick={onToggleContent}>
                {tabTitle}
                <DownArrow className={`${toggleOpen ? 'icon-invert' : 'down'} down-arrow`} />
            </span>
            <div className={`${toggleOpen ? 'isOpen' : 'isClosed'} accordion-content-container`}>
                <div className={`accordion-content`}>{content}</div>
            </div>
        </div>
    );
};

export default Accordion;
