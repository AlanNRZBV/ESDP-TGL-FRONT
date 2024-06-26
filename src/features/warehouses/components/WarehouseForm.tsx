import React, { useState } from 'react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { WarehouseMutation } from '../../../types/types.Warehouses';
import { useAppSelector } from '../../../app/hooks';
import { isWarehousesCreateLoading } from '../warehousesSlice';
import PhoneInput from 'react-phone-input-2';
import { selectRegisterError } from '../../users/usersSlice';

interface Props {
  onSubmit: (mutation: WarehouseMutation) => void;
  isEdit?: boolean;
  initialWarehouse?: WarehouseMutation;
}

const initialState = {
  name: '',
  address: '',
  phoneNumber: '',
};

const WarehouseForm: React.FC<Props> = ({
  onSubmit,
  isEdit = false,
  initialWarehouse = initialState,
}) => {
  const isCreateLoading = useAppSelector(isWarehousesCreateLoading);
  const error = useAppSelector(selectRegisterError);

  const [state, setState] = useState<WarehouseMutation>(initialWarehouse);
  const [phoneNumberLabel, setPhoneNumberLabel] = useState<string>('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handlePhoneChange = (value: string) => {
    setState((prevState) => {
      if (value.length < 13) {
        setPhoneNumberLabel('Номер должен быть введен полностью');
      } else if (value.length > 12) {
        setPhoneNumberLabel('');
      }
      return { ...prevState, phoneNumber: value };
    });
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (state.phoneNumber.length < 13) {
      setPhoneNumberLabel('Пропишите номер полностью');
      return;
    }
    onSubmit(state);
  };

  return (
    <Container component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {isEdit ? 'Обновить склад' : 'Добавить склад'}
        </Typography>
        <Box
          component="form"
          onSubmit={submitFormHandler}
          sx={{ mt: 3, width: '100%' }}
        >
          <Grid container spacing={2} alignItems="start">
            <Grid
              container
              item
              xs={12}
              sm={6}
              direction="row"
              spacing={2}
              sx={{ margin: 'auto' }}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Название"
                  type="text"
                  value={state.name}
                  autoComplete="new-name"
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="address"
                  label="Адрес"
                  type="text"
                  value={state.address}
                  autoComplete="new-address"
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="phoneNumber" className="custom-tel-label">
                  Номер телефона*
                </label>
                <PhoneInput
                  country="cn"
                  masks={{ cn: '(..) ...-....-..' }}
                  onlyCountries={['cn']}
                  containerStyle={{ width: '100%' }}
                  value={state.phoneNumber}
                  countryCodeEditable={false}
                  onChange={handlePhoneChange}
                  disableDropdown
                  inputStyle={{
                    width: '100%',
                    borderColor: getFieldError('phoneNumber') && '#d32f2f',
                    color: getFieldError('phoneNumber') && '#d32f2f',
                  }}
                  inputProps={{
                    id: 'phoneNumber',
                    name: 'phoneNumber',
                    required: true,
                  }}
                />
                {getFieldError('phoneNumber') ? (
                  <Typography
                    sx={{
                      fontSize: '12px',
                      ml: '14px',
                      mt: '4px',
                      color: '#d32f2f',
                    }}
                  >
                    {getFieldError('phoneNumber')}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontSize: '12px',
                      ml: '14px',
                      mt: '4px',
                      color: '#d32f2f',
                    }}
                  >
                    {phoneNumberLabel}
                  </Typography>
                )}
              </Grid>
              <LoadingButton
                type={'submit'}
                variant="contained"
                loading={isCreateLoading}
                disabled={isCreateLoading}
                sx={{ marginTop: 1, marginLeft: 2, width: 690 }}
              >
                {isEdit ? 'Обновить' : 'Добавить'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default WarehouseForm;
