import { useEffect, useState } from 'react';
import Layout from '../../Components/Commons/Layout/Layout';
import EducationalForm from '../../Components/Users/SignUp/EducationalForm/EducationalForm';
import FamilyForm from '../../Components/Users/SignUp/FamilyForm/FamilyForm';
import PersonalInfoForm from '../../Components/Users/SignUp/PersonalInfoForm/PersonalInfoForm';
import SignUpForm from '../../Components/Users/SignUp/SignUpForm';
import { useUser } from '../../Context/UserContext';
import FetchUser from '../../Utils/API/FetchUser';

const Register = () => {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (user) {
            void FetchUser.getUserData(user.id).then((response) => {
                setUserDetails(response);
            });
        }
    }, [user?.id]);
    const showPersonalInfoForm: boolean = userDetails && userDetails[0]?.second_stage;
    const showEducationalForm: boolean = userDetails && userDetails[0]?.third_stage;
    const showFamilyForm: boolean = userDetails && userDetails[0]?.last_stage;
    return (
        <Layout>
            <section className="register-page py-10">
                <div className="register-section-inner">
                    Register
                    {!user && <SignUpForm />}
                    {showPersonalInfoForm && <PersonalInfoForm user={user} />}
                    {showEducationalForm && <EducationalForm user={user} />}
                    {showFamilyForm && <FamilyForm user={user} />}
                </div>
            </section>
        </Layout>
    );
};

export default Register;
