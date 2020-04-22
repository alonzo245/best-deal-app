import React from 'react'
import { AuthProvider } from './context/state/AuthState';
import { CartProvider } from './context/state/CartState';
import { ProductsProvider } from './context/state/ProductsState';
import { GlobalProvider } from './context/state/GlobalState';
import { ThemeProvider } from './context/state/ThemeState'
import { Layout } from './hoc/Layout'
import './App.scss'

function App() {

  return (
    <AuthProvider>
      <GlobalProvider>
        <ThemeProvider>
          <CartProvider>
            <ProductsProvider>
              <Layout />
            </ProductsProvider>
          </CartProvider>
        </ThemeProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;