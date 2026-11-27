/**
 * Hands-on security practice on BreachLab, told as a route of areas in plain
 * English. The platform has no public API, so the rank and solve count are
 * copied from the public profile; update `asOf` with them.
 */

export type PracticeCertificate = {
  label: string;
  /** ISO date the certificate was earned. */
  date: string;
  url: string;
  /** Hand-drawn stamp, exported from content/site-diagrams/breachlab. */
  stamp: string;
};

export type PracticeArea = {
  title: string;
  status: "completed" | "in-progress";
  /** Common weaknesses the area covers, by their usual technical names. */
  weaknesses: string[];
  certificates?: PracticeCertificate[];
};

export const breachLab = {
  profileUrl: "https://breachlab.org/u/thirana",
  asOf: "2026-11-20",
  rank: 55,
  rankedOperators: 2032,
  areas: [
    {
      title: "Linux and cloud systems",
      status: "completed",
      weaknesses: [
        "Privilege escalation",
        "Credential exposure",
        "Data exfiltration",
        "Cloud network misconfiguration",
        "CI/CD pipeline misconfiguration",
      ],
      certificates: [
        {
          label: "Certificate, part 1",
          date: "2026-10-27",
          url: "https://breachlab.org/u/thirana/certificate/ghost",
          stamp: "/diagrams/site/breachlab/certified-1.svg",
        },
        {
          label: "Certificate, part 2",
          date: "2026-11-12",
          url: "https://breachlab.org/u/thirana/certificate/phantom-i",
          stamp: "/diagrams/site/breachlab/certified-2.svg",
        },
      ],
    },
    {
      title: "Web applications",
      status: "in-progress",
      weaknesses: [
        "Information disclosure",
        "Broken access control (IDOR)",
        "Business logic vulnerabilities",
        "Authentication and JWT flaws",
        "Cookie and session flaws",
        "SQL and command injection",
        "XSS and SSRF",
        "CSRF",
        "CORS misconfiguration",
      ],
    },
  ] satisfies PracticeArea[],
};
