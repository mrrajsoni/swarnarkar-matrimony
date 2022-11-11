import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import './SignUpForm.scss';
import { useState } from 'react';
import Registration, { userData } from '../../../Utils/API/SignUp';
import Button from '../../Commons/Button/Button';
export interface FormIntialValues {
    email: string;
    password: string;
    mobile: string;
}
const SignupSchema = Yup.object().shape({
    mobile: Yup.string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required()
        .min(8, 'Must be 8 characters or more')
        .matches(/[a-z]+/, 'Must add one lowercase character')
        .matches(/[A-Z]+/, 'Must add one uppercase character')
        .matches(/[@$!%*#?&]+/, 'Must add one special character')
        .matches(/\d+/, 'Must add one number'),
});

const SignUpForm = () => {
    return (
        <section className="form-section">
            <UserSignUpForm />
        </section>
    );
};
const UserSignUpForm = () => {
    const handleUserData = (userdata: userData, email: string) => {
        void Registration.initialSignUp(userdata, email);
    };

    const [showPasswordField, setShowPasswordField] = useState(false);

    const changePasswordVisibility = () => {
        setShowPasswordField((prevState) => !prevState);
    };
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                mobile: '',
            }}
            onSubmit={(values) => {
                handleUserData(values, values.email);
            }}
            validationSchema={SignupSchema}>
            {(props) => (
                <Form className="registration-form">
                    <MobileInput props={props} />
                    <EmailInput props={props} />
                    <PasswordInput
                        showPasswordField={showPasswordField}
                        props={props}
                        onPasswordVisibilityChange={changePasswordVisibility}
                    />
                    <Button name="Submit" onClick={undefined} />
                </Form>
            )}
        </Formik>
    );
};

const EmailInput = ({ props }: { props: FormikProps<FormIntialValues> }) => {
    return (
        <div className="form-container">
            <div>
                <div>
                    <label className="required" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={props.handleChange}
                        value={props.values.email}
                        onBlur={props.handleBlur}
                    />
                </div>

                {props.touched.email && props.errors.email ? (
                    <div className="error-container">{props.errors.email}</div>
                ) : null}
            </div>
        </div>
    );
};

const MobileInput = ({ props }: { props: FormikProps<FormIntialValues> }) => {
    return (
        <div className="form-container">
            <div>
                <label className="required" htmlFor="mobile">
                    Mobile
                </label>
                <div className="mobile-input-container flex">
                    <input
                        className="disabled-input"
                        type="text"
                        name="mobile-prefix"
                        value="+91"
                        disabled
                    />
                    <input
                        className="mobile-input"
                        id="mobile"
                        name="mobile"
                        type="tel"
                        maxLength={10}
                        minLength={10}
                        onChange={props.handleChange}
                        value={props.values.mobile}
                        onBlur={props.handleBlur}
                    />
                </div>
            </div>
            {props.errors || props.touched.mobile ? (
                <div className="error-container">{props.errors.mobile}</div>
            ) : null}
        </div>
    );
};

const PasswordInput = ({
    props,
    showPasswordField,
    onPasswordVisibilityChange,
}: {
    props: FormikProps<FormIntialValues>;
    showPasswordField: boolean;
    onPasswordVisibilityChange: () => void;
}) => {
    return (
        <div className="form-container">
            <div>
                <div>
                    <label className="required" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        {showPasswordField ? (
                            <input
                                id="password"
                                name="password"
                                type="text"
                                onChange={props.handleChange}
                                value={props.values.password}
                                onBlur={props.handleBlur}
                            />
                        ) : (
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={props.handleChange}
                                value={props.values.password}
                                onBlur={props.handleBlur}
                            />
                        )}
                        <img
                            onClick={onPasswordVisibilityChange}
                            className="eye-icon absolute"
                            src="https://res.cloudinary.com/rajsoni/image/upload/v1666615487/eye_ge3ubz.png"
                            alt="show-password"
                        />
                    </div>
                </div>

                {props.errors.password && props.touched.password ? (
                    <div className="error-container">{props.errors.password}</div>
                ) : null}
            </div>
        </div>
    );
};

export default SignUpForm;
