import { EmployedSectors } from '../../../Constants/FormOptions';
import { IChildFiltersProps } from '../../../Types/GlobalTypes';
import MultiCheckbox from '../../Forms/MultiCheckbox/MultiCheckbox';
import Accordion from '../Accordion/Accordion';

const OccupationFilter = ({ onFilterChange }: IChildFiltersProps) => {
    return (
        <Accordion
            tabTitle={'Employed In'}
            content={
                <MultiCheckbox
                    onChange={onFilterChange}
                    name="occupation-filter"
                    options={EmployedSectors}
                />
            }
        />
    );
};

export default OccupationFilter;
