import { unstable_cache } from "next/cache";

export type Activity = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionsResponse = {
  contributions: Activity[];
};

// Hard window for the home graph: 35 weeks keeps the squares at the size the
// card was designed around. Move the end date forward as months pass.
const GRAPH_END_DATE = "2026-10-31";
const GRAPH_WEEKS = 35;

function graphStartDate(): string {
  const end = new Date(`${GRAPH_END_DATE}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - GRAPH_WEEKS * 7 + 1);
  return end.toISOString().slice(0, 10);
}

export const getCachedContributions = unstable_cache(
  async (username: string) => {
    const res = await fetch(
      `${process.env.GITHUB_CONTRIBUTIONS_API_URL ?? "https://github-contributions-api.jogruber.de"}/v4/${username}?y=last`,
    );
    const data = (await res.json()) as GitHubContributionsResponse;
    const start = graphStartDate();

    const contributions = data.contributions.filter(
      (a) => a.date >= start && a.date <= GRAPH_END_DATE,
    );

    // Pad both edges so the grid always spans the full window.
    if (!contributions.some((a) => a.date === start)) {
      contributions.unshift({ date: start, count: 0, level: 0 });
    }
    if (!contributions.some((a) => a.date === GRAPH_END_DATE)) {
      contributions.push({ date: GRAPH_END_DATE, count: 0, level: 0 });
    }

    return contributions;
  },
  ["github-contributions-v3"],
  { revalidate: 86400 },
);
