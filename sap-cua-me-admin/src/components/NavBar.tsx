import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Trang chủ
                </Button>
                <Button color="inherit" component={Link} to="/products">
                    Sản phẩm
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;