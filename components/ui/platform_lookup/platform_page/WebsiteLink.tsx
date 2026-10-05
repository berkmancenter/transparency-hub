import Link from 'next/link';

export const actionButtonClass = "flex flex-row flex-shrink w-full sm:w-fit p-3 items-center justify-center gap-2 ASML_Text Navigation !text-[14px]/[20px] cursor-pointer bg-ASML-purple rounded-lg border border-[#fbf4f4]";

export default function WebsiteLink({ url }: { url?: string }) {
  if (!url) return null;

  return (
    <p className="ASML_Text Paragraph">
      Website:&nbsp;
      <Link className="underline" href={url}>
        {url}
        <img className="inline w-[20px] h-[20px] ml-2 mb-1" src="/policy_index/external-link.svg" alt="" />
      </Link>
    </p>
  );
}
