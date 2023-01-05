import { Marital_Status } from '../../../Constants/FormOptions';
import { IChildFiltersProps } from '../../../Types/GlobalTypes';
import MultiCheckbox from '../../Forms/MultiCheckbox/MultiCheckbox';

const MaritalStatusFilter = ({ onFilterChange }: IChildFiltersProps) => {
    return (
        <div>
            <h6>Marital Status</h6>
            <MultiCheckbox
                onChange={onFilterChange}
                name="occupation-filter"
                options={Marital_Status}
            />
        </div>
    );
};

export default MaritalStatusFilter;
