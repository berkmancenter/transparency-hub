import Featured_Blobs from "@/components/ui/Featured Blobs";
import HomeSearch from "@/components/ui/HomeSearch";
import Highlight from "@/components/ui/Highlight";
import DocTypeCards from "@/components/ui/DocTypeCards";

export default function Home() {
  return (
    <div className="bg-background w-full flex flex-col items-center">
      <div className="absolute z-0 w-full h-[min(max(24vw,234px),306px)] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red">
        <img 
          className="inset-0 w-full h-full max-w-[4096px] mx-auto object-cover object-top opacity-20" 
          title="Banner" 
          src="/home/Stock_Documents.webp" 
          alt="Background banner of stacks of papers" 
          fetch-priority="high"
        />
      </div>
      <div className="max-w-[1016px] w-[80vw] flex flex-col gap-10 mx-6">
        <div className="relative h-[min(max(24vw,234px),306px)] flex flex-col justify-center gap-4">
          <h1 className="ASML_Heading !text-[30px]/[62px] sm:!text-[62px]/[62px]" translate="no">
            Transparency Hub
          </h1>
          <p className="ASML_Text !text-[14px] sm:!text-[16px]/[24px] !font-bold sm:w-5/6 w-full">
            A project from the<span translate="no"> Applied Social Media Lab </span>at the
            <br /><span translate="no">Berkman Klein Center for Internet & Society </span>at<span translate="no"> Harvard University</span>
          </p>
        </div>
        <section className="ASML_Text important-text">
          <p className="text-[24px] leading-[36px] mb-8">
            <strong>An educational resource for learning about how apps and tech companies' legal and privacy policies change over time.</strong> It's designed to help people search, compare, and better understand the data practices of consumer-facing social and technology applications.
          </p>
          <div className="">
            <h3 className="ASML_Text !text-[20px] !font-bold mb-6">We index a variety of policy types:</h3>
            <DocTypeCards colored={false} interactive={false} />
          </div>
        </section>

        <HomeSearch />

        <Featured_Blobs />
        <div className="h-1 bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
        <div className="flex flex-col gap-24">
          <Highlight title="Understanding Policies" description={"A plain-language guide to the documents that govern your digital life."} link="/about/understanding-policies" link_desc="Learn more" image="/home/Policy_Documents.svg" img_title="Policy documents graphic" img_desc="Graphic of a stack of policy documents"/>
          <Highlight left title="Projects" description={"Built from ASML’s empirical research on social media and app data practices, Transparency Hub has already supported research, data, and investigative projects exploring social media and app data practices."} link="/projects" link_desc="Check out the projects using Transparency Hub's data" image="/home/Projects.svg" img_title="Chart graphic" img_desc="Graphic of data chart"/>
          <Highlight title="For Researchers" description={"We invite educators, researchers, journalists, and advocates to build on this work."} link="/about/researchers" link_desc="Learn more" image="/home/For_Researchers.svg"  img_title="Database graphic" img_desc="Graphic of database with linked documents"/>
          <Highlight left title="About Transparency Hub" description={"Transparency Hub is an open, research-ready archive of social media platform policies, transparency reports, and governance documents."} link="/about" link_desc="Learn more" image="/home/THUB_About.svg"  img_title="Magnifying glass graphic" img_desc="Graphic of a magnifying glass with an Applied Social Media Lab brand caret in the middle"/>
          <Highlight title="About the Applied Social Media Lab" description={"The Applied Social Media Lab at Harvard’s Berkman Klein Center brings together technologists and practitioners to reimagine, rebuild, and reboot social media to serve the public good and establish a long-lasting community of practice."} link="https://asml.cyber.harvard.edu/" link_desc="Learn more about the lab and our mission" image="/home/ASML_About.svg"  img_title="Applied Social Media Lab logo" img_desc="Applied Social Media Lab logo"/>
        </div>
        
      </div>
    </div>
  );
}
