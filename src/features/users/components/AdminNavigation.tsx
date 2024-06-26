import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { appRoutes } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { UserNav } from '../../../types/types.User';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RecommendIcon from '@mui/icons-material/Recommend';
import GroupsIcon from '@mui/icons-material/Groups';
import { Block } from '@mui/icons-material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const adminLinks: UserNav[] = [
  {
    id: 1,
    name: 'Мой профиль',
    navLink: appRoutes.myAdminProfile,
    icon: <AccountBoxIcon color="primary" />,
  },
  {
    id: 2,
    name: 'Статистика',
    navLink: appRoutes.statistics,
    icon: <AnalyticsIcon color="primary" />,
  },
  {
    id: 3,
    name: 'ПВЗ',
    navLink: appRoutes.pups,
    icon: <StoreIcon color="primary" />,
  },
  {
    id: 4,
    name: 'Сотрудники',
    navLink: appRoutes.staff,
    icon: <PeopleIcon color="primary" />,
  },
  {
    id: 5,
    name: 'Заказы клиентов',
    navLink: appRoutes.shipments,
    icon: <LocalGroceryStoreIcon color="primary" />,
  },
  {
    id: 6,
    name: 'Создать заказ',
    navLink: appRoutes.shipmentForm,
    icon: <FeedIcon color="primary" />,
  },
  {
    id: 7,
    name: 'Склад в Китае',
    navLink: appRoutes.adminWarehouses,
    icon: <WarehouseIcon color="primary" />,
  },
  {
    id: 8,
    name: 'Физический адрес',
    navLink: appRoutes.adminCompanyAddress,
    icon: <HomeIcon color="primary" />,
  },
  {
    id: 9,
    name: 'Цена',
    navLink: appRoutes.price,
    icon: <CurrencyExchangeIcon color="primary" />,
  },
  {
    id: 10,
    name: 'Прайс-лист',
    navLink: appRoutes.priceLists,
    icon: <CurrencyExchangeIcon color="primary" />,
  },
  {
    id: 11,
    name: 'Социальные сети',
    navLink: appRoutes.socials,
    icon: <RecommendIcon color="primary" />,
  },
  {
    id: 12,
    name: 'Клиенты',
    navLink: appRoutes.adminClients,
    icon: <GroupsIcon color="primary" />,
  },
  {
    id: 13,
    name: 'Запрет',
    navLink: appRoutes.adminBanned,
    icon: <Block color="primary" />,
  },
];

const managerLinks: UserNav[] = [
  {
    id: 1,
    name: 'Мой профиль',
    navLink: appRoutes.myAdminProfile,
    icon: <AccountBoxIcon color="primary" />,
  },
  {
    id: 2,
    name: 'Статистика',
    navLink: appRoutes.statistics,
    icon: <AnalyticsIcon color="primary" />,
  },
  {
    id: 3,
    name: 'ПВЗ',
    navLink: appRoutes.pups,
    icon: <StoreIcon color="primary" />,
  },
  {
    id: 4,
    name: 'Сотрудники',
    navLink: appRoutes.staff,
    icon: <PeopleIcon color="primary" />,
  },
  {
    id: 5,
    name: 'Заказы клиентов',
    navLink: appRoutes.shipments,
    icon: <LocalGroceryStoreIcon color="primary" />,
  },
  {
    id: 7,
    name: 'Склад в Китае',
    navLink: appRoutes.adminWarehouses,
    icon: <WarehouseIcon color="primary" />,
  },
  {
    id: 8,
    name: 'Физический адрес',
    navLink: appRoutes.adminCompanyAddress,
    icon: <HomeIcon color="primary" />,
  },
  {
    id: 9,
    name: 'Цена',
    navLink: appRoutes.price,
    icon: <CurrencyExchangeIcon color="primary" />,
  },
  {
    id: 10,
    name: 'Прайс-лист',
    navLink: appRoutes.priceLists,
    icon: <CurrencyExchangeIcon color="primary" />,
  },
  {
    id: 11,
    name: 'Социальные сети',
    navLink: appRoutes.socials,
    icon: <RecommendIcon color="primary" />,
  },
  {
    id: 12,
    name: 'Клиенты',
    navLink: appRoutes.adminClients,
    icon: <GroupsIcon color="primary" />,
  },
  {
    id: 13,
    name: 'Запрет',
    navLink: appRoutes.adminBanned,
    icon: <Block color="primary" />,
  },
];

const AdminNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const navigate = useNavigate();
  const activePath = location.pathname;

  const user = useAppSelector(selectUser);

  let navigation;

  if (user) {
    if (user.role === 'manager') {
      navigation = managerLinks;
    } else {
      navigation = adminLinks;
    }
  }

  return (
    navigation && (
      <>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderColor: 'grey.400',
            borderRadius: '16px',
            borderWidth: '1px',
          }}
        >
          <nav>
            <List
              dense
              sx={{
                display: isSmallScreen ? 'flex' : '',
                flexWrap: isSmallScreen ? 'wrap' : '',
              }}
            >
              {navigation.map((link) => (
                <ListItem key={link.id} disableGutters>
                  <ListItemButton
                    selected={activePath === link.navLink}
                    onClick={() => {
                      navigate(link.navLink);
                    }}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText
                      primary={link.name}
                      primaryTypographyProps={{
                        fontSize: 16,
                        color:
                          activePath === link.navLink ? 'primary' : 'inherit',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </>
    )
  );
};

export default AdminNavigation;
