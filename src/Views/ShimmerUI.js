import { Grid, Card } from '@mui/material';

const Shimmer = () => {
  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} style={{ display: 'flex' }}>
          <Card sx={{ width: 400, height: 580 }} />
        </Grid>
      </Grid>
    </div>
  );
};
export default Shimmer;
