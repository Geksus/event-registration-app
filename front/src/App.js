import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Events from "./components/Events/Events";
import CreateEvent from "./components/Events/CreateEvent";
import ParticipantList from "./components/Participants/ParticipantList";

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
          <Route path="/:event_id/participants" element={<ParticipantList />}>
            <Route element={<Navigate to={`/:event_id}/participants`} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
