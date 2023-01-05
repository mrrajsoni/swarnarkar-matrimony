import { Marital_Status } from '../../../Constants/FormOptions';
import { IChildFiltersProps } from '../../../Types/GlobalTypes';
import MultiCheckbox from '../../Forms/MultiCheckbox/MultiCheckbox';
import Accordion from '../Accordion/Accordion';

const MaritalStatusFilter = ({ onFilterChange }: IChildFiltersProps) => {
    return (
        <Accordion
            tabTitle={'Marital Status'}
            content={
                <MultiCheckbox
                    onChange={onFilterChange}
                    name="occupation-filter"
                    options={Marital_Status}
                />
            }
        />
    );
};

export default MaritalStatusFilter;
