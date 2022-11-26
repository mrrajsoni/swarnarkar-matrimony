import { useState } from 'react';
import Layout from '../../Components/Commons/Layout/Layout';
import ProfileField from '../../Components/Commons/ProfileField/ProfileField';
import { useUser } from '../../Context/UserContext';
import {
    IContactDetails,
    IEducationCareerDetails,
    IFamilyDetails,
    IPersonalDetails,
} from '../../Types/GlobalTypes';
import CommonUtils from '../../Utils/API/Common Utils/CommonUtils';
import './EditProfile.scss';
import CareerEducationEditForm from './EditProfileForms/CareerEducationEditForm';
import FamilyEditForm from './EditProfileForms/FamilyEditForm';
import PersonalInfoEditForm from './EditProfileForms/PersonalInfoEditForm';

const initialFormState = {
    showPersonalInfoForm: false,
    showCareerInfoForm: false,
    showFamilyInfoForm: false,
    showHobbyInfoForm: false,
};
const EditProfile = () => {
    const [inEditMode, setInEditMode] = useState(initialFormState);
    const { user } = useUser();
    const personalDetails: IPersonalDetails = {
        id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        height: user?.height,
        self_gotra: user?.self_gotra,
        city: user?.city,
        profile_description: user?.profile_description,
        manglik: user?.manglik,
        dob: user?.dob,
        gender: user?.gender,
        martial_status: user?.martial_status,
        state: user?.state,
        showEditForm: inEditMode.showPersonalInfoForm,
        setShowEditForm: setInEditMode,
    };
    const educationCareerDetails: IEducationCareerDetails = {
        annual_income: user?.annual_income,
        degree: user?.degree,
        employed_in: user?.employed_in,
        occupation: user?.occupation,
        id: user?.id,
        showEditForm: inEditMode.showCareerInfoForm,
        organization_name: user?.organization_name,
        setShowEditForm: setInEditMode,
    };

    const familyDetails: IFamilyDetails = {
        mother_gotra: user?.mother_gotra,
        id: user?.id,
        brothers: user?.brothers,
        sisters: user?.sisters,
        family_status: user?.family_status,
        family_type: user?.family_type,
        father_occupation: user?.father_occupation,
        mother_occupation: user?.mother_occupation,
        showEditForm: inEditMode.showFamilyInfoForm,
        setShowEditForm: setInEditMode,
    };

    const contactDetailsProps: IContactDetails = {
        email_address: user?.email_address,
        mobile_number: user?.mobile_number,
    };

    const onSubmit = (success: boolean) => {
        // eslint-disable-next-line no-debugger
        debugger;
        if (success) {
            setInEditMode(initialFormState);
        }
    };
    return (
        <Layout>
            {user?.id ? (
                <section className="edit-profile-page py-10 ">
                    <div className="edit-profile-inner mx-auto">
                        Login
                        <div className="two-cols flex gap-3">
                            <div className="details-col ">
                                <PersonalDetails props={personalDetails} onSubmit={onSubmit} />
                                <EducationCareerDetails
                                    props={educationCareerDetails}
                                    onSubmit={onSubmit}
                                />
                                <FamilyDetails props={familyDetails} onSubmit={onSubmit} />
                            </div>
                            <div className="flex-1">
                                <ContactDetails props={contactDetailsProps} />
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </Layout>
    );
};

const ProfileDetailTitle = ({ title, onClick }: { title: string; onClick: () => void }) => {
    return (
        <div className="details-title flex justify-between">
            {title}
            <div onClick={onClick} className="cursor-pointer">
                Edit
            </div>
        </div>
    );
};

const PersonalDetails = ({
    props,
    onSubmit,
}: {
    props: IPersonalDetails;
    onSubmit: (success: boolean) => void;
}) => {
    const {
        city,
        first_name,
        height,
        last_name,
        self_gotra,
        profile_description,
        manglik,
        dob,
        gender,
        martial_status,
        setShowEditForm,
        showEditForm,
        state,
        id,
    } = props;

    const age = CommonUtils.getAge(dob);
    const formattedDob = CommonUtils.getFormattedDob(dob);
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showPersonalInfoForm: value,
            };
        });
    };

    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <h4 className="name-label">
                        <span>Full Name - </span> {first_name} {last_name}
                        <span className="age">
                            &nbsp;({age}Y {gender.label})
                        </span>
                    </h4>
                    <div className="mb-6">{profile_description}</div>
                    <ProfileDetailTitle
                        title="Basic Details"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <ul>
                        <ProfileField label="Date of Birth" field={formattedDob} />
                        <ProfileField label="Height" field={height.label} />
                        <ProfileField label="Marital Status" field={martial_status.label} />
                        <ProfileField label="Gotra" field={self_gotra.label} />
                        <ProfileField label="City" field={city} />
                        <ProfileField label="State" field={state.label} />
                        <ProfileField label="Manglik" field={manglik ? 'Yes' : 'No'} />
                    </ul>
                </>
            ) : (
                <PersonalInfoEditForm
                    onCancel={handleEditFormVisibility}
                    onSubmit={onSubmit}
                    initialValues={props}
                    userId={id}
                />
            )}
        </div>
    );
};

const EducationCareerDetails = ({
    props,
    onSubmit,
}: {
    props: IEducationCareerDetails;
    onSubmit: (value: boolean) => void;
}) => {
    const {
        annual_income,
        degree,
        employed_in,
        occupation,
        setShowEditForm,
        showEditForm,
        id,
        organization_name,
    } = props;
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showCareerInfoForm: value,
            };
        });
    };

    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Education & Career"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <ul>
                        <ProfileField label="Annual Income" field={annual_income.label} />
                        <ProfileField label="Degree" field={degree} />
                        <ProfileField label="Employed In" field={employed_in.label} />
                        <ProfileField label="Occupation" field={occupation} />
                        <ProfileField
                            label="Organization Name"
                            field={
                                organization_name !== '' && organization_name
                                    ? organization_name
                                    : 'Not filled in'
                            }
                        />
                    </ul>
                </>
            ) : (
                <CareerEducationEditForm
                    initialValues={props}
                    onCancel={handleEditFormVisibility}
                    userId={id}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

const FamilyDetails = ({
    props,
    onSubmit,
}: {
    props: IFamilyDetails;
    onSubmit: (value: boolean) => void;
}) => {
    const {
        mother_gotra,
        setShowEditForm,
        showEditForm,
        brothers,
        family_status,
        family_type,
        father_occupation,
        id,
        mother_occupation,
        sisters,
    } = props;

    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showFamilyInfoForm: value,
            };
        });
    };
    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Family"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <ul>
                        <ProfileField label="Mother's Gotra" field={mother_gotra.label} />
                        <ProfileField
                            label="Mother's Occupation"
                            field={
                                mother_occupation?.label !== '' && mother_occupation?.label
                                    ? mother_occupation.label
                                    : 'Not filled in'
                            }
                        />
                        <ProfileField
                            label="Father's Occupation"
                            field={
                                father_occupation?.label !== '' && father_occupation?.label
                                    ? father_occupation.label
                                    : 'Not filled in'
                            }
                        />
                        <ProfileField
                            label="No. of Brothers"
                            field={
                                brothers?.label !== '' && brothers?.label
                                    ? brothers.label
                                    : 'Not filled in'
                            }
                        />
                        <ProfileField
                            label="No. of Sisters"
                            field={
                                sisters?.label !== '' && sisters?.label
                                    ? sisters.label
                                    : 'Not filled in'
                            }
                        />
                        <ProfileField
                            label="Family Type"
                            field={
                                family_type?.label !== '' && family_type?.label
                                    ? family_type.label
                                    : 'Not filled in'
                            }
                        />
                        <ProfileField
                            label="Family Status"
                            field={
                                family_status?.label !== '' && family_status?.label
                                    ? family_status.label
                                    : 'Not filled in'
                            }
                        />
                    </ul>
                </>
            ) : (
                <FamilyEditForm
                    initialValues={props}
                    onSubmit={onSubmit}
                    onCancel={handleEditFormVisibility}
                    userId={id}
                />
            )}
        </div>
    );
};

const ContactDetails = ({ props }: { props: IContactDetails }) => {
    const { email_address, mobile_number } = props;
    return (
        <div className="details-container contact-details-container p-5 bg-white sticky top-1">
            <ProfileDetailTitle title="Contact Details" onClick={undefined} />
            <ul>
                <ProfileField label="Email Address" field={email_address} />
                <ProfileField label="Mobile Number" field={mobile_number} />
            </ul>
        </div>
    );
};

export default EditProfile;
