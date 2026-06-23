'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ComparisonEngine({
  platform,
  docType,
  baseRev,
  secondaryRev,
}: {
  platform: string;
  docType: string;
  baseRev: string;
  secondaryRev: string;
}) {
  // const [loading, setLoading] = useState<boolean>(false)
  const [displayContent, setDisplayContent] = useState<boolean>(false)
  const [inverted, setInverted] = useState<boolean>(false)
  const [increase, setIncrease] = useState<boolean>(true)
  const [wordChanges, setWordChanges] = useState<number>(0)
  const [keysAdded, setKeysAdded] = useState<string[]>([])
  const [keysRemoved, setKeysRemoved] = useState<string[]>([])
  const [baseRevContent, setBaseRevContent] = useState<[string, boolean][]>([])
  const [secondaryRevContent, setSecondaryRevContent] = useState<[string, boolean][]>([])
  const [apiError, setApiError] = useState<boolean>(false)

  const fetchChanges = async () => {
    try {
      const response = await fetch(
        '/api/company-changes?platform=' + encodeURI(platform) + 
        '&docType=' + encodeURI(docType) + 
        '&baseRev=' + encodeURI(baseRev) + 
        '&secondaryRev=' + encodeURI(secondaryRev))

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json()

      setIncrease(data.increase)
      setKeysAdded(data.keysAdded)
      setKeysRemoved(data.keysRemoved)
      setBaseRevContent(data.baseRevContent)
      setSecondaryRevContent(data.secondaryRevContent)

      if (data.wordChanges > 0) {
        setWordChanges(data.wordChanges)
        setIncrease(true)
      } else {
        setWordChanges(Math.abs(data.wordChanges))
        setIncrease(false)
      }

      console.log('Received baseRevContent length:', data.baseRevContent.length);
    } catch (error) {
      console.error('Error fetching changes:', error);
      setApiError(true)
    }
  }

  useEffect(() => {
    setApiError(false)
    if (baseRev === secondaryRev) {
      setDisplayContent(false);
      return
    };
    if (platform && docType && baseRev && secondaryRev) {
      setDisplayContent(true);
    }
    if (displayContent) {
      // setLoading(true)
      fetchChanges()
    }
    // setLoading(false)
  }, [displayContent, platform, docType, baseRev, secondaryRev])

  useEffect(() => {
    // Effectively, flip the render logic if the baseRev is newer than the secondaryRev
    // The api/backend is designed to only return baseRev < secondaryRev
    if (baseRev && secondaryRev) {
      if (new Date(baseRev) < new Date(secondaryRev)) {
        setInverted(false);
      } else {
        setInverted(true);
      }
    }
  }, [baseRev, secondaryRev])

  if (displayContent && !apiError) {
    return (
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-2">
          <h3 className="ASML_Heading !text-[28px]/[38px] !font-bold text-[#F5F5F5]">Summary of Changes</h3>
          <p className="ASML_Text Paragraph text-[#F5F5F5]">From {baseRev} to {secondaryRev}:</p>
          <p className="ASML_Text Paragraph text-[#F5F5F5]">A{increase ? inverted ? ' ' : 'n ' : inverted ? 'n ' : ' '} <strong>{increase ? inverted ? 'decrease' : 'increase' : inverted ? 'increase' : `decrease`}</strong> of <strong>{wordChanges}</strong> words in {platform}'s {docType}, with potential changes to up to <strong>{new Set(keysAdded.concat(keysRemoved)).size}</strong> detected categories.</p>
        </div>
        {keysAdded.length > 0 || keysRemoved.length > 0 ? (
          <div className="flex md:flex-row flex-col">
          <div className="ASML_Text Paragraph md:w-1/2">
            <div className="m-1 text-[#F5F5F5]">TERMS REMOVED ({inverted ? keysAdded.length : keysRemoved.length})</div>
            {inverted ? keysAdded.map((key, index) => (
              <div key={index} className="ASML_Text Paragraph !font-bold p-2 m-1 border-1  border-removed-red !text-removed-red uppercase inline-block">{key}</div>
            )) : keysRemoved.map((key, index) => (
              <div key={index} className="ASML_Text Paragraph !font-bold p-2 m-1 border-1 border-removed-red !text-removed-red uppercase inline-block">{key}</div>
            ))}
          </div>
          <div className="ASML_Text Paragraph md:w-1/2">
            <div className="m-1">TERMS ADDED ({inverted ? keysRemoved.length : keysAdded.length})</div>
            {inverted ? keysRemoved.map((key, index) => (
              <div key={index} className="ASML_Text Paragraph !font-bold p-2 m-1 border-1 border-added-green !text-added-green uppercase inline-block">{key}</div>
            )) : keysAdded.map((key, index) => (
              <div key={index} className="ASML_Text Paragraph !font-bold p-2 m-1 border-1 border-added-green !text-added-green uppercase inline-block">{key}</div>
            ))}
          </div>
        </div>
        ) : null}
        <div className="flex flex-col gap-4">
          <h3 className="ASML_Heading !text-[28px]/[38px] !font-bold">Side by Side Comparison</h3>
          <div className="flex md:flex-row flex-col md:h-[510px] bg-[#202020]">
            <div className="md:w-1/2 md:h-full h-[510px] border-1 border-[#666666] whitespace-pre-wrap overflow-y-scroll wrap-anywhere custom-scrollbar ASML_Text Paragraph p-2">
            {baseRev}
            <br /><br />
            {
              inverted ? secondaryRevContent.map((content:[string, boolean], i: number) => <span key={i} className={content[1] ? "text-removed-red !font-bold" : "text-[#F5F5F5]"}>
                {content[0]}
              </span>)
              : baseRevContent.map((content:[string, boolean], i: number) => <span key={i} className={content[1] ? "text-removed-red !font-bold" : "text-[#F5F5F5]"}>
                {content[0]}
              </span>)
            }</div>
            <div className="md:w-1/2 md:h-full h-[510px] border-1 border-[#666666] whitespace-pre-wrap overflow-y-scroll wrap-anywhere custom-scrollbar ASML_Text Paragraph p-2">
            {secondaryRev}
            <br /><br />
            {
              inverted ? baseRevContent.map((content:[string, boolean], i: number) => <span key={i} className={content[1] ? "text-added-green !font-bold" : "text-[#F5F5F5]"}>
                {content[0]}
              </span>)
              : secondaryRevContent.map((content:[string, boolean], i: number) => <span key={i} className={content[1] ? "text-added-green !font-bold" : "text-[#F5F5F5]"}>
                {content[0]}
              </span>)
            }</div>
          </div>
        </div>
      </div>
    )
  }
  // Temporary error message if the user tries to compare the same revision
  return ( apiError ? (
    <div className="ASML_Text Paragraph">
      There was an error fetching the comparison data, please try again.  The Transparency Hub is a live service and may be temporarily unavailable. 
      <br/>
      If you believe this is bug, please <Link href="https://docs.google.com/forms/u/4/d/e/1FAIpQLSdkIOP62Xq437gYeFnN4rNNUtI1j32imXfE0G5TIaOanfet7w/viewform?usp=send_form" className="underline">Contact Us</Link> with information about the error.
    </div>
  ) : null);
}