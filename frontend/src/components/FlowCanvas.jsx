import { useState } from "react";
import ReactFlow from "reactflow";
import { Background } from "reactflow";
import "reactflow/dist/style.css";
import { askAI, saveData } from "../services/api";
import toast from "react-hot-toast";
// import ControlPanel from "./ControlPanel";

// export default function FlowCanvas({ input, setInput, output, loading }) {
//   // 🔹 Run AI
//   const runFlow = async () => {
//     if (!input) return toast.error("Please enter prompt");

//     try {
//       setLoading(true);
//       const res = await askAI(input);
//       setOutput(res.data.response);
//       toast.success("AI response generated");
//     } catch {
//       toast.error("Error fetching AI");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Save to DB
//   const save = async () => {
//     if (!output) return toast.error("Nothing to save");

//     try {
//       await saveData({ prompt: input, response: output });
//       toast.success("Saved successfully!");
//     } catch {
//       toast.error("Save failed");
//     }
//   };

//   // 🔹 Clear
//   const clear = () => {
//     setInput("");
//     setOutput("");
//   };

//   // 🔹 Copy
//   const copy = () => {
//     navigator.clipboard.writeText(output);
//     toast.success("Copied!");
//   };

//   // 🔹 Nodes
//   // const nodes = [
//   //   {
//   //     id: "1",
//   //     type: "default",
//   //     position: { x: 100, y: 150 },
//   //     data: {
//   //       label: (
//   //         <textarea
//   //           className="w-48 h-28 p-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none"
//   //           placeholder="Ask anything..."
//   //           value={input}
//   //           onChange={(e) => setInput(e.target.value)}
//   //         />
//   //       ),
//   //     },
//   //   },
//   //   {
//   //     id: "2",
//   //     type: "default",
//   //     position: { x: 400, y: 150 },
//   //     data: {
//   //       label: (
//   //         <div className="w-48 h-28 p-3 border rounded-xl text-sm bg-gray-50 overflow-auto">
//   //           {loading ? (
//   //             <div className="flex items-center gap-2">
//   //               <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//   //               Generating...
//   //             </div>
//   //           ) : output ? (
//   //             <>
//   //               <p>{output}</p>
//   //               <button onClick={copy} className="text-xs text-blue-600 mt-2">
//   //                 Copy
//   //               </button>
//   //             </>
//   //           ) : (
//   //             "AI Response"
//   //           )}
//   //         </div>
//   //       ),
//   //     },
//   //   },
//   // ];
//   const nodes = [
//     {
//       id: "1",
//       position: { x: 100, y: 150 },
//       data: {
//         label: (
//           <textarea
//             className="w-56 h-32 p-3 rounded-xl
//           bg-[#020617] text-white border border-white/10
//           focus:ring-2 focus:ring-[#69f6b8] outline-none shadow-lg"
//             placeholder="Ask anything..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//         ),
//       },
//     },
//     {
//       id: "2",
//       position: { x: 420, y: 150 },
//       data: {
//         label: (
//           <div
//             className="w-56 h-32 p-3 rounded-xl
//         bg-[#020617] border border-white/10
//         text-sm overflow-auto shadow-lg"
//           >
//             {loading ? (
//               <div className="flex items-center gap-2 text-[#69f6b8]">
//                 <div className="w-4 h-4 border-2 border-[#69f6b8] border-t-transparent rounded-full animate-spin"></div>
//                 Generating...
//               </div>
//             ) : output ? (
//               <>
//                 <p className="text-gray-200">{output}</p>
//                 <button onClick={copy} className="text-xs text-[#69f6b8] mt-2">
//                   Copy
//                 </button>
//               </>
//             ) : (
//               <span className="text-gray-500">AI Response</span>
//             )}
//           </div>
//         ),
//       },
//     },
//   ];

//   // Edge
//   // const edges = [
//   //   {
//   //     id: "e1-2",
//   //     source: "1",
//   //     target: "2",
//   //     animated: true,
//   //   },
//   // ];

//   const edges = [
//     {
//       id: "e1-2",
//       source: "1",
//       target: "2",
//       animated: true,
//       style: { stroke: "#69f6b8", strokeWidth: 2 },
//     },
//   ];

//   return (
//     <div
//       className="h-[80vh] m-4 rounded-2xl
// bg-[#0f1412] border border-[rgba(16,185,129,0.1)] shadow-xl"
//     >
//       {" "}
//       {/* Buttons */}
//       {/* <ControlPanel
//         runFlow={runFlow}
//         save={save}
//         loading={loading}
//         clear={clear}
//       /> */}
//       {/* React Flow */}
//       {/* <ReactFlow nodes={nodes} edges={edges} fitView /> */}
//       <ReactFlow nodes={nodes} edges={edges} fitView>
//         <Background color="#1e293b" gap={20} />
//       </ReactFlow>
//     </div>
//   );
// }

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
