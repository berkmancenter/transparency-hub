import Link from "next/link";

function DocTypeCard({
  colored,
  interactive,
  title,
  description,
  image,
  image_alt
} : {
  colored: boolean,
  interactive: boolean,
  title: string,
  description: string,
  image: string,
  image_alt: string
}) {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const className =
    "rounded-[8px] text-center p-6 " +
    (colored ? "bg-gradient-to-b from-ASML-blue/50 via-ASML-purple/50 to-ASML-red/50" : "bg-[#1F1F1F]") +
    (interactive ? " cursor-pointer" : "");

  const content = (
    <>
      <div className="w-8 h-8 mx-auto mb-4">
        <img className="w-full h-full" title={title + " icon"} src={image} alt={image_alt} />
      </div>
      <h4 className="ASML_Text !text-[16px] !font-bold mb-2">{title}</h4>
      <p className="ASML_Text !text-[14px] opacity-80">{description}</p>
    </>
  );

  return interactive ? (
    <Link href={`#${slug}`} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

export default function DocTypeCards({
  colored,
  interactive
} : {
  colored: boolean,
  interactive: boolean
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <DocTypeCard 
        colored={colored}
        interactive={interactive}
        title="Privacy Policies"
        description="Policies that determine how the platform uses your data"
        image="/policy_index/eye.svg"
        image_alt="Icon graphic representing an eye"
      />
      <DocTypeCard 
        colored={colored}
        interactive={interactive}
        title="Terms and Conditions"
        description="Policies that govern how you use the platform"
        image="/policy_index/file-text.svg"
        image_alt="Icon graphic representing a document"
      />
      <DocTypeCard 
        colored={colored}
        interactive={interactive}
        title="Community Standards"
        description="Policies that dictate acceptable user behavior"
        image="/policy_index/users.svg"
        image_alt="Icon graphic representing two people"
      />
      <DocTypeCard 
        colored={colored}
        interactive={interactive}
        title="Other"
        description="Any policies that do not fall within the other categories"
        image="/policy_index/other.svg"
        image_alt="Icon graphic representing a stack of documents"
      />
    </div>
  );
}