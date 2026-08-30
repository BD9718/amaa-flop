import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { signMediaUrlFn, uploadMediaFn } from "@/lib/admin.functions";
import type { L10n, L10nList } from "@/lib/admin.server";

const LOCALES = [
  { key: "fr" as const, label: "Français" },
  { key: "ar" as const, label: "العربية" },
  { key: "en" as const, label: "English" },
];

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

export function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        dir={dir}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

export function L10nField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: L10n;
  onChange: (v: L10n) => void;
  multiline?: boolean;
}) {
  const [tab, setTab] = useState<"fr" | "ar" | "en">("fr");
  return (
    <fieldset className="rounded-lg border border-border p-3">
      <legend className="px-1 text-sm font-medium text-foreground">{label}</legend>
      <div className="mb-2 flex gap-1" role="tablist">
        {LOCALES.map((l) => (
          <button
            key={l.key}
            type="button"
            role="tab"
            aria-selected={tab === l.key}
            onClick={() => setTab(l.key)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              tab === l.key ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
      {LOCALES.map((l) =>
        tab === l.key ? (
          multiline ? (
            <textarea
              key={l.key}
              rows={4}
              dir={l.key === "ar" ? "rtl" : "ltr"}
              value={value[l.key] ?? ""}
              onChange={(e) => onChange({ ...value, [l.key]: e.target.value })}
              className={inputCls}
            />
          ) : (
            <input
              key={l.key}
              type="text"
              dir={l.key === "ar" ? "rtl" : "ltr"}
              value={value[l.key] ?? ""}
              onChange={(e) => onChange({ ...value, [l.key]: e.target.value })}
              className={inputCls}
            />
          )
        ) : null,
      )}
    </fieldset>
  );
}

export function L10nListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: L10nList;
  onChange: (v: L10nList) => void;
}) {
  const [tab, setTab] = useState<"fr" | "ar" | "en">("fr");
  const items = value[tab] ?? [];
  return (
    <fieldset className="rounded-lg border border-border p-3">
      <legend className="px-1 text-sm font-medium text-foreground">{label} (liste)</legend>
      <div className="mb-2 flex gap-1" role="tablist">
        {LOCALES.map((l) => (
          <button
            key={l.key}
            type="button"
            role="tab"
            aria-selected={tab === l.key}
            onClick={() => setTab(l.key)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              tab === l.key ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <p className="mb-2 text-xs text-muted-foreground">Un élément par ligne.</p>
      <textarea
        rows={5}
        dir={tab === "ar" ? "rtl" : "ltr"}
        value={items.join("\n")}
        onChange={(e) =>
          onChange({
            ...value,
            [tab]: e.target.value.split("\n").filter((s) => s.trim() !== ""),
          })
        }
        className={inputCls}
      />
    </fieldset>
  );
}

export function emptyL10n(): L10n {
  return { fr: "", ar: "", en: "" };
}

export function emptyL10nList(): L10nList {
  return { fr: [], ar: [], en: [] };
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const upload = useServerFn(uploadMediaFn);
  const sign = useServerFn(signMediaUrlFn);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    let cancelled = false;
    setPreview("");
    if (value && !value.startsWith("http") && !value.startsWith("/")) {
      void sign({ data: { path: value } }).then((r) => {
        if (!cancelled) setPreview(r.url);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [value, sign]);

  const displaySrc = value.startsWith("http") || value.startsWith("/") ? value : preview;

  async function onFile(file: File) {
    setBusy(true);
    setError("");
    try {
      const buf = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i] ?? 0);
      const res = await upload({
        data: {
          fileName: file.name,
          contentType: file.type,
          dataBase64: btoa(binary),
        },
      });
      onChange(res.path);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'envoi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <fieldset className="rounded-lg border border-border p-3">
      <legend className="px-1 text-sm font-medium text-foreground">{label}</legend>
      <div className="flex items-start gap-3">
        {displaySrc ? (
          <div className="relative">
            <img
              src={displaySrc}
              alt=""
              className="h-20 w-32 rounded-md border border-border object-cover"
            />
            <button
              type="button"
              aria-label="Retirer l'image"
              onClick={() => onChange("")}
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
            >
              <X className="size-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-32 items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
            Aucune image
          </div>
        )}
        <div>
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/50 disabled:opacity-60"
          >
            <Upload className="size-4" aria-hidden="true" />
            {busy ? "Envoi…" : "Téléverser"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onFile(f);
              e.target.value = "";
            }}
          />
          <p className="mt-1 text-xs text-muted-foreground">JPEG, PNG, WebP ou AVIF — 10 Mo max.</p>
          {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </div>
      </div>
    </fieldset>
  );
}
