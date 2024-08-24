import React from "react";
import { Card, CardContent, Typography, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductCard({
  productName,
  price,
  rating,
  discount,
  availability,
  id,
}) {
  const nav = useNavigate();

  const handleNavigate = () => {
    nav("/product" + id);
  };

  return (
    <Card
      onClick={() => handleNavigate()}
      style={{ maxWidth: 300, margin: 10 }}
      className="cursor-pointer w-full"
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {productName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          ${price}
        </Typography>
        <Rating value={rating} readOnly />
        {discount > 0 && (
          <Typography variant="body2" color="error">
            {discount}% off
          </Typography>
        )}
        <Typography
          variant="body2"
          color={availability ? "textSecondary" : "error"}
        >
          {availability ? "In stock" : "Out of stock"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
