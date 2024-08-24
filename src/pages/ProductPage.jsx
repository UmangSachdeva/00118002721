import React from "react";
import { Grid, Typography, Rating, Chip } from "@mui/material";

function ProductPage() {
  return (
    <div className="max-w-md mx-auto p-4 pt-6">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className="font-bold">
            Product Name: Apple iPhone 13
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className="text-gray-600">
            Price: $999.99
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Rating value={4.5} precision={0.5} readOnly />
          <Typography variant="body2" className="text-gray-600">
            (1234 reviews)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Chip label="10% off" className="bg-orange-500 text-white" />
          <Typography variant="body2" className="text-gray-600">
            Discount: 10% off
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className="text-gray-600">
            Category: Electronics Smartphones
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductPage;
