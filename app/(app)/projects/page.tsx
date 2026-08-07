import Link from "next/link";
import ProjectShowcase from "@/components/ui/projects/ProjectShowcase";

export default function page() {
  return (
    // TODO: This is currently using a translate workaround for the dynamic margins - probably not the correct implementation? - but does render correctly for the page content
    <>
      <div className="bg-background w-full flex flex-col items-center pt-6 px-6">
        <div className="max-w-[1016px] w-[80vw] flex flex-col gap-9">
          <section className="ASML_Heading !text-[45px]/[62px] flex flex-col gap-4">
            Projects Using Transparency Hub Data
            <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
          </section>
          <section className="flex flex-col min-h-[64px] justify-between">
            <div className="ASML_Text Paragraph">
              Transparency Hub is an open, research-ready archive of social media platform policies, transparency reports, and governance documents. Built by the Applied Social Media Lab at the Berkman Klein Center, the Transparency Hub aggregates and structures public-facing policy materials so they can be searched, compared, and analyzed at scale.

              <br /><br />This page highlights research projects, data tools, and public-interest investigations powered by Transparency Hub data.


            </div>
            <Link className="flex flex-row gap-0.5 items-center mt-4" href="https://forms.gle/zNYsAqTcJz2iPw3j9">
              <span className="ASML_Text Paragraph">Have questions?&nbsp;</span>
              <span className="ASML_Text Paragraph Links">Get in touch</span>
              <img className="w-[6px] h-[10px]" src="/Arrow_right_logomark.png" alt="" />
            </Link>
          </section>
          <ProjectShowcase />
        </div>
      </div>
    </>
  )
}