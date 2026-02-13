import api from "./api";

export const getChatRooms = async () => {
    const res = await api.get("/communication-service/chat/rooms");
    return res.data;
};

export const getMessages = async (roomId) => {
    const res = await api.get(`/communication-service/chat/rooms/${roomId}/messages`);
    return res.data;
};

export const sendMessage = async (roomId, content) => {
    const res = await api.post(`/communication-service/chat/rooms/${roomId}/messages`, { content });
    return res.data;
};

export const createChatRoomOrGetExisting = async (participantId) => {
    const res = await api.post("/communication-service/chat/rooms", { participantId });
    return res.data;
};

export const initiateChat = async (bookingId, partnerId) => {
    const res = await api.post("/communication-service/chats/rooms", { bookingId, partnerId });
    return res.data;
};

export const getMyChatRooms = async () => {
    const res = await api.get("/communication-service/chats/my");
    return res.data;
};

export const markAsRead = async (roomId) => {
    await api.put(`/communication-service/chats/rooms/${roomId}/read`).catch(e => console.error(e));
};
