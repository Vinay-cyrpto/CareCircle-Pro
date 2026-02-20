import api from "./api";

export const searchCaregivers = async (city = "", serviceId = "", date = "", startTime = "", endTime = "", childAge = "", page = 0, limit = 10) => {
    const body = {
        city: city || null,
        serviceId: serviceId || null,
        date: date || null,
        startTime: startTime || null,
        endTime: endTime || null,
        childAge: childAge || null,
        page,
        limit
    };

    const res = await api.post("/matching/search", body);
    return res.data;
};

export const getActiveServices = async () => {
    const res = await api.get("/services");
    return res.data;
};

export const getServices = async () => {
    const res = await api.get("/services");
    return res.data;
};

export const createBooking = async (bookingData) => {
    const res = await api.post("/bookings", bookingData);
    return res.data;
};

export const getCaregiversInCity = async (cityCode) => {
    const res = await api.get(`/matching/caregivers?cityCode=${cityCode}`);
    return res.data;
};

export const findCaregivers = async (criteria) => {
    const res = await api.post("/matching/find", criteria);
    return res.data;
};

export const getCaregiverDetailsMatch = async (caregiverId) => {
    const res = await api.get(`/matching/caregivers/${caregiverId}`);
    return res.data;
};
