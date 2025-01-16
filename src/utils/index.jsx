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

export const userStatistic = (data = []) => {
    if (!Array.isArray(data)) {
        throw new TypeError("Input must be an array");
    }

    return data.reduce(
        (result, { address: { statuse } = {} } = {}) => {
            switch (statuse) {
                case 'ارسال شده':
                case 'پرداخت':
                case 'در حال پردازش':
                    result.sends += 1;
                    break;
                case 'لغو':
                    result.cancel += 1;
                    break;
                case 'مرجوع شده':
                    result.returnProduct += 1;
                    break;
            }
            return result;
        },
        {
            sends: 0,
            cancel: 0,
            returnProduct: 0,
        }
    );
};

