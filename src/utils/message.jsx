import toast from "react-hot-toast";


export const handleToast = (type, txt) => {
    toast[type](txt, {
        style: {
          border: `1px solid ${type === 'error' ? '#dc2626' : '#16a34a'}`,
          padding: '16px',
          color: `${type === 'error' ? '#dc2626' : '#16a34a'}`,
        },
        iconTheme: {
          primary: ` ${type === 'error' ? '#dc2626' : '#16a34a'}`,
          secondary: '#FFFAEE',
        },
      });
}