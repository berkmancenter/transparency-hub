import Link from "next/link";
import { Platform } from "../../src/types";

export default function PlatformBlob({
  platform,
  noMobile
}: {
  platform: Platform
  noMobile?: boolean
}) {
  if (!platform) {
    return null;
  }

  const docTypes = Object.keys(platform.doc_urls);

  const privacyPolicy = docTypes.find((type) => type === "Privacy Policy");
  const termsOfService = docTypes.find((type) => type === "Terms of Service");
  const communityGuidelines = docTypes.find((type) => type === "Community Guidelines");
  const otherType = docTypes.find((type) => type !== "Privacy Policy" && type !== "Terms of Service" && type !== "Community Guidelines");

  return (
    <Link className={`h-full w-full flex flex-col p-4 hover:bg-gradient-to-b from-[rgba(255,255,255,0.15)] rounded-[8px] border-1 border-alt-blue ASML_Text !text-[20px]/[30px] !font-bold gap-2 wrap-anywhere ${noMobile ? "hidden lg:flex" : ""}`}
      href={`/policy_index/${encodeURIComponent(platform.name)}`}
    >
      <span translate="no">{platform.name}</span>
      <div className="flex flex-row gap-2">
        {privacyPolicy ? <img width={16} title="Privacy Policies icon" src="/policy_index/eye.svg" alt="Privacy Policies icon"/> : null}
        {termsOfService ? <img width={16} title="Terms and Conditions icon" src="/policy_index/file-text.svg" alt="Terms and Conditions icon"/> : null}
        {communityGuidelines ? <img width={16} title="Community Guidelines icon" src="/policy_index/users.svg" alt="Community Standards icon"/> : null}
        {otherType ? <img width={16} title="Other icon" src="/policy_index/other.svg" alt="Other icon"/> : null}
      </div>
    </Link>
  )
}