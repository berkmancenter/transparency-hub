'use client';
import Link from "next/link";
import { useState } from "react";
import BasicDropdown from "@/components/lib/BasicDropdown";
import HelpTooltip from "@/components/lib/HelpTooltip";
import { sortVersions } from "@/components/lib/policyVersions";
import DownloadLinks, { downloadButtonClass } from "./DownloadLinks";

export default function DocTypeBlob({
  name,
  type,
  WaybackIndex,
  TypeIndex
}: {
  name: string,
  type: string,
  WaybackIndex: Record<string, string>,
  TypeIndex: Record<string, Record<string, string>>
}) {
  const versions = sortVersions(Object.keys(TypeIndex));
  const [version, setVersion] = useState<string>(versions[0]);

  const count = versions.length;
  const icon_map: Record<string, string> = {
    "Privacy Policy": "/policy_index/eye.svg",
    "Terms of Service": "/policy_index/file-text.svg",
    "Community Guidelines": "/policy_index/users.svg"
  };
  const blurb_map: Record<string, string> = {
    "Privacy Policy": "How platforms use your data",
    "Terms of Service": "How platforms govern your use",
    "Community Guidelines": "How platforms expect you to behave"
  };
  const details_map: Record<string, string> = {
    "Privacy Policy": "/about/understanding-policies#privacy-policies",
    "Terms of Service": "/about/understanding-policies#terms-and-conditions",
    "Community Guidelines": "/about/understanding-policies#community-standards"
  }
  const icon = Object.keys(icon_map).find((key) => key === type) ? icon_map[type] : "/policy_index/layers.svg";
  const blurb = blurb_map[type] ? blurb_map[type] : "";
  const details_link = details_map[type] ? details_map[type] : "/about/understanding-policies#other";

  return (
    <div data-help-tooltip-boundary className="flex flex-col justify-between gap-2 p-4 rounded-[8px] border-1 border-[#AAAAAA] bg-gradient-to-b from-[#FFFFFF1A] to-[#000000]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row">
            <img className="inline w-[18px] mr-3 mb-0.5" src={icon} alt="" />
            <h4 className="inline ASML_Heading !text-[20px]/[32px] !font-bold">{type}</h4>
          </div>
          {blurb && <p className="ASML_Text !text-[14px]/[20px]">{blurb}</p>}
          <Link href={details_link} target="_blank" rel="noopener noreferrer" className="ASML_Text !text-[14px]/[20px] uppercase !text-[#888888]">More Details</Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center bg-[#FFFFFF1A] rounded-[8px] px-3 py-1 ASML_Text !text-[14px]/[20px] uppercase">
            {count} {count === 1 ? 'version' : 'versions'}
          </div>
          <BasicDropdown
            className="border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[16px]/[42px] !text-[#000000] px-2"
            options={versions}
            override={version}
            placeholder="Select a version"
            onChange={(option) => setVersion(option)}
          />
          {TypeIndex[version]["txt"] ? (
            <Link
              href={`/policy_index/${encodeURIComponent(name)}/${encodeURIComponent(type)}?date=${encodeURIComponent(version)}`}
              className={downloadButtonClass}>
              View Policy
            </Link>
          ) : (
            <div className="flex items-center justify-center gap-2 p-3 ASML_Text Paragragh">
              No Policy View Available
              <HelpTooltip
                title="No Policy View Available"
                message="This may be due to there being no versions of the policy available in the compatible file format (TXT) to view the policy on Transparency Hub. You can instead download a copy, or view the policy via the Wayback Archive link."
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="ASML_Text Paragraph">
            Downloads
          </div>
          <div className="grid grid-cols-3 items-center justify-center gap-2">
            <DownloadLinks formats={TypeIndex[version]} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-full justify-end">
        {WaybackIndex?.[version] &&
          <Link
            href={WaybackIndex[version]}
            target="_blank" rel="noopener noreferrer"
            className={downloadButtonClass}>
            View Wayback Archive
          </Link>
        }
        {versions.filter(v => TypeIndex[v]["txt"]).length > 1 && TypeIndex[version]["txt"] &&
          <Link
            href={`/comparison_tool?platform=${name}&docType=${type}&secondaryRev=${encodeURIComponent(version)}`}
            className="flex items-center justify-center p-3 border-1 border-[#FFFFFF] rounded-[8px] ASML_Text Paragragh hover:bg-orchid-600">
            Compare Over Time
          </Link>
        }
        {TypeIndex[version]["txt"] === undefined &&
          <div className="flex items-center justify-center gap-2 p-3 ASML_Text Paragragh">
            No TXT comparison available
            <HelpTooltip
              title="No Comparison Available"
              message="This may be due to there being a single version of the policy available or limited versions in the compatible file format (TXT) needed to make comparisons."
            />
          </div>
        }
        {TypeIndex[version]["txt"] && (versions.filter(v => TypeIndex[v]["txt"]).length <= 1 && TypeIndex[version]["txt"]) &&
          <div className="flex items-center justify-center gap-2 p-3 ASML_Text Paragragh">
            No comparison available
            <HelpTooltip
              title="No Comparison Available"
              message="This may be due to there being a single version of the policy available or limited versions in the compatible file format (TXT) needed to make comparisons."
            />
          </div>
        }
      </div>
    </div>
  )
}