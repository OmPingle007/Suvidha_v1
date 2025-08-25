import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import Logo from "./logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
        </div>
        <p className="text-sm text-muted-foreground">
          © {year} Suvidha OCR. Made with ❤️ in India.
        </p>
        <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false} aria-label="Twitter">
                <Twitter className="h-5 w-5" />
            </Link>
             <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false} aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
            </Link>
        </div>
      </div>
    </footer>
  );
}
