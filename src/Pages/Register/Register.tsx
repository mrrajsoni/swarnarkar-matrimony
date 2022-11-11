import Layout from '../../Components/Commons/Layout/Layout';
import SignUpForm from '../../Components/Users/SignUp/SignUpForm';

const Register = () => {
    return (
        <Layout>
            <section className="register-page py-10">
                <div className="register-section-inner">
                    Register
                    <SignUpForm />
                </div>
            </section>
        </Layout>
    );
};

export default Register;
