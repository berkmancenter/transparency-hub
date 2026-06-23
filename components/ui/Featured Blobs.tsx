'use client';
// Optionally hardcode 4-20 companies that could be featured on the front page
// Or use metadata tags that are on the roadmap to implement "Featured Platforms"
import Link from "next/link";

function Featured_Blob({
  companyName,
  docTypes
}: {
  companyName: string;
  docTypes: string;
}) {
  return (
    <Link className="group flex flex-row justify-between items-center rounded-[4px] p-4 border-1 border-[#D1A4D180] bg-[#CEDADE1A] hover:bg-gradient-to-b from-[#FFFFFF1A] text-white" href={`policy_index/${companyName}`}>
      <div>
        <h3 className="ASML_Heading !text-[20px]/[30px] !font-bold group-hover:underline" translate="no">
          {companyName}
        </h3>
        <p className="ASML_Text Paragraph">
          {docTypes}
        </p>
      </div>
      <img className="w-[17px]" src="/Arrow_right_logomark.png" alt="" />
    </Link>
  )
}

export default function Featured_Blobs() {
  const featuredCompanies: [string, string][] = [
    ["TikTok", "Privacy Policy, ToS, Guidelines"],
    ["Instagram", "Privacy Policy, ToS, Guidelines"],
    ["YouTube", "Privacy Policy, ToS, Guidelines"],
    ["Discord", "Privacy Policy, ToS, Guidelines"],
    ["Tinder", "Privacy Policy, ToS, Guidelines"],
    ["Facebook", "Privacy Policy, ToS, Guidelines"],
  ]

  return (
    <>
      <h2 className="ASML_Heading !text-[32px]/[43px] !font-black">
        Explore the policies that impact millions of users
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-y-6 gap-4">
        {featuredCompanies.map(([companyName, docTypes], index) =>
          <Featured_Blob key={index} companyName={companyName} docTypes={docTypes} />
        )}
      </div>
      <Link className="ASML_Text !text-[24px]/[24px] !font-bold !underline flex flex-row gap-2 items-end" href="/policy_index">
        View the full index of platforms
        <img className="w-[10px] h-[14px] mb-1" src="/Arrow_right_logomark.png" alt="" />
      </Link>
    </>
  )
}