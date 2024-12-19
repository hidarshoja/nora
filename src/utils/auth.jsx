import axiosClient from "../axios-client";

export const checkAuth =async (setUser) => {

    try {
        const response = await axiosClient.get("/auth/profile");
        setUser(response.data);
    } catch (error) {
        console.log(error.message)
    }
}

export const refreshToken = async () => {
    try {
        const response = await axiosClient.post("/auth/refresh-token");
        return response.data;
    } catch (error) {
        throw error;
    }
}