import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Badge } from '@mui/material';
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
    <div className='header'>
      <Grid container spacing={1} alignItems={'center'}>
        <Grid xs={2}>
          <img
            src={logo}
            alt=''
            width={150}
            height={50}
            style={{ marginTop: 11, marginLeft: 10 }}
          />
        </Grid>
        <Grid xs={8}>
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
        <Grid xs={2}>
          <IconButton onClick={() => navigate('/cart')} style={{ marginRight: 25, float: 'right' }}>
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
    </div>
  );
};

export default Header;
