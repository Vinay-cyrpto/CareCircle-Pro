import api from "./api";

export const createBooking = async (data) => {
    const res = await api.post("/bookings", data);
    return res.data;
};

export const getBookings = async (caregiverId = null, parentId = null, status = null) => {
    let url = "/bookings?";
    if (caregiverId) url += `caregiverId=${caregiverId}&`;
    if (parentId) url += `parentId=${parentId}&`;
    if (status) url += `status=${status}&`;
    const res = await api.get(url.slice(0, -1));
    return res.data;
};

export const getBookingsForUser = getBookings;

export const getBookingDetails = async (id) => {
    const res = await api.get(`/bookings/${id}`);
    return res.data;
};

export const updateBookingStatus = async (id, status) => {
    const res = await api.put(`/bookings/${id}/status`, { status });
    return res.data;
};

export const confirmBookingCompletion = async (id, rating, review) => {
    const res = await api.post(`/bookings/${id}/complete`, { rating, review });
    return res.data;
};
