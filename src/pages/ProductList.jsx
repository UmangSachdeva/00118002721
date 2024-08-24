import React, { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Box,
  Button,
  Pagination,
} from "@mui/material";
// import { useFetchProducts } from "../api/queries";
import ProductCard from "../components/Products/ProductCard";
import { useFetchProducts } from "../api/quries";
import ProductCardSkeleton from "../components/Products/ProductCardSkeleton";

function ProductList() {
  const [category, setCategory] = useState("Phone");
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [page, setPage] = useState(1); // add page state
  const {
    data: products,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useFetchProducts(category, {
    minPrice,
    maxPrice,
    page, // send page with API request
  });

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleApplyFilters = () => {
    refetch();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (page) {
      // if page changes then only reload
      refetch();
    }
  }, [page]);

  return (
    <Box className="flex flex-col gap-10" container spacing={2}>
      <Box>
        <Typography variant="h2">Product List</Typography>
      </Box>

      <Box className="w-full flex gap-4" item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange}>
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Laptop">Laptop</MenuItem>
            <MenuItem value="Tablet">Tablet</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          fullWidth
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleApplyFilters}>
          Apply
        </Button>
      </Box>

      {isLoading || isRefetching ? (
        <Box className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 w-full justify-center">
          {[1, 2, 3, 4].map((index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </Box>
      ) : error ? (
        <Grid item xs={12}>
          <Typography>Error: {error.message}</Typography>
        </Grid>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 w-full justify-center">
          {products?.data?.data?.map((prod) => (
            <ProductCard {...prod} key={prod?.id} />
          ))}
        </Box>
      )}

      {/* Only show pagination when the pages are more than one */}
      {products?.data?.total / 10 > 1 && (
        <Box className="w-full flex justify-center">
          <Pagination
            count={products?.data?.total / 10}
            page={page}
            onChange={handlePageChange}
            className="mt-4"
          />
        </Box>
      )}
    </Box>
  );
}

export default ProductList;
