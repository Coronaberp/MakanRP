import React from 'react';
import { Navigate } from 'react-router-dom';

// Login UI removed — redirect to home
export default function SignIn() {
  return <Navigate to="/" replace />;
}
