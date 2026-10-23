type CapabilityRow = {
  domain: string;
  focus: string;
  signal: string;
};

type CapabilityMatrixProps = {
  rows: CapabilityRow[];
};

export default function CapabilityMatrix({ rows }: CapabilityMatrixProps) {
  return (
    <div className="card overflow-hidden">
      <div className="hidden grid-cols-[0.8fr_1.45fr_1.2fr] gap-4 border-b border-gl-border px-5 py-3 font-sans text-[12px] font-medium text-gl-text-faint sm:grid">
        <span>Domain</span>
        <span>Focus</span>
        <span>Strategy</span>
      </div>
      <dl className="divide-y divide-gl-border">
        {rows.map((row) => (
          <div
            key={row.domain}
            className="grid gap-1.5 px-5 py-4 sm:grid-cols-[0.8fr_1.45fr_1.2fr] sm:gap-4"
          >
            <dt className="font-sans text-[14px] font-semibold text-gl-text">
              {row.domain}
            </dt>
            <dd className="text-[15px] leading-[1.5] text-gl-text-muted">
              {row.focus}
            </dd>
            <dd className="font-sans text-[13px] leading-[1.5] text-gl-primary">
              {row.signal}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
