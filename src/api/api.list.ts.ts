"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/redux-toolkit/store";
import { RootState } from "../app/redux-toolkit/store";
import {
  fetchHomePageResources,
  fetchSearchResult,
  fetchCharacters,
  fetchProductCategories,
} from "src/app/redux-toolkit/apiWebResources";

export const useFetchApiProductResources = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dataHomePageResources = useSelector(
    (state: RootState) => state.apiResources.isApiHomePageResources
  );
  const dataSearchResult = useSelector(
    (state: RootState) => state.apiResources.isApiSearchResult
  );

  //THIS DATA IS FIXING
  const dataCharacters = useSelector(
    (state: RootState) => state.apiResources.isApiCharacters
  );
  const dataProductCategories = useSelector(
    (state: RootState) => state.apiResources.isApiProductCategories
  );

  const dataProductLoading = useSelector(
    (state: RootState) => state.apiResources.apiLoading
  );

  const dataProductError = useSelector(
    (state: RootState) => state.apiResources.apiError
  );

  useEffect(() => {
    dispatch(fetchHomePageResources());
    dispatch(fetchSearchResult());
    dispatch(fetchCharacters());
    dispatch(fetchProductCategories());
  }, [dispatch]);

  return {
    dataHomePageResources,
    dataSearchResult,
    dataCharacters,
    dataProductCategories,
    dataProductLoading,
    dataProductError,
  };
};
