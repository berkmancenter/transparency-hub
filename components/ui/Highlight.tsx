import Link from "next/link"

export default function Highlight({
  title,
  description,
  link_desc,
  link,
  image,
  img_title,
  img_desc,
  left
}: {
  title?: string,
  description?: string,
  link_desc: string,
  link: string,
  image: string,
  img_title?: string,
  img_desc?: string,
  left?: boolean
}) {
  const isExternalLink = link.startsWith('http://') || link.startsWith('https://');
  const image_title = img_title ? img_title : ""
  const image_desc = img_desc ? img_desc : ""

  return (
    <div className={`flex flex-row justify-start gap-12  ${left ? 'flex-row-reverse' : ''}`}>
      <div className="flex flex-col gap-4 w-full">
        {title && <h3 className="ASML_Heading !text-[32px]/[43px] !font-black">{title}</h3>}
        {image != "" ? (
          <img className="sm:hidden block w-full" title={image_title} src={image} alt={image_desc} />
        ) : null}
        {description && <p className="ASML_Text !text-[16px] !leading-relaxed">{description}</p>}
        <Link
          className="ASML_Text !text-[16px] !font-bold !underline flex flex-row items-center gap-2"
          href={link}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noopener noreferrer" : undefined}
        >
          {link_desc}
          <img className="w-[11px] h-[16px]" src="/Arrow_right_logomark.png" alt="" />
        </Link>
      </div>
      {image != "" ? (
        <img className="sm:block hidden w-[196px] h-[144px]" title={image_title} src={image} alt={image_desc} />
      ) : (
        null
      )}
    </div>

  )
}