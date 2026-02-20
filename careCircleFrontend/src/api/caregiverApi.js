import api from "./api";

export const createCaregiverProfile = async (data) => {
  const res = await api.post("/caregiver/profile", data);
  return res.data;
};

export const getCaregiverProfile = async () => {
  const res = await api.get("/caregiver/profile");
  return res.data;
};

export const updateCaregiverProfile = async (data) => {
  const res = await api.put("/caregiver/profile", data);
  return res.data;
};

// Services (Capabilities)
export const addService = async (data) => {
  const res = await api.post("/caregiver/services", data);
  return res.data;
};

export const getServices = async () => {
  const res = await api.get("/caregiver/services");
  return res.data;
};

export const updateService = async (data) => {
  const res = await api.put("/caregiver/services", data);
  return res.data;
};

export const deleteService = async (id) => {
  await api.delete(`/caregiver/services/${id}`);
  return true;
};

// Certifications
export const addCertification = async (data) => {
  const res = await api.post("/caregiver/certifications", data);
  return res.data;
};

export const getCertifications = async () => {
  const res = await api.get("/caregiver/certifications");
  return res.data;
};

export const updateCertification = async (id, data) => {
  const res = await api.put(`/caregiver/certifications/${id}`, data);
  return res.data;
};

export const deleteCertification = async (id) => {
  await api.delete(`/caregiver/certifications/${id}`);
  return true;
};

export const deleteCaregiverProfile = async () => {
  await api.delete("/caregiver/profile");
  return true;
};
