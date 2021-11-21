import { ThemeProvider } from "styled-components";
import React, { ReactNode } from "react";

const theme = {
    
    colors: {
      primary: "rgb(54, 161, 139)",
      backgroundColor: "#202020",
      fontColor: "#474747",
      secondaryFontColor: "rgb(191, 191, 191)",
      shadowColor: "rgba(0, 0, 0, 0.3)",
      listBackgroundColor: "rgb(45, 45, 45)",
    },
  };
  
  export const Theme = ({ children }:{children: ReactNode}) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );