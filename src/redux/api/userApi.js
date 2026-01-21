const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/settings`;

/**
 * PATCH employee image
 * @param {number|string} id - User ID
 * @param {File} file - Image file
 */
export const patchEmpImageApi = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append("emp_image", file);

        const response = await fetch(
            `${BASE_URL}/users/${id}/emp-image`,
            {
                method: "PATCH",
                body: formData, // IMPORTANT: no headers
            }
        );

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Failed to upload image");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating employee image", error);
        throw error;
    }
};
