const BASE_URL = `${import.meta.env.VITE_API_BASE_USER_URL}/user-score`;

/**
 * GET ALL USERS SCORES
 * @param {Object} params
 * @param {string} params.startDate - YYYY-MM-DD
 * @param {string} params.endDate   - YYYY-MM-DD
 */
export const fetchUserScoresApi = async ({
    startDate,
    endDate
}) => {
    try {
        const query = new URLSearchParams({
            startDate,
            endDate
        }).toString();

        const response = await fetch(`${BASE_URL}?${query}`);
        return await response.json();
    } catch (error) {
        console.log("Error fetching user scores", error);
        return [];
    }
};

/**
 * GET SINGLE USER SCORE (by name)
 * @param {string} name
 * @param {Object} params
 * @param {string} params.startDate - YYYY-MM-DD
 * @param {string} params.endDate   - YYYY-MM-DD
 */
export const fetchUserScoreApiByName = async (
    name,
    { startDate, endDate }
) => {
    try {
        const query = new URLSearchParams({
            startDate,
            endDate
        }).toString();

        const encodedName = encodeURIComponent(name);

        const response = await fetch(
            `${BASE_URL}/${encodedName}?${query}`
        );

        return await response.json();
    } catch (error) {
        console.log("Error fetching user score by name", error);
        return null;
    }
};
