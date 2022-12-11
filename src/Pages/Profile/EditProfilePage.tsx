import { useState } from 'react';
import Layout from '../../Components/Commons/Layout/Layout';
import ProfileField from '../../Components/Commons/ProfileField/ProfileField';
import { useUser } from '../../Context/UserContext';
import {
    IContactDetails,
    IDesiredPartnerDetails,
    IEducationCareerDetails,
    IFamilyDetails,
    ILifestyleDetails,
    IPersonalDetails,
    IProfileDataArray,
    IProfileImageDetails,
} from '../../Types/GlobalTypes';
import CommonUtils from '../../Utils/Common Utils/CommonUtils';
import './EditProfile.scss';
import CareerEducationEditForm from '../../Components/Forms/Profile/EditProfileForms/CareerEducationEditForm';
import DesiredPartnerEditForm from '../../Components/Forms/Profile/EditProfileForms/DesiredPartnerEditForm';
import FamilyEditForm from '../../Components/Forms/Profile/EditProfileForms/FamilyEditForm';
import ImageEditForm from '../../Components/Forms/Profile/EditProfileForms/ImageEditForm';
import LifestyleEditForm from '../../Components/Forms/Profile/EditProfileForms/LifestyleEditForm';
import PersonalInfoEditForm from '../../Components/Forms/Profile/EditProfileForms/PersonalInfoEditForm';
import UserImages from '../../Components/Users/Profile/UserImages';
import ProfileDetailsBox from '../../Components/Users/Profile/ProfileDetailsBox';
import ProfileUtils from '../../Utils/Profile/ProfileUtils';

const initialFormState = {
    showPersonalInfoForm: false,
    showCareerInfoForm: false,
    showFamilyInfoForm: false,
    showLifestyleForm: false,
    showDesiredPartnerForm: false,
    showProfileImageForm: false,
};

export type setShowEditFormType = React.Dispatch<
    React.SetStateAction<{
        showPersonalInfoForm: boolean;
        showCareerInfoForm: boolean;
        showFamilyInfoForm: boolean;
        showLifestyleForm: boolean;
        showDesiredPartnerForm: boolean;
        showProfileImageForm: boolean;
    }>
>;

export interface IFormVisibilityProps {
    showEditForm: boolean;
    setShowEditForm: setShowEditFormType;
}

const EditProfile = () => {
    const [inEditMode, setInEditMode] = useState(initialFormState);
    const { user } = useUser();

    const personalDetails: IPersonalDetails = {
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
    };
    const educationCareerDetails: IEducationCareerDetails = {
        annual_income: user?.annual_income,
        degree: user?.degree,
        employed_in: user?.employed_in,
        occupation: user?.occupation,
        organization_name: user?.organization_name,
    };

    const familyDetails: IFamilyDetails = {
        mother_gotra: user?.mother_gotra,
        brothers: user?.brothers,
        sisters: user?.sisters,
        family_status: user?.family_status,
        family_type: user?.family_type,
        father_occupation: user?.father_occupation,
        mother_occupation: user?.mother_occupation,
    };

    const contactDetailsProps: IContactDetails = {
        email_address: user?.email_address,
        mobile_number: user?.mobile_number,
    };

    const lifestyleDetailsProps: ILifestyleDetails = {
        dietary_habit: user?.dietary_habit,
        drinking_habit: user?.drinking_habit,
        smoking_habit: user?.smoking_habit,
        own_car: user?.own_car,
        handicapped: user?.handicapped,
        nature_handicap: user?.nature_handicap,
        own_house: user?.own_house,
    };

    const desiredPartnerDetailsProps: IDesiredPartnerDetails = {
        partner_description: user?.partner_description,
        partner_age: {
            from: user?.partner_age?.from,
            to: user?.partner_age?.to,
        },
        partner_height: {
            from: user?.partner_height?.from,
            to: user?.partner_height?.to,
        },
        partner_income: {
            from: user?.partner_income?.from,
            to: user?.partner_height?.to,
        },
        partner_occupation: user?.partner_occupation,
        partner_smoke: user?.partner_smoke,
        partner_drink: user?.partner_drink,
        partner_marital_status: user?.own_house,
        gender: user?.gender,
    };

    const profileImageProps: IProfileImageDetails = {
        user_images: user?.user_images,
        setShowEditForm: setInEditMode,
        showEditForm: inEditMode.showProfileImageForm,
        id: user?.id,
    };

    const onSubmit = (success: boolean) => {
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
                                <ProfileImages props={profileImageProps} onSubmit={onSubmit} />
                                <PersonalDetails
                                    userId={user?.id}
                                    props={personalDetails}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showCareerInfoForm,
                                    }}
                                />
                                <EducationCareerDetails
                                    userId={user?.id}
                                    props={educationCareerDetails}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showCareerInfoForm,
                                    }}
                                />
                                <FamilyDetails
                                    userId={user?.id}
                                    props={familyDetails}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showCareerInfoForm,
                                    }}
                                />
                                <LifestyleDetails
                                    userId={user?.id}
                                    props={lifestyleDetailsProps}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showCareerInfoForm,
                                    }}
                                />
                                <DesiredPartnerDetails
                                    userId={user?.id}
                                    props={desiredPartnerDetailsProps}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showCareerInfoForm,
                                    }}
                                />
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

const ProfileImages = ({
    props,
    onSubmit,
}: {
    props: IProfileImageDetails;
    onSubmit: (success: boolean) => void;
}) => {
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showProfileImageForm: value,
            };
        });
    };
    const { user_images, setShowEditForm, showEditForm, id } = props;
    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Basic Details"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <UserImages userId={id} />
                </>
            ) : (
                <ImageEditForm
                    userImageNames={user_images}
                    onCancel={handleEditFormVisibility}
                    onSubmit={onSubmit}
                    userId={id}
                />
            )}
        </div>
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
    formProps,
    userId,
}: {
    props: IPersonalDetails;
    onSubmit: (success: boolean) => void;
    formProps: IFormVisibilityProps;
    userId: string;
}) => {
    const { first_name, last_name, profile_description, dob, gender } = props;
    const { setShowEditForm, showEditForm } = formProps;
    const age = CommonUtils.getAge(dob);
    const formattedDob = CommonUtils.getFormattedDob(dob);
    const profileDataArray = ProfileUtils.convertPersonalDetailsObj(props, formattedDob);

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
                    <ProfileDetailsBox
                        profileData={profileDataArray}
                        profileDetailTitle="Basic Details"
                        showEditButton={true}
                        onEditClick={() => handleEditFormVisibility(true)}
                    />
                </>
            ) : (
                <PersonalInfoEditForm
                    onCancel={handleEditFormVisibility}
                    onSubmit={onSubmit}
                    initialValues={props}
                    userId={userId}
                />
            )}
        </div>
    );
};

const EducationCareerDetails = ({
    props,
    onSubmit,
    formProps,
    userId,
}: {
    props: IEducationCareerDetails;
    onSubmit: (value: boolean) => void;
    formProps: IFormVisibilityProps;
    userId: string;
}) => {
    const { setShowEditForm, showEditForm } = formProps;
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showCareerInfoForm: value,
            };
        });
    };
    const profileDataArray = ProfileUtils.convertEducationCareerDetailsObj(props);

    return (
        <div className="details-container">
            {!showEditForm ? (
                <ProfileDetailsBox
                    profileData={profileDataArray}
                    profileDetailTitle="Education & Career"
                    showEditButton={true}
                    onEditClick={() => handleEditFormVisibility(true)}
                />
            ) : (
                <CareerEducationEditForm
                    initialValues={props}
                    onCancel={handleEditFormVisibility}
                    userId={userId}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

const FamilyDetails = ({
    props,
    onSubmit,
    formProps,
    userId,
}: {
    props: IFamilyDetails;
    onSubmit: (value: boolean) => void;
    formProps: IFormVisibilityProps;
    userId: string;
}) => {
    const { setShowEditForm, showEditForm } = formProps;

    const profileDataArray = ProfileUtils.convertFamilyDetailsObj(props);

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
                <ProfileDetailsBox
                    profileData={profileDataArray}
                    profileDetailTitle="Family"
                    showEditButton={true}
                    onEditClick={() => handleEditFormVisibility(true)}
                />
            ) : (
                <FamilyEditForm
                    initialValues={props}
                    onSubmit={onSubmit}
                    onCancel={handleEditFormVisibility}
                    userId={userId}
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

const LifestyleDetails = ({
    props,
    onSubmit,
    formProps,
    userId,
}: {
    props: ILifestyleDetails;
    onSubmit: (value: boolean) => void;
    formProps: IFormVisibilityProps;
    userId: string;
}) => {
    const { setShowEditForm, showEditForm } = formProps;
    const profileDataArray = ProfileUtils.convertLifestyleDetailsObj(props);

    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showLifestyleForm: value,
            };
        });
    };

    return (
        <div className="details-container">
            {!showEditForm ? (
                <ProfileDetailsBox
                    profileData={profileDataArray}
                    profileDetailTitle="Lifestyle"
                    showEditButton={true}
                    onEditClick={() => handleEditFormVisibility(true)}
                />
            ) : (
                <LifestyleEditForm
                    initialValues={props}
                    onCancel={handleEditFormVisibility}
                    userId={userId}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

const DesiredPartnerDetails = ({
    props,
    onSubmit,
    formProps,
    userId,
}: {
    props: IDesiredPartnerDetails;
    onSubmit: (value: boolean) => void;
    formProps: IFormVisibilityProps;
    userId: string;
}) => {
    const { partner_description } = props;
    const { setShowEditForm, showEditForm } = formProps;
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showDesiredPartnerForm: value,
            };
        });
    };

    const profileDataArray = ProfileUtils.convertDesiredPartnerObj(props);

    return (
        <div className="details-container">
            {!showEditForm ? (
                <ProfileDetailsBox
                    profileData={profileDataArray}
                    profileDetailTitle="Desired Partner"
                    showEditButton={true}
                    onEditClick={() => handleEditFormVisibility(true)}
                    partner_description={partner_description}
                />
            ) : (
                <DesiredPartnerEditForm
                    initialValues={props}
                    onCancel={handleEditFormVisibility}
                    userId={userId}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default EditProfile;
