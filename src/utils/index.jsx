export const transformedErrors = (errors) => {
    if (!errors) return
    const transformedErrors = errors.reduce((acc, error) => {
        const { field, message } = error;
        if (!acc[field]) {
            acc[field] = [];
        }
        acc[field].push(message);
        return acc;
    }, {});

    return transformedErrors
}

export function removeFormDataPrefix(errors) {
    const updatedErrors = {};

    Object.entries(errors).forEach(([key, value]) => {
        const newKey = key.replace("formData.", ""); // Remove "formData." from the key
        updatedErrors[newKey] = value;
    });

    return updatedErrors;
}
