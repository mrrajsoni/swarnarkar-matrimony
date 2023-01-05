import { GridLoader } from 'react-spinners';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <GridLoader color="#fe46ae" />
        </div>
    );
};

export default LoadingSpinner;
