import ComparisonWrapper from "@/components/ui/comparison_tool/ComparisonWrapper";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const hasParams = Object.keys(resolvedSearchParams).length > 0;

  return {
    title: 'Comparison Tool | Transparency Hub',
    description: 'Compare policy documents across platforms and revisions',
    openGraph: {
      title: 'Comparison Tool | Transparency Hub',
      description: 'Compare policy documents across platforms and revisions',
    },
    twitter: {
      title: 'Comparison Tool | Transparency Hub',
      description: 'Compare policy documents across platforms and revisions',
    },
    alternates: {
      canonical: 'https://transparencyhub.org/comparison_tool',
    },
    robots: hasParams ? 'noindex, nofollow' : 'index, follow',
  };
}

export default async function compare(props: {
  searchParams?: Promise<{
    platform?: string;
    docType?: string;
    baseRev?: string;
    secondaryRev?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const platform = searchParams?.platform || '';
  const docType = searchParams?.docType || '';
  const baseRev = searchParams?.baseRev || '';
  const secondaryRev = searchParams?.secondaryRev || '';

  return (
    <ComparisonWrapper platform={platform} docType={docType} baseRev={baseRev} secondaryRev={secondaryRev} />
  )
}