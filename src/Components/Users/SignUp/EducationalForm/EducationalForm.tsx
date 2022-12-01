import { Formik, Form, FormikProps } from 'formik';
import { AnnualIncome, EmployedSectors, IndianState } from '../../../../Constants/FormOptions';
import Button from '../../../Commons/Button/Button';
import SelectInput from '../../../Forms/Select/SelectInput';
import * as Yup from 'yup';
import Registration from '../../../../Utils/API/SignUp';
import { IUser, selectValue } from '../../../../Types/GlobalTypes';

export interface IEducationalFormValues {
    state: selectValue;
    city: string;
    degree: string;
    employed_in: selectValue;
    occupation: string;
    annual_income: selectValue;
}
const EducationalFormValues: IEducationalFormValues = {
    state: { label: '', value: '' },
    city: '',
    degree: '',
    employed_in: { label: '', value: '' },
    occupation: '',
    annual_income: { label: '', value: '' },
};

const validationSchema = Yup.object().shape({
    city: Yup.string().required('Required'),
    degree: Yup.string().required('Required'),
    state: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    employed_in: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    occupation: Yup.string().required('Required'),
    annual_income: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
});
const EducationalForm = ({ user }: { user: IUser }) => {
    const updateEducationalInformation = (values: IEducationalFormValues) => {
        void Registration.updateEducationalInfo(values, user.id);
    };
    return (
        <section className="form-section">
            <Formik
                initialValues={EducationalFormValues}
                onSubmit={(values) => {
                    updateEducationalInformation(values);
                }}
                validationSchema={validationSchema}>
                {(props) => (
                    <Form className="registration-form">
                        <LivingInfo props={props} />
                        <EducationInfo props={props} />
                        <Button name="Submit" type="submit" onClick={undefined} />
                    </Form>
                )}
            </Formik>
        </section>
    );
};

const LivingInfo = ({ props }: { props: FormikProps<IEducationalFormValues> }) => {
    return (
        <>
            <SelectInput
                isRequired
                label="State"
                onChange={(data) => props.setFieldValue('state', data)}
                options={IndianState}
                id="state"
                value={props.values.state}
            />
            {props.touched.state && props.errors.state ? (
                <div className="error-container">{props.errors.state.label}</div>
            ) : null}
            <div className="form-container">
                <div>
                    <label className="required" htmlFor="city">
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        onChange={props.handleChange}
                        value={props.values.city}
                        onBlur={props.handleBlur}
                    />
                    {props.touched.city && props.errors.city ? (
                        <div className="error-container">{props.errors.city}</div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

const EducationInfo = ({ props }: { props: FormikProps<IEducationalFormValues> }) => {
    return (
        <>
            <div className="form-container">
                <label className="required" htmlFor="degree">
                    Highest Degree
                </label>
                <input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    id="degree"
                    value={props.values.degree}
                    type="text"
                />
                {props.touched.degree && props.errors.degree ? (
                    <div className="error-container">{props.errors.degree}</div>
                ) : null}
            </div>

            <SelectInput
                label="Employed In"
                isRequired
                onChange={(data) => props.setFieldValue('employed_in', data)}
                options={EmployedSectors}
                id="employed_in"
                value={props.values.employed_in}
            />
            {props.touched.employed_in && props.errors.employed_in ? (
                <div className="error-container">{props.errors.employed_in.label}</div>
            ) : null}

            <div className="form-container">
                <label className="required" htmlFor="occupation">
                    Occupation
                </label>
                <input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    id="occupation"
                    value={props.values.occupation}
                    type="text"
                />
                {props.touched.occupation && props.errors.occupation ? (
                    <div className="error-container">{props.errors.occupation}</div>
                ) : null}
            </div>

            <SelectInput
                onChange={(data) => props.setFieldValue('annual_income', data)}
                options={AnnualIncome}
                id="annual_income"
                value={props.values.annual_income}
                label={'Annual Income'}
                isRequired
            />
            {props.touched.annual_income && props.errors.annual_income ? (
                <div className="error-container">{props.errors.annual_income.label}</div>
            ) : null}
        </>
    );
};

export default EducationalForm;
