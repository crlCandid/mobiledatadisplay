// src/components/GoogleLoginComponent.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={onSuccess}
        onFailure={onFailure}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;