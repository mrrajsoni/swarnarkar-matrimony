import { Form, Formik, FormikProps } from 'formik';
import Button from '../../../Commons/Button/Button';
import CustomInput from '../../Input/CustomInput';
import SelectInput from '../../Select/SelectInput';
import { IEducationCareerDetails } from '../../../../Types/GlobalTypes';
import * as Yup from 'yup';
import Registration from '../../../../Services/API/SignUp';
import { AnnualIncome, EmployedSectors } from '../../../../Constants/FormOptions';

const validationSchema = Yup.object().shape({
    degree: Yup.string().required('Required'),
    employed_in: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    occupation: Yup.string().required('Required'),
    annual_income: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    organization_name: Yup.string(),
});

const CareerEducationEditForm = ({
    initialValues,
    onSubmit,
    onCancel,
    userId,
}: {
    initialValues: IEducationCareerDetails;
    onSubmit: (value: boolean) => void;
    onCancel: (value: boolean) => void;
    userId: string;
}) => {
    const handleSubmit = (values: IEducationCareerDetails) => {
        const updatedValues = Object.keys(initialValues).reduce((acc, key) => {
            if (initialValues[key] !== values[key]) {
                acc = {
                    ...acc,
                    [key]: values[key] === '' ? null : values[key],
                };
            }
            return acc;
        }, {});
        void Registration.editProfileUpdate(updatedValues, userId);
        onSubmit(true);
    };
    return (
        <section className="edit-form-section">
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
                validationSchema={validationSchema}>
                {(props) => (
                    <Form className="registration-form">
                        <EducationalInfo props={props} />
                        <CareerInfo props={props} />
                        <div className="flex gap-4 justify-center">
                            <Button name="Submit" type="submit" onClick={undefined} />
                            <Button name="Cancel" onClick={() => onCancel(false)} />
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
};

const EducationalInfo = ({ props }: { props: FormikProps<IEducationCareerDetails> }) => {
    return (
        <>
            <CustomInput
                props={{
                    id: 'degree',
                    label: 'Degree',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    type: 'text',
                    value: props.values.degree,
                    error: props.errors.degree,
                    fieldTouched: props.touched.degree,
                }}
            />
        </>
    );
};

const CareerInfo = ({ props }: { props: FormikProps<IEducationCareerDetails> }) => {
    return (
        <>
            <SelectInput
                isRequired={false}
                label="Employed In"
                name="employed_in"
                onChange={(selectedOption) => {
                    props.setFieldValue('employed_in', selectedOption);
                }}
                id="employed_in"
                options={EmployedSectors}
                value={props.values.employed_in}
            />

            {props.touched.employed_in && props.errors.employed_in ? (
                <div className="error-container">{props.errors.employed_in.label}</div>
            ) : null}

            <SelectInput
                isRequired={false}
                label="Annual Income"
                name="annual_income"
                onChange={(selectedOption) => {
                    props.setFieldValue('annual_income', selectedOption);
                }}
                id="annual_income"
                options={AnnualIncome}
                value={props.values.annual_income}
            />

            {props.touched.annual_income && props.errors.annual_income ? (
                <div className="error-container">{props.errors.annual_income.label}</div>
            ) : null}
            <CustomInput
                props={{
                    id: 'organization_name',
                    label: 'Organization Name',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    type: 'text',
                    value: props.values.organization_name,
                    error: props.errors.organization_name,
                    fieldTouched: props.touched.organization_name,
                }}
            />
        </>
    );
};

export default CareerEducationEditForm;
