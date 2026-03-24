// import Navbar from "./components/Navbar";
// import FlowCanvas from "./components/FlowCanvas";
// import { Toaster } from "react-hot-toast";
// import "./App.css";

// function App() {
//   return (
//     <div className="min-h-screen bg-[#050706] text-[#f0fdf4]">
//       <Toaster position="top-right" />
//       <Navbar />
//       <FlowCanvas />
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import Navbar from "./components/Navbar";
import FlowCanvas from "./components/FlowCanvas";
import { askAI, saveData } from "./services/api";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Run AI
  const runFlow = async () => {
    if (!input) return toast.error("Enter prompt");

    try {
      setLoading(true);
      const res = await askAI(input);
      setOutput(res.data.response);
      toast.success("AI response generated");
    } catch {
      toast.error("Error fetching AI");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Save to DB
  const save = async () => {
    if (!output) return toast.error("Nothing to save");

    try {
      await saveData({ prompt: input, response: output });
      toast.success("Saved successfully!");
    } catch {
      toast.error("Save failed");
    }
  };

  // 🔹 Clear
  const clear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-[#050706] text-[#f0fdf4]">
      {/* 🔔 Toast */}
      <Toaster position="top-right" />

      {/* 🔝 Navbar */}
      <Navbar runFlow={runFlow} save={save} clear={clear} loading={loading} />

      {/* 🔄 Flow */}
      <FlowCanvas
        input={input}
        setInput={setInput}
        output={output}
        loading={loading}
      />
    </div>
  );
}

export default App;
