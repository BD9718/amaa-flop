import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { contactInfo } from "@/content/data";
import { getDict, type Locale } from "@/i18n";

const links = [
  { to: "/$locale/about", key: "about" as const },
  { to: "/$locale/actions", key: "actions" as const },
  { to: "/$locale/projects", key: "projects" as const },
  { to: "/$locale/news", key: "news" as const },
  { to: "/$locale/gallery", key: "gallery" as const },
  { to: "/$locale/partners", key: "partners" as const },
  { to: "/$locale/contact", key: "contact" as const },
];

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.about}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
            {t.footer.quickLinks}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  to={l.to}
                  params={{ locale }}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
            {t.footer.contactTitle}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-primary" dir="ltr">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-primary" dir="ltr">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{t.contact.addressValue}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.footer.tagline}. {t.footer.rights}
          </p>
          <p>{t.common.placeholder}</p>
        </div>
      </div>
    </footer>
  );
}
