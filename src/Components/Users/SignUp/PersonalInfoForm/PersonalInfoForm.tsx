import { Formik, FormikProps, Form } from 'formik';
import { Gender, Height, Marital_Status } from '../../../../Constants/FormOptions';
import Button from '../../../Commons/Button/Button';
import SelectInput from '../../../Forms/Select/SelectInput';
import * as Yup from 'yup';
import Registration from '../../../../Services/API/SignUp';
import { IUser, selectValue } from '../../../../Types/GlobalTypes';

export interface IUserPersonalData {
    first_name: string;
    last_name: string;
    dob: string;
    gender: selectValue;
    height: selectValue;
    religion: string;
    caste: string;
    manglik: string;
    martial_status: selectValue;
}

const PersonalInfoFormIntialValues: IUserPersonalData = {
    first_name: '',
    last_name: '',
    dob: '',
    gender: { label: '', value: '' },
    height: { label: '', value: '' },
    religion: 'Hindu',
    caste: 'Maidh Kshatriya Sonar',
    manglik: 'Yes',
    martial_status: { label: '', value: '' },
};

const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('Required')
        .matches(/^[a-zA-Z]+$/, 'Must be only alphabets'),
    last_name: Yup.string()
        .required('Required')
        .matches(/^[a-zA-Z]+$/, 'Must be only alphabets'),
    dob: Yup.string().required('Required'),
    gender: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    height: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    manglik: Yup.string(),
    martial_status: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
});
const PersonalInfoForm = ({ user }: { user: IUser }) => {
    const updateUserInformation = (values: IUserPersonalData) => {
        void Registration.updatePersonalInfo(values, user.id);
    };
    return (
        <section className="form-section">
            <Formik
                initialValues={PersonalInfoFormIntialValues}
                onSubmit={(values) => {
                    updateUserInformation(values);
                }}
                validationSchema={validationSchema}>
                {(props) => (
                    <Form className="registration-form">
                        <BasicInfo props={props} />
                        <ReligionInfo props={props} />
                        <Button name="Submit" type="submit" onClick={undefined} />
                    </Form>
                )}
            </Formik>
        </section>
    );
};

const BasicInfo = ({ props }: { props: FormikProps<IUserPersonalData> }) => {
    return (
        <>
            <div className="form-container">
                <div className="two-cols">
                    <div>
                        <div>
                            <label className="required" htmlFor="first_name">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                type="text"
                                onChange={props.handleChange}
                                value={props.values.first_name}
                                onBlur={props.handleBlur}
                            />
                        </div>

                        {props.touched.first_name && props.errors.first_name ? (
                            <div className="error-container">{props.errors.first_name}</div>
                        ) : null}
                    </div>
                    <div>
                        <div>
                            <label className="required" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                type="text"
                                onChange={props.handleChange}
                                value={props.values.last_name}
                                onBlur={props.handleBlur}
                            />
                        </div>

                        {props.touched.last_name && props.errors.last_name ? (
                            <div className="error-container">{props.errors.last_name}</div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="form-container">
                <div>
                    <label className="required" htmlFor="dob">
                        Date of Birth
                    </label>
                    <input
                        min={'1996-04-12'}
                        id="dob"
                        type="date"
                        onChange={props.handleChange}
                        value={props.values.dob}
                        onBlur={props.handleBlur}
                    />
                </div>

                {props.touched.dob && props.errors.dob ? (
                    <div className="error-container">{props.errors.dob}</div>
                ) : null}
            </div>

            <SelectInput
                label="Gender"
                isRequired={true}
                name="gender"
                onChange={(selectedOption) => {
                    props.setFieldValue('gender', selectedOption);
                }}
                id="gender"
                options={Gender}
                value={props.values.gender}
                fieldTouched={props.touched.gender?.label}
                error={props.errors.gender?.label}
            />
        </>
    );
};

const ReligionInfo = ({ props }: { props: FormikProps<IUserPersonalData> }) => {
    return (
        <>
            <div className="form-container">
                <div>
                    <label className="required" htmlFor="religion">
                        Religion
                    </label>
                    <input id="religion" disabled type="text" value={props.values.religion} />
                </div>
            </div>
            <div className="form-container">
                <label className="required" htmlFor="caste">
                    Caste
                </label>
                <input id="caste" disabled type="text" value={props.values.caste} />
            </div>
            <div className="form-container">
                <label className="required">Are you Manglik?</label>
                <label>
                    <input id="manglik" name="manglik" type="radio" defaultChecked />
                    Yes
                </label>
                <label>
                    <input id="manglik" name="manglik" type="radio" />
                    No
                </label>
            </div>

            <SelectInput
                onChange={(selectedOption) => {
                    props.setFieldValue('martial_status', selectedOption);
                }}
                id="martial_status"
                name="martial_status"
                options={Marital_Status}
                value={props.values.martial_status}
                label="Marital Status"
                isRequired={true}
                fieldTouched={props.touched.martial_status.label}
                error={props.errors.martial_status.label}
            />

            <SelectInput
                label="Height"
                isRequired={true}
                name="height"
                onChange={(selectedOption) => {
                    props.setFieldValue('height', selectedOption);
                }}
                id="height"
                options={Height}
                value={props.values.height}
                fieldTouched={props.touched.height.label}
                error={props.errors.height.label}
            />
        </>
    );
};

export default PersonalInfoForm;
