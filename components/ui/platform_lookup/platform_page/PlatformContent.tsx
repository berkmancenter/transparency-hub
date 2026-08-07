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
        <div className="flex justify-between">
          {hasPolicies ? (
            <Link
              className="flex flex-row flex-shrink w-fit p-3 items-center justify-baseline gap-2 ASML_Text Navigation !text-[14px]/[20px] cursor-pointer bg-ASML-purple rounded-lg border border-[#fbf4f4]"
              href={`/comparison_tool?platform=${encodeURIComponent(platformName)}`}
            >
              <img className="py-auto" width={24} src="/policy_index/text-compare.svg" alt="Compare policies over time" />
              Compare policies over time
            </Link>
          ) : <span />}
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