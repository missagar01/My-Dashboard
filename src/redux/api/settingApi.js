const BASE_URL = `${import.meta.env.VITE_API_BASE_USER_URL}/settings`;

export const fetchUserDetailsApi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        return await response.json();
    } catch (error) {
        console.log("Error fetching users", error);
        return [];
    }
};

export const fetchUserDetailsApiById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`);
        return await response.json();
    } catch (error) {
        console.log("Error fetching user details by ID", error);
        return null;
    }
};


/**
 * PATCH system_access (append, no overwrite)
 * @param {number} id
 * @param {string[] | string} system_access
 */
export const patchSystemAccessApi = async ({ id, system_access }) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users/${id}/system_access`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ system_access }),
            }
        );

        return await response.json();

    } catch (error) {
        console.log("Error patching system_access", error);
        return null;
    }
};