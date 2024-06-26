import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { FC, useState } from 'react';
import {
  ShipmentData,
  ShipmentStatusData,
} from '../../../types/types.Shipments';
import ShipmentsRowItem from './ShipmentsRowItem';
import { Statuses } from '../../../utils/constants';
import { useAppDispatch } from '../../../app/hooks';
import ShipmentsTableHead from './ShipmentsTableHead';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { changeShipmentsStatus } from '../shipmentsThunk';

interface Props {
  onDataSend: () => void;
  state: ShipmentData[];
  searchResult?: ShipmentData | null;
}

const ShipmentsTable: FC<Props> = ({ onDataSend, state, searchResult }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const statuses = Statuses;

  const [statusState, setStatusState] = useState<ShipmentStatusData[]>([]);
  const [multipleStatus, setMultipleStatus] = useState<string>('');
  const [multiplePayment, setMultiplePayment] = useState<string>('');

  const isInitial = statusState.length === 0;
  const [selected, setSelected] = useState<string[]>([]);
  const isLargeScreen = useMediaQuery('(min-width:860px)');
  const isExtraLarge = useMediaQuery('(min-width:1024px)');
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const setIsPaidToFalse = () => {
    setStatusState((prevState) =>
      prevState.map((item) => ({
        ...item,
        isPaid: false,
      })),
    );
  };
  const setIsPaidToTrue = () => {
    setStatusState((prevState) =>
      prevState.map((item) => ({
        ...item,
        isPaid: true,
      })),
    );
  };

  const sendData = async () => {
    await dispatch(changeShipmentsStatus(statusState));
    onDataSend();
  };

  const createItem = (_id: string, status: string, isPaid: boolean) => {
    const item: ShipmentStatusData = {
      _id: _id,
      status: status,
      isPaid: isPaid,
    };
    setStatusState((prevState) => [...prevState, item]);
  };

  const removeItem = (_id: string) => {
    setStatusState((prevState) => prevState.filter((item) => item._id !== _id));
  };

  const multipleStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleStatus(e.target.value);
    setStatusState((prevState) =>
      prevState.map((item) => ({
        ...item,
        status: e.target.value,
      })),
    );
  };

  const multiplePaymentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMultiplePayment(e.target.value);
  };

  const changeHandler = (_id: string, status: string, isPaid: boolean) => {
    setStatusState((prevState) =>
      prevState.map((item) =>
        item._id === _id
          ? {
              ...item,
              status,
              isPaid,
            }
          : item,
      ),
    );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const currentItems = state.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
      const newSelected = currentItems.map((n) => n._id);
      setSelected(newSelected);
      const newStatusState = currentItems.map((shipment) => ({
        _id: shipment._id,
        status: shipment.status,
        isPaid: shipment.isPaid,
      }));
      setStatusState(newStatusState);
      return;
    }
    setSelected([]);
    setStatusState([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.length) : 0;

  const rowsCount = state.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderMultiple = (
    rowsPerPage > 0
      ? state.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : state
  ).map((shipment) => {
    const isItemSelected = isSelected(shipment._id);

    return (
      <ShipmentsRowItem
        shipment={shipment}
        key={shipment._id}
        createItem={createItem}
        removeItem={removeItem}
        isItemSelected={isItemSelected}
        handleClick={handleClick}
        changeHandler={changeHandler}
      />
    );
  });

  let renderSingle;

  if (searchResult) {
    renderSingle = (
      <ShipmentsRowItem
        shipment={searchResult}
        key={searchResult._id}
        createItem={createItem}
        removeItem={removeItem}
        handleClick={handleClick}
        changeHandler={changeHandler}
      />
    );
  } else if (searchResult === null) {
    renderSingle = (
      <TableRow>
        <TableCell>
          <Typography>Заказ не найден!</Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <Grid
        display="flex"
        alignItems="center"
        sx={{
          py: 3,
          px: 2,
          mb: 6,
          backgroundColor: '#ECF3F3',
          borderRadius: 2,
        }}
      >
        {!isInitial ? (
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography gutterBottom>
                Выбрано грузов: <b>{selected.length}</b>
              </Typography>
            </Grid>
            <Grid
              spacing={2}
              item
              container
              xs={12}
              md={8}
              component="form"
              flexGrow={1}
              flexBasis="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  required
                  size="small"
                  name="statusAll"
                  id="statusAll"
                  value={multipleStatus}
                  onChange={multipleStatusHandler}
                  label="Статус"
                  fullWidth
                  sx={{ marginRight: '8px', flexBasis: '25%' }}
                >
                  <MenuItem disabled style={{ fontSize: '14px' }}>
                    Выберите статус
                  </MenuItem>
                  {statuses.map((status) => (
                    <MenuItem
                      key={status}
                      value={status}
                      style={{ fontSize: '14px' }}
                    >
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  required
                  fullWidth
                  size="small"
                  name="payment"
                  id="payment"
                  label="Оплата"
                  value={multiplePayment}
                  onChange={multiplePaymentHandler}
                  sx={{ marginRight: '8px', flexBasis: '25%' }}
                >
                  <MenuItem disabled style={{ fontSize: '14px' }}>
                    Выберите статус
                  </MenuItem>
                  <MenuItem
                    onClick={setIsPaidToFalse}
                    value="Не оплачено"
                    style={{ fontSize: '14px' }}
                  >
                    Не оплачено
                  </MenuItem>
                  <MenuItem
                    onClick={setIsPaidToTrue}
                    value="Оплачено"
                    style={{ fontSize: '14px' }}
                  >
                    Оплачено
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  onClick={sendData}
                  disabled={isInitial}
                  variant="contained"
                >
                  Подтвердить
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography sx={{ fontSize: '14px' }}>
            Выберите грузы для массового изменения статуса
          </Typography>
        )}
      </Grid>

      <TableContainer component={Paper}>
        <Table stickyHeader size={!isExtraLarge ? 'small' : 'medium'}>
          <TableHead>
            <ShipmentsTableHead
              numSelected={selected.length}
              rowCount={rowsCount.length}
              onSelectAllClick={handleSelectAllClick}
            />
          </TableHead>
          <TableBody>
            {searchResult !== undefined ? renderSingle : renderMultiple}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <tfoot>
            <TableRow>
              <TablePagination
                width={100}
                rowsPerPageOptions={[5, 10, 20]}
                colSpan={!isLargeScreen ? 4 : 12}
                labelRowsPerPage={
                  !isLargeScreen ? '' : 'Количество на странице'
                }
                count={state.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      display: 'none',
                      'aria-label': 'Показать',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShipmentsTable;
