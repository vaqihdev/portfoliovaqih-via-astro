import { C as renderTemplate, E as maybeRenderHead, M as createComponent, b as renderComponent, v as renderScript } from "./render_Q3oU-XgZ.mjs";
import "./compiler_DpBGOTbu.mjs";
import { clsx } from "clsx";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
//#region src/components/icons/github-icon.tsx
function GithubIcon(props) {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 438.549 438.549",
		...props,
		children: /* @__PURE__ */ jsx("path", {
			d: "M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z",
			fill: "currentColor"
		})
	});
}
//#endregion
//#region src/components/icons/x-icon.tsx
function XIcon(props) {
	return /* @__PURE__ */ jsx("svg", {
		fill: "currentColor",
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ jsx("path", { d: "m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" })
	});
}
//#endregion
//#region src/components/icons/instagram-icon.tsx
function InstagramIcon(props) {
	return /* @__PURE__ */ jsx("svg", {
		fill: "currentColor",
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.354 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
	});
}
//#endregion
//#region src/components/logo.tsx
var Logo = ({ className }) => /* @__PURE__ */ jsxs("div", {
	className: `font-mono text-base font-bold flex items-center space-x-1 select-none ${className || ""}`,
	children: [
		/* @__PURE__ */ jsx("span", {
			className: "text-blue-600",
			children: ">_"
		}),
		/* @__PURE__ */ jsx("span", {
			className: "text-slate-800",
			children: "vaqihdev:"
		}),
		/* @__PURE__ */ jsx("span", {
			className: "text-blue-600",
			children: "~$"
		})
	]
});
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region src/components/footer.tsx
var navLinks = [
	{
		href: "/",
		label: "Home"
	},
	{
		href: "/projects",
		label: "Projects"
	},
	{
		href: "/labs",
		label: "Labs"
	},
	{
		href: "/resume",
		label: "Resume"
	}
];
var socialLinks = [
	{
		href: "https://x.com/vaqihdev",
		label: "X",
		icon: /* @__PURE__ */ jsx(XIcon, {})
	},
	{
		href: "https://github.com/vaqihdev",
		label: "Github",
		icon: /* @__PURE__ */ jsx(GithubIcon, {})
	},
	{
		href: "https://instagram.com/vaqihdev",
		label: "Instagram",
		icon: /* @__PURE__ */ jsx(InstagramIcon, {})
	}
];
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "w-full border-t border-slate-200 bg-white/90",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 w-full",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-6 py-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ jsx(Logo, { className: "h-4.5" })
					}), /* @__PURE__ */ jsx("div", {
						className: "flex items-center",
						children: socialLinks.map(({ href, label, icon }) => /* @__PURE__ */ jsx(Button$1, {
							size: "icon",
							variant: "ghost",
							render: /* @__PURE__ */ jsx("a", {
								"aria-label": label,
								href,
								target: "_blank",
								rel: "noopener noreferrer"
							}),
							nativeButton: false,
							children: icon
						}, label))
					})]
				}), /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("ul", {
					className: "flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6",
					children: navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
						className: "hover:text-foreground",
						href: link.href,
						children: link.label
					}) }, link.label))
				}) })]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-muted-foreground text-sm",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Muchamad Ghufron Vaqih. All rights reserved."
				] }), /* @__PURE__ */ jsxs("p", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ jsx("span", { children: "Built by" }), /* @__PURE__ */ jsxs("a", {
						"aria-label": "github",
						className: "inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline",
						href: "https://github.com/vaqihdev",
						rel: "noreferrer",
						target: "_blank",
						children: [/* @__PURE__ */ jsx("img", {
							alt: "vaqih",
							className: "size-4 rounded-full",
							height: "auto",
							src: "https://github.com/vaqihdev.png",
							width: "auto"
						}), "vaqihdev"]
					})]
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "FooterReact", Footer, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/footer.tsx",
		"client:component-export": "Footer"
	})}`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/Footer.astro", void 0);
//#endregion
//#region src/components/LoadingScreen.astro
var $$LoadingScreen = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="global-loader" class="print:hidden fixed inset-0 z-[9999] bg-[#070b15] flex flex-col items-center justify-center font-mono text-slate-300 select-none overflow-hidden transition-all duration-700 ease-in-out" data-astro-cid-46m7bkbl><!-- Loading Wrapper --><!-- Loading Wrapper --><div class="relative w-full max-w-lg px-6 flex flex-col items-center gap-8" data-astro-cid-46m7bkbl><!-- DevOps Orbital HUD / Tech Spinner --><div class="relative w-32 h-32 flex items-center justify-center" data-astro-cid-46m7bkbl><!-- Outer Orbit (dashed) --><div class="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full animate-[spin_20s_linear_infinite]" data-astro-cid-46m7bkbl></div><!-- Middle Orbit (glowing, solid segments) --><div class="absolute inset-2 border border-cyan-500/40 rounded-full border-t-transparent border-b-transparent animate-[spin_8s_linear_infinite_reverse]" data-astro-cid-46m7bkbl></div><!-- Inner Orbit (hexagon or fast spinner) --><div class="absolute inset-6 border-2 border-dotted border-indigo-500/60 rounded-full animate-[spin_4s_linear_infinite]" data-astro-cid-46m7bkbl></div><!-- Center Kubernetes-like / Cloud Core Node --><div class="relative w-12 h-12 bg-slate-900 border border-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]" data-astro-cid-46m7bkbl><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-46m7bkbl><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-astro-cid-46m7bkbl></path></svg></div><!-- Pulse waves --><div class="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-10" data-astro-cid-46m7bkbl></div></div><!-- Title & Status --><div class="text-center flex flex-col gap-2" data-astro-cid-46m7bkbl><h2 class="text-sm font-bold tracking-[0.3em] text-white uppercase flex items-center justify-center gap-2" data-astro-cid-46m7bkbl><span class="inline-block w-2.5 h-2.5 bg-cyan-500 rounded-full animate-ping" data-astro-cid-46m7bkbl></span>VAQIH.INFRA.DEPLOY</h2><p id="loader-status-text" class="text-xs text-blue-400 font-bold uppercase tracking-wider h-4" data-astro-cid-46m7bkbl>INITIALIZING SYSTEM...</p></div><!-- Console Log Display Box --><div class="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-4 h-48 overflow-hidden shadow-2xl relative font-mono" data-astro-cid-46m7bkbl><!-- Terminal Header --><div class="flex items-center justify-between border-b border-slate-900 pb-2 mb-3 text-[10px] text-slate-500" data-astro-cid-46m7bkbl><div class="flex items-center gap-1.5" data-astro-cid-46m7bkbl><span class="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" data-astro-cid-46m7bkbl></span><span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" data-astro-cid-46m7bkbl></span><span class="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" data-astro-cid-46m7bkbl></span><span class="ml-2 font-mono" data-astro-cid-46m7bkbl>vaqih-devops-pipeline.sh</span></div><span id="loader-pct" data-astro-cid-46m7bkbl>0%</span></div><!-- Terminal Lines --><div id="loader-console" class="flex flex-col gap-1.5 text-[11px] leading-relaxed text-slate-400 overflow-y-auto h-[120px] scrollbar-none" data-astro-cid-46m7bkbl><!-- Lines will be dynamically appended here --></div></div><!-- System Progress Bar --><div class="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800" data-astro-cid-46m7bkbl><div id="loader-progress-bar" class="bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 h-1.5 w-0 transition-all duration-300 ease-out" data-astro-cid-46m7bkbl></div></div></div></div>${renderScript($$result, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/LoadingScreen.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/LoadingScreen.astro", void 0);
//#endregion
//#region src/components/Logo.astro
var $$Logo = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="font-mono text-lg sm:text-xl font-bold flex items-center space-x-1 select-none"><span class="text-blue-600 dark:text-blue-500">&gt;_</span><span class="text-slate-800 dark:text-slate-200">vaqihdev:</span><span class="text-blue-600 dark:text-blue-500">~$</span></div>`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/Logo.astro", void 0);
//#endregion
//#region src/components/Navbar.astro
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md"><div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"><!-- Logo --><a href="/" class="hover:opacity-80 transition-opacity flex items-center gap-2 flex-shrink-0">${renderComponent($$result, "Logo", $$Logo, {})}</a><!-- Desktop Nav --><nav class="hidden md:flex space-x-8 text-sm font-semibold tracking-wide text-slate-500" id="desktop-nav"><a href="/" class="nav-link pb-1 transition-colors hover:text-slate-900" data-path="/">Home</a><a href="/projects" class="nav-link pb-1 transition-colors hover:text-slate-900" data-path="/projects">Projects</a><a href="/labs" class="nav-link pb-1 transition-colors hover:text-slate-900" data-path="/labs">Labs</a><a href="/resume" class="nav-link pb-1 transition-colors hover:text-slate-900" data-path="/resume">Resume</a></nav><!-- Hamburger Button (mobile only) --><button id="mobile-menu-btn" class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors gap-1.5" aria-label="Toggle menu" aria-expanded="false"><span class="ham-line block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300"></span><span class="ham-line block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300"></span><span class="ham-line block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300"></span></button></div><!-- Mobile Menu Panel --><div id="mobile-menu" class="md:hidden hidden border-t border-slate-100 bg-white/95 backdrop-blur-md"><nav class="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1"><a href="/" class="mobile-nav-link flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" data-path="/"><span class="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 mobile-dot"></span>Home</a><a href="/projects" class="mobile-nav-link flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" data-path="/projects"><span class="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 mobile-dot"></span>Projects</a><a href="/labs" class="mobile-nav-link flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" data-path="/labs"><span class="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 mobile-dot"></span>Labs</a><a href="/resume" class="mobile-nav-link flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" data-path="/resume"><span class="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 mobile-dot"></span>Resume</a></nav></div></header><script>
  (function () {
    const btn       = document.getElementById('mobile-menu-btn');
    const menu      = document.getElementById('mobile-menu');
    const lines     = document.querySelectorAll('.ham-line');
    const path      = window.location.pathname.replace(/\\/$/, '') || '/';

    // Highlight active link — desktop
    document.querySelectorAll('.nav-link').forEach(link => {
      const lp = link.getAttribute('data-path').replace(/\\/$/, '') || '/';
      const active = path === lp || (lp !== '/' && path.startsWith(lp));
      if (active) {
        link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', '-mb-[18px]');
        link.classList.remove('text-slate-500');
      }
    });

    // Highlight active link — mobile
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const lp = link.getAttribute('data-path').replace(/\\/$/, '') || '/';
      const active = path === lp || (lp !== '/' && path.startsWith(lp));
      if (active) {
        link.classList.add('bg-blue-50', 'text-blue-600');
        link.classList.remove('text-slate-600');
        link.querySelector('.mobile-dot')?.classList.remove('opacity-0');
        link.querySelector('.mobile-dot')?.classList.add('opacity-100');
      }
    });

    if (!btn || !menu) return;

    let open = false;

    function toggleMenu() {
      open = !open;
      btn.setAttribute('aria-expanded', String(open));

      if (open) {
        menu.classList.remove('hidden');
        // Animate hamburger → X
        lines[0].style.transform = 'translateY(8px) rotate(45deg)';
        lines[1].style.opacity   = '0';
        lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        menu.classList.add('hidden');
        lines[0].style.transform = '';
        lines[1].style.opacity   = '';
        lines[2].style.transform = '';
      }
    }

    btn.addEventListener('click', toggleMenu);

    // Close when clicking a link
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (open) toggleMenu();
    }));

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (open && !btn.contains(e.target) && !menu.contains(e.target)) {
        toggleMenu();
      }
    });
  })();
<\/script>`;
}, "/home/vaqih/workspace/portfoliovaqih-via-astro/src/components/Navbar.astro", void 0);
//#endregion
export { $$LoadingScreen as n, $$Footer as r, $$Navbar as t };
