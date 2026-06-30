import React from 'react';
import type { ResumeContent } from './types';

interface Props {
  content: ResumeContent;
}

export default function HarvardTemplate({ content }: Props) {
  const { personal, summary, education, experience, projects, leadership, certifications, awards, languages, skills } = content;

  // Helpers to join contact info cleanly
  const contactItems = [
    personal.phone,
    personal.email,
    personal.linkedIn ? personal.linkedIn.replace(/^https?:\/\/(www\.)?/, '') : '',
    personal.portfolio ? personal.portfolio.replace(/^https?:\/\/(www\.)?/, '') : '',
    personal.github ? personal.github.replace(/^https?:\/\/(www\.)?/, '') : ''
  ].filter(Boolean);

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-1">
      <h3 className="text-center font-bold uppercase text-[10pt] tracking-widest">{title}</h3>
      <hr className="border-t-[1.5px] border-black mt-0.5" />
    </div>
  );

  return (
    <div className="font-serif text-black py-[0.25in] px-[0.4in] bg-white w-full h-full text-[8.5pt] leading-tight">

      {/* Header */}
      <header className="text-center mb-1.5">
        <h1 className="text-[14pt] font-bold uppercase">{personal.fullName || 'FULL NAME'}</h1>

        {/* Only render location line if city/state exist */}
        {(personal.city || personal.state || personal.country) && (
          <div className="mt-1">
            {[personal.city, personal.state, personal.country].filter(Boolean).join(', ')}
          </div>
        )}

        {contactItems.length > 0 && (
          <div className="mt-1">
            {contactItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-2">|</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-1 print:break-inside-avoid">
          <SectionHeader title="Summary" />
          <p className="text-justify whitespace-pre-wrap">{summary}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-1 print:break-inside-avoid">
          <SectionHeader title="Education" />
          <div className="flex flex-col gap-1.5">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold">
                  <div>{edu.school}</div>
                  <div>{edu.location}</div>
                </div>
                <div className="flex justify-between items-baseline">
                  <div className="italic">{edu.degree} {edu.major ? `in ${edu.major}` : ''} {edu.minor ? `, Minor in ${edu.minor}` : ''}</div>
                  <div>{edu.isCurrent ? `Expected ${edu.endDate}` : edu.endDate}</div>
                </div>
                {edu.gpa && <div><strong>GPA:</strong> {edu.gpa}</div>}
                {(edu.coursework || edu.honors || edu.activities) && (
                  <ul className="list-disc list-outside ml-4 mt-1">
                    {edu.coursework && <li><strong>Relevant Coursework:</strong> {edu.coursework}</li>}
                    {edu.honors && <li><strong>Honors:</strong> {edu.honors}</li>}
                    {edu.activities && <li><strong>Activities:</strong> {edu.activities}</li>}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-1 print:break-inside-avoid">
          <SectionHeader title="Professional Experience" />
          <div className="flex flex-col gap-1.5">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} className="print:break-inside-avoid mt-1 first:mt-0">
                <div className="flex justify-between items-baseline font-bold">
                  <div>{exp.company}</div>
                  <div>{exp.location}</div>
                </div>
                <div className="flex justify-between items-baseline italic">
                  <div>{exp.position}</div>
                  <div>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-1 print:break-inside-avoid">
          <SectionHeader title="Projects" />
          <div className="flex flex-col gap-1.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className={`print:break-inside-avoid mt-1 first:mt-0 ${proj.name.includes('Labs') ? 'print-break-before' : ''}`}>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold">{proj.name} {proj.role ? <span className="font-normal italic">| {proj.role}</span> : ''}</div>
                  <div>{proj.duration}</div>
                </div>
                {proj.technologies && <div className="italic text-[9.5pt]">Technologies: {proj.technologies}</div>}
                {proj.description && <p className="mt-1 text-justify">{proj.description}</p>}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="mb-1 print:break-inside-avoid">
          <SectionHeader title="Leadership & Activities" />
          <div className="flex flex-col gap-1">
            {leadership.map((item, idx) => (
              <div key={item.id || idx} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold">{item.organization}</div>
                  <div>{item.duration}</div>
                </div>
                {item.position && <div className="italic">{item.position}</div>}
                {item.description && <p className="mt-1">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Awards */}
      {(certifications.length > 0 || awards.length > 0) && (
        <section className="mb-1 print:break-inside-avoid">
          <SectionHeader title={certifications.length > 0 && awards.length > 0 ? "Certifications & Awards" : (certifications.length > 0 ? "Certifications" : "Awards")} />
          <ul className="list-disc list-outside ml-4">
            {certifications.map((cert, idx) => (
              <li key={`cert-${idx}`}>
                <strong>{cert.name}</strong>, {cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ''}
              </li>
            ))}
            {awards.map((aw, idx) => (
              <li key={`aw-${idx}`}>
                <strong>{aw.name}</strong>, {aw.organization} {aw.year ? `(${aw.year})` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills & Languages */}
      {(Object.values(skills).some(s => s.length > 0) || languages.length > 0) && (
        <section className="mb-1 print:break-inside-avoid">
          <SectionHeader title="Skills & Languages" />
          <div className="flex flex-col gap-1">
            {skills.programming.length > 0 && <div><strong>Programming:</strong> {skills.programming.join(', ')}</div>}
            {skills.frameworks.length > 0 && <div><strong>Frameworks/Libraries:</strong> {skills.frameworks.join(', ')}</div>}
            {skills.cloud.length > 0 && <div><strong>Cloud:</strong> {skills.cloud.join(', ')}</div>}
            {skills.database.length > 0 && <div><strong>Databases:</strong> {skills.database.join(', ')}</div>}
            {skills.devops.length > 0 && <div><strong>DevOps/Tools:</strong> {[...skills.devops, ...skills.tools].join(', ')}</div>}
            {languages.length > 0 && (
              <div>
                <strong>Languages:</strong> {languages.map(l => `${l.language} (${l.level})`).join(', ')}
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
