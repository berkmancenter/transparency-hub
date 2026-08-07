import { notFound } from "next/navigation";
import { connectToDatabase } from "@/components/lib/mongodb";
import { unstable_cache } from 'next/cache';
import PlatformTitle from "./PlatformTitle";


async function getCaptureCount(platformName: string): Promise<number | null> {
  const dbConnection = await connectToDatabase();
  if (!dbConnection?.database) return null;

  const { database } = dbConnection;
  const companyData = await database.collection('companies').findOne({ name: platformName });
  if (!companyData) return null;

  const documentCount = await database.collection('documents_v2')
    .countDocuments({ company_id: companyData._id.toString() });

  return documentCount;
}

const getCachedCaptureCount = unstable_cache(
  async (platformName: string) => getCaptureCount(platformName),
  ['capture-count'],
  { revalidate: 300 } // same as your old s-maxage=300
);

export async function generateMetadata({ params }: { params: Promise<{ platformName: string }> }) {
  const platformName = decodeURIComponent((await params).platformName);
  return { title: `${platformName} | Transparency Hub Widget` };
}

export default async function TransparencyWidget({ params }: { params: Promise<{ platformName: string }> }) {
  const platformName = decodeURIComponent((await params).platformName);
  const captureCount = await getCachedCaptureCount(platformName);
  const hubUrl = "https://hub.transparency.berkmancenter.org/policy_index/" + encodeURIComponent(platformName);

  if (!captureCount) notFound();

  return (
    <div
      className="bg-gradient-to-br from-ASML-blue via-ASML-purple to-ASML-red relative flex w-full max-w-[800px] min-h-[150px] widget-sm:min-h-[190px] rounded-[18px] ASML_Text overflow-hidden"
      role="region"
      aria-label={`${platformName} on Transparency Hub`}
    >
      <div
        className="relative z-10 flex flex-1 flex-col justify-between gap-1.5 px-1 pt-2 pb-5 items-baseline"
      >
        <img className="max-h-14 widget-sm:max-h-20" title="Transparency Hub Logo" src="/THUB_title.svg" alt="Logo of Transparency Hub, An Applied Social Media Lab Project" />
        <div className="flex w-full flex-col gap-1 px-4">
          <PlatformTitle platformName={platformName} />
          <p className="max-w-[220px] text-xs leading-snug text-white/75">
            Archived policy materials and transparency documents.
          </p>
        </div>
      </div>

      {/* Below the widget-sm breakpoint the stat card has no room to sit beside the
          title, so it collapses into a small badge pinned to the bottom-right corner
          instead of squeezing the logo and title out of the available width. */}
      <a
        href={hubUrl}
        aria-label={`View archive of ${captureCount.toLocaleString()} policy captures for ${platformName} on Transparency Hub`}
        className="widget-sm:hidden group absolute bottom-2 right-2 z-10 flex items-center gap-2 rounded-full bg-black/55 px-4 py-2.5 no-underline backdrop-blur-sm transition-colors duration-150 hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
      >
        <span className="text-[18px] font-extrabold leading-none tracking-[-0.02em] text-white" aria-hidden="true">
          {captureCount.toLocaleString()}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide text-white/70" aria-hidden="true">
          captures
        </span>
        <img
          className="w-[7px] h-[11px] transition-transform duration-150 group-hover:translate-x-0.5"
          src="/Arrow_right_logomark.png"
          alt=""
          aria-hidden="true"
        />
      </a>

      <div className="hidden widget-sm:flex relative z-10 items-center py-3.5 pr-3.5">
        <div
          className="absolute right-3.5 top-1/2 h-[calc(100%-1.75rem)] w-[170px] -translate-y-1/2 rotate-3 rounded-2xl bg-white/10"
          aria-hidden="true"
        />
        <a
          href={hubUrl}
          aria-label={`View archive of ${captureCount.toLocaleString()} policy captures for ${platformName} on Transparency Hub`}
          className="group relative flex min-w-[160px] flex-col items-start justify-center gap-3 rounded-2xl bg-black/45 px-5 py-4 no-underline backdrop-blur-sm transition-colors duration-150 hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-10px_16px_-10px_rgba(0,0,0,0.45)]"
        >
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[40px] font-extrabold leading-none tracking-[-0.03em] text-white"
              aria-hidden="true"
            >
              {captureCount.toLocaleString()}
            </span>
            <span className="text-sx tracking-wide text-white/65" aria-hidden="true">
              policy captures
            </span>
          </div>

          <div className="h-px w-full bg-white/20" aria-hidden="true" />

          <span
            className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-white whitespace-nowrap"
            aria-hidden="true"
          >
            View archive
            <img
              className="w-[11px] h-[16px] transition-transform duration-150 group-hover:translate-x-0.5"
              src="/Arrow_right_logomark.png"
              alt=""
            />
          </span>
        </a>
      </div>
    </div>
  )}
