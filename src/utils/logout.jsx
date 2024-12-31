import { handleToast } from "./message"

export const logout = async() => {
    try {
        handleToast('success', 'خروج با موفقیت انجام شد')
        localStorage.removeItem('ACCESS_TOKEN')
        window.location.href = '/'
    } catch (error) {
        console.log(error)
    }
}