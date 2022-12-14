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
                .update({ ...userPersonalData, second_stage: false, third_stage: true })
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

    static async editProfileImageUpdate(userImage: File, currentUserId: string) {
        try {
            const { data, error } = await supabase.storage
                .from('profile-images')
                .upload(`${currentUserId}/${userImage.name}`, userImage);

            return {
                error,
                data,
            };
        } catch (error) {
            console.log(error);
        }
    }

    static async imageUpdateToDatabase(userImage: string, currentUserId: string) {
        try {
            const { data } = await supabase
                .from('user_registration')
                .update({
                    user_images: userImage,
                })
                .eq('user_id', currentUserId);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}
