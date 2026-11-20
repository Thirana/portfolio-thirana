import { ArrowUpRight, Check, CircleDashed } from "lucide-react";
import { breachLab, type PracticeArea } from "@/content/breachlab";
import { cn } from "@/lib/utils";
import Tag from "./Tag";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const TILTS = ["-rotate-3", "rotate-2"];

/** A stop on the route: a ticked dot when done, an open ring when under way. */
function StopMarker({ status }: { status: PracticeArea["status"] }) {
  return status === "completed" ? (
    <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-gl-swatch-1 text-white">
      <Check className="size-3.5" strokeWidth={3} aria-hidden />
    </span>
  ) : (
    <span className="relative z-10 flex size-6 items-center justify-center rounded-full border-2 border-gl-swatch-4 bg-gl-surface">
      <span className="size-2 rounded-full bg-gl-swatch-4" />
    </span>
  );
}

function StatusBadge({ status }: { status: PracticeArea["status"] }) {
  const done = status === "completed";
  return (
    <span className="sketch sketch-pill inline-flex items-center gap-1.5 rounded-full border border-gl-border px-3 py-1 font-sans text-[12px] text-gl-text-muted">
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          done ? "bg-gl-swatch-1" : "bg-gl-swatch-4",
        )}
      />
      {done ? "Completed" : "In progress"}
    </span>
  );
}

/**
 * Hands-on security practice on BreachLab as a short route: each area is a
 * stop, done or under way, with what it covers in plain English and, when
 * finished, its certificates as hand-drawn stamps.
 */
export function SecurityPractice() {
  const { areas, rank, rankedOperators } = breachLab;

  return (
    <div className="card p-5 sm:p-6">
      <p className="max-w-[34rem] text-[15px] leading-[1.6] text-gl-text-muted">
        Security is a self-taught interest of mine. I study common weaknesses in
        machines and websites, how to find them and how to fix them, and
        complete capture-the-flag challenges on a platform called BreachLab.
      </p>

      <ol className="mt-6">
        {areas.map((area, i) => {
          const last = i === areas.length - 1;
          return (
            <li key={area.title} className="relative flex gap-4 pb-8 last:pb-2">
              {/* The route: solid between finished stops, dashed onward. */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-6 bottom-0 left-[11px] w-0.5",
                  last
                    ? "border-l-2 border-dashed border-gl-border-strong"
                    : "bg-gl-swatch-1/50",
                )}
              />
              <StopMarker status={area.status} />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h3 className="font-sans text-[17px] font-semibold tracking-[-0.015em] text-gl-text">
                    {area.title}
                  </h3>
                  <StatusBadge status={area.status} />
                </div>

                <ul
                  className="mt-3 flex flex-wrap gap-1.5"
                  aria-label={
                    area.status === "completed"
                      ? "Weaknesses covered"
                      : "Weaknesses in progress"
                  }
                >
                  {area.weaknesses.map((weakness) => (
                    <li key={weakness}>
                      <Tag
                        icon={
                          area.status === "completed" ? (
                            <Check
                              className="size-3.5 text-gl-swatch-1"
                              strokeWidth={2.75}
                              aria-hidden
                            />
                          ) : (
                            <CircleDashed
                              className="size-3.5 text-gl-swatch-4"
                              aria-hidden
                            />
                          )
                        }
                      >
                        {weakness}
                      </Tag>
                    </li>
                  ))}
                </ul>

                {area.certificates?.length ? (
                  <ul
                    className="mt-4 flex flex-wrap gap-3"
                    aria-label="Certificates"
                  >
                    {area.certificates.map((cert, j) => (
                      <li key={cert.url}>
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex flex-col items-center gap-1.5"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG sketch */}
                          <img
                            src={cert.stamp}
                            alt=""
                            width={220}
                            height={136}
                            loading="lazy"
                            className={cn(
                              "h-auto w-[112px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-0 sm:w-[136px]",
                              TILTS[j % TILTS.length],
                            )}
                          />
                          <span className="link-arrow text-[12.5px]">
                            View certificate
                            <span className="sr-only">
                              {" "}
                              ({cert.label}, {formatDate(cert.date)}, opens
                              BreachLab)
                            </span>
                            <ArrowUpRight className="size-3" aria-hidden />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-gl-border pt-4">
        <a
          href={breachLab.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="link-arrow"
        >
          BreachLab profile
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
        <span className="font-sans text-[12.5px] text-gl-text-faint tabular-nums">
          Ranked #{rank} of {rankedOperators.toLocaleString("en-US")} - as of{" "}
          {formatDate(breachLab.asOf)}
        </span>
      </div>
    </div>
  );
}
