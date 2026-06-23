import Breadcrumb from "@/components/ui/Breadcrumb";
import PlatformContent from "@/components/ui/platform_lookup/platform_page/PlatformContent";
import { Metadata } from "next";
import { getPlatformData } from "@/components/lib/getPlatformData";
import { notFound } from "next/navigation";
import { unstable_cache } from 'next/cache';

export async function generateMetadata({ params }: { params: Promise<{ platformName: string }> }): Promise<Metadata> {
  const platformName = decodeURIComponent((await params).platformName);
  
  return {
    title: `${platformName} Policy Index | Transparency Hub`,
    description: `Explore archived ${platformName} policy documents tracked by Transparency Hub.`,
    openGraph: {
      title: `${platformName} Policy Index | Transparency Hub`,
      description: `Explore archived ${platformName} policy documents tracked by Transparency Hub.`,
    },
    twitter: {
      title: `${platformName} Policy Index | Transparency Hub`,
      description: `Explore archived ${platformName} policy documents tracked by Transparency Hub.`,
    },
  }
}

const getCachedPlatformData = unstable_cache(
  async (platformName: string) => getPlatformData(platformName),
  ['platform-data'],
  { revalidate: 300 } // same as your old s-maxage=300
);

export default async function Platform({
  params,
}: {
  params: Promise<{ platformName: string }>
}) {
  const platformName = decodeURIComponent((await params).platformName);
  const data = await getCachedPlatformData(platformName);
  if (!data) notFound();

  const { company, index, waybackIndex } = data;

  return (
    <div className="bg-background pt-6 px-6 h-full flex flex-col items-center">
      <div className="w-[80vw] max-w-[1016px] flex flex-col gap-6">
        <section className="ASML_Heading !text-[45px]/[62px] flex flex-col gap-4">
          <Breadcrumb previous_page="Policy Index" current_page={platformName} link="/policy_index" trnslt="no"/>
          <h1><span translate="no">{platformName}</span></h1>
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
        </section>
        <div className="flex flex-col gap-4">
          <PlatformContent platformName={platformName} platform={company} index={index} waybackIndex={waybackIndex} />
        </div>
    </div>
  </div>
  );
};