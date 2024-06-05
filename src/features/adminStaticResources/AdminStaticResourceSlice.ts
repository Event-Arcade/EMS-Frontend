import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminStaticResource from "../../interfaces/AdminStaticResource";
import { createAdminStaticResource, deleteAdminStaticResource, getAdminStaticResourceById, getAllAdminStaticResources, updateAdminStaticResource } from "../../services/adminStaticResourceService";

interface AdminStaticResourceState {
    staticResources: AdminStaticResource[];
    loading: boolean;
    error: string | null;
}
const initialState: AdminStaticResourceState = {
    staticResources: [],
    loading: false,
    error: null,
};

export const adminStaticResourceCreate = createAsyncThunk<AdminStaticResource, FormData>(
    'adminStaticResource/create',
    async (data, thunkAPI) => {
        try {
            const response = await createAdminStaticResource(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Registration failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const adminStaticResourceUpdate = createAsyncThunk<AdminStaticResource, { id: number, data: FormData }>(
    'adminStaticResource/updateAdminStaticResource',
    async (data, thunkAPI) => {
        try {
            const response = await updateAdminStaticResource(data.id, data.data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Update failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const adminStaticResourceGetAll = createAsyncThunk<AdminStaticResource[], void>(
    'adminStaticResource/getAllAdminStaticResources',
    async (_, thunkAPI) => {
        try {
            const response = await getAllAdminStaticResources();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all users failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const adminStaticResourceDelete = createAsyncThunk<boolean, number>(
    'adminStaticResource/deleteAdminStaticResource',
    async (staticResourceId, thunkAPI) => {
        try {
            const response = await deleteAdminStaticResource(staticResourceId);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Delete failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const adminStaticResourceGetById = createAsyncThunk<AdminStaticResource, number>(
    'adminStaticResource/getAdminStaticResourceById',
    async (staticResourceId, thunkAPI) => {
        try {
            const response = await getAdminStaticResourceById(staticResourceId);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get static resource failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const adminStaticResourceSlice = createSlice({
    name: 'adminStaticResource',
    initialState,
    reducers: {
        adminStaticResourceRemoveEntity : (state, action) => {
            state.staticResources = state.staticResources.filter(staticResource => staticResource.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminStaticResourceCreate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(adminStaticResourceCreate.fulfilled, (state, action) => {
            state.loading = false;
            state.staticResources.push(action.payload);
        });
        builder.addCase(adminStaticResourceCreate.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || 'Failed to create static resource';
        });
        builder.addCase(adminStaticResourceUpdate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(adminStaticResourceUpdate.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.staticResources.findIndex(staticResource => staticResource.id === action.payload.id);
            if (index !== -1) {
                state.staticResources[index] = action.payload;
            }
        });
        builder.addCase(adminStaticResourceUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || 'Failed to update static resource';
        });
        builder.addCase(adminStaticResourceGetAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(adminStaticResourceGetAll.fulfilled, (state, action) => {
            state.loading = false;
            state.staticResources = action.payload;
        });
        builder.addCase(adminStaticResourceGetAll.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || 'Failed to fetch static resources';
        });
        builder.addCase(adminStaticResourceDelete.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(adminStaticResourceDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.staticResources = state.staticResources.filter(staticResource => staticResource.id !== action.meta.arg);
        });
        builder.addCase(adminStaticResourceDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || 'Failed to delete static resource';
        });
        builder.addCase(adminStaticResourceGetById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(adminStaticResourceGetById.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.staticResources.findIndex(staticResource => staticResource.id === action.payload.id);
            if (index !== -1) {
                state.staticResources[index] = action.payload;
            }
            else{
                state.staticResources.push(action.payload);
            }
        });
        
    }
});
export const { adminStaticResourceRemoveEntity } = adminStaticResourceSlice.actions;
export default adminStaticResourceSlice.reducer;