

export const Logo = ({ className }: { className?: string }) => (
	<div className={`font-mono text-base font-bold flex items-center space-x-1 select-none ${className || ''}`}>
		<span className="text-blue-600">&gt;_</span>
		<span className="text-slate-800">vaqihdev:</span>
		<span className="text-blue-600">~$</span>
	</div>
);
