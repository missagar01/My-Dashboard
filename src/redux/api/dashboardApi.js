import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_USER_URL}/dashboard`;

export const getPendingTodayApi = async ({
    dashboardType,
    role,
    username,
    staffFilter = "all",
    departmentFilter = "all",
}) => {
    try {
        const res = await axios.get(`${BASE_URL}/pendingtoday`, {
            params: {
                dashboardType,
                role,
                username,
                staffFilter,
                departmentFilter,
            },
        });

        return res.data;
    } catch (err) {
        return {
            error:
                err.response?.data?.error ||
                "Failed to fetch pending today tasks",
        };
    }
};

export const getCompletedTodayApi = async ({
    dashboardType,
    role,
    username,
    staffFilter = "all",
    departmentFilter = "all",
}) => {
    try {
        const res = await axios.get(`${BASE_URL}/completedtoday`, {
            params: {
                dashboardType,
                role,
                username,
                staffFilter,
                departmentFilter,
            },
        });

        return res.data;
    } catch (err) {
        return {
            error:
                err.response?.data?.error ||
                "Failed to fetch completed today tasks",
        };
    }
};

export const getTotalTaskApi = async ({
    dashboardType,
    role,
    username,
    staffFilter = "all",
    departmentFilter = "all",
}) => {
    try {
        const res = await axios.get(`${BASE_URL}/total`, {
            params: {
                dashboardType,
                role,
                username,
                staffFilter,
                departmentFilter,
            },
        });

        return res.data; // number
    } catch (err) {
        return {
            error:
                err.response?.data?.error ||
                "Failed to fetch total tasks",
        };
    }
};

export const getCompletedTaskApi = async ({
    dashboardType,
    role,
    username,
    staffFilter = "all",
    departmentFilter = "all",
}) => {
    try {
        const res = await axios.get(`${BASE_URL}/completed`, {
            params: {
                dashboardType,
                role,
                username,
                staffFilter,
                departmentFilter,
            },
        });

        return res.data; // number
    } catch (err) {
        return {
            error:
                err.response?.data?.error ||
                "Failed to fetch completed tasks",
        };
    }
};

export const getPendingTaskApi = async ({
    dashboardType,
    role,
    username,
    staffFilter = "all",
    departmentFilter = "all",
}) => {
    try {
        const res = await axios.get(`${BASE_URL}/pending`, {
            params: {
                dashboardType,
                role,
                username,
                staffFilter,
                departmentFilter,
            },
        });

        return res.data; // number
    } catch (err) {
        return {
            error:
                err.response?.data?.error ||
                "Failed to fetch pending tasks",
        };
    }
};

export const getOverdueTaskApi = async ({
    dashboardType,
    role,
    username,
    staffFilter = "all",
    departmentFilter = "all",
}) => {
    try {
        const res = await axios.get(`${BASE_URL}/overdue`, {
            params: {
                dashboardType,
                role,
                username,
                staffFilter,
                departmentFilter,
            },
        });

        return res.data; // number
    } catch (err) {
        return {
            error:
                err.response?.data?.error ||
                "Failed to fetch overdue tasks",
        };
    }
};

