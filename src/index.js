import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "./styles/index.css";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="mainbody">
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </div>
);

export const server = `https://api.coingecko.com/api/v3`;
