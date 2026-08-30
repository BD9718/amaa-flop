import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { contactInfo } from "@/content/data";
import { media } from "@/content/media";
import { getDict, normalizeLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$locale/contact")({
  head: ({ params }) => {
    const t = getDict(params.locale);
    return pageHead({
      locale: params.locale,
      path: "/contact",
      title: t.meta.contact.title,
      description: t.meta.contact.description,
      image: media.cleanWater,
    });
  },
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function ContactPage() {
  const locale = normalizeLocale(Route.useParams().locale);
  const t = getDict(locale);
  const f = t.contact.form;
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = f.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = f.errEmail;
    if (subject.length < 3) next.subject = f.errSubject;
    if (message.length < 20) next.message = f.errMessage;

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      e.currentTarget.reset();
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40";

  return (
    <>
      <PageHeader kicker={t.nav.contact} title={t.contact.title} lead={t.contact.lead} />

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary"
          >
            <Phone className="mt-0.5 size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold">{t.contact.phone}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground" dir="ltr">
                {contactInfo.phone}
              </span>
            </span>
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary"
          >
            <Mail className="mt-0.5 size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold">{t.contact.email}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground" dir="ltr">
                {contactInfo.email}
              </span>
            </span>
          </a>
          <a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary"
          >
            <MessageCircle className="mt-0.5 size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold">{t.contact.whatsapp}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground" dir="ltr">
                +{contactInfo.whatsapp}
              </span>
            </span>
          </a>
          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-soft">
            <MapPin className="mt-0.5 size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold">{t.contact.address}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{t.contact.addressValue}</span>
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-soft md:p-9">
          <h2 className="text-2xl font-semibold">{t.contact.formTitle}</h2>

          {sent ? (
            <div className="mt-6 flex items-start gap-3 rounded-lg bg-accent p-5 text-sm text-accent-foreground">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p>{f.success}</p>
            </div>
          ) : null}

          <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  {f.name}
                </label>
                <input id="name" name="name" className={inputClass} aria-invalid={!!errors.name} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  {f.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  className={inputClass}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium">
                {f.subject}
              </label>
              <input id="subject" name="subject" className={inputClass} aria-invalid={!!errors.subject} />
              {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                {f.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className={inputClass}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
            >
              {f.send}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
