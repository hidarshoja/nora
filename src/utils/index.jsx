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