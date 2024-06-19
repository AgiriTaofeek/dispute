import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import DisputeForm from "./DisputeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dispute/:transactionID" element={<DisputeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
