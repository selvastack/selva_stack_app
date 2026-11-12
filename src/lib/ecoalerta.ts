const API_URL = "https://api-ecoalerta.selvastack.org.pe/v1/statistics/reports/overview";

/** Re-fetch at most every 10 minutes (ISR); the page stays static between refreshes. */
export const ECOALERTA_REVALIDATE_SECONDS = 600;

/** Last confirmed figure, used only if the API is unreachable. */
const FALLBACK_TOTAL = 900;

export type EcoAlertaStats = { totalReports: number; live: boolean };

type OverviewResponse = { data?: { allTimeTotal?: unknown } };

/** All-time EcoAlerta report count from the public statistics API, with a safe fallback. */
export async function getEcoAlertaStats(): Promise<EcoAlertaStats> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: ECOALERTA_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as OverviewResponse;
    const total = json.data?.allTimeTotal;
    if (typeof total !== "number" || !Number.isFinite(total) || total < 0) throw new Error("invalid allTimeTotal");
    return { totalReports: Math.floor(total), live: true };
  } catch (error) {
    console.error("[ecoalerta] stats unavailable, using fallback", error);
    return { totalReports: FALLBACK_TOTAL, live: false };
  }
}

/** "+900" while on the fallback (a lower bound), the exact live figure otherwise. */
export function formatReportCount(stats: EcoAlertaStats, locale: string) {
  const n = new Intl.NumberFormat(locale).format(stats.totalReports);
  return stats.live ? n : `+${n}`;
}
