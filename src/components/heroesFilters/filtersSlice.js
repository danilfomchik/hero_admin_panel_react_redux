import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: "idle",
//     activeFilter: "all",
// };

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: "idle",
    activeFilter: "all",
});

export const fetchFilters = createAsyncThunk("filters/fetchFilters", () => {
    const { request } = useHttp();
    return request("http://localhost:3001/filters");
});

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        // filtersFetching: (state) => {
        //     state.filtersLoadingStatus = "loading";
        // },
        // filtersFetched: (state, action) => {
        //     state.filters = action.payload;
        //     state.filtersLoadingStatus = "idle";
        // },
        // filtersFetchingError: (state) => {
        //     state.filtersLoadingStatus = "error";
        // },
        filterHeroes: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.filtersLoadingStatus = "loading";
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                // state.filters = action.payload;
                filtersAdapter.setAll(state, action.payload);
                state.filtersLoadingStatus = "idle";
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = filtersSlice;

export const { selectAll } = filtersAdapter.getSelectors(
    (state) => state.filters
);

// export const filterInfoSelector = createSelector(
//     (state) => state.filters.activeFilter,
//     selectAll,
//     (state) => state.filters.filtersLoadingStatus,
//     (activeFilter, filters, filtersLoadingStatus) => {
//         return {
//             activeFilter,
//             filters,
//             filtersLoadingStatus,
//         };
//     }
// );

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterHeroes,
} = actions;
