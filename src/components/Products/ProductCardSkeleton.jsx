import React from "react";

import { Box, Skeleton } from "@mui/material";

function ProductCardSkeleton() {
  return (
    <Box className="flex flex-col gap-4">
      <Skeleton variant="rectangular" width={200} height={150} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={200} />
    </Box>
  );
}

export default ProductCardSkeleton;
