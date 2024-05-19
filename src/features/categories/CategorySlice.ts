import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Category from "../../interfaces/Category";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/categoryService";

interface CategoryState {
    loading : boolean;
    categories: Category[];
    error: string | null;
}

const initialState: CategoryState = {
    loading: false,
    categories: [],
    error: null
}

export const categoryCreate = createAsyncThunk<Category, FormData>(
    'category/create',
    async (data, thunkAPI) => {
        try {
            const response = await createCategory(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Registration failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const categoryUpdate = createAsyncThunk<Category, { id: number, data: FormData }>(
    'category/updateCategory',
    async (data, thunkAPI) => {
        try {
            const response = await updateCategory(data.id , data.data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Update failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const categoryGetAll = createAsyncThunk<Category[], void>(
    'category/getAllCategories',
    async (_, thunkAPI) => {
        try {
            const response = await getAllCategories();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all users failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const categoryDelete = createAsyncThunk<number, number>(
    'category/delete',
    async (data, thunkAPI) => {
        try {
            const response = await deleteCategory(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all users failed' });
            }
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);



const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(categoryCreate.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(categoryCreate.fulfilled, (state, action) => {
            state.loading = false;
            state.categories?.push(action.payload);
        });
        builder.addCase(categoryCreate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(categoryUpdate.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(categoryUpdate.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.categories?.findIndex((category) => category.id === action.payload.id);
            if(index !== -1){
                state.categories?.splice(index, 1, action.payload);
            }
        });
        builder.addCase(categoryUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(categoryGetAll.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(categoryGetAll.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(categoryGetAll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(categoryDelete.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(categoryDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = state.categories?.filter((category) => category.id !== action.payload as unknown as number);
        });
        builder.addCase(categoryDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });   
    }
});

export default categorySlice.reducer;
