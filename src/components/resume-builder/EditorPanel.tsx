import { useState } from 'react';
import type { ResumeContent } from './types';

// Simple Accordion wrapper
const Accordion = ({ title, isOpen, onToggle, children }: any) => (
  <div className="border border-slate-200 rounded-lg bg-white overflow-hidden mb-4 shadow-sm">
    <button 
      className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
      onClick={onToggle}
    >
      <h3 className="font-bold text-sm text-slate-800 tracking-wide uppercase">{title}</h3>
      <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    {isOpen && <div className="p-5 border-t border-slate-100 bg-slate-50/50">{children}</div>}
  </div>
);

// Form Input wrapper
const Input = ({ label, type = "text", value, onChange, placeholder }: any) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{label}</label>
    {type === 'textarea' ? (
      <textarea 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[100px]"
      />
    ) : (
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
      />
    )}
  </div>
);

// Dynamic Repeater wrapper
const Repeater = ({ items, onAdd, onRemove, renderItem, itemTitle }: any) => (
  <div className="space-y-4">
    {items.map((item: any, index: number) => (
      <div key={item.id || index} className="relative p-4 border border-slate-200 bg-white rounded-lg group">
        <button 
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
        </button>
        {renderItem(item, index)}
      </div>
    ))}
    <button 
      onClick={onAdd}
      className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 text-sm font-semibold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
    >
      + Add {itemTitle}
    </button>
  </div>
);

interface Props {
  content: ResumeContent;
  updateContent: (updater: (prev: ResumeContent) => ResumeContent) => void;
}

export default function EditorPanel({ content, updateContent }: Props) {
  const [openSection, setOpenSection] = useState<string>('personal');

  const toggle = (section: string) => setOpenSection(prev => prev === section ? '' : section);

  // Field Updater helpers
  const updatePersonal = (field: string, value: string) => {
    updateContent(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };
  
  const updateArrayItem = (arrayName: keyof ResumeContent, index: number, field: string, value: any) => {
    updateContent(prev => {
      const arr = [...(prev[arrayName] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [arrayName]: arr };
    });
  };

  const addArrayItem = (arrayName: keyof ResumeContent, defaultItem: any) => {
    updateContent(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] as any[]), { ...defaultItem, id: Date.now().toString() }] }));
  };

  const removeArrayItem = (arrayName: keyof ResumeContent, index: number) => {
    updateContent(prev => {
      const arr = [...(prev[arrayName] as any[])];
      arr.splice(index, 1);
      return { ...prev, [arrayName]: arr };
    });
  };

  // Helper for bullet points
  const updateBullets = (arrayName: keyof ResumeContent, index: number, text: string) => {
    const bullets = text.split('\n').filter(b => b.trim() !== '');
    updateArrayItem(arrayName, index, 'bullets', bullets);
  };

  return (
    <div className="pb-20">
      
      {/* PERSONAL INFO */}
      <Accordion title="Personal Information" isOpen={openSection === 'personal'} onToggle={() => toggle('personal')}>
        <div className="grid grid-cols-2 gap-x-4">
          <Input label="Full Name" value={content.personal.fullName} onChange={(e: any) => updatePersonal('fullName', e.target.value)} />
          <Input label="Headline" value={content.personal.headline} onChange={(e: any) => updatePersonal('headline', e.target.value)} />
          <Input label="City" value={content.personal.city} onChange={(e: any) => updatePersonal('city', e.target.value)} />
          <Input label="State" value={content.personal.state} onChange={(e: any) => updatePersonal('state', e.target.value)} />
          <Input label="Email" type="email" value={content.personal.email} onChange={(e: any) => updatePersonal('email', e.target.value)} />
          <Input label="Phone" value={content.personal.phone} onChange={(e: any) => updatePersonal('phone', e.target.value)} />
          <Input label="LinkedIn URL" value={content.personal.linkedIn} onChange={(e: any) => updatePersonal('linkedIn', e.target.value)} />
          <Input label="GitHub URL" value={content.personal.github} onChange={(e: any) => updatePersonal('github', e.target.value)} />
        </div>
      </Accordion>

      {/* SUMMARY */}
      <Accordion title="Professional Summary" isOpen={openSection === 'summary'} onToggle={() => toggle('summary')}>
        <Input 
          label="Summary" 
          type="textarea" 
          value={content.summary} 
          onChange={(e: any) => updateContent(p => ({ ...p, summary: e.target.value }))}
          placeholder="Brief overview of your professional background..."
        />
        <div className="text-[10px] text-slate-400 text-right">{content.summary.length} characters</div>
      </Accordion>

      {/* EDUCATION */}
      <Accordion title="Education" isOpen={openSection === 'education'} onToggle={() => toggle('education')}>
        <Repeater 
          items={content.education} 
          itemTitle="Education"
          onAdd={() => addArrayItem('education', { school: '', location: '', degree: '', major: '', endDate: '' })}
          onRemove={(idx: number) => removeArrayItem('education', idx)}
          renderItem={(item: any, idx: number) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <div className="col-span-2"><Input label="School / University" value={item.school} onChange={(e: any) => updateArrayItem('education', idx, 'school', e.target.value)} /></div>
              <Input label="Degree" value={item.degree} onChange={(e: any) => updateArrayItem('education', idx, 'degree', e.target.value)} placeholder="e.g. B.S., Master of Arts" />
              <Input label="Major" value={item.major} onChange={(e: any) => updateArrayItem('education', idx, 'major', e.target.value)} />
              <Input label="Location" value={item.location} onChange={(e: any) => updateArrayItem('education', idx, 'location', e.target.value)} />
              <Input label="Graduation / Expected Date" value={item.endDate} onChange={(e: any) => updateArrayItem('education', idx, 'endDate', e.target.value)} />
              <Input label="GPA" value={item.gpa} onChange={(e: any) => updateArrayItem('education', idx, 'gpa', e.target.value)} />
              <div className="col-span-2"><Input label="Relevant Coursework" value={item.coursework} onChange={(e: any) => updateArrayItem('education', idx, 'coursework', e.target.value)} /></div>
            </div>
          )}
        />
      </Accordion>

      {/* EXPERIENCE */}
      <Accordion title="Professional Experience" isOpen={openSection === 'experience'} onToggle={() => toggle('experience')}>
        <Repeater 
          items={content.experience} 
          itemTitle="Experience"
          onAdd={() => addArrayItem('experience', { company: '', location: '', position: '', startDate: '', endDate: '', bullets: [] })}
          onRemove={(idx: number) => removeArrayItem('experience', idx)}
          renderItem={(item: any, idx: number) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <Input label="Company" value={item.company} onChange={(e: any) => updateArrayItem('experience', idx, 'company', e.target.value)} />
              <Input label="Location" value={item.location} onChange={(e: any) => updateArrayItem('experience', idx, 'location', e.target.value)} />
              <div className="col-span-2"><Input label="Position Title" value={item.position} onChange={(e: any) => updateArrayItem('experience', idx, 'position', e.target.value)} /></div>
              <Input label="Start Date" value={item.startDate} onChange={(e: any) => updateArrayItem('experience', idx, 'startDate', e.target.value)} />
              <Input label="End Date" value={item.endDate} onChange={(e: any) => updateArrayItem('experience', idx, 'endDate', e.target.value)} placeholder="e.g. Present" />
              
              <div className="col-span-2 mt-2">
                <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mb-1">Achievement Bullets (One per line)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm min-h-[120px]"
                  value={(item.bullets || []).join('\n')}
                  onChange={(e) => updateBullets('experience', idx, e.target.value)}
                  placeholder="Managed AWS infrastructure...&#10;Reduced deployment time by 40%..."
                />
              </div>
            </div>
          )}
        />
      </Accordion>

      {/* PROJECTS */}
      <Accordion title="Projects" isOpen={openSection === 'projects'} onToggle={() => toggle('projects')}>
        <Repeater 
          items={content.projects} 
          itemTitle="Project"
          onAdd={() => addArrayItem('projects', { name: '', role: '', duration: '', technologies: '', bullets: [] })}
          onRemove={(idx: number) => removeArrayItem('projects', idx)}
          renderItem={(item: any, idx: number) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <Input label="Project Name" value={item.name} onChange={(e: any) => updateArrayItem('projects', idx, 'name', e.target.value)} />
              <Input label="Duration / Date" value={item.duration} onChange={(e: any) => updateArrayItem('projects', idx, 'duration', e.target.value)} />
              <div className="col-span-2"><Input label="Technologies Used" value={item.technologies} onChange={(e: any) => updateArrayItem('projects', idx, 'technologies', e.target.value)} /></div>
              
              <div className="col-span-2 mt-2">
                <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mb-1">Details & Achievements (One per line)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm min-h-[100px]"
                  value={(item.bullets || []).join('\n')}
                  onChange={(e) => updateBullets('projects', idx, e.target.value)}
                />
              </div>
            </div>
          )}
        />
      </Accordion>

      {/* LEADERSHIP & ACTIVITIES */}
      <Accordion title="Leadership & Activities" isOpen={openSection === 'leadership'} onToggle={() => toggle('leadership')}>
        <Repeater 
          items={content.leadership} 
          itemTitle="Leadership Role"
          onAdd={() => addArrayItem('leadership', { organization: '', position: '', duration: '', description: '' })}
          onRemove={(idx: number) => removeArrayItem('leadership', idx)}
          renderItem={(item: any, idx: number) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <Input label="Organization" value={item.organization} onChange={(e: any) => updateArrayItem('leadership', idx, 'organization', e.target.value)} />
              <Input label="Position" value={item.position} onChange={(e: any) => updateArrayItem('leadership', idx, 'position', e.target.value)} />
              <div className="col-span-2"><Input label="Duration" value={item.duration} onChange={(e: any) => updateArrayItem('leadership', idx, 'duration', e.target.value)} /></div>
              <div className="col-span-2">
                <Input label="Description" type="textarea" value={item.description} onChange={(e: any) => updateArrayItem('leadership', idx, 'description', e.target.value)} />
              </div>
            </div>
          )}
        />
      </Accordion>

      {/* CERTIFICATIONS & AWARDS */}
      <Accordion title="Certifications & Awards" isOpen={openSection === 'certs'} onToggle={() => toggle('certs')}>
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-widest mb-3">Certifications</h4>
        <Repeater 
          items={content.certifications} 
          itemTitle="Certification"
          onAdd={() => addArrayItem('certifications', { name: '', issuer: '', issueDate: '' })}
          onRemove={(idx: number) => removeArrayItem('certifications', idx)}
          renderItem={(item: any, idx: number) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <div className="col-span-2"><Input label="Certification Name" value={item.name} onChange={(e: any) => updateArrayItem('certifications', idx, 'name', e.target.value)} /></div>
              <Input label="Issuer" value={item.issuer} onChange={(e: any) => updateArrayItem('certifications', idx, 'issuer', e.target.value)} />
              <Input label="Issue Date" value={item.issueDate} onChange={(e: any) => updateArrayItem('certifications', idx, 'issueDate', e.target.value)} />
            </div>
          )}
        />
        <div className="h-4 border-b border-slate-100 mb-4"></div>
        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-widest mb-3">Awards</h4>
        <Repeater 
          items={content.awards} 
          itemTitle="Award"
          onAdd={() => addArrayItem('awards', { name: '', organization: '', year: '' })}
          onRemove={(idx: number) => removeArrayItem('awards', idx)}
          renderItem={(item: any, idx: number) => (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <div className="col-span-2"><Input label="Award Name" value={item.name} onChange={(e: any) => updateArrayItem('awards', idx, 'name', e.target.value)} /></div>
              <Input label="Organization" value={item.organization} onChange={(e: any) => updateArrayItem('awards', idx, 'organization', e.target.value)} />
              <Input label="Year" value={item.year} onChange={(e: any) => updateArrayItem('awards', idx, 'year', e.target.value)} />
            </div>
          )}
        />
      </Accordion>

      {/* SKILLS */}
      <Accordion title="Skills & Keywords" isOpen={openSection === 'skills'} onToggle={() => toggle('skills')}>
        <div className="space-y-4">
          {['programming', 'frameworks', 'cloud', 'database', 'devops', 'tools'].map((cat) => (
            <div key={cat}>
              <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mb-1">{cat}</label>
              <input 
                type="text"
                placeholder="Comma separated skills..."
                value={(content.skills as any)[cat].join(', ')}
                onChange={(e) => {
                  const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                  updateContent(p => ({ ...p, skills: { ...p.skills, [cat]: arr } }));
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
              />
            </div>
          ))}
        </div>
      </Accordion>

    </div>
  );
}
