import { unstable_cache } from "next/cache";

export type Activity = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionsResponse = {
  contributions: Activity[];
};

const GRAPH_END_DATE = "2026-06-30";

export const getCachedContributions = unstable_cache(
  async (username: string) => {
    const res = await fetch(
      `${process.env.GITHUB_CONTRIBUTIONS_API_URL ?? "https://github-contributions-api.jogruber.de"}/v4/${username}?y=last`,
    );
    const data = (await res.json()) as GitHubContributionsResponse;

    const contributions = data.contributions.filter(
      (a) => a.date <= GRAPH_END_DATE,
    );

    if (!contributions.some((a) => a.date === GRAPH_END_DATE)) {
      contributions.push({ date: GRAPH_END_DATE, count: 0, level: 0 });
    }

    return contributions;
  },
  ["github-contributions"],
  { revalidate: 86400 },
);
