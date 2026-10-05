import Link from "next/link";
import { Fragment } from "react";

export default function Breadcrumb({
  current_page,
  previous_page,
  link,
  trail = [],
  trnslt
} : {
  current_page: string,
  previous_page: string,
  link: string,
  // Extra linked levels between previous_page and current_page
  trail?: { label: string, link: string, trnslt?: "yes" | "no" }[],
  trnslt?: "yes" | "no"
}) {
  return (
    <div className="flex flex-row flex-wrap gap-1 ASML_Text Paragraph">
      <Link className="!font-bold !underline" href={link}>{previous_page}</Link>
      /
      {trail.map((crumb) => (
        <Fragment key={crumb.link}>
          <Link className="!font-bold !underline" href={crumb.link} translate={crumb.trnslt}>{crumb.label}</Link>
          /
        </Fragment>
      ))}
      <span translate={trnslt}>{current_page}</span>
    </div>
  );
}
