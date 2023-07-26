import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: "idle",
// };

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
    const { request } = useHttp();
    return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        // heroesFetching: (state) => {
        //     state.heroesLoadingStatus = "loading";
        // },
        // heroesFetched: (state, action) => {
        //     state.heroes = action.payload;
        //     state.heroesLoadingStatus = "idle";
        // },
        // heroesFetchingError: (state) => {
        //     state.heroesLoadingStatus = "error";
        // },
        createHero: (state, action) => {
            // state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload);
        },
        deleteHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
            // state.heroes = state.heroes.filter(
            //     (hero) => hero.id !== action.payload
            // );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = "loading";
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = "idle";
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = heroesSlice;

export default reducer;

// state.heroes ====================== configureStore --> reducer --> heroes
export const { selectAll } = heroesAdapter.getSelectors(
    (state) => state.heroes
);

export const filteredHeroesSelector = createSelector(
    // (state) => state.heroes.heroes,
    selectAll,
    (state) => state.filters.activeFilter,
    (heroes, activeFilter) => {
        if (activeFilter !== "all") {
            return heroes.filter((hero) => hero.element === activeFilter);
        }

        return heroes;
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    createHero,
    deleteHero,
} = actions;
