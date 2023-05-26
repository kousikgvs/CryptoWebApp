import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";
import Footer from "./components/Footer";
import { ChakraProvider, theme } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <>
        <ChakraProvider theme={theme}>
          <Header />
        </ChakraProvider>
      </>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ChakraProvider theme={theme}>
                <Home />
              </ChakraProvider>
            </>
          }
        />
        <Route
          path="/coins"
          element={
            <>
              <ChakraProvider theme={theme}>
                <Coins />
              </ChakraProvider>
            </>
          }
        />
        <Route
          path="/exchanges"
          element={
            <>
              <ChakraProvider theme={theme}>
                <Exchanges />
              </ChakraProvider>
            </>
          }
        />
        <Route
          path="/coin/:id"
          element={
            <>
              <ChakraProvider theme={theme}>
                <CoinDetails />
              </ChakraProvider>
            </>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
