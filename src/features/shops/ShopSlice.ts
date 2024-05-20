import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Shop from "../../interfaces/Shop";
import { createShop, getAllShops, getMyShop, updateShop } from "../../services/shopService";


interface UserAccountsState {
    loading : boolean;
    shops: Shop[];
    error: string | null;

}

const initialState: UserAccountsState = {
    loading: false,
    shops: [],
    error: null
}

export const myShopGet = createAsyncThunk<Shop| void>(
    'shops/myShopGet',
    async (_, thunkAPI) => {
        try {
            const response = await getMyShop();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Failed to get shop' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const shopCreate = createAsyncThunk<Shop, FormData>(
    'shops/createshop',
    async (data, thunkAPI) => {
        try {
            const response = await createShop(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Registration failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const shopUpdate = createAsyncThunk<Shop, {id: string, formData : FormData}>(
    'shops/updateshop',
    async (data, thunkAPI) => {
        try {
            const response = await updateShop(data.id, data.formData);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Update failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const shopGetAll = createAsyncThunk<Shop[], void>(
    'shops/getAllShops',
    async (_, thunkAPI) => {
        try {
            const response = await getAllShops();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all shops failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

const shopSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>{
        builder.addCase(shopCreate.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(shopCreate.fulfilled, (state, action) => {
            state.loading = false;
            state.shops.push(action.payload);
        });
        builder.addCase(shopCreate.rejected, (state, action) => {
            state.loading = false;
            //TODO: check if error is working properly
            state.error = (action.payload as { error: string })?.error || 'Failed to create shop';
        });

        builder.addCase(shopUpdate.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(shopUpdate.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.shops.findIndex((shop) => shop.id === action.payload.id);
            if (index !== -1) {
                state.shops[index] = action.payload;
            }
        });
        builder.addCase(shopUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || 'Failed to update shop';
        });

        builder.addCase(shopGetAll.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(shopGetAll.fulfilled, (state, action) => {
            state.loading = false;
            state.shops = action.payload;
        });
        builder.addCase(shopGetAll.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { error: string })?.error || 'Failed to get all shops';
        });
    }
});

export default shopSlice.reducer;
