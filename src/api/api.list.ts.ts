import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/redux-toolkit/store";
import { RootState } from "../app/redux-toolkit/store";
import {
  fetchHomePageResources,
  fetchSearchResult,
  fetchHeroCategories,
  fetchProductCategories,
} from "src/app/redux-toolkit/apiWebResources";

const dispatch = useDispatch<AppDispatch>();

const dataHomePageResources = useSelector(
  (state: RootState) => state.api.isApiHomePageResources
);
const dataSearchResult = useSelector(
  (state: RootState) => state.api.isApiSearchResult
);
const dataHeroCategories = useSelector(
  (state: RootState) => state.api.isApiHeroCategories
);
const dataProductCategories = useSelector(
  (state: RootState) => state.api.isApiProductCategories
);

const isApiLoading = useSelector((state: RootState) => state.api.apiLoading);
const isApiError = useSelector((state: RootState) => state.api.apiError);

useEffect(() => {
  dispatch(fetchHomePageResources());
  dispatch(fetchSearchResult());
  dispatch(fetchHeroCategories());
  dispatch(fetchProductCategories());
}, [dispatch]);

export {
  dataHomePageResources,
  dataSearchResult,
  dataHeroCategories,
  dataProductCategories,
  isApiLoading,
  isApiError,
};
