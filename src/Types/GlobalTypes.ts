export interface IUser {
    id?: string;
    aud?: string;
    role?: string;
    email?: string;
    email_confirmed_at?: string;
    confirmation_sent_at?: string;
    confirmed_at?: string;
    last_sign_in_at?: string;
    created_at?: string;
    updated_at?: string;
    first_name?: string;
    last_name?: string;
    mobile_number?: string;
    email_address?: string;
    user_id?: string;
    dob?: string;
    gender?: selectValue;
    religion?: string;
    caste?: string;
    manglik?: boolean;
    height?: selectValue;
    martial_status?: selectValue;
    third_stage?: boolean;
    state?: selectValue;
    city?: string;
    degree?: string;
    employed_in?: selectValue;
    occupation?: string;
    annual_income?: selectValue;
    organization_name?: string;
    self_gotra?: selectValue;
    mother_gotra?: selectValue;
    profile_description?: string;
    registration_completed?: boolean;
    last_stage?: boolean;
    second_stage?: boolean;
}

export interface selectValue {
    label: string;
    value: string;
}

export interface IPersonalDetails {
    first_name: string;
    last_name: string;
    height: selectValue;
    self_gotra: selectValue;
    city: string;
    profile_description: string;
    manglik: boolean;
    dob: string;
    gender: selectValue;
    martial_status: selectValue;
    state: selectValue;
    id?: string;
    showEditForm: boolean;
    setShowEditForm: React.Dispatch<
        React.SetStateAction<{
            showPersonalInfoForm: boolean;
            showCareerInfoForm: boolean;
            showFamilyInfoForm: boolean;
            showHobbyInfoForm: boolean;
        }>
    >;
}

export interface IEducationCareerDetails {
    degree: string;
    employed_in: selectValue;
    occupation: string;
    annual_income: selectValue;
    id?: string;
    organization_name?: string;
    showEditForm: boolean;
    setShowEditForm: React.Dispatch<
        React.SetStateAction<{
            showPersonalInfoForm: boolean;
            showCareerInfoForm: boolean;
            showFamilyInfoForm: boolean;
            showHobbyInfoForm: boolean;
        }>
    >;
}

export interface IFamilyDetails {
    mother_gotra: selectValue;
    showEditForm: boolean;
    setShowEditForm: React.Dispatch<
        React.SetStateAction<{
            showPersonalInfoForm: boolean;
            showCareerInfoForm: boolean;
            showFamilyInfoForm: boolean;
            showHobbyInfoForm: boolean;
        }>
    >;
}

export interface IContactDetails {
    mobile_number: string;
    email_address: string;
}
