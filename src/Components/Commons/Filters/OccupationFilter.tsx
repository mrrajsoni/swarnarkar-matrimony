import { EmployedSectors } from '../../../Constants/FormOptions';
import { IChildFiltersProps } from '../../../Types/GlobalTypes';
import MultiCheckbox from '../../Forms/MultiCheckbox/MultiCheckbox';

const OccupationFilter = ({ onFilterChange }: IChildFiltersProps) => {
    return (
        <div>
            <h6>Employed In</h6>
            <MultiCheckbox
                onChange={onFilterChange}
                name="occupation-filter"
                options={EmployedSectors}
            />
        </div>
    );
};

export default OccupationFilter;
