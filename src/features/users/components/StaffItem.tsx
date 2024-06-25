import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TableCell,
  TableRow,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableContainer,
} from '@mui/material';
import { IStaff, Staff } from '../../../types/types.User';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import EditStaff from '../containers/EditStaff';
import { getStaff } from '../usersThunks';
import StaffWarning from './StaffWarning';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  user: Staff;
  onSubmit: (id: string, data: IStaff) => void;
  onDelete: () => void;
}

const StaffItem: React.FC<Props> = ({ user, onSubmit, onDelete }) => {
  const userRole = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleClickOpen = async () => {
    await dispatch(getStaff(user._id)).unwrap();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickWarningOpen = () => {
    setOpenWarning(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  return (
    <>
      {!isSmallScreen ? (
        <TableContainer component={Paper} sx={{ mb: 4, mt: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ textTransform: 'uppercase' }}>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Почта
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Имя
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Фамилия
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Адрес
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Номер телефона
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{/*{employee}*/}</TableBody>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell align="left">{user.firstName}</TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.address}</TableCell>
                <TableCell align="left">{`+${user.phoneNumber}`}</TableCell>
                {userRole?.role === 'super' && (
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      onClick={handleClickOpen}
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Изменить
                    </Button>
                    <Button
                      onClick={handleClickWarningOpen}
                      size="small"
                      startIcon={<DeleteIcon />}
                      color="warning"
                    >
                      Удалить
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Почта: {user.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Имя: {user.firstName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Фамилия: {user.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Адрес: {user.address}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Номер телефона: {`+${user.phoneNumber}`}
                </Typography>
              </Grid>
              {userRole?.role === 'super' && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Изменить
                  </Button>
                  <Button
                    onClick={handleClickWarningOpen}
                    size="small"
                    startIcon={<DeleteIcon />}
                    color="warning"
                  >
                    Удалить
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
      {open && (
        <EditStaff onClose={handleClose} open={open} onSubmit={onSubmit} />
      )}
      <StaffWarning
        onClose={handleCloseWarning}
        open={openWarning}
        id={user._id}
        onDelete={onDelete}
      />
    </>
  );
};

export default StaffItem;
