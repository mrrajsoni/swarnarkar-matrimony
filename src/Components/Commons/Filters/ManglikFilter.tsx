import { IChildFiltersProps } from '../../../Types/GlobalTypes';
import MultiCheckbox from '../../Forms/MultiCheckbox/MultiCheckbox';

const ManglikCheckboxOptions = [
    {
        label: 'Manglik',
        value: 'manglik',
    },
    {
        label: 'Non-Manglik',
        value: 'non-manglik',
    },
];
const ManglikFilter = ({ onFilterChange }: IChildFiltersProps) => {
    return (
        <div>
            <h6>Manglik</h6>
            <MultiCheckbox
                name="occupation-filter"
                options={ManglikCheckboxOptions}
                onChange={onFilterChange}
            />
        </div>
    );
};

export default ManglikFilter;
