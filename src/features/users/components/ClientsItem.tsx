import React, { FC, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import { Client } from '../../../types/types.User';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser, fetchClients } from '../usersThunks';
import { selectUser } from '../usersSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ClientsItem: FC<Client> = ({
  _id,
  address,
  firstName,
  lastName,
  middleName,
  phoneNumber,
  region,
  settlement,
  pupID,
  email,
  marketId,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const [isCollapse, setIsCollapse] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = async () => {
    await dispatch(deleteUser(_id));
    setOpen(false);
    dispatch(fetchClients());
  };

  return (
    <>
      {isSmallScreen ? (
        <Card variant="outlined" sx={{ margin: '10px 0', borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h6">
              {firstName} {lastName}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {email}
            </Typography>
            <Typography variant="body2">
              <strong>Адрес:</strong> {region.name} обл., г. {settlement}, ул.{' '}
              {address}
            </Typography>
            <Typography variant="body2">
              <strong>Телефон:</strong> {phoneNumber}
            </Typography>
            <Typography variant="body2">
              <strong>ПВЗ:</strong>{' '}
              {`${pupID.name} ${pupID.region.name} обл., ${pupID.address}, ${pupID.settlement}`}
            </Typography>
            <Button
              onClick={handleClickOpen}
              color="warning"
              startIcon={<DeleteIcon />}
              sx={{ marginTop: '10px' }}
            >
              Удалить
            </Button>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setIsCollapse(!isCollapse)}
              sx={{ marginTop: '10px' }}
            >
              {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Collapse in={isCollapse} timeout="auto" unmountOnExit>
              <Typography variant="body2">
                <strong>Дополнительная информация:</strong> Market ID -{' '}
                {marketId}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ textTransform: 'uppercase' }}>
                  <TableCell sx={{ width: '40px' }} />
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    ID
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Ф
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    И
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    О
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Почта
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Номер
                  </TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setIsCollapse(!isCollapse)}
                    >
                      {isCollapse ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">{marketId}</TableCell>
                  <TableCell align="left">{firstName}</TableCell>
                  <TableCell align="left">{lastName}</TableCell>
                  <TableCell align="left">{middleName}</TableCell>
                  <TableCell align="left">{email}</TableCell>
                  <TableCell align="left">{phoneNumber}</TableCell>
                  <TableCell>
                    {user &&
                      (user.role === 'super' || user.role === 'admin') && (
                        <Button
                          onClick={handleClickOpen}
                          color="warning"
                          startIcon={<DeleteIcon />}
                        >
                          Удалить
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={8}>
                    <Collapse in={isCollapse} timeout="auto" unmountOnExit>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell style={{ fontWeight: 'bold' }}>
                              Адрес
                            </TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>
                              ПВЗ
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell />
                            <TableCell>{`${region.name} обл., г. ${settlement}, ул. ${address}`}</TableCell>
                            <TableCell>{`${pupID.name} ${pupID.region.name} обл., ${pupID.address}, ${pupID.settlement}`}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить пользователя {firstName} {lastName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAgree} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientsItem;
