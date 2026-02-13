import api from "./api";

export const createParentProfile = async (data) => {
    const res = await api.post("/parents/profile", data);
    return res.data;
};

export const getParentProfile = async () => {
    const res = await api.get("/parents/profile/me");
    return res.data;
};

export const updateParentProfile = async (data) => {
    const res = await api.put("/parents/profile", data);
    return res.data;
};

export const addChild = async (data) => {
    const res = await api.post("/parents/children", data);
    return res.data;
};

export const getChildren = async () => {
    const res = await api.get("/parents/children");
    return res.data;
};

export const updateChild = async (id, data) => {
    const res = await api.put(`/parents/children/${id}`, data);
    return res.data;
};

export const deleteChild = async (id) => {
    await api.delete(`/parents/children/${id}`);
    return true;
};

export const getVerifiedCaregivers = async () => {
    const res = await api.get("/parents/caregivers");
    return res.data;
};

export const getCaregiverDetails = async (id) => {
    const res = await api.get(`/parents/caregivers/${id}`);
    return res.data;
};
