import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../Store/reducer/listReducer';
import { useNavigate } from 'react-router-dom';
import Shimmer from './ShimmerUI';

const ProductList = () => {
  const { productList } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('🚀 ~ file: ProductList.js:10 ~ ProductList ~ productList:', productList);

  useEffect(() => {
    dispatch(fetchProductList());
  }, []);

  return !productList.length ? (
    <Shimmer />
  ) : (
    <Grid container spacing={2} style={{ marginTop: 10 }}>
      {productList &&
        productList.map((product) => (
          <Grid item xs={12} sm={6} lg={3} key={product.id}>
            <Card sx={{ maxWidth: 345, height: 250, m: 2 }}>
              <CardActionArea
                onClick={() =>
                  navigate(`/productDetail/${product.id}`, { state: { product: product } })
                }>
                <CardHeader />
                <CardMedia
                  sx={{ height: 140, backgroundSize: 'contain', cursor: 'pointer' }}
                  image={product.image}
                />
                <CardContent>
                  <Typography noWrap variant='subtitle1'>
                    {product.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Rs. {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default ProductList;
