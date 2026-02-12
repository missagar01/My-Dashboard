import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserDetailsApi, patchSystemAccessApi, fetchUserDetailsApiById } from '../api/settingApi';

export const userDetails = createAsyncThunk(
    'fetch/users',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { settings } = getState();
            // Simple caching: if we have data and it's less than 5 minutes old, don't re-fetch
            const CACHE_TIMEOUT = 5 * 60 * 1000;
            if (settings.userData.length > 0 && (Date.now() - settings.lastFetchedAll) < CACHE_TIMEOUT) {
                return settings.userData;
            }
            const users = await fetchUserDetailsApi();
            return users;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'fetch/userById',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { settings } = getState();
            // Check cache for specific user
            if (settings.userDetailsCache[id] && (Date.now() - settings.userDetailsCache[id].timestamp) < 5 * 60 * 1000) {
                return settings.userDetailsCache[id].data;
            }
            const user = await fetchUserDetailsApiById(id);
            return { id, data: user };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const patchSystemAccess = createAsyncThunk(
    "settings/patchSystemAccess",
    async ({ id, system_access }) => {
        return await patchSystemAccessApi({ id, system_access });
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        userData: [],
        userDetailsCache: {}, // { userId: { data: {}, timestamp: Date } }
        error: null,
        loading: false,
        lastFetchedAll: 0,
    },
    reducers: {
        clearSettingsCache: (state) => {
            state.userData = [];
            state.userDetailsCache = {};
            state.lastFetchedAll = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
                state.lastFetchedAll = Date.now();
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.data) {
                    state.userDetailsCache[action.payload.id] = {
                        data: action.payload.data,
                        timestamp: Date.now()
                    };
                }
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(patchSystemAccess.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload) return;

                const index = state.userData.findIndex(
                    (user) => user.id === action.payload.id
                );

                if (index !== -1) {
                    state.userData[index] = action.payload;
                }

                // Also update individual cache if exists
                if (state.userDetailsCache[action.payload.id]) {
                    state.userDetailsCache[action.payload.id] = {
                        data: action.payload,
                        timestamp: Date.now()
                    };
                }
            })
            .addCase(patchSystemAccess.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSettingsCache } = settingsSlice.actions;
export default settingsSlice.reducer;
