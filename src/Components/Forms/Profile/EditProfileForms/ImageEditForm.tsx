import { Form, Formik, FormikProps } from 'formik';
import Button from '../../../Commons/Button/Button';
import Registration from '../../../../Services/API/SignUp';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import UserImages from '../../../Users/Profile/UserImages';
import { useResizedImage } from '../../../../CustomHooks/getResizedImage';

const FILE_SIZE = 500 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const GUIDELINES = [
    { label: 'Recommended image dimensions are 500x500' },
    { label: 'Make sure image size under 500kb' },
    { label: 'Avoid uploading blur images, group images, or fake celebrity images' },
    { label: 'Maximum upto 5 images are allowed' },
];

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
    return (
        <>
            <ImageUploadGuidelines />
            <div className="upload-images-container text-center">
                {props.values.profile_image && <img src={previewImage} />}

                <input
                    id="profile_image"
                    type="file"
                    onChange={(event) => {
                        props.setFieldValue('profile_image', event.currentTarget.files[0]);
                        handleProfileImage(event.currentTarget.files[0]);
                    }}
                    accept="image/png, image/jpg, image/jpeg"
                />

                {props.errors.profile_image && props.touched.profile_image && (
                    <div className="error-container">{props.errors.profile_image as any}</div>
                )}
            </div>
        </>
    );
};

const ImageUploadGuidelines = () => {
    return (
        <div className="guidelines-container">
            <h3>Important guidelines while uploading images.</h3>
            <ol className="guidelines-container-inner">
                {GUIDELINES.map((points) => (
                    <li key={points.label}>{points.label}</li>
                ))}
            </ol>
        </div>
    );
};
export default ImageEditForm;
