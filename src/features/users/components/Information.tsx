import Warehouses from '../../warehouses/Warehouses';
import { Alert, Grid } from '@mui/material';
import Banned from '../../banned/Banned';

const Information = () => {
  return (
    <>
      <Grid container direction="column" item>
        <Grid item xs m={2}>
          <Alert severity="info">
            Ниже представлен Ваш адрес. Скопируйте его и вставьте в графу адреса
            на маркетплейсах.
          </Alert>
        </Grid>
        <Grid item xs m={2}>
          <Warehouses />
          <Banned />
        </Grid>
      </Grid>
    </>
  );
};

export default Information;
