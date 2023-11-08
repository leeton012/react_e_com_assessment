import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Rating, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../Store/reducer/cartReducer';

const ProductDetails = () => {
  const [productDetails, setProdectDetsils] = useState('');
  const { cartList } = useSelector((state) => state.cart); // receiving data from reducer state
  const dispatch = useDispatch(); // sending data to actions

  //useLocation to get the data from productList while navigate to new page
  const location = useLocation();
  const navigate = useNavigate(); // navigate from one page to another

  //if getting data from productList then update the state
  useEffect(() => {
    if (location && location.state && location.state.product) {
      setProdectDetsils(location.state.product);
    }
  }, [location]);

  const addCartData = async () => {
    const existingCartCheck = cartList.some((item) => item.id === productDetails.id);
    // if exists then update qty else add to cart as new data
    if (existingCartCheck) {
      let newCartData = {
        id: productDetails.id,
        type: 'add',
      };
      dispatch(updateCart(newCartData));
    } else {
      dispatch(addToCart(productDetails));
    }
  };

  return (
    <Paper style={{ marginTop: 20, height: '100vh' }}>
      {productDetails && productDetails.title && (
        <Grid container spacing={2}>
          <Grid xs={6} alignContent={'center'}>
            <div style={{ margin: '40px 50px' }}>
              <img src={productDetails.image} alt='' width={400} height={400} />
            </div>
          </Grid>
          <Grid xs={6} style={{ marginTop: 20 }}>
            {/* <h2>{productDetails.title}</h2> */}
            <Typography variant='h5' gutterBottom style={{ wordWrap: 'break-word' }}>
              {productDetails.title}
            </Typography>
            <div style={{ display: 'flex', padding: 5 }}>
              <Typography
                variant='body2'
                style={{ fontSize: 16, margin: '2px 8px', color: 'skyblue' }}>
                {productDetails.rating.rate}
              </Typography>
              <Rating name='read-only' value={productDetails.rating.rate} readOnly />
              <Typography
                variant='body2'
                style={{ fontSize: 16, margin: '2px 8px', color: 'skyblue' }}>
                {productDetails.rating.count}
              </Typography>
            </div>
            <Typography variant='h3' gutterBottom style={{ padding: '16px 0px' }}>
              ₹{productDetails.price}
            </Typography>
            <div style={{ width: 500, padding: '16px 0px' }}>
              <Typography
                //display={'block'}
                //variant='body1'
                component={'h5'}
                style={{ fontSize: 20 }}>
                {productDetails.description}
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Button variant='contained' onClick={addCartData}>
                Add To Cart
              </Button>
              {cartList.length > 0 && (
                <Button
                  variant='contained'
                  onClick={() => navigate('/cart')}
                  style={{ marginLeft: 15 }}>
                  View Cart
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default ProductDetails;
