const InputErrors = ({ fieldTouched, error }: { fieldTouched: boolean; error: string }) => {
    return fieldTouched && error ? <div className="error-container">{error}</div> : null;
};

export default InputErrors;
