import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import Navbar from "./components/Navbar";
import Visualizations from "./components/Visualizations";
import Notifications from "./components/Notifications";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/notifications" element={<Notifications />} />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;