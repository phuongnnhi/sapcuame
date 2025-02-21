import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onLogin, onSignup }) => {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }
    if (isSignupMode && password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }
    setError('');
    isSignupMode ? onSignup(email, password) : onLogin(email, password);
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#F5E6DA' },
      '&:hover fieldset': { borderColor: '#F5E6DA' },
      '&.Mui-focused fieldset': { borderColor: '#F5E6DA' },
    },
    input: { color: '#F5E6DA' },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{
      sx: {
        borderRadius: '20px', 
        backgroundColor: '#5C4033', 
      },
    }}>
      <Box sx={{ backgroundColor: '#5C4033', color: '#F5E6DA', borderRadius: '15px' }}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {isSignupMode ? 'Tạo tài khoản mới' : 'Chào mừng trở lại'}
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center" mb={2}>
            {isSignupMode ? 'Tạo tài khoản để bắt đầu sử dụng Sạp của Mẹ.' : 'Bắt đầu sắm sửa tại Sạp của Mẹ.'}
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: '#F5E6DA' } }}
              InputProps={{ style: { color: '#F5E6DA' } }}
              sx={textFieldStyles}
            />
            <TextField
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={textFieldStyles}
              InputLabelProps={{ style: { color: '#F5E6DA' } }}
              InputProps={{
                style: { color: '#F5E6DA' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#F5E6DA' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {isSignupMode && (
              <TextField
                label="Xác nhận mật khẩu"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                InputLabelProps={{ style: { color: '#F5E6DA' } }}
                InputProps={{ style: { color: '#F5E6DA' } }}
                sx={textFieldStyles}
              />
            )}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            {!isSignupMode && (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{ color: '#F5E6DA' }}
                    />
                  }
                  label={<Typography sx={{ color: '#F5E6DA' }}>Ghi nhớ đăng nhập</Typography>}
                />
                <Link href="#" underline="hover" sx={{ color: '#F5E6DA', fontSize: '0.9rem' }}>
                  Quên mật khẩu?
                </Link>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 1, pb: 3,               paddingLeft: '24px',
              paddingRight: '24px' }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#F5E6DA',
              color: '#5C4033',
              '&:hover': { backgroundColor: '#e8d6c5' },
            }}
            onClick={handleSubmit}
          >
            {isSignupMode ? 'Đăng ký' : 'Đăng nhập'}
          </Button>
          <Typography variant="body2" sx={{ color: '#F5E6DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isSignupMode ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
            <Link
              component="button"
              sx={{ color: '#F5E6DA', marginLeft: '4px', display:'inline', verticalAlign: 'middle'}}
              onClick={() => setIsSignupMode(!isSignupMode)}
            >
              {isSignupMode ? 'Đăng nhập' : 'Đăng ký ngay'}
            </Link>
          </Typography>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AuthModal;