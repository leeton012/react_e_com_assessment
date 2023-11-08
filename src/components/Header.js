import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Badge, AppBar, Grid } from '@mui/material';
import logo from '../assets/images/new_e_logo.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList, fetchSearchProduct } from '../Store/reducer/listReducer';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const [searchText, setSraechText] = useState('');
  const searchHandler = () => {
    if (searchText) {
      dispatch(fetchSearchProduct(searchText));
    } else {
      dispatch(fetchProductList());
    }
  };
  return (
    <AppBar position='static'>
      <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <IconButton
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', '&:hove': { borderColor: 'white' } }}>
            <img src={logo} alt='' width={100} height={50} />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            placeholder='Search Here'
            onChange={(e) => setSraechText(e.target.value)}
            //for press enter on the searchbox
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                searchHandler();
              }
            }}
            InputProps={{
              className: 'input-search',
              endAdornment: (
                <IconButton onClick={searchHandler}>
                  <InputAdornment position='end'>
                    <SearchOutlinedIcon style={{ color: 'black', cursor: 'pointer' }} />
                  </InputAdornment>
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => navigate('/cart')}>
            {cartList && cartList.length > 0 ? (
              <Badge badgeContent={cartList.length} color='primary'>
                <ShoppingCartOutlinedIcon style={{ color: 'white', fontSize: 40 }} />
              </Badge>
            ) : (
              <ShoppingCartOutlinedIcon style={{ color: 'white', fontSize: 40 }} />
            )}
            {/* <ShoppingCartOutlinedIcon style={{ color: 'white', fontSize: 40 }} /> */}
          </IconButton>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
