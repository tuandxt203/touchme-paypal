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
  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(order));
    return order;
  }
  function _onError(err) {
    console.log(err);
    let errObj = {
      err: err,
      status: "FAILED",
    };
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
  }
  return (
    <div className="App">
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
        onApprove={(data, actions) => _onApprove(data, actions)}
        onCancel={() => _onError("CANCELED")}
        onError={(err) => _onError("ERROE")}
      />
    </div>
  );
}
export default App;