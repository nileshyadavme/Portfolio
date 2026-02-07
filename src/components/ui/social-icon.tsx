import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

export const KaggleIcon = ({ className }: { className?: string }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M18.825 23.859c-.022.092-.117.141-.184.141h-2.98c-.143 0-.168-.063-.231-.148l-4.529-6.906-1.583 1.572v5.336c0 .108-.07.146-.153.146H6.155c-.092 0-.148-.049-.148-.152V.146C6.007.039 6.063 0 6.155 0h3.012c.083 0 .153.04.153.146v15.003l6.98-7.901c.063-.081.16-.148.27-.148h3.333c.108 0 .167.076.12.188l-5.636 6.096 6.438 10.337c.054.081.045.139.045.139z" />
    </svg>
);

interface SocialIconProps {
    name: string;
    className?: string;
}

export function SocialIcon({ name, className }: SocialIconProps) {
    switch (name) {
        case "GitHub":
            return <Github className={className} />;
        case "LinkedIn":
            return <Linkedin className={className} />;
        case "Instagram":
            return <Instagram className={className} />;
        case "YouTube":
            return <Youtube className={className} />;
        case "Kaggle":
            return <KaggleIcon className={className} />;
        default:
            return null;
    }
}
