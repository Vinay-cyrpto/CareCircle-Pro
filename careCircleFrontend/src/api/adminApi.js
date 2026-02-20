import api from "./api";

export const createAdminProfile = async (data) => {
    const res = await api.post("/admin/profile", data);
    return res.data;
};

export const getAdminProfile = async () => {
    const res = await api.get("/admin/profile");
    return res.data;
};

export const updateAdminProfile = async (data) => {
    const res = await api.put("/admin/profile", data);
    return res.data;
};

export const verifyCaregiver = async (id, reason) => {
    await api.post(`/admin/caregivers/${id}/verify`, { reason });
    return true;
};

export const verifyCapability = async (id, reason) => {
    const res = await api.post(`/admin/capabilities/${id}/verify`, { reason });
    return res.data;
};

export const verifyCertification = async (id, reason) => {
    await api.post(`/admin/matching/certifications/${id}/verify`, { reason });
    return true;
};

export const rejectCertification = async (id, reason) => {
    await api.post(`/admin/matching/certifications/${id}/reject`, { reason });
    return true;
};

export const getAdminStatistics = async () => {
    const res = await api.get("/admin/stats");
    return res.data;
};

export const deleteAdminProfile = async () => {
    await api.delete("/admin/profile");
    return true;
};

export const getAllCaregivers = async (city = "", statuses = [], page = 0, size = 5) => {
    let url = `/admin/caregivers?city=${city}&page=${page}&size=${size}`;
    if (statuses && statuses.length > 0) {
        url += `&status=${statuses.join(",")}`;
    }
    const res = await api.get(url);
    return res.data;
};

export const getAllCertifications = async (statuses = [], page = 0, size = 5) => {
    let url = `/admin/matching/certifications?page=${page}&size=${size}`;
    if (statuses && statuses.length > 0) {
        url += `&status=${statuses.join(",")}`;
    }
    const res = await api.get(url);
    return res.data;
};

export const getPendingCertifications = async () => {
    const res = await api.get("/admin/matching/certifications/pending");
    return res.data;
};

export const rejectCaregiver = async (id, reason) => {
    await api.post(`/admin/caregivers/${id}/reject`, { reason });
    return true;
};

export const getAllParents = async (city = "", page = 0, size = 10) => {
    let url = `/admin/parents?page=${page}&size=${size}`;
    if (city) {
        url += `&city=${city}`;
    }
    const res = await api.get(url);
    return res.data;
};

export const getChildrenForParent = async (parentId) => {
    const res = await api.get(`/admin/parents/${parentId}/children`);
    return res.data;
};

export const getBookings = async (type = "active", page = 0, limit = 5) => {
    let statusParams = "";
    if (type === "active") statusParams = "status=REQUESTED&status=ACCEPTED";
    else if (type === "completed") statusParams = "status=COMPLETED";
    else if (type === "cancelled") statusParams = "status=CANCELLED&status=REJECTED";

    const res = await api.get(`/bookings?${statusParams}`);
    return {
        content: res.data,
        last: true
    };
};

export const getServices = async () => {
    const res = await api.get("/services");
    return res.data;
};

export const createService = async (data) => {
    const res = await api.post("/admin/services", data);
    return res.data;
};

export const updateService = async (id, data) => {
    const res = await api.put(`/admin/services/${id}`, data);
    return res.data;
};

export const deleteService = async (id) => {
    await api.delete(`/admin/services/${id}`);
    return true;
};

export const createCity = async (data) => {
    const res = await api.post("/admin/cities", data);
    return res.data;
};

export const updateCity = async (id, data) => {
    const res = await api.put(`/admin/cities/${id}`, data);
    return res.data;
};

export const deleteCity = async (id) => {
    await api.delete(`/admin/cities/${id}`);
    return true;
};
