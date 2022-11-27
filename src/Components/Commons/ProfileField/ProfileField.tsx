import classNames from 'classnames';

const ProfileField = ({ label, field }: { label: string; field: string }) => {
    const customClass = classNames({ empty: field === '' });
    const emptyField = field !== '' ? field : 'Not filled in';
    return (
        <li className={`profile-field mb-2 ${customClass}`}>
            <p className="profile-label">{label}</p>
            {emptyField}
        </li>
    );
};

export default ProfileField;
