import { ThemeProvider } from "styled-components";
import React, { ReactNode } from "react";

const theme = {
    
    colors: {
      primary: "rgb(128, 161, 155)",
      backgroundColor: "#202020",
      fontColor: "#474747",
      borderColor: "#ddd",
      secondaryFontColor: "rgb(191, 191, 191)",
      shadowColor: "rgba(0, 0, 0, 0.3)",
      listBackgroundColor: "rgb(45, 45, 45)",
    },
    sizes: {
      borderWidth: "1.5px",
      fontSize: "20px"
    }
  };
  
  export const Theme = ({ children }:{children: ReactNode}):JSX.Element => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );