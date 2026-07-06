import General_Stats from '@/components/ui/platform_lookup/GeneralStats';
import Search from '@/components/ui/platform_lookup/Search';
import RenderPlatforms from '@/components/ui/platform_lookup/RenderPlatforms';
import DocTypeCards from '@/components/ui/DocTypeCards';
import { unstable_cache } from 'next/cache';
import { getAllPlatforms } from '@/components/lib/getAllPlatforms';
import { getDatabaseCounts } from '@/components/lib/getDatabaseCounts';
import { Suspense } from 'react';

const getCachedPlatforms = unstable_cache(
  () => getAllPlatforms(),
  ['all-platforms'],
  { revalidate: 300 }
);

const getCachedPlatformStats = unstable_cache(
  () => getDatabaseCounts(),
  ['platform-stats'],
  { revalidate: 300 }
);

export default async function platforms() {
  const platforms = await getCachedPlatforms();
  const platformStats = await getCachedPlatformStats();

  return (
    <div>
      <div className="min-h-[277px] w-full bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red flex flex-col items-center justify-center p-6">
        <div className="max-w-[1016px] w-[80vw] flex flex-col items-baseline">
          <h1 className="ASML_Heading !text-[45px]/[62px] text-left">
            Policy Index
          </h1>
          <p className="ASML_Text Paragraph mb-6">A tool to explore and compare policies and terms from social media apps, AI chatbots, and more</p>
          <General_Stats platformStats = {platformStats}/>
        </div>
      </div>
      <div className="bg-background w-full flex flex-col items-center justify-center p-6">
        <div className="max-w-[1016px] w-[80vw] flex flex-col items-baseline gap-6">
          <p className="ASML_Text Paragraph">We index a variety of policy types:</p>
          <DocTypeCards colored={true} interactive={false} />
          {/* <PopularPlatforms /> */}
          <h3 className="ASML_Text !text-[28px]/[38px] !font-bold">All Platforms</h3>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div id="search" className="sticky top-0 w-full bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red flex flex-col items-center justify-center p-6">
          <div className="max-w-[1016px] w-[80vw] flex flex-col items-baseline gap-4">
            <Search placeholder="Search" />
          </div>
        </div>
        <div className="bg-background w-full flex flex-col items-center justify-center p-6">
          <div className="max-w-[1016px] w-[80vw] flex flex-col items-baseline gap-4 pt-6">
              <RenderPlatforms platforms={platforms} />
          </div>
        </div>
      </Suspense>
    </div>
  )
}