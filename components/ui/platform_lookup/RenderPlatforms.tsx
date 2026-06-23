'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Platform } from "../../src/types";
import PlatformBlob from './PlatformBlob';
import Link from 'next/link';

export default function RenderPlatforms({ platforms }: { platforms: Platform[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ? decodeURIComponent(searchParams.get('query')!) : '';
  const filters = searchParams.get('filters')?.split(',') || [];

  const baseFilters = ['Privacy Policy', 'Terms of Service', 'Community Guidelines'];

  const visiblePlatforms = useMemo(() => {
  let result = [...platforms];

  if (filters.length > 0) {
    result = result.filter((platform) =>
      filters.every((filter) =>
        filter === 'Other'
          ? Object.keys(platform.doc_urls).filter((key) => !baseFilters.includes(key)).length > 0
          : Object.prototype.hasOwnProperty.call(platform.doc_urls, filter)
      )
    );
  }

  if (!query.trim()) return result; // ← return early with just filter results

  const words = query.trim().split(/\s+/);
  result = result.filter((platform) =>
    words.every((word) => platform.name.match(new RegExp(word, 'i')))
  );

  return result.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const searchQuery = query.toLowerCase();

    if (aName === searchQuery) return -1;
    if (bName === searchQuery) return 1;
    if (aName.startsWith(searchQuery) && !bName.startsWith(searchQuery)) return -1;
    if (!aName.startsWith(searchQuery) && bName.startsWith(searchQuery)) return 1;
    return aName.localeCompare(bName);
  });
}, [query, filters, platforms]);

  return (
    <div className='w-full'>
      {visiblePlatforms.length === 0 && (
        <p className='ASML_Text Paragraph !text-ASML'>
          If there is a policy or platform we haven't collected that you'd like to see,&nbsp;
          <Link
            className="ASML_Text Paragraph underline !font-bold"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd52zO1B0H5EvNv1P2favczcwV9N7X54eqSlvUxqsEvdkc8nA/viewform"
            target="_blank" rel="noopener noreferrer"
          >
            request an addition to Transparency Hub.
          </Link>
        </p>
      )}
      <ul className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 w-full'>
        {visiblePlatforms.map((company) => (
          <PlatformBlob key={String(company._id)} platform={company} />
        ))}
      </ul>
    </div>
  );
}