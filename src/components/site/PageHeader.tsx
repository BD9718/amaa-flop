export function PageHeader({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="container-page py-16 md:py-20">
        {kicker && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{kicker}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-balance-tight md:text-5xl">{title}</h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionTitle({
  title,
  lead,
  align = "start",
}: {
  title: string;
  lead?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="text-3xl font-semibold text-balance-tight md:text-4xl">{title}</h2>
      {lead && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{lead}</p>}
    </div>
  );
}
