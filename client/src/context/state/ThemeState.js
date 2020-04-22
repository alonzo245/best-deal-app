import React, { createContext, useState, useEffect } from "react";

const themes = {
  dark: {
  },
  light: {
  }
}

const initialState = {
  dark: false,
  theme: themes.light
}

export const ThemeContext = createContext(initialState)

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true'

    if (isDark) document.documentElement.setAttribute('theme', 'dark');

    setDark(isDark)
  }, [dark])

  let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')
    }, 1000)
  }

  const toggle = () => {
    if (document.documentElement.hasAttribute('theme')) {
      document.documentElement.removeAttribute('theme');
      trans()
    }
    else {
      trans()
      document.documentElement.setAttribute('theme', 'dark');
    }


    const isDark = !dark
    localStorage.setItem('dark', JSON.stringify(isDark))
    setDark(isDark)
  }

  const theme = dark ? themes.dark : themes.light

  return (
    <ThemeContext.Provider value={{
      theme,
      dark,
      toggle
    }}>
      {children}
    </ThemeContext.Provider>
  )
}