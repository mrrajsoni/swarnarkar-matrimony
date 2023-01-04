import { useCallback, useEffect, useState } from 'react';
import Layout from '../../Components/Commons/Layout/Layout';
import {
    IContactDetails,
    IDesiredPartnerDetails,
    IEducationCareerDetails,
    IFamilyDetails,
    ILifestyleDetails,
    IPersonalDetails,
    IProfileImageDetails,
    IUser,
} from '../../Types/GlobalTypes';
import CommonUtils from '../../Utils/Common Utils/CommonUtils';
import './Profile.scss';
import CareerEducationEditForm from '../../Components/Forms/Profile/EditProfileForms/CareerEducationEditForm';
import DesiredPartnerEditForm from '../../Components/Forms/Profile/EditProfileForms/DesiredPartnerEditForm';
import FamilyEditForm from '../../Components/Forms/Profile/EditProfileForms/FamilyEditForm';
import ImageEditForm from '../../Components/Forms/Profile/EditProfileForms/ImageEditForm';
import LifestyleEditForm from '../../Components/Forms/Profile/EditProfileForms/LifestyleEditForm';
import PersonalInfoEditForm from '../../Components/Forms/Profile/EditProfileForms/PersonalInfoEditForm';
import UserImages from '../../Components/Users/Profile/UserImages';
import ProfileDetailsBox, {
    ProfileDetailTitle,
} from '../../Components/Users/Profile/ProfileDetailsBox';
import ProfileUtils from '../../Utils/Profile/ProfileUtils';
import { ReactComponent as DesiredPartnerIcon } from '../../Assets/Svg/desired-partner.svg';
import { ReactComponent as LifestyleIcon } from '../../Assets/Svg/lifestyle-icon.svg';
import { ReactComponent as FamilyIcon } from '../../Assets/Svg/family-icon.svg';
import { ReactComponent as EducationIcon } from '../../Assets/Svg/education-icon.svg';
import { ReactComponent as ProfileIcon } from '../../Assets/Svg/profile-icon.svg';
import { useGetUserProfile } from '../../Services/API/UserHooks/getCurrentUserProfile';
import { debounce } from 'lodash';
import { GridLoader } from 'react-spinners';

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

const EditProfile = ({ userId }: { userId: string }) => {
    const [inEditMode, setInEditMode] = useState(initialFormState);

    const [profileData, setProfileData] = useState<IUser>(null);

    const { data, error, isLoading, refetch } = useGetUserProfile(userId);

    useEffect(() => {
        if (data) {
            setProfileData(data);
        }
    }, [isLoading]);

    const handleRefetch = () => {
        void refetch()
            .then((value) => {
                setProfileData(value.data);
            })
            .catch((reason) => console.log(reason));
    };

    const debouncedRefetch = useCallback(debounce(handleRefetch, 500), []);

    const personalDetails: IPersonalDetails = {
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
        height: profileData?.height,
        self_gotra: profileData?.self_gotra,
        city: profileData?.city,
        profile_description: profileData?.profile_description,
        manglik: profileData?.manglik,
        dob: profileData?.dob,
        gender: profileData?.gender,
        martial_status: profileData?.martial_status,
        state: profileData?.state,
    };
    const educationCareerDetails: IEducationCareerDetails = {
        annual_income: profileData?.annual_income,
        degree: profileData?.degree,
        employed_in: profileData?.employed_in,
        occupation: profileData?.occupation,
        organization_name: profileData?.organization_name,
    };

    const familyDetails: IFamilyDetails = {
        mother_gotra: profileData?.mother_gotra,
        brothers: profileData?.brothers,
        sisters: profileData?.sisters,
        family_status: profileData?.family_status,
        family_type: profileData?.family_type,
        father_occupation: profileData?.father_occupation,
        mother_occupation: profileData?.mother_occupation,
    };

    const contactDetailsProps: IContactDetails = {
        email_address: profileData?.email_address,
        mobile_number: profileData?.mobile_number,
    };

    const lifestyleDetailsProps: ILifestyleDetails = {
        dietary_habit: profileData?.dietary_habit,
        drinking_habit: profileData?.drinking_habit,
        smoking_habit: profileData?.smoking_habit,
        own_car: profileData?.own_car,
        handicapped: profileData?.handicapped,
        nature_handicap: profileData?.nature_handicap,
        own_house: profileData?.own_house,
    };

    const desiredPartnerDetailsProps: IDesiredPartnerDetails = {
        partner_description: profileData?.partner_description,
        partner_age: {
            from: profileData?.partner_age?.from,
            to: profileData?.partner_age?.to,
        },
        partner_height: {
            from: profileData?.partner_height?.from,
            to: profileData?.partner_height?.to,
        },
        partner_income: {
            from: profileData?.partner_income?.from,
            to: profileData?.partner_height?.to,
        },
        partner_occupation: profileData?.partner_occupation,
        partner_smoke: profileData?.partner_smoke,
        partner_drink: profileData?.partner_drink,
        partner_marital_status: profileData?.martial_status,
        gender: profileData?.gender,
    };

    const profileImageProps: IProfileImageDetails = {
        user_images: profileData?.user_images,
    };

    const onSubmit = (success: boolean) => {
        if (success) {
            setInEditMode(initialFormState);
            debouncedRefetch();
        }
    };

    return (
        <Layout>
            {profileData?.user_id && !isLoading ? (
                <section className="edit-profile-page py-10 ">
                    <div className="edit-profile-inner mx-auto">
                        <div className="two-cols flex gap-3">
                            <div className="details-col ">
                                <ProfileImages
                                    props={profileImageProps}
                                    onSubmit={onSubmit}
                                    userId={userId}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showProfileImageForm,
                                    }}
                                />
                                <PersonalDetails
                                    userId={userId}
                                    props={personalDetails}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showPersonalInfoForm,
                                    }}
                                />
                                <EducationCareerDetails
                                    userId={userId}
                                    props={educationCareerDetails}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showCareerInfoForm,
                                    }}
                                />
                                <FamilyDetails
                                    userId={userId}
                                    props={familyDetails}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showFamilyInfoForm,
                                    }}
                                />
                                <LifestyleDetails
                                    userId={userId}
                                    props={lifestyleDetailsProps}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showLifestyleForm,
                                    }}
                                />
                                <DesiredPartnerDetails
                                    userId={userId}
                                    props={desiredPartnerDetailsProps}
                                    onSubmit={onSubmit}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showDesiredPartnerForm,
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <ContactDetails
                                    props={contactDetailsProps}
                                    formProps={{
                                        setShowEditForm: setInEditMode,
                                        showEditForm: inEditMode.showDesiredPartnerForm,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <GridLoader color="#fe46ae" />
            )}
        </Layout>
    );
};

const ProfileImages = ({
    props,
    onSubmit,
    formProps,
    userId,
}: {
    props: IProfileImageDetails;
    onSubmit: (success: boolean) => void;
    formProps: IFormVisibilityProps;
    userId: string;
}) => {
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showProfileImageForm: value,
            };
        });
    };
    const { setShowEditForm, showEditForm } = formProps;

    const { user_images } = props;
    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Basic Details"
                        onClick={() => handleEditFormVisibility(true)}
                        showEditButton
                    />
                    <UserImages userId={userId} />
                </>
            ) : (
                <ImageEditForm
                    userImageNames={user_images}
                    onCancel={handleEditFormVisibility}
                    onSubmit={onSubmit}
                    userId={userId}
                />
            )}
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
                        section_icon={<ProfileIcon />}
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
                    section_icon={<EducationIcon />}
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
                    section_icon={<FamilyIcon />}
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

const ContactDetails = ({
    props,
    formProps,
}: {
    props: IContactDetails;
    formProps?: IFormVisibilityProps;
}) => {
    const { setShowEditForm, showEditForm } = formProps;
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showFamilyInfoForm: value,
            };
        });
    };
    const profileDataArray = ProfileUtils.convertContactDetailsObj(props);
    return (
        <div className="details-container contact-details-container p-5 bg-white sticky top-1">
            {!showEditForm ? (
                <ProfileDetailsBox
                    profileData={profileDataArray}
                    profileDetailTitle="Contact Details"
                    showEditButton={true}
                    onEditClick={() => handleEditFormVisibility(true)}
                />
            ) : null}
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
                    section_icon={<LifestyleIcon />}
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
                    section_icon={<DesiredPartnerIcon />}
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
