'use client';
import PlatformBlob from "./PlatformBlob";
import { Platform } from "../../src/types";
import { useEffect, useState } from "react";

const hardcoded_platforms = [
  "675211559efd527760c64418",
  "675211559efd527760c64413",
  "675211559efd527760c64414",
  "675211559efd527760c64415",
  "675211559efd527760c6441a"
]

export default function PopularPlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await fetch('/api/all-companies/');
        const data = await response.json();
        setPlatforms(data.companies);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    }
    fetchPlatforms();
  }, []);


  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="ASML_Text !text-[28px]/[38px] !font-bold">Popular Platforms</h3>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4">
        {hardcoded_platforms.map((platform_id, index) => (
          <PlatformBlob key={platform_id} platform={platforms.filter((platform: Platform) => String(platform._id) === platform_id)[0]} noMobile={index === 4 ? true : false}/>
        ))}
      </div>
    </div>
  )
}