import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import {
  apiHomePageResources,
  apiSearchResult,
  apiCharacters,
  apiProductCategories,
} from "src/app/services/ProductService";

import { ProductCategories } from "../types/dataType";

export const fetchHomePageResources = createAsyncThunk(
  "api/fetchHomePageResources",
  apiHomePageResources
);

export const fetchSearchResult = createAsyncThunk(
  "api/fetchSearchResult",
  apiSearchResult
);

export const fetchCharacters = createAsyncThunk(
  "api/fetchCharacters",
  apiCharacters
);

export const fetchProductCategories = createAsyncThunk(
  "api/fetchProductCategories",
  apiProductCategories
);

interface ApiState {
  isApiHomePageResources: ProductCategories[];
  isApiSearchResult: ProductCategories[];
  isApiCharacters: ProductCategories[];
  isApiProductCategories: ProductCategories[];
  apiLoading: boolean;
  apiError: string | null;
}

const initialState: ApiState = {
  isApiHomePageResources: [],
  isApiSearchResult: [],
  isApiCharacters: [],
  isApiProductCategories: [],
  apiLoading: false,
  apiError: null,
};

const apiWebResources = createReducer(initialState, (builder) => {
  builder
    //pending
    .addCase(fetchHomePageResources.pending, (state) => {
      state.apiLoading = true;
    })
    .addCase(fetchSearchResult.pending, (state) => {
      state.apiLoading = true;
    })
    .addCase(fetchCharacters.pending, (state) => {
      state.apiLoading = true;
    })
    .addCase(fetchProductCategories.pending, (state) => {
      state.apiLoading = true;
    })

    //fulfilled
    .addCase(fetchHomePageResources.fulfilled, (state, action) => {
      state.apiLoading = false;
      state.isApiHomePageResources = action.payload;
    })
    .addCase(fetchSearchResult.fulfilled, (state, action) => {
      state.apiLoading = false;
      state.isApiSearchResult = action.payload;
    })
    .addCase(fetchCharacters.fulfilled, (state, action) => {
      state.apiLoading = false;
      state.isApiCharacters = action.payload;
    })
    .addCase(fetchProductCategories.fulfilled, (state, action) => {
      state.apiLoading = false;
      state.isApiProductCategories = action.payload;
    })

    //rejected
    .addCase(fetchHomePageResources.rejected, (state, action) => {
      state.apiLoading = false;
      state.apiError =
        action.error.message || "Failed to fetch home page resources";
    })
    .addCase(fetchSearchResult.rejected, (state, action) => {
      state.apiLoading = false;
      state.apiError = action.error.message || "Failed to fetch search result";
    })
    .addCase(fetchCharacters.rejected, (state, action) => {
      state.apiLoading = false;
      state.apiError =
        action.error.message || "Failed to fetch hero categories";
    })
    .addCase(fetchProductCategories.rejected, (state, action) => {
      state.apiLoading = false;
      state.apiError =
        action.error.message || "Failed to fetch product categories";
    });
});

export default apiWebResources;
