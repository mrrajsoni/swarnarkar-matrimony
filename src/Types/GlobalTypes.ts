import { setShowEditFormType } from '../Pages/Profile/EditProfile';

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
    mother_occupation?: selectValue;
    father_occupation?: selectValue;
    brothers?: selectValue;
    sisters?: selectValue;
    family_type?: selectValue;
    family_status?: selectValue;
    dietary_habit?: selectValue;
    drinking_habit?: selectValue;
    smoking_habit?: selectValue;
    own_car?: selectValue;
    own_house?: selectValue;
    handicapped?: selectValue;
    nature_handicap?: selectValue;
    partner_description?: string;
    partner_age?: {
        to: selectValue;
        from: selectValue;
    };
    partner_height?: {
        to: selectValue;
        from: selectValue;
    };
    partner_income?: {
        to: selectValue;
        from: selectValue;
    };
    partner_occupation?: selectValue;
    partner_smoke?: selectValue;
    partner_drink?: selectValue;
    partner_marital_status?: selectValue;
    user_images?: string;
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
}

export interface IEducationCareerDetails {
    degree: string;
    employed_in: selectValue;
    occupation: string;
    annual_income: selectValue;
    organization_name?: string;
}

export interface IFamilyDetails {
    mother_gotra: selectValue;
    mother_occupation?: selectValue;
    father_occupation?: selectValue;
    brothers?: selectValue;
    sisters?: selectValue;
    family_type?: selectValue;
    family_status?: selectValue;
}

export interface IContactDetails {
    mobile_number: string;
    email_address: string;
}

export interface ILifestyleDetails {
    dietary_habit?: selectValue;
    drinking_habit?: selectValue;
    smoking_habit?: selectValue;
    own_car?: selectValue;
    own_house?: selectValue;
    handicapped?: selectValue;
    nature_handicap?: selectValue;
}

export interface IDesiredPartnerDetails {
    partner_description?: string;
    partner_age?: {
        to: selectValue;
        from: selectValue;
    };
    partner_height?: {
        to: selectValue;
        from: selectValue;
    };
    partner_income?: {
        to: selectValue;
        from: selectValue;
    };
    partner_occupation?: selectValue;
    partner_smoke?: selectValue;
    partner_drink?: selectValue;
    partner_marital_status?: selectValue;
    gender?: selectValue;
}

export interface IProfileImageDetails {
    showEditForm: boolean;
    id?: string;
    setShowEditForm: setShowEditFormType;
    user_images: string;
}

export interface IProfileDataArray {
    label: string;
    field: string;
}
