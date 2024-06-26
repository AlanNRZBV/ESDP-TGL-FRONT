import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import OrdersRowItem from './OrdersRowItem';
import OrderModal from './OrderModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrdersLoading } from '../ordersSlice';
import { useEffect } from 'react';
import { fetchShipmentsByUser } from '../../shipments/shipmentsThunk';
import { selectUser } from '../../users/usersSlice';
import { selectShipments } from '../../shipments/shipmentsSlice';
import OrdersCard from './OrdersCard';

const OrdersTable = () => {
  const smallScreen = useMediaQuery('(max-width:1045px)');

  const loading = useAppSelector(selectOrdersLoading);
  const dispatch = useAppDispatch();
  const shipments = useAppSelector(selectShipments);
  const user = useAppSelector(selectUser);
  const isEmpty = shipments.length === 0;

  useEffect(() => {
    if (user) {
      dispatch(fetchShipmentsByUser(user?.marketId));
    }
  }, [dispatch, user]);
  return (
    <>
      {isEmpty ? (
        <Typography>Нет заказов</Typography>
      ) : (
        <>
          <OrderModal />
          {loading && <CircularProgress />}
          <Grid container spacing={3}>
            {smallScreen ? (
              shipments.map((item) => (
                <OrdersCard
                  key={item._id}
                  _id={item._id}
                  status={item.status}
                  pupId={item.pupId}
                  price={item.price}
                  trackerNumber={item.trackerNumber}
                  delivery={item.delivery}
                />
              ))
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Трекинговый номер</TableCell>
                      <TableCell align="left">Адрес ПВЗ</TableCell>
                      <TableCell align="left">Стоимость</TableCell>
                      <TableCell align="left">Статус</TableCell>
                      <TableCell align="left">Доставка заказа</TableCell>
                      <TableCell align="left">Отмена заказа</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipments.map((item) => (
                      <OrdersRowItem
                        key={item._id}
                        _id={item._id}
                        status={item.status}
                        pupId={item.pupId}
                        price={item.price}
                        trackerNumber={item.trackerNumber}
                        delivery={item.delivery}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default OrdersTable;
