import Navbar from "./components/Navbar";
import FlowCanvas from "./components/FlowCanvas";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      <FlowCanvas />
    </div>
  );
}

export default App;
