import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createComponent, b as renderComponent } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
import { n as atsResumes, t as db } from "./db_CQw15ogo.mjs";
import { r as $$Footer, t as $$Navbar } from "./Navbar_CyTy8TxT.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B7GJyHDI.mjs";
import React from "react";
import { desc } from "drizzle-orm";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/resume-builder/HarvardTemplate.tsx
function HarvardTemplate({ content }) {
	const { personal, summary, education, experience, projects, leadership, certifications, awards, languages, skills } = content;
	const contactItems = [
		personal.phone,
		personal.email,
		personal.linkedIn ? personal.linkedIn.replace(/^https?:\/\/(www\.)?/, "") : "",
		personal.portfolio ? personal.portfolio.replace(/^https?:\/\/(www\.)?/, "") : "",
		personal.github ? personal.github.replace(/^https?:\/\/(www\.)?/, "") : ""
	].filter(Boolean);
	const SectionHeader = ({ title }) => /* @__PURE__ */ jsxs("div", {
		className: "mb-1",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-center font-bold uppercase text-[10pt] tracking-widest",
			children: title
		}), /* @__PURE__ */ jsx("hr", { className: "border-t-[1.5px] border-black mt-0.5" })]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "font-serif text-black py-[0.25in] px-[0.4in] bg-white w-full h-full text-[8.5pt] leading-tight",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "text-center mb-1.5",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-[14pt] font-bold uppercase",
						children: personal.fullName || "FULL NAME"
					}),
					(personal.city || personal.state || personal.country) && /* @__PURE__ */ jsx("div", {
						className: "mt-1",
						children: [
							personal.city,
							personal.state,
							personal.country
						].filter(Boolean).join(", ")
					}),
					contactItems.length > 0 && /* @__PURE__ */ jsx("div", {
						className: "mt-1",
						children: contactItems.map((item, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [index > 0 && /* @__PURE__ */ jsx("span", {
							className: "mx-2",
							children: "|"
						}), /* @__PURE__ */ jsx("span", { children: item })] }, index))
					})
				]
			}),
			summary && /* @__PURE__ */ jsxs("section", {
				className: "mb-1 print:break-inside-avoid",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: "Summary" }), /* @__PURE__ */ jsx("p", {
					className: "text-justify whitespace-pre-wrap",
					children: summary
				})]
			}),
			education.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "mb-1 print:break-inside-avoid",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: "Education" }), /* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-1.5",
					children: education.map((edu, idx) => /* @__PURE__ */ jsxs("div", {
						className: "print:break-inside-avoid",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-baseline font-bold",
								children: [/* @__PURE__ */ jsx("div", { children: edu.school }), /* @__PURE__ */ jsx("div", { children: edu.location })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-baseline",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "italic",
									children: [
										edu.degree,
										" ",
										edu.major ? `in ${edu.major}` : "",
										" ",
										edu.minor ? `, Minor in ${edu.minor}` : ""
									]
								}), /* @__PURE__ */ jsx("div", { children: edu.isCurrent ? `Expected ${edu.endDate}` : edu.endDate })]
							}),
							edu.gpa && /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("strong", { children: "GPA:" }),
								" ",
								edu.gpa
							] }),
							(edu.coursework || edu.honors || edu.activities) && /* @__PURE__ */ jsxs("ul", {
								className: "list-disc list-outside ml-4 mt-1",
								children: [
									edu.coursework && /* @__PURE__ */ jsxs("li", { children: [
										/* @__PURE__ */ jsx("strong", { children: "Relevant Coursework:" }),
										" ",
										edu.coursework
									] }),
									edu.honors && /* @__PURE__ */ jsxs("li", { children: [
										/* @__PURE__ */ jsx("strong", { children: "Honors:" }),
										" ",
										edu.honors
									] }),
									edu.activities && /* @__PURE__ */ jsxs("li", { children: [
										/* @__PURE__ */ jsx("strong", { children: "Activities:" }),
										" ",
										edu.activities
									] })
								]
							})
						]
					}, edu.id || idx))
				})]
			}),
			experience.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "mb-1 print:break-inside-avoid",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: "Professional Experience" }), /* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-1.5",
					children: experience.map((exp, idx) => /* @__PURE__ */ jsxs("div", {
						className: "print:break-inside-avoid mt-1 first:mt-0",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-baseline font-bold",
								children: [/* @__PURE__ */ jsx("div", { children: exp.company }), /* @__PURE__ */ jsx("div", { children: exp.location })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-baseline italic",
								children: [/* @__PURE__ */ jsx("div", { children: exp.position }), /* @__PURE__ */ jsxs("div", { children: [
									exp.startDate,
									" – ",
									exp.isCurrent ? "Present" : exp.endDate
								] })]
							}),
							exp.bullets && exp.bullets.length > 0 && /* @__PURE__ */ jsx("ul", {
								className: "list-disc list-outside ml-4 mt-1",
								children: exp.bullets.map((b, i) => /* @__PURE__ */ jsx("li", { children: b }, i))
							})
						]
					}, exp.id || idx))
				})]
			}),
			projects.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "mb-1 print:break-inside-avoid",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: "Projects" }), /* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-1.5",
					children: projects.map((proj, idx) => /* @__PURE__ */ jsxs("div", {
						className: `print:break-inside-avoid mt-1 first:mt-0 ${proj.name.includes("Labs") ? "print-break-before" : ""}`,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-baseline",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "font-bold",
									children: [
										proj.name,
										" ",
										proj.role ? /* @__PURE__ */ jsxs("span", {
											className: "font-normal italic",
											children: ["| ", proj.role]
										}) : ""
									]
								}), /* @__PURE__ */ jsx("div", { children: proj.duration })]
							}),
							proj.technologies && /* @__PURE__ */ jsxs("div", {
								className: "italic text-[9.5pt]",
								children: ["Technologies: ", proj.technologies]
							}),
							proj.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-justify",
								children: proj.description
							}),
							proj.bullets && proj.bullets.length > 0 && /* @__PURE__ */ jsx("ul", {
								className: "list-disc list-outside ml-4 mt-1",
								children: proj.bullets.map((b, i) => /* @__PURE__ */ jsx("li", { children: b }, i))
							})
						]
					}, proj.id || idx))
				})]
			}),
			leadership.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "mb-1 print:break-inside-avoid",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: "Leadership & Activities" }), /* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-1",
					children: leadership.map((item, idx) => /* @__PURE__ */ jsxs("div", {
						className: "print:break-inside-avoid",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-baseline",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-bold",
									children: item.organization
								}), /* @__PURE__ */ jsx("div", { children: item.duration })]
							}),
							item.position && /* @__PURE__ */ jsx("div", {
								className: "italic",
								children: item.position
							}),
							item.description && /* @__PURE__ */ jsx("p", {
								className: "mt-1",
								children: item.description
							})
						]
					}, item.id || idx))
				})]
			}),
			(certifications.length > 0 || awards.length > 0) && /* @__PURE__ */ jsxs("section", {
				className: "mb-1 print:break-inside-avoid",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: certifications.length > 0 && awards.length > 0 ? "Certifications & Awards" : certifications.length > 0 ? "Certifications" : "Awards" }), /* @__PURE__ */ jsxs("ul", {
					className: "list-disc list-outside ml-4",
					children: [certifications.map((cert, idx) => /* @__PURE__ */ jsxs("li", { children: [
						/* @__PURE__ */ jsx("strong", { children: cert.name }),
						", ",
						cert.issuer,
						" ",
						cert.issueDate ? `(${cert.issueDate})` : ""
					] }, `cert-${idx}`)), awards.map((aw, idx) => /* @__PURE__ */ jsxs("li", { children: [
						/* @__PURE__ */ jsx("strong", { children: aw.name }),
						", ",
						aw.organization,
						" ",
						aw.year ? `(${aw.year})` : ""
					] }, `aw-${idx}`))]
				})]
			}),
			(Object.values(skills).some((s) => s.length > 0) || languages.length > 0) && /* @__PURE__ */ jsxs("section", {
				className: "mb-1 print:break-inside-avoid",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: "Skills & Languages" }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-1",
					children: [
						skills.programming.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("strong", { children: "Programming:" }),
							" ",
							skills.programming.join(", ")
						] }),
						skills.frameworks.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("strong", { children: "Frameworks/Libraries:" }),
							" ",
							skills.frameworks.join(", ")
						] }),
						skills.cloud.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("strong", { children: "Cloud:" }),
							" ",
							skills.cloud.join(", ")
						] }),
						skills.database.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("strong", { children: "Databases:" }),
							" ",
							skills.database.join(", ")
						] }),
						skills.devops.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("strong", { children: "DevOps/Tools:" }),
							" ",
							[...skills.devops, ...skills.tools].join(", ")
						] }),
						languages.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("strong", { children: "Languages:" }),
							" ",
							languages.map((l) => `${l.language} (${l.level})`).join(", ")
						] })
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/resume-builder/types.ts
var defaultResumeContent = {
	personal: {
		fullName: "",
		headline: "",
		city: "",
		state: "",
		country: "",
		phone: "",
		email: "",
		linkedIn: "",
		portfolio: "",
		github: ""
	},
	summary: "",
	education: [],
	experience: [],
	projects: [],
	leadership: [],
	certifications: [],
	awards: [],
	languages: [],
	skills: {
		programming: [],
		frameworks: [],
		cloud: [],
		database: [],
		devops: [],
		tools: [],
		soft: [],
		other: []
	}
};
//#endregion
//#region src/pages/resume.astro
var resume_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Resume,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Resume = createComponent(async ($$result, $$props, $$slots) => {
	let resumeData = null;
	try {
		console.log("Fetching atsResumes...");
		const allResumes = await db.select().from(atsResumes).orderBy(desc(atsResumes.updatedAt));
		resumeData = allResumes.find((r) => r.title !== "Untitled Resume") || allResumes[0];
		console.log("Fetched resumeData:", resumeData?.title);
	} catch (error) {
		console.error("Database connection error in resume.astro:", error);
	}
	let content = defaultResumeContent;
	if (resumeData && resumeData.content) {
		let dbContent = resumeData.content;
		if (typeof dbContent === "string") try {
			dbContent = JSON.parse(dbContent);
		} catch (e) {}
		content = {
			...defaultResumeContent,
			...dbContent,
			personal: {
				...defaultResumeContent.personal,
				...dbContent.personal || {}
			},
			skills: {
				...defaultResumeContent.skills,
				...dbContent.skills || {}
			}
		};
	}
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": content.personal?.fullName ? `Resume - ${content.personal.fullName}` : "Resume" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="print:hidden min-h-screen bg-slate-50 py-6 sm:py-12 px-2 sm:px-4 flex flex-col items-center"><!-- Action Bar --><div class="w-full max-w-[850px] flex justify-center sm:justify-end mb-4 sm:mb-6 px-2 sm:px-0"><button id="execute-pdf-print" class="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>Export PDF</button></div><!-- Main Card containing Navbar, Resume, and Footer --><main class="w-full max-w-[850px] bg-white shadow-sm sm:shadow-xl rounded-none sm:rounded-xl border-0 sm:border border-slate-200 overflow-hidden flex flex-col">${renderComponent($$result, "Navbar", $$Navbar, {})}<div class="flex-1 px-3 sm:px-8 py-8 sm:py-12 md:py-16">${renderComponent($$result, "HarvardTemplate", HarvardTemplate, { "content": content })}</div>${renderComponent($$result, "Footer", $$Footer, {})}</main></div><div class="hidden print:block w-full"><table class="w-full"><thead><tr><td><!-- Spacer to prevent content overlapping fixed header --><div style="height: 80px;"></div></td></tr></thead><tbody><tr><td>${renderComponent($$result, "HarvardTemplate", HarvardTemplate, { "content": content })}</td></tr></tbody><tfoot><tr><td><!-- Spacer to prevent content overlapping fixed footer --><div style="height: 140px;"></div></td></tr></tfoot></table>${renderComponent($$result, "Navbar", $$Navbar, {})}</div><script>
    document.addEventListener('DOMContentLoaded', () => {
      const printBtn = document.getElementById('execute-pdf-print');
      if (printBtn) {
        printBtn.addEventListener('click', () => {
          window.print();
        });
      }

      // Auto-trigger print dialog if print=true query param is present
      if (window.location.search.includes('print=true')) {
        // Slight delay to ensure layout rendering is complete before print dialog opens
        setTimeout(() => {
          window.print();
        }, 500);
      }
    });
  <\/script>` })}`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/resume.astro", void 0);
var $$file = "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/resume.astro";
var $$url = "/resume";
//#endregion
//#region \0virtual:astro:page:src/pages/resume@_@astro
var page = () => resume_exports;
//#endregion
export { page };
