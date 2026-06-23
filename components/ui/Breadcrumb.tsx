import Link from "next/link";

export default function Breadcrumb({
  current_page,
  previous_page,
  link,
  trnslt
} : {
  current_page: string,
  previous_page: string,
  link: string,
  trnslt?: "yes" | "no"
}) {
  return (
    <div className="flex flex-row gap-1 ASML_Text Paragraph">
      <Link className="!font-bold !underline" href={link}>{previous_page}</Link> 
      /
      <span translate={trnslt}>{current_page}</span>
    </div>
  );
}