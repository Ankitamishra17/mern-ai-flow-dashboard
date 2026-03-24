import { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { askAI, saveData } from "../services/api";
import toast from "react-hot-toast";
import ControlPanel from "./ControlPanel";

export default function FlowCanvas() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Run AI
  const runFlow = async () => {
    if (!input) return toast.error("Please enter prompt");

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

  // 🔹 Copy
  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied!");
  };

  // 🔹 Nodes
  const nodes = [
    {
      id: "1",
      type: "default",
      position: { x: 100, y: 150 },
      data: {
        label: (
          <textarea
            className="w-48 h-28 p-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        ),
      },
    },
    {
      id: "2",
      type: "default",
      position: { x: 400, y: 150 },
      data: {
        label: (
          <div className="w-48 h-28 p-3 border rounded-xl text-sm bg-gray-50 overflow-auto">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </div>
            ) : output ? (
              <>
                <p>{output}</p>
                <button onClick={copy} className="text-xs text-blue-600 mt-2">
                  Copy
                </button>
              </>
            ) : (
              "AI Response"
            )}
          </div>
        ),
      },
    },
  ];

  // Edge
  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ];

  return (
    <div className="h-[80vh] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl m-4 shadow-xl">
      {/* Buttons */}
      <ControlPanel
        runFlow={runFlow}
        save={save}
        loading={loading}
        clear={clear}
      />

      {/* React Flow */}
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}
