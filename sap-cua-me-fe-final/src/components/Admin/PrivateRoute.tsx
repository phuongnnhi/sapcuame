// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// interface PrivateRouteProps {
//   role: string;
//   redirectPath?: string;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ role, redirectPath = '/' }) => {
//   const userRole = localStorage.getItem('role'); //  Check user role from storage

//   // Redirect if the user doesn't have the required role
//   if (userRole !== role) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return <Outlet />; // 
// };

// export default PrivateRoute;