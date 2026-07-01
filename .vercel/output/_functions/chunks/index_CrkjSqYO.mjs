import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createComponent, O as addAttribute, b as renderComponent, v as renderScript, x as Fragment$1 } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
import { a as projectsLabs, i as landingMetadata, n as atsResumes, r as capabilities, t as db } from "./db_CQw15ogo.mjs";
import { t as $$Navbar } from "./Navbar_CyTy8TxT.mjs";
import { t as $$Layout } from "./Layout_wNGPjt67.mjs";
import { useEffect, useRef, useState } from "react";
import { desc, eq, inArray } from "drizzle-orm";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
//#region src/components/VelocityScroll.tsx
var wrap = (min, max, v) => {
	const rangeSize = max - min;
	return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
function VelocityScroll({ text, defaultVelocity = 3, className = "" }) {
	const baseX = useMotionValue(0);
	const { scrollY } = useScroll();
	const velocityFactor = useTransform(useSpring(useVelocity(scrollY), {
		damping: 50,
		stiffness: 400
	}), [0, 1e3], [0, 5], { clamp: false });
	const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
	const directionFactor = useRef(1);
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * defaultVelocity * (delta / 1e3);
		const velocity = velocityFactor.get();
		if (velocity < 0) directionFactor.current = -1;
		else if (velocity > 0) directionFactor.current = 1;
		moveBy += directionFactor.current * moveBy * velocity;
		baseX.set(baseX.get() + moveBy);
	});
	return /* @__PURE__ */ jsx("div", {
		className: `overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`,
		children: /* @__PURE__ */ jsx(motion.div, {
			className: "flex whitespace-nowrap flex-nowrap",
			style: { x },
			children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx("span", {
				className: "block mr-12",
				children: text
			}, i))
		})
	});
}
//#endregion
//#region src/components/ContributionHeatmap.tsx
var LEVEL_COLORS = [
	"#ebedf0",
	"#9be9a8",
	"#40c463",
	"#30a14e",
	"#216e39"
];
var LABEL_COLORS = {
	Project: "#3178c6",
	Lab: "#ca8a04",
	Resume: "#a855f7"
};
function getLevel(count) {
	if (count === 0) return 0;
	if (count === 1) return 1;
	if (count <= 3) return 2;
	if (count <= 6) return 3;
	return 4;
}
function toDisplayDate(dateKey) {
	const [y, m, d] = dateKey.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC"
	});
}
function buildGrid(heatmap) {
	const today = /* @__PURE__ */ new Date();
	const todayKey = [
		today.getUTCFullYear(),
		String(today.getUTCMonth() + 1).padStart(2, "0"),
		String(today.getUTCDate()).padStart(2, "0")
	].join("-");
	const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
	const startDate = new Date(endDate);
	startDate.setUTCDate(endDate.getUTCDate() - 364);
	const dayOfWeek = startDate.getUTCDay();
	startDate.setUTCDate(startDate.getUTCDate() - dayOfWeek);
	const weeks = [];
	let current = new Date(startDate);
	let totalInYear = 0;
	while (current <= endDate) {
		const week = [];
		for (let dow = 0; dow < 7; dow++) {
			const key = `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(2, "0")}-${String(current.getUTCDate()).padStart(2, "0")}`;
			if (key > todayKey) week.push(null);
			else {
				const count = (heatmap[key] ?? []).length;
				if (count > 0) totalInYear += count;
				week.push({
					dateKey: key,
					count
				});
			}
			current.setUTCDate(current.getUTCDate() + 1);
		}
		weeks.push(week);
	}
	const MONTH_NAMES = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	const monthLabels = [];
	let lastMonth = -1;
	for (let wi = 0; wi < weeks.length; wi++) {
		const firstNonNull = weeks[wi].find((d) => d !== null);
		if (!firstNonNull) continue;
		const [, mm] = firstNonNull.dateKey.split("-").map(Number);
		const monthIdx = mm - 1;
		if (monthIdx !== lastMonth) {
			monthLabels.push({
				label: MONTH_NAMES[monthIdx],
				colIndex: wi
			});
			lastMonth = monthIdx;
		}
	}
	return {
		weeks,
		monthLabels,
		totalInYear
	};
}
function StatCard({ label, value, color }) {
	return /* @__PURE__ */ jsxs("div", {
		style: {
			flex: "1 1 90px",
			display: "flex",
			flexDirection: "column",
			gap: "2px",
			padding: "10px 14px",
			background: "#fff",
			border: "1px solid #e2e8f0",
			borderRadius: "8px",
			minWidth: "90px",
			boxShadow: "0 1px 2px 0 rgba(0,0,0,0.04)"
		},
		children: [/* @__PURE__ */ jsx("span", {
			style: {
				fontSize: "18px",
				fontWeight: 700,
				color: color ?? "#0f172a",
				letterSpacing: "-0.5px"
			},
			children: value
		}), /* @__PURE__ */ jsx("span", {
			style: {
				fontSize: "10px",
				color: "#64748b",
				textTransform: "uppercase",
				letterSpacing: "0.08em",
				fontWeight: 600
			},
			children: label
		})]
	});
}
function ContributionHeatmap() {
	const [heatmap, setHeatmap] = useState({});
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [tooltip, setTooltip] = useState({
		visible: false,
		x: 0,
		y: 0,
		dateKey: "",
		entries: []
	});
	const containerRef = useRef(null);
	const hasData = useRef(false);
	const fetchOnce = async (signal) => {
		const data = await (await fetch("/api/contributions", { signal })).json();
		if (data.success) {
			setHeatmap(data.heatmap ?? {});
			setStats(data.stats ?? null);
			setError(null);
			hasData.current = true;
			return true;
		}
		return false;
	};
	const fetchWithRetry = async (silent = false, maxRetries = 3) => {
		if (silent) setRefreshing(true);
		let lastErr = "";
		for (let attempt = 0; attempt < maxRetries; attempt++) {
			const ctrl = new AbortController();
			const timer = setTimeout(() => ctrl.abort(), 8e3);
			try {
				const ok = await fetchOnce(ctrl.signal);
				clearTimeout(timer);
				if (ok) {
					setLoading(false);
					setRefreshing(false);
					return;
				}
			} catch (e) {
				clearTimeout(timer);
				lastErr = e?.name === "AbortError" ? "Request timed out" : e?.message ?? "Network error";
				if (attempt < maxRetries - 1) await new Promise((r) => setTimeout(r, 2e3));
			}
		}
		if (!silent) setError(lastErr || "Failed after 3 attempts");
		setLoading(false);
		setRefreshing(false);
	};
	useEffect(() => {
		const safetyTimer = setTimeout(() => {
			setLoading(false);
			if (!hasData.current) setError("Could not reach server — tap ↻ to retry");
		}, 12e3);
		fetchWithRetry(false).then(() => clearTimeout(safetyTimer));
		const pollInterval = setInterval(() => fetchWithRetry(true, 1), 3e4);
		return () => {
			clearTimeout(safetyTimer);
			clearInterval(pollInterval);
		};
	}, []);
	const { weeks, monthLabels, totalInYear } = buildGrid(heatmap);
	const handleMouseEnter = (e, cell) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const containerRect = containerRef.current?.getBoundingClientRect();
		if (!containerRect) return;
		setTooltip({
			visible: true,
			x: rect.left - containerRect.left + rect.width / 2,
			y: rect.top - containerRect.top,
			dateKey: cell.dateKey,
			entries: heatmap[cell.dateKey] ?? []
		});
	};
	const handleMouseLeave = () => setTooltip((prev) => ({
		...prev,
		visible: false
	}));
	if (loading) return /* @__PURE__ */ jsxs("div", {
		style: {
			background: "#fff",
			border: "1px solid #e2e8f0",
			borderRadius: "12px",
			padding: "20px 24px",
			boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
			marginBottom: "8px"
		},
		children: [
			/* @__PURE__ */ jsx("div", {
				style: {
					display: "flex",
					gap: "8px",
					marginBottom: "16px"
				},
				children: [
					80,
					90,
					70,
					80,
					90,
					70
				].map((w, i) => /* @__PURE__ */ jsx("div", { style: {
					width: `${w}px`,
					height: "54px",
					background: "#f1f5f9",
					borderRadius: "8px",
					animation: "heatmap-shimmer 1.5s ease-in-out infinite",
					animationDelay: `${i * 100}ms`
				} }, i))
			}),
			/* @__PURE__ */ jsx("div", { style: {
				height: "100px",
				background: "#f1f5f9",
				borderRadius: "6px",
				animation: "heatmap-shimmer 1.5s ease-in-out infinite"
			} }),
			/* @__PURE__ */ jsx("style", { children: `
          @keyframes heatmap-shimmer {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.5; }
          }
        ` })
		]
	});
	if (error && !hasData.current) return /* @__PURE__ */ jsxs("div", {
		style: {
			background: "#fff",
			border: "1px solid #e2e8f0",
			borderRadius: "12px",
			padding: "20px 24px",
			display: "flex",
			alignItems: "center",
			gap: "12px",
			fontSize: "12px",
			color: "#94a3b8"
		},
		children: [
			/* @__PURE__ */ jsx("span", {
				style: { color: "#f59e0b" },
				children: "⚠"
			}),
			/* @__PURE__ */ jsx("span", { children: error }),
			/* @__PURE__ */ jsx("button", {
				onClick: () => {
					setError(null);
					setLoading(true);
					fetchWithRetry(false);
				},
				style: {
					marginLeft: "auto",
					padding: "4px 12px",
					fontSize: "11px",
					border: "1px solid #e2e8f0",
					borderRadius: "6px",
					background: "#f8fafc",
					cursor: "pointer",
					color: "#475569"
				},
				children: "↻ Retry"
			})
		]
	});
	const CELL_SIZE = 11;
	const CELL_GAP = 2;
	const STEP = 13;
	const ROW_LABELS = [
		"",
		"Mon",
		"",
		"Wed",
		"",
		"Fri",
		""
	];
	const ROW_LABEL_W = 28;
	const gridWidth = weeks.length * STEP - CELL_GAP;
	return /* @__PURE__ */ jsxs("div", {
		style: {
			background: "#fff",
			border: "1px solid #e2e8f0",
			borderRadius: "12px",
			padding: "20px 24px",
			boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)"
		},
		children: [
			/* @__PURE__ */ jsx("style", { children: `
        @keyframes heatmap-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
      ` }),
			/* @__PURE__ */ jsxs("div", {
				style: {
					display: "flex",
					gap: "8px",
					flexWrap: "wrap",
					marginBottom: "20px"
				},
				children: [
					/* @__PURE__ */ jsx(StatCard, {
						label: "Projects",
						value: stats?.totalProjects ?? 0,
						color: "#3178c6"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Engineering Labs",
						value: stats?.totalLabs ?? 0,
						color: "#ca8a04"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Resumes",
						value: stats?.totalResumes ?? 0,
						color: "#a855f7"
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Total Published",
						value: stats?.totalPublished ?? 0,
						color: "#0f172a"
					}),
					stats?.lastUpdated && /* @__PURE__ */ jsx(StatCard, {
						label: "Last Updated",
						value: toDisplayDate(stats.lastUpdated).replace(/\w+,\s/, "")
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "10px",
					flexWrap: "wrap",
					gap: "8px"
				},
				children: [/* @__PURE__ */ jsxs("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "8px"
					},
					children: [
						/* @__PURE__ */ jsxs("span", {
							style: {
								fontSize: "12px",
								color: "#475569",
								fontWeight: 600
							},
							children: [
								totalInYear.toLocaleString(),
								" contribution",
								totalInYear !== 1 ? "s" : "",
								" in the last year"
							]
						}),
						/* @__PURE__ */ jsxs("span", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "4px",
								fontSize: "10px",
								color: "#22c55e",
								fontWeight: 600
							},
							children: [/* @__PURE__ */ jsx("span", { style: {
								display: "inline-block",
								width: "6px",
								height: "6px",
								borderRadius: "50%",
								background: "#22c55e",
								boxShadow: "0 0 0 0 rgba(34,197,94,0.4)",
								animation: "heatmap-pulse 2s ease-in-out infinite"
							} }), "LIVE"]
						}),
						refreshing && /* @__PURE__ */ jsx("span", {
							style: {
								fontSize: "10px",
								color: "#94a3b8"
							},
							children: "↻"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "4px",
						fontSize: "10px",
						color: "#94a3b8"
					},
					children: [
						/* @__PURE__ */ jsx("span", { children: "Less" }),
						LEVEL_COLORS.map((c, i) => /* @__PURE__ */ jsx("div", { style: {
							width: "11px",
							height: "11px",
							borderRadius: "2px",
							background: c,
							border: "1px solid rgba(0,0,0,0.06)"
						} }, i)),
						/* @__PURE__ */ jsx("span", { children: "More" })
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					overflowX: "auto",
					position: "relative"
				},
				ref: containerRef,
				children: [
					/* @__PURE__ */ jsx("div", {
						style: {
							display: "flex",
							marginLeft: `32px`,
							marginBottom: "4px",
							position: "relative",
							height: "14px",
							minWidth: `${gridWidth}px`
						},
						children: monthLabels.map(({ label, colIndex }) => /* @__PURE__ */ jsx("span", {
							style: {
								position: "absolute",
								left: `${colIndex * STEP}px`,
								fontSize: "10px",
								color: "#64748b",
								fontWeight: 500,
								whiteSpace: "nowrap"
							},
							children: label
						}, `${label}-${colIndex}`))
					}),
					/* @__PURE__ */ jsxs("div", {
						style: { display: "flex" },
						children: [/* @__PURE__ */ jsx("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: `${CELL_GAP}px`,
								marginRight: "4px",
								width: `${ROW_LABEL_W}px`,
								flexShrink: 0
							},
							children: ROW_LABELS.map((lbl, i) => /* @__PURE__ */ jsx("div", {
								style: {
									height: `${CELL_SIZE}px`,
									fontSize: "9px",
									color: "#94a3b8",
									lineHeight: `${CELL_SIZE}px`,
									textAlign: "right",
									paddingRight: "4px",
									fontWeight: 500
								},
								children: lbl
							}, i))
						}), /* @__PURE__ */ jsx("div", {
							style: {
								display: "flex",
								gap: `${CELL_GAP}px`,
								minWidth: `${gridWidth}px`
							},
							children: weeks.map((week, wi) => /* @__PURE__ */ jsx("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: `${CELL_GAP}px`
								},
								children: week.map((cell, di) => {
									if (!cell) return /* @__PURE__ */ jsx("div", { style: {
										width: `${CELL_SIZE}px`,
										height: `${CELL_SIZE}px`,
										borderRadius: "2px",
										background: "transparent"
									} }, di);
									const bg = LEVEL_COLORS[getLevel(cell.count)];
									return /* @__PURE__ */ jsx("div", {
										onMouseEnter: (e) => handleMouseEnter(e, cell),
										onMouseLeave: handleMouseLeave,
										style: {
											width: `${CELL_SIZE}px`,
											height: `${CELL_SIZE}px`,
											borderRadius: "2px",
											background: bg,
											border: "1px solid rgba(0,0,0,0.06)",
											cursor: cell.count > 0 ? "pointer" : "default",
											transition: "transform 0.1s ease"
										},
										onMouseOver: (e) => {
											e.currentTarget.style.transform = "scale(1.45)";
										},
										onMouseOut: (e) => {
											e.currentTarget.style.transform = "scale(1)";
										}
									}, di);
								})
							}, wi))
						})]
					}),
					tooltip.visible && /* @__PURE__ */ jsxs("div", {
						style: {
							position: "absolute",
							top: `${tooltip.y - 8}px`,
							left: `${tooltip.x}px`,
							transform: "translate(-50%, -100%)",
							background: "#0f172a",
							color: "#f8fafc",
							borderRadius: "6px",
							padding: "8px 10px",
							fontSize: "11px",
							lineHeight: "1.6",
							pointerEvents: "none",
							zIndex: 50,
							maxWidth: "240px",
							boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
						},
						children: [
							/* @__PURE__ */ jsx("div", {
								style: {
									fontWeight: 700,
									marginBottom: "2px",
									color: "#e2e8f0",
									whiteSpace: "nowrap"
								},
								children: toDisplayDate(tooltip.dateKey)
							}),
							/* @__PURE__ */ jsx("div", {
								style: {
									color: "#94a3b8",
									marginBottom: tooltip.entries.length > 0 ? "5px" : 0,
									whiteSpace: "nowrap"
								},
								children: tooltip.entries.length === 0 ? "No contributions" : `${tooltip.entries.length} contribution${tooltip.entries.length > 1 ? "s" : ""}`
							}),
							tooltip.entries.slice(0, 6).map((e, i) => /* @__PURE__ */ jsxs("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "5px",
									maxWidth: "220px"
								},
								children: [/* @__PURE__ */ jsx("span", { style: {
									display: "inline-block",
									width: "7px",
									height: "7px",
									borderRadius: "50%",
									background: LABEL_COLORS[e.type] ?? "#94a3b8",
									flexShrink: 0
								} }), /* @__PURE__ */ jsxs("span", {
									style: {
										color: "#e2e8f0",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap"
									},
									children: [
										"[",
										e.type,
										"] ",
										e.title
									]
								})]
							}, i)),
							tooltip.entries.length > 6 && /* @__PURE__ */ jsxs("div", {
								style: {
									color: "#64748b",
									marginTop: "2px"
								},
								children: [
									"+",
									tooltip.entries.length - 6,
									" more…"
								]
							}),
							/* @__PURE__ */ jsx("div", { style: {
								position: "absolute",
								bottom: "-5px",
								left: "50%",
								transform: "translateX(-50%)",
								borderLeft: "5px solid transparent",
								borderRight: "5px solid transparent",
								borderTop: "5px solid #0f172a",
								width: 0,
								height: 0
							} })
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const siteMeta = await db.select().from(landingMetadata).limit(1).then((res) => res[0]).catch(() => null);
	const featuredProjects = await db.select().from(projectsLabs).where(eq(projectsLabs.type, "Project")).orderBy(desc(projectsLabs.id)).catch(() => []);
	const allCaps = await db.select().from(capabilities).orderBy(capabilities.orderIndex).catch(() => []);
	const recentLabs = await db.select().from(projectsLabs).where(inArray(projectsLabs.type, ["Lab", "Blog"])).orderBy(desc(projectsLabs.id)).limit(5).catch(() => []);
	let resumeData = null;
	try {
		const allResumes = await db.select().from(atsResumes).orderBy(desc(atsResumes.updatedAt));
		resumeData = allResumes.find((r) => r.title !== "Untitled Resume") || allResumes[0];
	} catch (error) {
		console.error("Database connection error in index.astro:", error);
	}
	const groupLabsByMonth = (labs) => {
		const groups = {};
		labs.forEach((lab) => {
			const key = "Recent";
			if (!groups[key]) groups[key] = [];
			groups[key].push(lab);
		});
		return groups;
	};
	groupLabsByMonth(recentLabs);
	const now = /* @__PURE__ */ new Date();
	const monthLabel = now.toLocaleString("en-US", { month: "long" }) + " " + now.getFullYear();
	const cleanDescription = (text) => {
		if (!text) return {
			text: "",
			logo: null
		};
		let unescaped = text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
		const imgMatch = unescaped.match(/<img[^>]+src=["']([^"']+)["']/i);
		const logo = imgMatch ? imgMatch[1] : null;
		let cleanText = unescaped.replace(/<img[^>]*>/gi, "");
		cleanText = cleanText.replace(/<[^>]*>?/gm, "");
		cleanText = cleanText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
		cleanText = cleanText.replace(/[#*`_]/g, "");
		return {
			text: cleanText.trim().substring(0, 120) + (cleanText.length > 120 ? "..." : ""),
			logo
		};
	};
	const firstName = siteMeta?.heroFirstName || "Muchamad";
	const lastName = siteMeta?.heroLastName || "Ghufron Vaqih";
	const subtitle = siteMeta?.heroSubtitle || "[ CLOUD INFRASTRUCTURE ENGINEER & DEVOPS ARCHITECT ]";
	const shortBio = siteMeta?.heroShortBio || "An engineer with a developer's soul and a systems architect's vision. I build secure, automated, highly available, and resilient cloud infrastructure that empowers modern engineering teams.";
	const aboutHeading = siteMeta?.aboutHeading || "Architecting Cloud Trust";
	const aboutLongDesc = siteMeta?.aboutLongDesc || "With a deep background in systems architecture and modern web development, I bridge the gap between software engineering and cloud infrastructure. I specialize in building scalable, secure, and resilient systems using Infrastructure as Code (IaC), container orchestration, and continuous delivery pipelines that empower teams to ship faster with confidence.";
	const domainsList = siteMeta?.coreDomains ? siteMeta.coreDomains.split(",").map((d) => d.trim()) : [
		"CLOUD ARCHITECTURE",
		"CONTAINER ORCHESTRATION",
		"CI/CD PIPELINES",
		"INFRASTRUCTURE AS CODE",
		"MICROSERVICES",
		"ZERO-TRUST SECURITY",
		"SERVERLESS COMPUTE",
		"DATABASE OPTIMIZATION",
		"SITE RELIABILITY ENGINEERING (SRE)"
	];
	const displayCaps = allCaps;
	const displayProjects = featuredProjects;
	let careerJourney = [
		{
			role: "Senior Cloud Architect",
			company: "TechNova Solutions",
			duration: "2024 - PRESENT",
			desc: "Leading the transition to a cloud-native architecture, managing multi-cloud Kubernetes clusters, and establishing GitOps pipelines for 50+ engineers."
		},
		{
			role: "DevOps Engineer",
			company: "Global FinTech",
			duration: "2021 - 2024",
			desc: "Automated infrastructure provisioning using Terraform. Implemented strict zero-trust security policies and reduced deployment times by 40%."
		},
		{
			role: "Full Stack Developer",
			company: "Creative Digital",
			duration: "2019 - 2021",
			desc: "Built scalable web applications using React and Node.js. Integrated CI/CD workflows and Dockerized monolithic applications."
		}
	];
	if (resumeData && resumeData.content) {
		let dbContent = resumeData.content;
		if (typeof dbContent === "string") try {
			dbContent = JSON.parse(dbContent);
		} catch (e) {}
		if (dbContent.experience && dbContent.experience.length > 0) careerJourney = dbContent.experience.map((exp) => ({
			role: exp.position || "",
			company: exp.company || "",
			duration: `${exp.startDate} - ${exp.isCurrent ? "PRESENT" : exp.endDate}`.toUpperCase(),
			desc: exp.bullets ? exp.bullets.join(" ") : ""
		}));
	}
	const capsByCategory = displayCaps.reduce((acc, cap) => {
		if (!acc[cap.category]) acc[cap.category] = [];
		acc[cap.category].push(cap);
		return acc;
	}, {});
	const isDefaultName = firstName === "Muchamad" && lastName === "Ghufron Vaqih";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${firstName} ${lastName} | Portfolio` }, { "default": async ($$result) => renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})}${maybeRenderHead($$result)}<div class="w-full sticky top-16 z-10 bg-white/90 backdrop-blur-xl border-b border-slate-100"><main class="w-full max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row gap-16 items-center"><!-- Left Column --><div class="w-full lg:w-1/2 flex flex-col"><h1 class="text-5xl lg:text-[72px] font-extrabold text-slate-900 tracking-tight leading-[1.05]">${isDefaultName ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`Muchamad <span class="text-blue-600">Ghufron<br>Vaqih</span>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`${firstName} <span class="text-blue-600">${lastName}</span>` })}`}</h1><p class="text-[11px] lg:text-xs font-mono font-bold text-blue-600 tracking-[0.2em] uppercase mt-8 mb-6">${subtitle}</p><p class="text-slate-600 text-base lg:text-lg leading-relaxed max-w-xl font-sans mb-10">${shortBio}</p><div class="flex flex-wrap gap-4"><a href="/projects" class="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md">[ EXPLORE PROJECTS ]</a><a href="/resume" class="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-sm">[ REVIEW RESUME ]</a></div></div><!-- Right Column: Double-Stacked Layout --><div class="w-full lg:w-1/2 flex flex-col gap-6"><!-- Top Box: Minimal Terminal --><div class="w-full bg-[#0b1220] rounded-xl border border-slate-700/50 p-6 shadow-2xl relative font-mono"><div class="flex gap-2 absolute top-4 left-4"><div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div><div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div><div class="w-3 h-3 rounded-full bg-[#27c93f]"></div></div><div class="mt-8 flex flex-col gap-3 text-xs leading-relaxed"><div class="text-slate-400">Muchamad Ghufron Vaqih [Version 3.8.2026]</div><div class="text-slate-500">(c) Cloud OS Corporation. All rights reserved.</div><div class="mt-3"><span class="text-blue-400">User:</span> <span class="text-slate-300">root@vaqihdev.infra.internal</span> <span class="text-slate-500">|</span> <span class="text-yellow-400">Kernel:</span> <span class="text-slate-300">6.8.0-generic</span></div><div id="terminal-box" class="cursor-text relative flex items-center mt-2 text-green-400"><span>vaqihdev:~$ &nbsp;</span><span id="terminal-input-display" class="text-green-400 font-mono"></span><span id="terminal-cursor" class="w-2.5 h-4 bg-slate-300 ml-0.5 animate-pulse inline-block"></span><input type="text" id="terminal-hidden-input" class="absolute inset-0 opacity-0 cursor-text w-full focus:outline-none" autofocus></div></div></div><!-- Bottom Box: Telemetry + Active Nodes --><div class="w-full bg-white rounded-xl border border-slate-200 shadow-xl p-6 font-mono"><!-- 4-metric grid --><div class="grid grid-cols-2 gap-y-8 gap-x-8"><div class="flex flex-col gap-2"><span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">// LATENCY</span><span class="text-xl font-bold text-slate-900">31ms</span></div><div class="flex flex-col gap-2"><span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">// TRAFFIC</span><span class="text-xl font-bold text-slate-900">20 Gbps</span></div><div class="flex flex-col gap-2"><div class="flex justify-between items-end"><span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">// CPU_HOST</span><span class="text-xs font-bold text-red-600">76%</span></div><div class="w-full bg-slate-100 rounded-full h-1.5 mt-1"><div class="bg-red-600 h-1.5 rounded-full" style="width: 76%"></div></div></div><div class="flex flex-col gap-2"><div class="flex justify-between items-end"><span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">// MEMORY</span><span class="text-xs font-bold text-yellow-500">55.4%</span></div><div class="w-full bg-slate-100 rounded-full h-1.5 mt-1"><div class="bg-yellow-500 h-1.5 rounded-full" style="width: 55.4%"></div></div></div></div><div class="w-full h-px bg-slate-100 my-8"></div><!-- Active Nodes --><div class="flex flex-col"><span class="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-4">ACTIVE INFRASTRUCTURE NODES</span><div class="flex flex-col gap-2">${[
		"vpc-nat-gateway",
		"vms-api-prod-ang",
		"rds-postgres-multi-az"
	].map((node) => renderTemplate`<div class="bg-slate-50 border border-slate-100 rounded-lg p-3 flex justify-between items-center"><span class="text-[11px] font-bold text-slate-700">${node}</span><span class="text-[10px] font-bold text-green-500 tracking-widest">● ACTIVE</span></div>`)}</div></div></div></div></main></div><div class="w-full sticky top-16 z-[15] bg-[#0b1220] text-blue-400 py-6 overflow-hidden border-y border-slate-800 shadow-xl">${renderComponent($$result, "VelocityScroll", VelocityScroll, {
		"text": "CLOUD ENGINEER • DEVOPS ARCHITECT • SRE •",
		"defaultVelocity": 2,
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/VelocityScroll.tsx",
		"client:component-export": "VelocityScroll"
	})}</div><section class="w-full bg-slate-50/95 backdrop-blur-xl border-t border-slate-200 py-24 sticky top-16 z-20 shadow-2xl"><div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 lg:gap-24"><div class="w-full md:w-1/3 flex flex-col"><span class="text-[10px] font-bold text-blue-600 font-mono tracking-widest uppercase mb-4">// PROFILE_SUMMARY</span><h3 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">${aboutHeading}</h3></div><div class="w-full md:w-2/3 flex flex-col"><p class="text-base text-slate-600 leading-relaxed font-sans">${aboutLongDesc}</p><div class="flex flex-wrap gap-3 mt-8">${domainsList.map((domain) => renderTemplate`<span class="px-4 py-2 bg-white border border-slate-200 text-slate-500 font-mono text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">${domain}</span>`)}</div></div></div></section><section class="w-full bg-white/95 backdrop-blur-xl py-24 border-t border-slate-200 sticky top-16 z-30 shadow-2xl"><div class="max-w-7xl mx-auto px-6 flex flex-col"><div class="flex flex-col items-center text-center mb-20"><span class="text-[10px] font-bold text-blue-600 font-mono tracking-widest uppercase mb-4">// CAREER_TIMELINE</span><h3 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">The Journey Snapshot</h3></div><div class="relative max-w-4xl mx-auto w-full px-4"><!-- Center Line --><div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2"></div><div class="flex flex-col gap-12 md:gap-0">${careerJourney.map((job, idx) => renderTemplate`<div${addAttribute(`relative flex flex-col md:flex-row items-center justify-between ${idx !== careerJourney.length - 1 ? "md:mb-16" : ""}`, "class")}>${idx % 2 === 0 && renderTemplate`<div class="hidden md:block md:w-5/12"></div>`}<div class="absolute left-6 md:left-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow transform -translate-x-[5px] md:-translate-x-1/2 z-10 top-2 md:top-1/2 md:-translate-y-1/2"></div><div${addAttribute(`w-full md:w-5/12 flex flex-col pl-14 md:pl-0 ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}`, "class")}><span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">${job.duration}</span><h4 class="text-xl font-extrabold text-slate-900 mt-2">${job.role}</h4><span class="text-sm font-bold text-blue-600 mt-1">${job.company}</span><p class="text-sm text-slate-500 mt-3 leading-relaxed font-sans">${job.desc}</p></div>${idx % 2 !== 0 && renderTemplate`<div class="hidden md:block md:w-5/12"></div>`}</div>`)}</div></div></div></section><section class="w-full bg-[#0b1220] text-slate-100 py-24 border-y border-slate-800 sticky top-16 z-40 shadow-2xl"><div class="max-w-7xl mx-auto px-6 flex flex-col"><div class="flex flex-col mb-16"><span class="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase mb-4">// SYSTEM_CAPABILITIES</span><h3 class="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">Cloud & DevOps Blueprint</h3></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8">${Object.keys(capsByCategory).map((category) => renderTemplate`<div class="flex flex-col bg-[#111827] border border-[#1e293b] rounded-xl p-8 shadow-2xl hover:border-[#3b82f6]/30 transition-all duration-300 relative group"><div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div><h4 class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.15em] border-b border-[#1e293b] pb-4 mb-2">${category}</h4><div class="flex flex-col">${capsByCategory[category].map((cap, i) => renderTemplate`<div${addAttribute(`flex items-center justify-between py-4 ${i !== capsByCategory[category].length - 1 ? "border-b border-[#1e293b]/50" : ""}`, "class")}><span class="text-sm font-sans font-semibold text-slate-100 leading-snug max-w-[70%] pr-4">${cap.skillName}</span><span class="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#1e293b]/40 text-[#3b82f6] border border-[#3b82f6]/20 whitespace-nowrap flex-shrink-0">${cap.level}</span></div>`)}</div></div>`)}</div></div></section><section class="w-full py-12 border-t border-b border-slate-200 bg-white/95 backdrop-blur-xl sticky top-16 z-50 shadow-2xl"><div class="max-w-7xl mx-auto px-6">${renderComponent($$result, "ContributionHeatmap", ContributionHeatmap, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/ContributionHeatmap",
		"client:component-export": "default"
	})}</div></section><section class="w-full py-24 border-t border-slate-200 bg-slate-50/95 backdrop-blur-xl relative overflow-hidden sticky top-16 z-[60] shadow-2xl"><div class="max-w-7xl mx-auto px-6 flex flex-col relative z-10"><div class="flex items-end justify-between mb-10"><div class="flex flex-col"><span class="text-xs font-semibold text-slate-500 mb-2">Pinned</span><h3 class="text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight">Featured Projects</h3></div><a href="/projects" class="text-sm text-blue-600 hover:underline">View all repositories &rarr;</a></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${displayProjects.map((project, idx) => {
		const { text: previewText, logo } = cleanDescription(project.description);
		return renderTemplate`<div class="relative bg-white/95 p-10 group min-h-[250px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"><!-- Corner Brackets --><div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div><div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div><div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div><div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div><div class="flex flex-col"><div class="flex items-center justify-between mb-8"><span class="text-[10px] text-blue-500 font-mono tracking-widest uppercase font-bold">PROJECT</span><span class="text-[10px] text-slate-400 font-mono tracking-widest uppercase">${project.tools ? project.tools.split(",")[0].trim() : `GRID_REF_0${idx}`}</span></div>${logo && renderTemplate`<div class="mb-4"><img${addAttribute(logo, "src")} alt="Logo" class="h-8 w-auto object-contain"></div>`}<a${addAttribute(`/projects/${project.id}`, "href")} class="text-2xl font-bold text-slate-900 leading-tight hover:text-blue-600 transition-colors">${project.title}</a><p class="text-slate-500 text-sm font-sans leading-relaxed mt-4 line-clamp-3">${previewText}</p></div><div class="flex items-center justify-between mt-12"><a${addAttribute(`/projects/${project.id}`, "href")} class="text-[10px] text-blue-500 font-mono tracking-widest uppercase font-bold hover:text-blue-600 flex items-center gap-2">ANALYSE CASE STUDY &rarr;</a></div></div>`;
	})}</div></div></section><div id="admin-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-[#060c18]/80 backdrop-blur-md"><div class="bg-[#0f1524] w-full max-w-sm rounded-lg border border-[#1e293b] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 font-mono relative"><div class="text-center text-[#3b82f6] text-xs tracking-[0.2em] font-bold mb-6">SECURE_SYSTEM_AUTH</div><div id="auth-error" class="hidden border border-[#ef4444]/50 bg-[#ef4444]/10 text-[#ef4444] text-center text-[10px] tracking-widest font-bold py-2.5 px-4 rounded mb-6">INVALID CREDENTIALS</div><form id="auth-form" class="flex flex-col gap-5 text-xs"><div class="flex flex-col gap-2"><label class="text-[#94a3b8] uppercase tracking-[0.1em] text-[10px]">Username</label><input type="text" name="username" class="bg-[#0b101c] border border-[#1e293b] rounded text-[#f8fafc] p-3 focus:outline-none focus:border-[#3b82f6] transition-colors" value="admin@vaqih.dev"></div><div class="flex flex-col gap-2"><label class="text-[#94a3b8] uppercase tracking-[0.1em] text-[10px]">Password</label><input type="password" name="password" class="bg-[#0b101c] border border-[#1e293b] rounded text-[#f8fafc] p-3 focus:outline-none focus:border-[#3b82f6] transition-colors" placeholder="•••••••••••••"></div><button type="submit" class="mt-2 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-bold py-3 rounded text-center tracking-widest transition-colors">AUTHENTICATE</button><button type="button" id="auth-cancel" class="text-[#64748b] hover:text-[#94a3b8] tracking-widest text-[10px] text-center transition-colors">CANCEL</button></form></div></div>${renderScript($$result, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/index.astro?astro&type=script&index=0&lang.ts")}${recentLabs.length > 0 && renderTemplate`<section class="w-full py-24 border-t border-slate-200 bg-white/95 backdrop-blur-xl relative overflow-hidden sticky top-16 z-[70] shadow-2xl"><div class="max-w-7xl mx-auto px-6 relative z-10"><div class="flex flex-col items-center text-center mb-16"><span class="text-[10px] font-bold text-blue-600 font-mono tracking-widest uppercase mb-4">// WRITE_LOG</span><h3 class="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Engineering Labs</h3><p class="text-sm text-slate-500 mt-3 max-w-md font-sans">Cloud architecture breakdowns, deployment post-mortems, and engineering insights.</p></div><div class="max-w-3xl mx-auto"><!-- Month Header --><div class="flex items-center gap-3 mb-8"><span class="text-sm font-bold text-slate-800 font-sans">${monthLabel.split(" ")[0]}</span><span class="text-sm font-bold text-blue-600 font-sans">${monthLabel.split(" ")[1]}</span><div class="flex-1 h-px bg-slate-200"></div></div><!-- Timeline --><div class="relative"><!-- Vertical line --><div class="absolute left-4 top-0 bottom-0 w-px bg-slate-200"></div><div class="flex flex-col gap-0"><!-- Commit-style group --><div class="relative flex gap-6 items-start pb-8"><!-- Icon --><div class="relative z-10 w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center flex-shrink-0 shadow-sm"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="text-slate-500"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 00-.064.108l-.558 1.953 1.953-.558a.253.253 0 00.108-.064l6.286-6.286zm1.238-3.763a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086z"></path></svg></div><!-- Content --><div class="flex-1 min-w-0 pt-1"><p class="text-sm font-semibold text-slate-700 mb-3 font-sans">Published ${recentLabs.length} lab${recentLabs.length > 1 ? "s" : ""}</p><div class="flex flex-col gap-2.5">${recentLabs.map((lab, idx) => {
		const barWidths = [
			100,
			80,
			80,
			20,
			50
		];
		const w = barWidths[idx % barWidths.length];
		return renderTemplate`<div class="flex items-center justify-between gap-4 group"><div class="flex items-center gap-2 min-w-0 flex-1"><a${addAttribute(`/labs/${lab.id}`, "href")} class="text-sm text-blue-600 hover:underline font-mono font-medium truncate min-w-0 max-w-[200px] sm:max-w-none">vaqihdev/${lab.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").substring(0, 30)}</a>${lab.tools && renderTemplate`<span class="text-[10px] text-slate-400 font-mono shrink-0 hidden sm:inline">${lab.tools.split(",")[0].trim()}</span>`}</div><!-- Activity bar like GitHub --><div class="w-16 sm:w-20 shrink-0 h-2.5 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-green-500 rounded-full"${addAttribute(`width: ${w}%`, "style")}></div></div></div>`;
	})}</div></div></div></div></div><!-- View All Link --><div class="mt-4 flex justify-center"><a href="/labs" class="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all">VIEW ALL WRITE-UPS<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg></a></div></div></div></section>`}` })}`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/index.astro", void 0);
var $$file = "/home/vaqih/workspace/portfoliovaqih-via-astro/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
