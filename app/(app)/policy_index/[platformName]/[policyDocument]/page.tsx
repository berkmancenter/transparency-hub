import Breadcrumb from "@/components/ui/Breadcrumb";
import { getPolicyContent } from "@/components/lib/getPolicyContent";
import { getFallbackDate } from "@/components/lib/getFallbackDate";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { unstable_cache } from 'next/cache';
import Link from "next/link";
import { getCachedPlatformData } from "@/components/lib/getPlatformData";
import { sortVersions } from "@/components/lib/policyVersions";
import BasicDropdown from "@/components/lib/BasicDropdown";
import WebsiteLink, { actionButtonClass } from "@/components/ui/platform_lookup/platform_page/WebsiteLink";
import DownloadLinks, { downloadButtonClass } from "@/components/ui/platform_lookup/platform_page/DownloadLinks";

export async function generateMetadata({ params }: { params: Promise<{ platformName: string, policyDocument: string }> }): Promise<Metadata> {
  const platformName = decodeURIComponent((await params).platformName);
  const policyDocument = decodeURIComponent((await params).policyDocument);
  
  return {
    title: `${platformName} ${policyDocument} | Transparency Hub`,
    description: `Explore archived ${platformName} ${policyDocument} tracked by Transparency Hub.`,
    openGraph: {
      title: `${platformName} ${policyDocument} | Transparency Hub`,
      description: `Explore archived ${platformName} ${policyDocument} tracked by Transparency Hub.`,
    },
    twitter: {
      title: `${platformName} ${policyDocument} | Transparency Hub`,
      description: `Explore archived ${platformName} ${policyDocument} tracked by Transparency Hub.`,
    },
  }
}

const getCachedFallbackDate = unstable_cache(
  async (platformName: string, policyDocument: string) => getFallbackDate(platformName, policyDocument),
  ['fallback-date'],
  { revalidate: 300 }
)

const getCachedPolicyContent = unstable_cache(
  async (platformName: string, policyDocument: string, date: string) => getPolicyContent(platformName, policyDocument, date),
  ['policy-content'],
  { revalidate: 300 } // same as your old s-maxage=300
);

export default async function Policy({
  params,
  searchParams
}: {
  params: Promise<{ platformName: string, policyDocument: string }>
  searchParams: Promise<{ date?: string }>
}) {
  const platformName = decodeURIComponent((await params).platformName);
  const policyDocument = decodeURIComponent((await params).policyDocument);
  const pagePath = `/policy_index/${encodeURIComponent(platformName)}/${encodeURIComponent(policyDocument)}`;
  const { date } = await searchParams;
  // A hand-edited URL with a repeated ?date= arrives as an array; treat it as no date
  if (typeof date !== 'string' || !date) {
    // Push the newest available date to the URL
    const fallbackDate = await getCachedFallbackDate(platformName, policyDocument);
    if (!fallbackDate) notFound();
    redirect(`${pagePath}?date=${encodeURIComponent(fallbackDate)}`);
  }

  const [platformData, policy] = await Promise.all([
    getCachedPlatformData(platformName),
    getCachedPolicyContent(platformName, policyDocument, date),
  ]);
  if (!platformData || !policy) notFound();

  // Snap an inexact date to the closest capture so the URL matches the selected version
  if (policy.date !== date) redirect(`${pagePath}?date=${encodeURIComponent(policy.date)}`);

  const { company, index, waybackIndex } = platformData;
  const typeIndex = index[policyDocument];
  if (!typeIndex?.[date]) notFound();

  const versions = sortVersions(Object.keys(typeIndex));
  const formats = typeIndex[date];
  const waybackUrl = waybackIndex[policyDocument]?.[date];
  const canCompare = versions.filter((v) => typeIndex[v]["txt"]).length > 1;

  return (
    <div className="bg-background pt-6 px-6 h-full flex flex-col items-center">
      <div className="w-[80vw] max-w-[1016px] flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <Breadcrumb
            previous_page="Policy Index"
            link="/policy_index"
            trail={[{ label: platformName, link: `/policy_index/${encodeURIComponent(platformName)}`, trnslt: "no" }]}
            current_page={policyDocument}
          />
          <h1 className="ASML_Heading !text-[45px]/[62px]"><span translate="no">{platformName}</span></h1>
          <h2 className="ASML_Text !text-[28px]/[38px]">{policyDocument}</h2>
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
        </section>
        <div className="flex flex-col gap-9">
          <section className="flex flex-col gap-6">
            <WebsiteLink url={company.url} />
            {canCompare && (
              <Link
                className={actionButtonClass}
                href={`/comparison_tool?platform=${encodeURIComponent(platformName)}&docType=${encodeURIComponent(policyDocument)}${formats["txt"] ? `&secondaryRev=${encodeURIComponent(date)}` : ''}`}
              >
                <img className="py-auto" width={24} src="/policy_index/text-compare.svg" alt="" />
                Compare policies over time
              </Link>
            )}
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="ASML_Heading !text-[28px]/[38px] !font-bold">Version</h3>
            <BasicDropdown
              className="w-full sm:w-[340px] border-1 border-primary-blue bg-[#ffffff] rounded-[8px] ASML_Text focus:outline-none !text-[16px]/[42px] !text-[#000000] px-2"
              options={versions}
              override={date}
              param="date"
              placeholder="Select a version"
            />
          </section>
          <section className="flex flex-col gap-4">
            <h4 className="ASML_Heading !text-[20px]/[32px] !font-bold">Downloads</h4>
            <div className="flex flex-wrap gap-2">
              <DownloadLinks formats={formats} className="min-w-[100px]" />
              {waybackUrl && (
                <Link
                  href={waybackUrl}
                  target="_blank" rel="noopener noreferrer"
                  className={`${downloadButtonClass} w-full sm:w-auto sm:min-w-[330px]`}>
                  View Wayback Archive
                </Link>
              )}
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="ASML_Heading !text-[28px]/[38px] !font-bold">Content</h3>
            {policy.content ? (
              <div className="ASML_Text Paragraph whitespace-pre-wrap break-words bg-[#FFFFFF08]">
                {policy.content}
              </div>
            ) : (
              <p className="ASML_Text Paragraph italic">
                No text capture is available for this version. Try one of the downloads above.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}