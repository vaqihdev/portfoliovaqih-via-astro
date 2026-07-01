
import type { ResumeData } from './types';
import HarvardTemplate from './HarvardTemplate';
import NavbarReact from './NavbarReact';
import { Footer } from '../footer';

interface Props {
  resume: ResumeData;
}

export default function PreviewPanel({ resume }: Props) {
  // A4 paper size aspect ratio container with scaling for preview,
  // but allowing natural height for printing.
  
  return (
    <div className="w-[850px] bg-white shadow-xl print:shadow-none print:w-full print:bg-white print:m-0 mx-auto flex flex-col">
      <div className="print:block">
        <NavbarReact />
      </div>
      
      <div className="w-full print:w-full print:min-h-0 min-h-[1100px]">
        {resume.template === 'harvard' && <HarvardTemplate content={resume.content} />}
        {/* If we add more templates in the future, we render them here based on resume.template */}
      </div>

      <div className="print:block">
        <Footer />
      </div>
    </div>
  );
}
