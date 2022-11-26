import { IEducationalFormValues } from '../../Components/Users/SignUp/EducationalForm/EducationalForm';
import { IUserFamilyData } from '../../Components/Users/SignUp/FamilyForm/FamilyForm';
import { IUserPersonalData } from '../../Components/Users/SignUp/PersonalInfoForm/PersonalInfoForm';
import { supabase } from '../../supabaseClient';
import { IUser } from '../../Types/GlobalTypes';

export interface userData {
    email: string;
    password: string;
    mobile: string;
}

export default class Registration {
    static async initialSignUp(userData: userData, email: string) {
        try {
            await supabase.auth.signUp({
                email: email,
                password: userData.password,
                options: {
                    data: userData,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async updatePersonalInfo(userPersonalData: IUserPersonalData, currentUserId: string) {
        try {
            await supabase
                .from('user_registration')
                .update({ ...userPersonalData, third_stage: true })
                .eq('user_id', currentUserId);
        } catch (error) {
            console.log(error);
        }
    }

    static async updateEducationalInfo(
        userPersonalData: IEducationalFormValues,
        currentUserId: string,
    ) {
        try {
            await supabase
                .from('user_registration')
                .update({ ...userPersonalData, third_stage: false, last_stage: true })
                .eq('user_id', currentUserId);
        } catch (error) {
            console.log(error);
        }
    }

    static async updateFamilyInfo(userPersonalData: IUserFamilyData, currentUserId: string) {
        try {
            await supabase
                .from('user_registration')
                .update({ ...userPersonalData, last_stage: false, registration_completed: true })
                .eq('user_id', currentUserId);
        } catch (error) {
            console.log(error);
        }
    }

    static async editProfileUpdate(userData: IUser, currentUserId: string) {
        try {
            await supabase
                .from('user_registration')
                .update({ ...userData })
                .eq('user_id', currentUserId);
        } catch (error) {
            console.log(error);
        }
    }
}
