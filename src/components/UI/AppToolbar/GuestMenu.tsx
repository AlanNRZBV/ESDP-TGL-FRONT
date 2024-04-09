import React from 'react';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';

const GuestMenu: React.FC = () => {
  return (
    <>
      <Button component={NavLink} to={appRoutes.register} color="inherit">
        Регистрация
      </Button>
      <Button component={NavLink} to={appRoutes.login} color="inherit">
        Войти
      </Button>
    </>
  );
};

export default GuestMenu;
