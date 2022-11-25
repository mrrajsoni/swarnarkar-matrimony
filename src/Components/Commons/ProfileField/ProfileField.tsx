const ProfileField = ({ label, field }: { label: string; field: string }) => {
    return (
        <li className="profile-field mb-2">
            <p className="profile-label">{label}</p>
            {field}
        </li>
    );
};

export default ProfileField;
