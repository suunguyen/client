import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { USER_UPDATE_INFORMATION_REQUEST } from 'app/saga/auth/actionType';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../../components/form-controls/InputField';
import useStyle from './useStyle';
import ColoredLinearProgress from '../../../components/common/loadingLinearProgress';
import { loading, notLoading } from '../../Auth/userSlice';

function Inforuser() {
  const classes = useStyle();
  const { userData } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentVisiblePw, setCurrentVisiblePw] = useState(false);
  const [newVisiblePw, setNewVisiblePw] = useState(false);
  const [reNewVisiblePw, setReNewVisiblePw] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('fullName', userData.fullName);
    setValue('email', userData.email);
    setValue('displayName', userData.displayName);
  }, [userData]);

  const onSubmit = async (data) => {
    try {
      dispatch(loading());
      await dispatch({ type: USER_UPDATE_INFORMATION_REQUEST, data, userId: userData.userId });
    } catch (e) {
      dispatch(notLoading());
    }
  };

  return (
    <React.Fragment>
      {isLoading && <ColoredLinearProgress />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={`${classes.root} ${classes.p20}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: 'auto',
          margin: '0px',
        }}
      >
        <Typography className={`${classes.titleInfor}`}>Th??ng tin t??i kho???n</Typography>
        <InputField
          size="small"
          placeholder="H??? t??n"
          error={Boolean(errors.email)}
          inputProps={{
            name: 'fullName',
            autoFocus: true,
            ...register('fullName', {
              required: 'Vui l??ng kh??ng b??? tr???ng t??n ng?????i d??ng!',
              // pattern: {
              //   value: /^[a-zA-Z-]+ ?.* [a-zA-Z-]+$/,
              //   message: 'T??n ng?????i d??ng kh??ng ???????c ch???a k?? t??? ?????c bi???t ho???c s???!',
              // },
            }),
          }}
          errorMessage={errors.fullName?.message}
        />
        <InputField
          disabled
          size="small"
          placeholder="Email"
          error={Boolean(errors.email)}
          inputProps={{
            name: 'email',
            autoFocus: true,
            ...register('email'),
          }}
          errorMessage={errors.email?.message}
        />
        <InputField
          size="small"
          placeholder="T??n hi???n th???"
          error={Boolean(errors.email)}
          inputProps={{
            name: 'displayName',
            autoFocus: false,
            ...register('displayName', {
              // pattern: {
              //   value: /^(?![- '])(?![????????????])[- '0-9a-z??-??]+(?<![- '])$/g,
              //   message: 'DisplayName kh??ng ???????c ch???a k?? t??? ?????t bi???t!',
              // },
            }),
          }}
          errorMessage={errors.displayName?.message}
        />
        <Typography className={`${classes.titleInfor}`}>
          Thay ?????i m???t kh???u
          <Typography className={classes.subTitlleInfor}>(B??? tr???ng n???u kh??ng thay ?????i)</Typography>
        </Typography>
        <InputField
          size="small"
          placeholder="M???t kh???u hi???n t???i"
          error={Boolean(errors.password)}
          inputProps={{
            name: 'oldPassword',
            maxLength: 20,
            type: currentVisiblePw ? 'text' : 'password',
            ...register('oldPassword', {}),
          }}
          endAdornment={
            currentVisiblePw ? (
              <VisibilityIcon
                className={`${classes.ico} ${classes.visiblePw}`}
                onClick={() => setCurrentVisiblePw(false)}
              />
            ) : (
              <VisibilityOffIcon
                className={classes.ico}
                onClick={() => setCurrentVisiblePw(true)}
              />
            )
          }
          errorMessage={errors.oldPassword?.message}
        />
        <InputField
          size="small"
          placeholder="M???t kh???u m???i"
          error={Boolean(errors.password)}
          inputProps={{
            name: 'password',
            maxLength: 20,
            type: newVisiblePw ? 'text' : 'password',
            ...register('password', {
              minLength: {
                value: 8,
                message: 'Password ph???i h??n 8 k?? t???',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                message: 'Ph???i c?? ??t nh???t 1 ch??? c??i in hoa, 1 ch??? th?????ng v?? 1 k?? t??? ?????t bi???t',
              },
            }),
          }}
          endAdornment={
            newVisiblePw ? (
              <VisibilityIcon
                className={`${classes.ico} ${classes.visiblePw}`}
                onClick={() => setNewVisiblePw(false)}
              />
            ) : (
              <VisibilityOffIcon className={classes.ico} onClick={() => setNewVisiblePw(true)} />
            )
          }
          errorMessage={errors.password?.message}
        />
        <InputField
          size="small"
          placeholder="Nh???p l???i m???t kh???u m???i"
          error={Boolean(errors.password)}
          inputProps={{
            name: 'reNewPassword',
            maxLength: 20,
            type: reNewVisiblePw ? 'text' : 'password',
            ...register('reNewPassword', {
              validate: (value) =>
                value === watch('password') || 'Kh??ng kh???p v???i password ???? nh???p ??? tr??n',
            }),
          }}
          endAdornment={
            reNewVisiblePw ? (
              <VisibilityIcon
                className={`${classes.ico} ${classes.visiblePw}`}
                onClick={() => setReNewVisiblePw(false)}
              />
            ) : (
              <VisibilityOffIcon className={classes.ico} onClick={() => setReNewVisiblePw(true)} />
            )
          }
          errorMessage={errors.reNewPassword?.message}
        />
        <Button className={classes.btn} type="submit" fullWidth>
          L??u thay ?????i
        </Button>
      </form>
    </React.Fragment>
  );
}

Inforuser.propTypes = {};

export default Inforuser;
