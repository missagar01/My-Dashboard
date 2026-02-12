import axiosClient from "./axiosClient";

export const getPendingTodayApi = async ({
    dashboardType,
    role,
    username,
    staffFilter = "all",
    departmentFilter = "all",
}) => {
    try {
        const res = await axiosClient.get("/dashboard/pendingtoday", {
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
        const res = await axiosClient.get("/dashboard/completedtoday", {
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
        const res = await axiosClient.get("/dashboard/total", {
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
        const res = await axiosClient.get("/dashboard/completed", {
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
        const res = await axiosClient.get("/dashboard/pending", {
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
        const res = await axiosClient.get("/dashboard/overdue", {
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

