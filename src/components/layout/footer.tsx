import { SOCIAL_LINKS } from "@/lib/data";
import { SocialIcon } from "@/components/ui/social-icon";

export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 max-w-screen-2xl">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built with Next.js, Tailwind, and Framer Motion.
                </p>
                <div className="flex items-center gap-4">
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <SocialIcon name={link.name} className="h-5 w-5" />
                            <span className="sr-only">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
