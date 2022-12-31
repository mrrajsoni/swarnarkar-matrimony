import { Link } from 'react-router-dom';

const RegistrationPrompt = () => {
    return (
        <>
            <div>Please create your profile in order to view detailed profile of other members</div>
            <div>
                <span className="register-link cursor-pointer">
                    <Link to="/register">Register for Free</Link>
                </span>
            </div>
        </>
    );
};

export default RegistrationPrompt;
