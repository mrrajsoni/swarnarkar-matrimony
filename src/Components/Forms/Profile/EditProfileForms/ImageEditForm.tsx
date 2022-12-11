import { Form, Formik, FormikProps } from 'formik';
import Button from '../../../Commons/Button/Button';
import Registration from '../../../../Services/API/SignUp';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import UserImages from '../../../Users/Profile/UserImages';

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const validationSchema = Yup.object().shape({
    profile_image: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
        .test(
            'fileFormat',
            'Unsupported Format',
            (value) => value && SUPPORTED_FORMATS.includes(value.type),
        ),
});

interface IProfileImageEditValues {
    profile_image: File;
}

const initialValue: IProfileImageEditValues = {
    profile_image: null,
};
const ImageEditForm = ({
    userImageNames,
    onSubmit,
    onCancel,
    userId,
}: {
    userImageNames: string;
    onSubmit: (value: boolean) => void;
    onCancel: (value: boolean) => void;
    userId: string;
}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadingProfileImage, setUploadingProfileImage] = useState<Blob | MediaSource>(null);
    const updateProfileImage = (value: File) => {
        setUploadingProfileImage(value);
    };
    useEffect(() => {
        if (!uploadingProfileImage) {
            setPreviewImage(null);
            return;
        }

        const objectUrl = URL.createObjectURL(uploadingProfileImage);
        setPreviewImage(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadingProfileImage]);

    const handleSubmit = (values: IProfileImageEditValues) => {
        // eslint-disable-next-line no-debugger
        debugger;
        void Registration.editProfileImageUpdate(values.profile_image, userId).then((value) => {
            if (!value.error) {
                let userImageNamesList: string;
                if (userImageNames !== '') {
                    userImageNamesList = userImageNames.concat(',', values.profile_image.name);
                } else {
                    userImageNamesList = values.profile_image.name;
                }

                void Registration.imageUpdateToDatabase(userImageNamesList, userId);
            }
        });
        onSubmit(true);
    };
    return (
        <section className="edit-form-section">
            <UserImages userId={userId} showDelete={true} />
            <Formik
                initialValues={initialValue}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
                validationSchema={validationSchema}>
                {(props) => (
                    <Form className="registration-form">
                        <ProfileImages
                            props={props}
                            handleProfileImage={updateProfileImage}
                            previewImage={previewImage}
                        />
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

const ProfileImages = ({
    props,
    handleProfileImage,
    previewImage,
}: {
    props: FormikProps<IProfileImageEditValues>;
    handleProfileImage: (value: File) => void;
    previewImage: string;
}) => {
    console.log(props.errors);
    return (
        <div className="profile-images-container">
            <img src={previewImage} alt="" />
            <input
                id="profile_image"
                type="file"
                onChange={(event) => {
                    props.setFieldValue('profile_image', event.currentTarget.files[0]);
                    handleProfileImage(event.currentTarget.files[0]);
                }}
                accept="image/png, image/jpg, image/jpeg"
            />
        </div>
    );
};
export default ImageEditForm;
