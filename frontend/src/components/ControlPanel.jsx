export default function ControlPanel({ runFlow, save, loading, clear }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 p-4 justify-center">
      <button
        onClick={runFlow}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Running...
          </>
        ) : (
          " Run Flow"
        )}
      </button>

      <button
        onClick={save}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition"
      >
         Save
      </button>

      <button
        onClick={clear}
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl font-medium transition"
      >
         Clear
      </button>
    </div>
  );
}
