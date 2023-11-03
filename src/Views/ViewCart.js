import { Grid, List, ListItem, Typography, IconButton } from '@mui/material';
import { Remove, Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCart } from '../Store/reducer/cartReducer';
import { useCallback, useMemo } from 'react';

const ViewCart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = useMemo(() => {
    // round up the total
    let sum = cartList.reduce((acc, crr) => Math.round(acc + crr.qty * crr.price), 0);
    return sum;
  }, [cartList]);

  const remove = useCallback((id, qty) => {
    if (qty === 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCart({ id: id, type: 'minus' }));
    }
  }, []);
  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        <List>
          {cartList &&
            cartList.map((cart, index) => (
              <ListItem key={index}>
                <Grid container spacing={1}>
                  <Grid xs={4}>
                    <img src={cart.image} alt='' height={300} width={300} />
                  </Grid>
                  <Grid xs={8}>
                    <Typography variant='h5'>{cart.title}</Typography>
                    <Typography variant='h5' style={{ marginTop: 20 }}>
                      ₹{cart.price * cart.qty}
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        border: ' 1px solid grey',
                        width: '15%',
                        borderRadius: '20px',
                        padding: 2,
                        marginTop: '20px',
                        justifyContent: 'space-between',
                      }}>
                      <div style={{ borderRight: 'solid' }}>
                        <IconButton
                          aria-label='minus'
                          size='small'
                          onClick={() => remove(cart.id, cart.qty)}>
                          <Remove style={{ color: 'black' }} />
                        </IconButton>
                      </div>
                      <div>
                        <Typography variant='subtitle1'>{cart.qty}</Typography>
                      </div>
                      <div style={{ borderLeft: 'solid' }}>
                        <IconButton
                          aria-label='add'
                          size='small'
                          onClick={() => dispatch(updateCart({ id: cart.id, type: 'add' }))}>
                          <Add style={{ color: 'black' }} />
                        </IconButton>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
        </List>
        <Typography variant='h5' style={{ textAlign: 'center' }}>
          Subtotal ₹{totalPrice}
        </Typography>
      </div>
    </div>
  );
};

export default ViewCart;
