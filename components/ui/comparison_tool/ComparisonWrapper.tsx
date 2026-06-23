'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import ComparisonEngine from "@/components/ui/comparison_tool/ComparisonEngine";
import DocumentSelector from "@/components/ui/comparison_tool/documentSelector";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ComparisonWrapper({
  platform,
  docType,
  baseRev,
  secondaryRev
}: {
  platform: string;
  docType: string;
  baseRev: string;
  secondaryRev: string;
}) {
  const [docOptions, setdocOptions] = useState<string[]>([])
  const [company_id, setCompanyId] = useState<string>('');
  const [documentsByType, setDocumentsByType] = useState<Record<string, string[]>>({})
  const [dates, setDates] = useState<string[]>([])

  const fetchDocTypes = async (query: string): Promise<{
    company_id: string,
    docTypes: string[],
    documentsByType: Record<string, string[]>
  }> => {
    const res = await fetch(`/api/document-types?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    if (!platform) {
      setdocOptions([])
      setCompanyId('')
      setDocumentsByType({})
      return
    }

    fetchDocTypes(platform).then((res) => {
      setCompanyId(res.company_id || '')
      setdocOptions(res.docTypes || [])
      setDocumentsByType(res.documentsByType || {})
    })

  }, [platform])

  useEffect(() => {
    if (!company_id || !docType) {
      setDates([])
      return
    }

    setDates(documentsByType[docType] || [])

  }, [company_id, docType])

  return (
    <>
      <div className="min-h-[120px] w-full bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red flex items-center justify-center p-6 py-8">
        <div className="max-w-[1016px] w-[80vw] flex flex-col">
          <Breadcrumb previous_page="Policy Index" current_page="Comparison" link="/policy_index" />
          <h1 className="max-w-[1016px] w-[80vw] ASML_Heading !text-[45px]/[62px] text-left">
                Comparison Tool
          </h1>
          <DocumentSelector platform={platform} docType={docType} baseRev={baseRev} secondaryRev={secondaryRev} docOptions={docOptions} dates={dates}/>
        </div>
      </div>
      <div className="bg-background w-full flex flex-col items-center pt-6 px-6">
        <div className="max-w-[1016px] w-[80vw] flex flex-col">
          {docType && (dates.length > 1 ?
            <ComparisonEngine platform={platform} docType={docType} baseRev={baseRev} secondaryRev={secondaryRev}/>
            :
            <div className="flex flex-col gap-6 mt-2">
              <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]">No Comparisons are available</h3>
              <p className="ASML_Text !text-[20px]">
                There are no available comparisons for the selected policy. This may be due to limited versions in the compatible file format (TXT) needed to make comparisons.
                <br/><br/>
                Transparency Hub is a living project that continues to be updated, check back in the future and try again.
              </p>
              <Link className="ASML_Text !text-[20px] !font-bold underline items-end inline" href={`/policy_index/${encodeURIComponent(platform)}`}>
                View individual policy pages for {platform}
                <img className="ml-2 mb-1 w-[10px] h-[14px] inline" src="/Arrow_right_logomark.png" alt="" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}