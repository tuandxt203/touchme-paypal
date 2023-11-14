import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function App() {
  function _createOrder(data, actions) {
    // Kiểm tra nếu có giá trị value được truyền từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const valueParam = urlParams.get("value");
    const value = valueParam ? valueParam : "1"; // Mặc định là 1 nếu không có giá trị truyền vào từ URL

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: value,
          },
        },
      ],
    });
  }
  return (
    <div className="App">
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
      />
    </div>
  );
}
export default App;