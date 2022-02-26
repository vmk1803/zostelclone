import "./App.css";
import { ProductPage } from "./components/ProductPage/product";
import { Routes, Route } from "react-router-dom";
import { Razor } from "./components/orderSummary/razor";

function App() {
  return (
    <div>
      {/* <ProductPage /> */}
      <Routes>
        <Route path="/" element={<ProductPage />}></Route>
        <Route path="/payment" element={<Razor />}></Route>
      </Routes>
    </div>
  );
}

export default App;
