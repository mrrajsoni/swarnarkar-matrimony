import { Form, Formik, FormikProps } from 'formik';
import Button from '../../../Commons/Button/Button';
import SelectInput from '../../Select/SelectInput';
import { IDesiredPartnerDetails, selectValue } from '../../../../Types/GlobalTypes';
import * as Yup from 'yup';
import Registration from '../../../../Services/API/SignUp';
import {
    DrinkingSmoking,
    Marital_Status,
    Height,
    AgeNumbers,
    PartnerIncome,
    EmployedSectors,
} from '../../../../Constants/FormOptions';
import CustomTextarea from '../../TextArea/CustomTextarea';

const validationSchema = Yup.object().shape({
    partner_description: Yup.string().min(200, 'Please write minimum 150 characters').nullable(),
    partner_age: Yup.object({
        from: Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        }).nullable(),
        to: Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        }).nullable(),
    }).nullable(),
    partner_height: Yup.object({
        from: Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        }).nullable(),
        to: Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        }).nullable(),
    }).nullable(),
    partner_income: Yup.object({
        from: Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        }).nullable(),
        to: Yup.object({
            label: Yup.string(),
            value: Yup.string(),
        }).nullable(),
    }).nullable(),
    partner_occupation: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    partner_smoke: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    partner_drink: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    partner_marital_status: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
});

const DesiredPartnerEditForm = ({
    initialValues,
    onSubmit,
    onCancel,
    userId,
}: {
    initialValues: IDesiredPartnerDetails;
    onSubmit: (value: boolean) => void;
    onCancel: (value: boolean) => void;
    userId: string;
}) => {
    const handleSubmit = (values: IDesiredPartnerDetails) => {
        const updatedValues = Object.keys(initialValues).reduce((acc, key) => {
            if (initialValues[key] !== values[key]) {
                acc = {
                    ...acc,
                    [key]: values[key],
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
                    <Form className="registration-form desired-partner-form">
                        <PartnerInfo props={props} />
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

const PartnerInfo = ({ props }: { props: FormikProps<IDesiredPartnerDetails> }) => {
    return (
        <>
            <CustomTextarea
                props={{
                    className: 'block',
                    placeHolder: 'Write about expectation from your desired partner and his family',
                    id: 'partner_description',
                    label: 'Expected Partner Summary',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    value: props.values.partner_description,
                    isRequired: false,
                    name: 'partner_description',
                    error: props.errors.partner_description,
                    fieldTouched: props.touched.partner_description,
                }}
            />

            <PartnerAgeField
                gender={props.values.gender}
                partner_age={props.values.partner_age}
                setFieldValue={props.setFieldValue}
                error={props.errors.gender.label}
                fieldTouched={props.touched.gender.label}
            />

            <PartnerHeightField
                partner_height={props.values.partner_height}
                setFieldValue={props.setFieldValue}
                error={props.errors.partner_height.from.label}
                fieldTouched={props.touched.partner_height.from.label}
            />

            <PartnerIncomeField
                partner_income={props.values.partner_income}
                setFieldValue={props.setFieldValue}
                error={props.errors.gender.label}
                fieldTouched={props.touched.gender.label}
            />

            <SelectInput
                isRequired={false}
                label="Occupation"
                name="partner_occupation"
                onChange={(selectedOption) => {
                    props.setFieldValue('partner_occupation', selectedOption);
                }}
                id="partner_occupation"
                options={EmployedSectors}
                value={props.values.partner_occupation}
                error={props.errors.partner_occupation.label}
                fieldTouched={props.touched.partner_occupation.label}
            />

            <SelectInput
                isRequired={false}
                label="Smoke"
                name="partner_smoke"
                onChange={(selectedOption) => {
                    props.setFieldValue('partner_smoke', selectedOption);
                }}
                id="partner_smoke"
                options={DrinkingSmoking}
                value={props.values.partner_smoke}
                error={props.errors.partner_smoke.label}
                fieldTouched={props.touched.partner_smoke.label}
            />

            <SelectInput
                isRequired={false}
                label="Drink"
                name="partner_drink"
                onChange={(selectedOption) => {
                    props.setFieldValue('partner_drink', selectedOption);
                }}
                id="partner_drink"
                options={DrinkingSmoking}
                value={props.values.partner_drink}
                error={props.errors.partner_drink.label}
                fieldTouched={props.touched.partner_drink.label}
            />
            <SelectInput
                isRequired={false}
                label="Marital Status"
                name="partner_marital_status"
                onChange={(selectedOption) => {
                    props.setFieldValue('partner_marital_status', selectedOption);
                }}
                id="partner_marital_status"
                options={Marital_Status}
                value={props.values.partner_marital_status}
                error={props.errors.partner_marital_status.label}
                fieldTouched={props.touched.partner_marital_status.label}
            />
        </>
    );
};

const PartnerAgeField = ({
    gender,
    partner_age,
    setFieldValue,
    error,
    fieldTouched,
}: {
    gender: selectValue;
    partner_age: {
        to: selectValue;
        from: selectValue;
    };
    setFieldValue: (field: string, value: selectValue, shouldValidate?: boolean) => void;
    error: string;
    fieldTouched: boolean;
}) => {
    const startingAge =
        gender?.value === 'female' ? AgeNumbers.slice(3, AgeNumbers?.length - 1) : AgeNumbers;
    const selectedStartingAge = startingAge.findIndex(
        (value) => value.value === partner_age?.from?.value,
    );
    const endAge = selectedStartingAge
        ? AgeNumbers.slice(selectedStartingAge + 1, AgeNumbers?.length - 1)
        : startingAge;

    const partnerAgeFields = [
        {
            id: 'partner_age',
            value: partner_age.from,
            option: startingAge,
            key: 'from',
            fieldValue: 'partner_age.from',
        },
        {
            id: 'partner_age',
            value: partner_age.to,
            option: endAge,
            key: 'to',
            fieldValue: 'partner_age.to',
        },
    ];

    return (
        <div className="two-col-fields-container">
            <label>Age</label>
            <div className="two-col-fields-inner">
                {partnerAgeFields.map((ageField) => (
                    <SelectInput
                        key={ageField.key}
                        isRequired={false}
                        label=""
                        name={ageField.id}
                        onChange={(selectedOption) => {
                            setFieldValue(ageField.fieldValue, selectedOption);
                        }}
                        id={ageField.id}
                        options={ageField.option}
                        value={ageField.value}
                        error={error}
                        fieldTouched={fieldTouched}
                    />
                ))}
            </div>
        </div>
    );
};

const PartnerHeightField = ({
    partner_height,
    setFieldValue,
    error,
    fieldTouched,
}: {
    partner_height: {
        to: selectValue;
        from: selectValue;
    };
    setFieldValue: (field: string, value: selectValue, shouldValidate?: boolean) => void;
    error: string;
    fieldTouched: boolean;
}) => {
    const selectedStartingHeight = Height.findIndex(
        (value) => value.value === partner_height?.from?.value,
    );
    const endHeight = selectedStartingHeight
        ? Height.slice(selectedStartingHeight + 1, Height?.length - 1)
        : Height;

    const partnerHeightFields = [
        {
            id: 'partner_height',
            value: partner_height.from,
            option: Height,
            key: 'from',
            fieldValue: 'partner_height.from',
        },
        {
            id: 'partner_height',
            value: partner_height.to,
            option: endHeight,
            key: 'to',
            fieldValue: 'partner_height.to',
        },
    ];

    return (
        <div className="two-col-fields-container">
            <label>Height</label>
            <div className="two-col-fields-inner">
                {partnerHeightFields.map((height) => (
                    <SelectInput
                        key={height.key}
                        isRequired={false}
                        label=""
                        name={height.id}
                        onChange={(selectedOption) => {
                            setFieldValue(height.fieldValue, selectedOption);
                        }}
                        id={height.id}
                        options={height.option}
                        value={height.value}
                        error={error}
                        fieldTouched={fieldTouched}
                    />
                ))}
            </div>
        </div>
    );
};

const PartnerIncomeField = ({
    partner_income,
    setFieldValue,
    error,
    fieldTouched,
}: {
    partner_income: {
        to: selectValue;
        from: selectValue;
    };
    setFieldValue: (field: string, value: selectValue, shouldValidate?: boolean) => void;
    error: string;
    fieldTouched: boolean;
}) => {
    const startPartnerIncome = PartnerIncome.slice(0, PartnerIncome.length - 1);
    const selectedStartingIncome = startPartnerIncome.findIndex(
        (value) => value.value === partner_income?.from?.value,
    );
    const endPartnerIncome = selectedStartingIncome
        ? PartnerIncome.slice(selectedStartingIncome + 1, PartnerIncome?.length)
        : startPartnerIncome;

    const partnerIncomeFields = [
        {
            id: 'partner_income',
            value: partner_income.from,
            option: startPartnerIncome,
            fieldValue: 'partner_income.from',
            key: 'from',
            defaultValue: PartnerIncome[1],
        },
        {
            id: 'partner_income',
            value: partner_income.to,
            option: endPartnerIncome,
            fieldValue: 'partner_income.to',
            key: 'to',
            defaultValue: PartnerIncome[PartnerIncome.length - 1],
        },
    ];

    return (
        <div className="two-col-fields-container">
            <label>Income</label>
            <div className="two-col-fields-inner">
                {partnerIncomeFields.map((income) => (
                    <SelectInput
                        key={income.key}
                        isRequired={false}
                        label=""
                        name={income.id}
                        onChange={(selectedOption) => {
                            setFieldValue(income.fieldValue, selectedOption);
                        }}
                        id={income.id}
                        options={income.option}
                        value={income.value}
                        defaultValue={income.defaultValue}
                        error={error}
                        fieldTouched={fieldTouched}
                    />
                ))}
            </div>
        </div>
    );
};
export default DesiredPartnerEditForm;
