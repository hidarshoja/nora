export const getFormData = (data) => {
    const formData = new FormData(data);
    const body = Object.fromEntries(formData);
    return body;
};