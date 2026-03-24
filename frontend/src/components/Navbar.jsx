export default function Navbar({ runFlow, save, clear, loading }) {
  return (
    <div
      className="px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3 
      bg-[rgba(15,20,18,0.6)] backdrop-blur-[20px] 
      border-b border-[rgba(16,185,129,0.1)] 
      sticky top-0 z-50"
    >
      {/* Title */}
      <h1 className="text-lg md:text-xl font-semibold text-[#69f6b8]">
        ⚡ AI Flow Dashboard
      </h1>

      {/* Buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        
        {/* Run Button */}
        <button
          onClick={runFlow}
          className="px-5 py-2 rounded-lg font-medium 
          bg-[#10b981] text-[#050706] 
          hover:shadow-lg hover:shadow-[#10b981]/40 
          transition flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Running...
            </>
          ) : (
            " Run"
          )}
        </button>

        {/* Save */}
        <button
          onClick={save}
          className="px-5 py-2 rounded-lg 
          bg-[rgba(16,185,129,0.05)] 
          border border-[rgba(16,185,129,0.2)] 
          text-[#f0fdf4] 
          hover:bg-[rgba(16,185,129,0.15)] transition"
        >
           Save
        </button>

        {/* Clear */}
        <button
          onClick={clear}
          className="px-5 py-2 rounded-lg 
          bg-[rgba(16,185,129,0.05)] 
          border border-[rgba(16,185,129,0.2)] 
          text-[#f0fdf4] 
          hover:bg-[rgba(16,185,129,0.15)] transition"
        >
           Clear
        </button>
      </div>
    </div>
  );
}