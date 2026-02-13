import api from "./api";

export const getMyAvailability = async (caregiverId) => {
    const res = await api.get(`/caregiver/availability?caregiverId=${caregiverId}`);
    return res.data;
};

export const getAvailability = getMyAvailability;

export const addAvailability = async (data) => {
    const res = await api.post("/caregiver/availability", data);
    return res.data;
};

export const deleteAvailability = async (id) => {
    await api.delete(`/caregiver/availability/${id}`);
    return true;
};
