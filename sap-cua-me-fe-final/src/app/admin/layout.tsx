"use client";

import React from "react";
import Navbar from "@/components/Admin/NavBar";
import { Box, Container } from "@mui/material";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "white" }}>
      {/* Navbar visible on all admin pages */}
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}