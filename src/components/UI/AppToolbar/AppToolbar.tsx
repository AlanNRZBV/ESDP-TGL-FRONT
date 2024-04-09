import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import GuestMenu from './GuestMenu';

const AppToolbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TechGear Logistics
        </Typography>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          Тут телефоны для связи
        </Typography>
        <Box display="flex">
          <GuestMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
