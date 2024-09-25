import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Events from "./components/Events/Events";
import CreateEvent from "./components/Events/CreateEvent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Events />}>
            <Route index={true} element={<Navigate to={"/"} />} />{" "}
          </Route>
          <Route path="/create-event" element={<CreateEvent />}>
            <Route element={<Navigate to={"/create-event"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
