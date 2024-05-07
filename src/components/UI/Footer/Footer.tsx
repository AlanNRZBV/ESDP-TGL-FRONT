import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import tt from '..//..//../assets/tt.svg';
import inst from '..//..//../assets/instagram.svg';
import wtsp from '..//..//../assets/whatsapp.svg';
import SocialMedia from './SocialMedia';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCompanyAddresses } from '../../../features/companyAddress/companyAddressThunks';
import { companyAddressState } from '../../../features/companyAddress/companyAddressesSlice';

const Footer = () => {
  const isSmallScreen = useMediaQuery('(max-width:660px)');

  const dispatch = useAppDispatch();
  const addresses = useAppSelector(companyAddressState);
  const isEmpty = addresses.length === 0;

  useEffect(() => {
    dispatch(fetchCompanyAddresses());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        display="flex"
        alignItems="center"
        color="white"
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
        <Grid item xs={3} sx={{ display: isSmallScreen ? 'none' : '' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TechGear Logistics
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={1}>
            <PlaceIcon color="inherit" />
            <Box>
              {isEmpty ? (
                <Typography>Адрес обновляется</Typography>
              ) : (
                <>
                  <Typography variant="body1">
                    {addresses[0].address}, {addresses[0].district},{' '}
                    {addresses[0].city}, {addresses[0].postCode}
                  </Typography>
                </>
              )}
            </Box>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mt: { xs: 2, sm: 0 },
            justifyContent: { sm: 'flex-end', xs: 'center' },
          }}
        >
          <SocialMedia
            tiktok
            alt="ТикТок"
            href="https://www.tiktok.com/@techgear.logistics"
            imagePath={tt}
          />

          <SocialMedia
            instagram
            alt="Инстаграм"
            href="https://www.instagram.com/cargo.878_kg"
            imagePath={inst}
          />

          <SocialMedia
            whatsapp
            alt="WhatsApp"
            href="https://wa.me/996222601960?text=Здравствуйте,"
            imagePath={wtsp}
          />
          <Stack direction="row" spacing={2}></Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
