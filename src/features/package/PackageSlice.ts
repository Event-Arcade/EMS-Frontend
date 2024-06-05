import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Package from '../../interfaces/Package';
import { createPackage, deletePackage, getAllPackages, getAllSubPackages, getPackageById, getSubPackageById, updateSubPackage } from '../../services/packageService';
import SubPackage from '../../interfaces/SubPackage';

interface PackageStatus {
    tempararyPackage: Package;
    description: string,
    orderDate: Date;
    packages: Package[];
    subPackages: SubPackage[];
    loading: boolean;
    error: string | null;
};

const initialState: PackageStatus = {
    tempararyPackage: {
        userId: "",
        subPackages: []
    },
    description: "",
    orderDate: new Date(),
    packages: [],
    subPackages: [],
    loading: false,
    error: null,
};

export const packageCreate = createAsyncThunk<Package, any>(
    'package/create',
    async (data, thunkAPI) => {
        try {
            const response = await createPackage(data);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Registration failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const packageDelete = createAsyncThunk<number, number>(
    'package/delete',
    async (id, thunkAPI) => {
        try {
            const response = await deletePackage(id);
            if(response){
                return id;
            }else{  
                return thunkAPI.rejectWithValue({ error: 'Failed to delete package' });
            }
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const packageGetAll = createAsyncThunk<Package[], void>(
    'package/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await getAllPackages();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all packages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const packageUpdateSubPackage = createAsyncThunk<Package, { id: number, data: FormData }>(
    'package/updateSubPackage',
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await updateSubPackage(id, data);
            if(response){
                return response;
            }
            return thunkAPI.rejectWithValue({ error: 'Failed to update sub package' });
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const packageGetById = createAsyncThunk<Package, number>(
    'package/getById',
    async (id, thunkAPI) => {
        try {
            const response = await getPackageById(id);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all packages failed' });
            }
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const packageGetAllSubPackages = createAsyncThunk<SubPackage[], void>(
    'package/getAllSubPackages',
    async (_, thunkAPI) => {
        try {
            const response = await getAllSubPackages();
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get all sub packages failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
);

export const packageGetSubPackageById = createAsyncThunk<SubPackage, number>(
    'package/getSubPackageById',
    async (id, thunkAPI) => {
        try {
            const response = await getSubPackageById(id);
            if (!response) {
                return thunkAPI.rejectWithValue({ error: 'Get sub package by id failed' });
            }
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue({ error: (e as Error).message });
        }
    }
)

export const packageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        clearState: (state) => {
            state.description = "";
            state.orderDate = new Date();
            state.error = null;
        },
        updateDescription: (state, action) => {
            state.description = action.payload;
        },
        updateOrderDate: (state, action) => {
            state.orderDate = action.payload;
        },
        addSubPackage: (state, action) => {
            // check if the subpackage already has the subpackage using id
            const subPackage = state.tempararyPackage.subPackages.find((p) => p.serviceId === action.payload.serviceId);
            if (subPackage) {
                return ;
            } 
            state.tempararyPackage.subPackages.push(action.payload);
        },
        packageRemoveEntity: (state, action) => {
            state.packages = state.packages.filter((p) => p.id !== action.payload);
        },
        subPackageRemoveEntity: (state, action) => {
            state.subPackages = state.subPackages.filter((p) => p.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(packageCreate.pending, (state) => {
                state.loading = true;
            })
            .addCase(packageCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.packages.push(action.payload);
            })
            .addCase(packageCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error?: string })?.error || 'Failed to create package';
            })
            .addCase(packageDelete.pending, (state) => {
                state.loading = true;
            })
            .addCase(packageDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.packages = state.packages.filter((p) => p.id !== action.payload);
            })
            .addCase(packageDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error?: string })?.error || 'Failed to delete package';
            })
            .addCase(packageGetAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(packageGetAll.fulfilled, (state, action) => {
                state.loading = false;
                state.packages = action.payload;
            })
            .addCase(packageGetAll.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error?: string })?.error || 'Failed to fetch package';
            })
            .addCase(packageUpdateSubPackage.pending, (state) => {
                state.loading = true;
            })
            .addCase(packageUpdateSubPackage.fulfilled, (state, action) => {
                state.loading = false;
                //find the package and update it
                const index = state.packages.findIndex((p) => p.id === action.payload.id);
                state.packages[index] = action.payload;
            })
            .addCase(packageUpdateSubPackage.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error?: string })?.error || 'Failed to update sub package';
            })
            .addCase(packageGetById.pending, (state) => {
                state.loading = true;
            })
            .addCase(packageGetById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.packages.findIndex((p) => p.id === action.payload.id);
                if(index === -1){
                    state.packages.push(action.payload);
                }
                else{
                    state.packages[index] = action.payload;
                }
            })
            .addCase(packageGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error?: string })?.error || 'Failed to get package by id';
            })
            .addCase(packageGetAllSubPackages.pending, (state) => {
                state.loading = true;
            })
            .addCase(packageGetAllSubPackages.fulfilled, (state, action) => {
                state.loading = false;
                state.subPackages = action.payload;
            })
            .addCase(packageGetAllSubPackages.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error?: string })?.error || 'Failed to get all sub packages';
            })
            .addCase(packageGetSubPackageById.pending, (state) => {
                state.loading = true;
            })
            .addCase(packageGetSubPackageById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.subPackages.findIndex((p) => p.id === action.payload.id);
                if(index === -1){
                    state.subPackages.push(action.payload);
                }
                else{
                    state.subPackages[index] = action.payload;
                }
            })
            .addCase(packageGetSubPackageById.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { error?: string })?.error || 'Failed to get sub package by id';
            });
    },
});

export const { clearState, updateDescription, updateOrderDate, addSubPackage, subPackageRemoveEntity, packageRemoveEntity } = packageSlice.actions;
export default packageSlice.reducer;