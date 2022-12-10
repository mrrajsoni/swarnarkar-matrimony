import {
    IDesiredPartnerDetails,
    IEducationCareerDetails,
    IFamilyDetails,
    ILifestyleDetails,
    IPersonalDetails,
    IProfileDataArray,
} from '../../Types/GlobalTypes';

export default class ProfileUtils {
    public static convertDesiredPartnerObj(obj: IDesiredPartnerDetails) {
        const profileDataArray: IProfileDataArray[] = [];
        Object.keys(obj)
            .sort()
            .forEach((key, index) => {
                if (index === 1) {
                    profileDataArray.push({ label: 'Age', field: obj[key]?.from?.label ?? '' });
                }

                if (index === 2) {
                    profileDataArray.push({
                        label: 'Height',
                        field: obj[key]?.from?.label ?? '',
                    });
                }
                if (index === 3) {
                    profileDataArray.push({
                        label: 'Annual Income',
                        field: obj[key]?.from?.label ?? '',
                    });
                }
                if (index === 4) {
                    profileDataArray.push({
                        label: 'Occupation',
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 5) {
                    profileDataArray.push({
                        label: 'Marital Status',
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 6) {
                    profileDataArray.push({ label: 'Drink', field: obj[key]?.label ?? '' });
                }
                if (index === 7) {
                    profileDataArray.push({ label: 'Smoke', field: obj[key]?.label ?? '' });
                }
            });
        return profileDataArray;
    }

    public static convertLifestyleDetailsObj(obj: ILifestyleDetails) {
        const profileDataArray: IProfileDataArray[] = [];
        Object.keys(obj)
            .sort()
            .forEach((key, index) => {
                if (index === 0) {
                    profileDataArray.push({
                        label: 'Dietary Habits',
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 1) {
                    profileDataArray.push({
                        label: 'Drinking Habits',
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 2) {
                    profileDataArray.push({ label: 'Challenged', field: obj[key]?.label ?? '' });
                }
                if (index === 3) {
                    const isHandicapped =
                        obj['handicapped']?.value === 'physically_accident' ||
                        obj['handicapped']?.value === 'physically_birth';
                    if (isHandicapped) {
                        profileDataArray.push({
                            label: 'Nature of challenge',
                            field: obj[key]?.label ?? '',
                        });
                    }
                }
                if (index === 4) {
                    profileDataArray.push({ label: 'Own a car', field: obj[key]?.label ?? '' });
                }
                if (index === 5) {
                    profileDataArray.push({
                        label: 'Own a house',
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 6) {
                    profileDataArray.push({
                        label: 'Smoking Habits',
                        field: obj[key]?.label ?? '',
                    });
                }
                return profileDataArray;
            });
        return profileDataArray;
    }

    public static convertFamilyDetailsObj(obj: IFamilyDetails) {
        const profileDataArray: IProfileDataArray[] = [];
        Object.keys(obj)
            .sort()
            .forEach((key, index) => {
                if (index === 0) {
                    profileDataArray.push({
                        label: 'No. of Brothers',
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 1) {
                    profileDataArray.push({
                        label: 'Family Status',
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 2) {
                    profileDataArray.push({ label: 'Family Type', field: obj[key]?.label ?? '' });
                }
                if (index === 3) {
                    profileDataArray.push({
                        label: "Father's Occupation",
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 4) {
                    profileDataArray.push({
                        label: "Mother's Gotra",
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 5) {
                    profileDataArray.push({
                        label: "Mother's Occupation",
                        field: obj[key]?.label ?? '',
                    });
                }
                if (index === 6) {
                    profileDataArray.push({
                        label: 'No. of Sisters',
                        field: obj[key]?.label ?? '',
                    });
                }
                return profileDataArray;
            });
        return profileDataArray;
    }

    public static convertEducationCareerDetailsObj(obj: IEducationCareerDetails) {
        const profileDataArray: IProfileDataArray[] = [];
        Object.keys(obj).forEach((key, index) => {
            if (index === 0) {
                profileDataArray.push({ label: 'Annual Income', field: obj[key].label });
            }
            if (index === 1) {
                profileDataArray.push({ label: 'Degree', field: obj[key] });
            }
            if (index === 2) {
                profileDataArray.push({ label: 'Employed In', field: obj[key].label });
            }
            if (index === 3) {
                profileDataArray.push({ label: 'Occupation', field: obj[key] });
            }
            if (index === 4) {
                profileDataArray.push({ label: 'Organization Name', field: obj[key] });
            }
            return profileDataArray;
        });
        return profileDataArray;
    }

    public static convertPersonalDetailsObj(obj: IPersonalDetails, formattedDob: string) {
        const profileDataArray: IProfileDataArray[] = [];
        Object.keys(obj)
            .sort()
            .forEach((key, index) => {
                if (index === 0) {
                    profileDataArray.push({ label: 'City', field: obj[key] });
                }
                if (index === 1) {
                    profileDataArray.push({ label: 'Date of Birth', field: formattedDob });
                }
                if (index === 4) {
                    profileDataArray.push({ label: 'Height', field: obj[key].label });
                }
                if (index === 6) {
                    profileDataArray.push({ label: 'Manglik', field: obj[key] ? 'Yes' : 'No' });
                }
                if (index === 7) {
                    profileDataArray.push({ label: 'Marital Status', field: obj[key].label });
                }
                if (index === 9) {
                    profileDataArray.push({ label: 'Gotra', field: obj[key].label });
                }
                if (index === 10) {
                    profileDataArray.push({ label: 'State', field: obj[key].label });
                }
                return profileDataArray;
            });
        return profileDataArray;
    }
}
