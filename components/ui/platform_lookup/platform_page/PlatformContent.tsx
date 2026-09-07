import { Platform, DocumentIndex, WaybackIndex } from '@/components/src/types';
import Link from 'next/link';
import DocTypeBlob from './DocTypeBlob';
import ShareMenu from './ShareMenu';

export default function PlatformContent({
  platformName,
  platform,
  index,
  waybackIndex,
}: {
  platformName: string;
  platform: Platform;
  index: DocumentIndex;
  waybackIndex: WaybackIndex;
}) {
  const hasPolicies = Object.keys(index).length > 0;
  const hasTxtCaptures = Object.values(index).some((byDate) =>
    Object.values(byDate).some((formats) => formats["txt"])
  );

  return (
    <div className="flex flex-col gap-9">
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {platform.url ? (
            <p className="ASML_Text Paragraph">
              Website:&nbsp;
              <Link className="underline" href={platform.url}>
                {platform.url}
                <img className="inline w-[20px] h-[20px] ml-2 mb-1" src="/policy_index/external-link.svg" alt="" />
              </Link>
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-start">
          {hasPolicies && (
            <Link
              className="flex flex-row flex-shrink w-full sm:w-fit p-3 items-center justify-center gap-2 ASML_Text Navigation !text-[14px]/[20px] cursor-pointer bg-ASML-purple rounded-lg border border-[#fbf4f4]"
              href={`/comparison_tool?platform=${encodeURIComponent(platformName)}`}
            >
              <img className="py-auto" width={24} src="/policy_index/text-compare.svg" alt="Compare policies over time" />
              Compare policies over time
            </Link>
          )}
          {hasTxtCaptures && (
            <a
              href={`/api/download-captures?q=${encodeURIComponent(platformName)}`}
              className="flex flex-row flex-shrink w-full sm:w-fit p-3 items-center justify-center gap-2 ASML_Text Navigation !text-[14px]/[20px] cursor-pointer bg-ASML-purple rounded-lg border border-[#fbf4f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg viewBox="0 0 16 16" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 1.5v8.5M4.5 6.5L8 10l3.5-3.5M2 12.5v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" />
              </svg>
              Download all captures
            </a>
          )}
          <ShareMenu platformName={platformName} />
        </div>

      </section>
      <section className="flex flex-col gap-4">
        <h3 className="ASML_Heading !text-[28px]/[38px] !font-bold">View Policies</h3>
        {hasPolicies ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {Object.keys(index).map((docType) => (
              <DocTypeBlob
                key={docType}
                name={platformName}
                type={docType}
                TypeIndex={index[docType]}
                WaybackIndex={waybackIndex[docType]}
              />
            ))}
          </div>
        ) : (
          <p className="ASML_Text Paragraph pl-4">
            No policy snapshots have been collected for {platformName} yet.
            <br />
            <br />
            <span className="italic">The Transparency Hub is a continually updating living project. Please check back later, or contact us if you have any questions.</span>
          </p>
        )}
      </section>
    </div>
  );
}