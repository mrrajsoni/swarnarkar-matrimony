import { IChildFiltersProps } from '../../../Types/GlobalTypes';
import MultiCheckbox from '../../Forms/MultiCheckbox/MultiCheckbox';
import Accordion from '../Accordion/Accordion';

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
        <Accordion
            tabTitle={'Manglik'}
            content={
                <MultiCheckbox
                    name="occupation-filter"
                    options={ManglikCheckboxOptions}
                    onChange={onFilterChange}
                />
            }
        />
    );
};

export default ManglikFilter;
