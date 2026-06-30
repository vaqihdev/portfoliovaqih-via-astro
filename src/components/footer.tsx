import { GithubIcon } from "@/components/icons/github-icon";
import { XIcon } from "@/components/icons/x-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/blog", label: "Blog" },
	{ href: "/resume", label: "Resume" },
];

const socialLinks = [
	{
		href: "https://x.com/vaqihdev",
		label: "X",
		icon: <XIcon />,
	},
	{
		href: "https://github.com/vaqihdev",
		label: "Github",
		icon: <GithubIcon />,
	},
	{
		href: "https://instagram.com/vaqihdev",
		label: "Instagram",
		icon: <InstagramIcon />,
	},
];

export function Footer() {
	return (
		<footer className="mx-auto max-w-5xl *:px-4 *:md:px-6 w-full">
			<div className="flex flex-col gap-6 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Logo className="h-4.5" />
					</div>
					<div className="flex items-center">
						{socialLinks.map(({ href, label, icon }) => (
							<Button key={label} size="icon" variant="ghost" render={<a aria-label={label} href={href} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>{icon}</Button>
						))}
					</div>
				</div>

				<nav>
					<ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
						{navLinks.map((link) => (
							<li key={link.label}>
								<a className="hover:text-foreground" href={link.href}>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>

			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t py-4 text-muted-foreground text-sm">
				<p>&copy; {new Date().getFullYear()} Muchamad Ghufron Vaqih. All rights reserved.</p>

				<p className="inline-flex items-center gap-1">
					<span>Built by</span>
					<a
						aria-label="github"
						className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
						href={"https://github.com/vaqihdev"}
						rel="noreferrer"
						target="_blank"
					>
						<img
							alt="vaqih"
							className="size-4 rounded-full"
							height="auto"
							src="https://github.com/vaqihdev.png"
							width="auto"
						/>
						vaqihdev
					</a>
				</p>
			</div>
		</footer>
	);
}
