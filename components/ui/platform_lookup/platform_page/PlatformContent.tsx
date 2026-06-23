import { Platform, DocumentIndex, WaybackIndex } from '@/components/src/types';
import Link from 'next/link';
import DocTypeBlob from './DocTypeBlob';

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
  return (
    <div className="flex flex-col gap-9">
      {platform.url ? (
        <p className="ASML_Text Paragraph">
          Website:&nbsp;
          <Link className="underline" href={platform.url}>
            {platform.url}
            <img className="inline w-[20px] h-[20px] ml-2 mb-1" src="/policy_index/external-link.svg" alt="" />
          </Link>
        </p>
      ) : null}
      <section className="flex flex-col gap-4">
        <h3 className="ASML_Heading !text-[28px]/[38px] !font-bold">View Policies</h3>
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
      </section>
    </div>
  );
}