"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Link href="/admin" passHref>
          <Button color="inherit">Trang chủ</Button>
        </Link>
        <Link href="/admin/products" passHref>
          <Button color="inherit">Sản phẩm</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
