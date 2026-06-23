import Link from "next/link";
import Highlight from "@/components/ui/Highlight";
import DocTypeCards from "@/components/ui/DocTypeCards";

export default function About() {

  return (
    <div className="bg-background p-6 h-full flex flex-col items-center">
      <div className="w-[80vw] max-w-[1016px] flex flex-col gap-6">
        <section className="ASML_Heading !text-[45px]/[62px] flex flex-col gap-4">
          About
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
        </section>
        <div className="flex flex-col gap-8">
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            Transparency Hub is an open, research-ready archive of social media platform policies, transparency reports, and governance documents. Built by the Applied Social Media Lab at the Berkman Klein Center, the Transparency Hub aggregates and structures public-facing policy materials so they can be searched, compared, and analyzed at scale
          </section>

          <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]">What Is Transparency Hub?</h3>

          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            Transparency Hub collects and archives:

            <ul className="ASML_Text Paragraph list-disc list-inside space-y-2 ml-8">
              <li>Terms of Service</li>
              <li>Privacy Policies</li>
              <li>Community Guidelines</li>
              <li>Transparency Reports</li>
              <li>AI and data governance disclosures</li>
            </ul>
          </section>
          <section className="flex flex-col gap-4">
            <DocTypeCards colored={true} interactive={false} />
            <Link className="ASML_Heading !text-[20px]/[30px] !font-bold !underline flex flex-row gap-2 items-end" href="/about/understanding-policies">
              Learn more about these terms
              <img className="w-[11px] h-[16px] mb-2" src="/Arrow_right_logomark.png" alt="" />
            </Link>
          </section>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            The dataset enables longitudinal analysis of platform governance, comparative research across companies, and studies of how policy language has shaped real-world data practices and government regulation. By transforming static documents into structured data, Transparency Hub supports reproducible research and cross-platform accountability and interoperability.
          </section>
          <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]">Research and Data Projects</h3>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            <b>Policy Change Tracking</b>
            <br />Researchers can use Hub data to analyze how platform rules evolve over time. Projects can examine shifts in content moderation standards, definitions of harmful behavior, data retention policies, and AI disclosures.

            <br /><br /><b>Comparative Platform Governance</b>
            <br />Structured policy data allows side-by-side comparison of moderation systems, appeals processes, enforcement transparency, and data access practices across major social media companies and more. Journalists, civil society organizations, and policymakers use these tools to identify patterns and inconsistencies.

            <br /><br /><b>AI Transparency and Disclosure Analysis</b>
            <br />As platforms expand AI features, Transparency Hub data enables analysis of how companies describe model training, user data usage, and more. These projects help clarify what is being disclosed to users and how those disclosures change over time.

            <br /><br /><b>Open Standards and Interoperability Research</b>
            <br />Transparency Hub data can inform work on data portability, account deletion, and more. Researchers can identify structural barriers to user choice.

            <br /><br /><Highlight description="We invite educators, researchers, journalists, and advocates to build on this work." link="/about/researchers" link_desc="Learn more" image="" />

          </section>

          <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]">Who Uses Transparency Hub Data?</h3>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            <ul className="ASML_Text Paragraph list-disc list-inside space-y-2 ml-8">
              <li>Academic researchers</li>
              <li>Journalists</li>
              <li>Civil society & advocacy organizations</li>
              <li>Developers</li>
              <li>Students</li>
            </ul>

          </section>

          <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]">Why It Matters</h3>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            Platform governance is always changing.  Transparency Hub creates a durable, searchable record of those changes. Projects built on this dataset increase visibility into how digital platforms operate, support evidence-based policy debates, and strengthen public-interest technology research.
          </section>



          <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]">Team</h3>
          <div className="grid grid-cols-2 gap-6">
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">Zoe Robert</h4>
              <p className="ASML_Text Paragraph Bold">Principal Engineer</p>
              <Link href="https://asml.cyber.harvard.edu/?author_name=zoe-robert" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">Teagan D'Addeo</h4>
              <p className="ASML_Text Paragraph Bold">Software Engineer</p>
              <Link href="https://asml.cyber.harvard.edu/?author_name=teagan-daddeo" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">Matt Marino</h4>
              <p className="ASML_Text Paragraph Bold">Senior UX Designer</p>
              <Link href="https://asml.cyber.harvard.edu/?author_name=matt-marino" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">Neeti Sivakumar</h4>
              <p className="ASML_Text Paragraph Bold">Research Assistant</p>
              <Link href="https://www.linkedin.com/in/neetisivakumar/" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">Zach Deocadiz</h4>
              <p className="ASML_Text Paragraph Bold">Research Assistant</p>
              <Link href="https://asml.cyber.harvard.edu/?author_name=zach-deocadiz" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">Meg Marco</h4>
              <p className="ASML_Text Paragraph Bold">Senior Director</p>
              <Link href="https://asml.cyber.harvard.edu/?author_name=meg-marco" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">Kalie Mayberry</h4>
              <p className="ASML_Text Paragraph Bold">Senior Program Manager</p>
              <Link href="https://asml.cyber.harvard.edu/?author_name=kalie-mayberry" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
            <section className="flex flex-col gap-2 ASML_Text Paragraph whitespace-pre-wrap">
              <h4 className="ASML_Heading !text-[20px]/[30px] !font-[700]">James Mickens</h4>
              <p className="ASML_Text Paragraph Bold">Principal Investigator</p>
              <Link href="https://asml.cyber.harvard.edu/?author_name=james-mickens" target="_blank" rel="noopener noreferrer" className="h-[24px] w-[24px] flex items-center justify-center">
                <img className="w-[20px]" src="/link.svg" alt="" />
              </Link>
            </section>
          </div>
        </div>
        <section>
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
          <p className="ASML_Text Paragraph mt-6 whitespace-pre-wrap">The<span translate="no"> Berkman Klein Center’s Applied Social Media Lab </span> is supported by a generous gift from Frank H. McCourt, Jr. and the <span className="whitespace-nowrap">501(c)(3)</span> non-profit Project Liberty Institute.</p>
        </section>
      </div>
    </div>
  );
}