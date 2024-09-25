import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Events from "./components/Events";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
