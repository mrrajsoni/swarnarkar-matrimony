import Layout from '../../Components/Commons/Layout/Layout';
import LoginForm from '../../Components/Users/Login/LoginForm';
import './Login.scss';

const Login = () => {
    return (
        <Layout>
            <section className="login-page py-10">
                Login
                <LoginForm />
            </section>
        </Layout>
    );
};

export default Login;
