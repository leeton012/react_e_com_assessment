import React, { useEffect } from 'react';
import { Grid, CardActionArea, Card, CardContent, Typography } from '@mui/material';
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
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {productList &&
          productList.map((product, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ width: 400, height: 580 }}>
                <CardActionArea
                  onClick={() =>
                    navigate(`/productDetail/${product.id}`, { state: { product: product } })
                  }>
                  <img src={product.image} alt='' height='400' width='400' />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {product.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ProductList;
