import ManglikFilter from './ManglikFilter';
import MaritalStatusFilter from './MaritalStatusFilter';
import OccupationFilter from './OccupationFilter';
import './Filters.scss';

interface IFilterProps {
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Filters = ({ onFilterChange }: IFilterProps) => {
    return (
        <div className="filters-wrapper">
            <OccupationFilter onFilterChange={onFilterChange} />
            <ManglikFilter onFilterChange={onFilterChange} />
            <MaritalStatusFilter onFilterChange={onFilterChange} />
        </div>
    );
};

export default Filters;
