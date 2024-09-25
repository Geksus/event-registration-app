import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Events from "./components/Events";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Events />}>
              <Route index={true} element={<Navigate to={"/"} />} />{" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
