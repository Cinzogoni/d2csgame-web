import axios from "axios";
import { ProductCategories, User } from "../types/dataType";

// lam_dev thay api url tất cả đây
const REST_API_PRODUCTS_URL = `http://localhost:8080/api/products`;
const apiHomePageResources = async (): Promise<ProductCategories[]> => {
  const response = await axios.get<ProductCategories[]>(REST_API_PRODUCTS_URL);
  const data = response.data;
  return data;
};

const REST_API_SEARCH_URL = `http://localhost:8080/api/search`;
const apiSearchResult = async (): Promise<ProductCategories[]> => {
  const response = await axios.get<ProductCategories[]>(REST_API_SEARCH_URL);
  const data = response.data;
  return data;
};

//
const REST_API_HERO_CATEGORIES_URL = `http://localhost:8080/api/heros`;
const apiHeroCategories = async (): Promise<ProductCategories[]> => {
  const response = await axios.get<ProductCategories[]>(
    REST_API_HERO_CATEGORIES_URL
  );
  const data = response.data;
  return data;
};

const REST_API_PRODUCTS_CATEGORIES_URL = `http://localhost:8080/api/products-categories`;
const apiProductCategories = async (): Promise<ProductCategories[]> => {
  const response = await axios.get<ProductCategories[]>(
    REST_API_PRODUCTS_CATEGORIES_URL
  );
  const data = response.data;
  return data;
};

const REST_API_USER_URL = `http://localhost:8080/api/user`;
const apiUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(REST_API_USER_URL);
  const data = response.data;
  return data;
};

export {
  apiHomePageResources,
  apiSearchResult,
  apiHeroCategories,
  apiProductCategories,
  apiUsers,
};
