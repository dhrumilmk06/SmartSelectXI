function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-cyan-500 selection:text-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
          SmartSelectXI
        </h1>
        <p className="mt-4 text-lg text-slate-400 font-medium">
          A premium Vite + React + TypeScript + Tailwind setup.
        </p>
        
        <div className="mt-8 flex justify-center gap-4">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold shadow-2xl flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            TypeScript Ready
          </div>
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold shadow-2xl flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Vite Enabled
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
