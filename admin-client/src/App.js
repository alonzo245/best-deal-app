import React from 'react'
import { AuthProvider } from './context/state/AuthState';
import { Layout } from './hoc/Layout'
import './App.scss'

function App() {

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;