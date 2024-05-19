import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShopService from "../../interfaces/ShopService";
import { createService, deleteService, getAllServices, updateService } from "../../services/shopServiceAPI";

interface ShopServiceState{
    loading : boolean;
    shopServices: ShopService[];
    error: string | null;
}

const initialState: ShopServiceState = {
    loading: false,
    shopServices: [],
    error: null
}

export const shopServiceCreate = createAsyncThunk<ShopService, FormData>(
    'shopService/create',
    async (data, thunkAPI) => {
        try {
            const response = await createService(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Registration failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const shopServiceUpdate = createAsyncThunk<ShopService, { id: string, data: FormData }>(
    'shopService/updateShopService',
    async (data, thunkAPI) => {
        try {
            const response = await updateService(data.id , data.data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Update failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const shopServiceGetAll = createAsyncThunk<ShopService[], void>(
    'shopService/getAllShopServices',
    async (_, thunkAPI) => {
        try {
            const response = await getAllServices();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all users failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const shopServiceDelete = createAsyncThunk<boolean, string>(
    'shopService/deleteShopService',
    async (id, thunkAPI) => {
        try {
            const response = await deleteService(id);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Delete failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

const ShopServiceSlice = createSlice({
    name: 'shopService',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(shopServiceCreate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(shopServiceCreate.fulfilled, (state, action) => {
            state.loading = false;
            state.shopServices.push(action.payload as ShopService);
        });
        builder.addCase(shopServiceCreate.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || " Registration failed";
        });

        builder.addCase(shopServiceUpdate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(shopServiceUpdate.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.shopServices.findIndex(service => service.id === action.payload.id);
            if (index !== -1) {
                state.shopServices[index] = action.payload as ShopService;
            }
        });
        builder.addCase(shopServiceUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || " Update failed";
        });

        builder.addCase(shopServiceGetAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(shopServiceGetAll.fulfilled, (state, action) => {
            state.loading = false;
            state.shopServices = action.payload as ShopService[];
        });
        builder.addCase(shopServiceDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.shopServices = state.shopServices.filter(service => service.id !== action.payload.toString() as unknown as number);
        });
    }}
)

export default ShopServiceSlice.reducer;