import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import CoinDetails from "./components/CoinDetails";
import Footer from "./components/Footer";
import Login from "./components/loginpage";
import Signup from "./components/signup";
import EditProfile from "./components/Editprofile";
import MyCoins from "./components/MyCoins";
import PaperTrade from "./components/PaperTrade";
import { ChakraProvider, CSSReset } from "@chakra-ui/react"; // Import ChakraProvider and CSSReset
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      {/* Apply ChakraProvider to access Chakra UI components */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/coins"
            element={
              <>
                <Header />
                <Coins />
              </>
            }
          />
          <Route
            path="/exchanges"
            element={
              <>
                <Header />
                <Exchanges />
              </>
            }
          />
          <Route
            path="/coin/:id"
            element={
              <>
                <Header />
                <CoinDetails />
              </>
            }
          />
          <Route
            path="/edit"
            element={
              <>
                <Header />
                <EditProfile />
              </>
            }
          />
          <Route
            path="/mycoins"
            element={
              <>
                <Header />
                <MyCoins />
              </>
            }
          />
          <Route
            path="/papertrade"
            element={
              <>
                <Header />
                <PaperTrade />
              </>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </Router>
      <CSSReset />
      {/* Apply CSSReset to reset default browser styles */}
    </ChakraProvider>
  );
}

export default App;
