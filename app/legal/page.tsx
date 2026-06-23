import Highlight from "@/components/ui/Highlight";

export default function Legal() {
  return (
    <div className="bg-background pt-6 px-6 h-full flex flex-col items-center" translate="no">
      <div className="w-[80vw] max-w-[1016px] flex flex-col gap-6">
        <section className="ASML_Heading !text-[45px]/[62px] flex flex-col gap-4">
          Legal
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
        </section>
        <div className="flex flex-col gap-9">
          <Highlight description={"Here you’ll find the legal terms that govern use of Transparency Hub, a project of the Applied Social Media Lab at the Berkman Klein Center for Internet & Society at Harvard University. Please review our Privacy Policy and Terms of Use to understand how we handle information and what rules apply when you use this site."} link="/legal/privacy" link_desc="Read our Privacy Policy" image="" />
          <Highlight link="/legal/terms" link_desc="Read our Terms of Use" image="" />
          <Highlight link="https://www.harvard.edu/copyright-issue/ " link_desc="Read our Copyright Policy" image="" />
        </div>
      </div>
    </div >
  );
}