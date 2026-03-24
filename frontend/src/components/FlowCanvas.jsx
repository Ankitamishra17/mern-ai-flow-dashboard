import ReactFlow from "reactflow";
import { Background } from "reactflow";
import "reactflow/dist/style.css";
import toast from "react-hot-toast";

export default function FlowCanvas({ input, setInput, output, loading }) {
  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied!");
  };

  const nodes = [
    {
      id: "1",
      position: { x: 100, y: 150 },
      data: {
        label: (
          <textarea
            className="w-56 h-32 p-3 rounded-xl 
            bg-[#020617] text-white border border-white/10 
            focus:ring-2 focus:ring-[#69f6b8] outline-none shadow-lg"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        ),
      },
    },
    {
      id: "2",
      position: { x: 420, y: 150 },
      data: {
        label: (
          <div
            className="w-56 h-32 p-3 rounded-xl 
            bg-[#020617] border border-white/10 
            text-sm overflow-auto shadow-lg"
          >
            {loading ? (
              <div className="flex items-center gap-2 text-[#69f6b8]">
                <div className="w-4 h-4 border-2 border-[#69f6b8] border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </div>
            ) : output ? (
              <>
                <p className="text-gray-200">{output}</p>
                <button onClick={copy} className="text-xs text-[#69f6b8] mt-2">
                  Copy
                </button>
              </>
            ) : (
              <span className="text-gray-500">AI Response</span>
            )}
          </div>
        ),
      },
    },
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#69f6b8", strokeWidth: 2 },
    },
  ];

  return (
    <div className="h-[80vh] m-4 rounded-2xl bg-[#0f1412] border border-[rgba(16,185,129,0.1)] shadow-xl">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#1e293b" gap={20} />
      </ReactFlow>
    </div>
  );
}
