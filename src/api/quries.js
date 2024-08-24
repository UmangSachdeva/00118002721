// Using tan stack react query library for fetching the results
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = (qs, category) => {
  return axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/categories/${category}/products?${qs}`
  );
};

export const useFetchProducts = (category, queryObj = { n: 10 }) => {
  const queryString = new URLSearchParams(queryObj);

  return useQuery({
    queryKey: [`product-${category}`],
    queryFn: () => fetchProducts(queryString, category),
  });
};
