import { useEffect, useState } from 'react';
import Layout from '../../Components/Commons/Layout/Layout';
import EducationalForm from '../../Components/Users/SignUp/EducationalForm/EducationalForm';
import FamilyForm from '../../Components/Users/SignUp/FamilyForm/FamilyForm';
import PersonalInfoForm from '../../Components/Users/SignUp/PersonalInfoForm/PersonalInfoForm';
import SignUpForm from '../../Components/Users/SignUp/SignUpForm';
import { useUser } from '../../Context/UserContext';
import { ReactComponent as One } from '../../Assets/Svg/number-one.svg';
import { ReactComponent as Two } from '../../Assets/Svg/number-two.svg';
import { ReactComponent as Three } from '../../Assets/Svg/number-three.svg';
import { ReactComponent as Four } from '../../Assets/Svg/number-four.svg';
import { ReactComponent as Tick } from '../../Assets/Svg/tick.svg';
import classNames from 'classnames';
import { IStepCompleteStatus, IUser } from '../../Types/GlobalTypes';
import FetchUser from '../../Services/API/FetchUser';

const IntialStepStatus = {
    one: false,
    two: false,
    three: false,
    four: false,
};
const Register = ({ userId }: { userId: string }) => {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState<IUser>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [stepCompleteStatus, setStepCompleteStatus] = useState(IntialStepStatus);
    const [formUpdated, setFormUpdated] = useState(false);

    useEffect(() => {
        if (userId) {
            void FetchUser.getFullUserData(userId).then((value) => {
                if (!value.error) {
                    setUserDetails(value.data);
                }
            });
        }
    }, [userId, formUpdated]);

    const onFormUpdate = (value: boolean) => {
        setFormUpdated(value);
    };

    const showPersonalInfoForm: boolean = userDetails && userDetails?.second_stage;
    const showEducationalForm: boolean = userDetails && userDetails?.third_stage;
    const showFamilyForm: boolean = userDetails && userDetails?.last_stage;

    const updateStepNumber = (stepNumber: number) => {
        setCurrentStep(stepNumber);
        if (currentStep === 3) {
            setStepCompleteStatus(() => {
                return {
                    one: true,
                    two: true,
                    three: true,
                    four: true,
                };
            });
        }
    };
    useEffect(() => {
        if (showPersonalInfoForm && currentStep !== 2) {
            updateStepNumber(2);
            setStepCompleteStatus((prevState) => {
                return {
                    ...prevState,
                    one: true,
                };
            });
        } else if (showEducationalForm && currentStep !== 3) {
            updateStepNumber(3);
            setStepCompleteStatus((prevState) => {
                return {
                    ...prevState,
                    one: true,
                    two: true,
                };
            });
        } else if (showFamilyForm && currentStep !== 4) {
            updateStepNumber(4);
            setStepCompleteStatus((prevState) => {
                return {
                    ...prevState,
                    one: true,
                    two: true,
                    three: true,
                };
            });
        }
    }, [currentStep, userDetails]);
    return (
        <Layout className="registration-page-main">
            <section className="register-page">
                <div className="register-section-inner flex">
                    <div className="form-steps-section">
                        <FormSteps
                            showEducationalForm={showEducationalForm}
                            currentStep={currentStep}
                            showFamilyForm={showFamilyForm}
                            showPersonalInfoForm={showPersonalInfoForm}
                            stepCompleteStatus={stepCompleteStatus}
                        />
                    </div>
                    <div className="registration-form-section">
                        {stepCompleteStatus.four || userDetails?.registration_completed ? (
                            <RegistrationComplete />
                        ) : (
                            <div>
                                {!user && <SignUpForm />}
                                {showPersonalInfoForm && (
                                    <PersonalInfoForm onFormUpdate={onFormUpdate} user={user} />
                                )}
                                {showEducationalForm && (
                                    <EducationalForm onFormUpdate={onFormUpdate} user={user} />
                                )}
                                {showFamilyForm && (
                                    <FamilyForm onFormUpdate={onFormUpdate} user={user} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

const FormSteps = ({
    currentStep,
    showPersonalInfoForm,
    showEducationalForm,
    showFamilyForm,
    stepCompleteStatus,
}: {
    currentStep: number;
    showPersonalInfoForm: boolean;
    showEducationalForm: boolean;
    showFamilyForm: boolean;
    stepCompleteStatus: IStepCompleteStatus;
}) => {
    const classNamesForOne = classNames({
        completed: stepCompleteStatus.one,
    });

    const classNamesForTwo = classNames({
        disabled: !showPersonalInfoForm,
        'active-step': currentStep === 2,
        completed: stepCompleteStatus.two,
    });
    const classNamesForThree = classNames({
        disabled: !showEducationalForm,
        'active-step': currentStep === 3,
        completed: stepCompleteStatus.three,
    });

    const classNamesForFour = classNames({
        disabled: !showFamilyForm,
        'active-step': currentStep === 4,
        completed: stepCompleteStatus.four,
    });

    return (
        <div className="steps-container flex gap-6 flex-col h-full">
            <div
                className={`${
                    currentStep === 1 ? 'active-step' : 'inactive-step'
                } one-step ${classNamesForOne}`}>
                <div className="svg-wrapper">{stepCompleteStatus.one ? <Tick /> : <One />}</div>
                <h4>Create your free account</h4>
            </div>
            <div className={`${classNamesForTwo} two-step`}>
                <div className="svg-wrapper">{stepCompleteStatus.two ? <Tick /> : <Two />}</div>
                <h4>Basic details</h4>
            </div>
            <div className={`${classNamesForThree} three-step`}>
                <div className="svg-wrapper">{stepCompleteStatus.three ? <Tick /> : <Three />}</div>
                <h4>Educational & Occupation</h4>
            </div>
            <div className={`${classNamesForFour} four-step`}>
                <div className="svg-wrapper">{stepCompleteStatus.four ? <Tick /> : <Four />}</div>
                <h4>Final step</h4>
            </div>
        </div>
    );
};

const RegistrationComplete = () => {
    return (
        <div className="registration-success-message text-center">
            Your registration is successfully compleleted. Please visit your profile from the top
            right corner and complete the other important fields.
        </div>
    );
};

export default Register;
