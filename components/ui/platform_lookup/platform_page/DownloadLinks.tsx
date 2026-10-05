import Link from "next/link";
import { sortFormats } from "@/components/lib/policyVersions";

export const downloadButtonClass = "flex items-center justify-center p-3 border-1 border-[#FFFFFF] rounded-[8px] ASML_Text Paragragh hover:bg-orchid-600";

// One link per available format of a single capture, in the standard display order
export default function DownloadLinks({
  formats,
  className = "",
}: {
  formats: Record<string, string>,
  className?: string,
}) {
  return (
    <>
      {sortFormats(Object.keys(formats)).map((format) => (
        <Link
          key={format}
          href={formats[format]}
          target="_blank" rel="noopener noreferrer"
          className={`${downloadButtonClass} uppercase ${className}`}>
          {format === 'warc.json' ? 'json' : format}
        </Link>
      ))}
    </>
  );
}
