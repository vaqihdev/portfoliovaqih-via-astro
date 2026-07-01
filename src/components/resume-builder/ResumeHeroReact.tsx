

export default function ResumeHeroReact() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start justify-between">
        
        {/* Left Column (65%) */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          
          {/* Headings */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              MUCHAMAD GHUFRON VAQIH
            </h1>
            <div className="flex flex-wrap gap-2 text-sm md:text-base font-semibold text-blue-600 dark:text-blue-500 font-mono tracking-tight">
              <span>Cloud Infrastructure Engineer</span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span>DevOps Engineer</span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span>AWS Cloud Engineer</span>
            </div>
          </div>

          {/* Intro */}
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
            Building scalable cloud infrastructure, automation pipelines, and reliable systems.
            Passionate about Linux, AWS, DevOps, and Infrastructure as Code.
          </p>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Bogor, Indonesia</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✉</span>
              <a href="mailto:admin@vaqih.dev" className="hover:text-blue-600 transition-colors">admin@vaqih.dev</a>
            </div>
            <div className="flex items-center gap-2">
              <span>🌐</span>
              <a href="https://vaqih.dev" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">https://vaqih.dev</a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-2 print:hidden">
            <button onClick={() => window.print()} className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Resume PDF
            </button>
            <a href="mailto:admin@vaqih.dev" className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
              Contact Me
            </a>
            
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
            
            <a href="https://github.com/vaqihdev" target="_blank" rel="noopener noreferrer" className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" aria-label="GitHub">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com/in/muchamad-ghufron-vaqih" target="_blank" rel="noopener noreferrer" className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" aria-label="LinkedIn">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>

        </div>

        {/* Right Column (35%) */}
        <div className="w-full lg:w-[35%]">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow duration-300 print:shadow-none print:border-none">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">10+</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Years</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">30+</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Projects</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">60+</span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">AWS Labs</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="flex flex-col gap-5">
              
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Core Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {['AWS', 'Linux', 'Docker', 'Terraform', 'Python', 'GitHub Actions'].map(tech => (
                    <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-md border border-slate-200/50 dark:border-slate-700 print:border-none print:bg-white print:px-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Current Focus</span>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                  Cloud Infrastructure <span className="text-slate-300 dark:text-slate-600 mx-1">•</span> DevOps <span className="text-slate-300 dark:text-slate-600 mx-1">•</span> Automation
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 print:hidden">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Open for Remote Opportunities</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
