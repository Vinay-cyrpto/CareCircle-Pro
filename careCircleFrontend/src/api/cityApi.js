import api from "./api";

export const getCities = async () => {
    const res = await api.get("/cities");
    return res.data;
};

export const getActiveCities = async () => {
    const res = await api.get("/cities"); // Assuming all returned cities are active or just listing all
    return res.data;
};
