import React from 'react';

export default function NavbarReact() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-mono text-lg sm:text-xl font-bold flex items-center space-x-1 select-none">
            <span className="text-blue-600">&gt;_</span>
            <span className="text-slate-800">vaqihdev:</span>
            <span className="text-blue-600">~$</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide text-slate-500">
          <span className="text-blue-600 border-b-2 border-blue-600 pb-1 -mb-[18px]">Home</span>
          <span className="pb-1">Projects</span>
          <span className="pb-1">Labs</span>
          <span className="pb-1">Resume</span>
        </nav>
      </div>
    </header>
  );
}
