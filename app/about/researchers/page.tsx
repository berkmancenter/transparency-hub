import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";

export default function Researchers() {

  return (
    <div className="bg-background pt-6 px-6 h-full flex flex-col items-center">
      <div className="w-[80vw] max-w-[1016px] flex flex-col gap-6">
        <section className="ASML_Heading !text-[45px]/[62px] flex flex-col gap-4">
          <Breadcrumb previous_page="About" current_page="For Researchers" link="/about" />
          For Researchers
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
        </section>
        <div className="flex flex-col gap-4">
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            The Transparency Hub system consists of a user-friendly website connected to a database of thousands of archived policy documents.
            <br /><br />
            We wanted to capture the full presentation of these policies, not just the legal text
            <ul className="list-disc list-inside pl-3">
              <li>Presentation is relevant to the accessibility of the content</li>
              <li>Researchers can use the html resources to perform their own text extraction as it best suits their needs</li>
            </ul>
          </section>
          <h2 className="ASML_Heading !text-[32px]/[43px] !font-[900]">Web Archive Format (.warc/.wacz)</h2>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            <ul className="list-disc list-inside pl-3">
              <li>The Web Archive Format seeks to capture as much as possible about the content shared between machines while browsing the web. </li>
              <li>This format allows for live replays of the webpage using WebRecorder’s <Link href="https://replayweb.page/" className="underline">https://replayweb.page/</Link>, showcased on our website</li>
              <li>Note that captures from the Wayback Machine may have sub-optimal rendering in order to respect their rate limiting protocols</li>
            </ul>
            <br />
            For more information, check out <Link href="https://www.loc.gov/preservation/digital/formats/fdd/fdd000236.shtml" className="underline">WARC, Web ARChive file formats</Link> or <Link href="https://specs.webrecorder.net/wacz/1.1.1" className="underline">Web Archive Collection Zipped (WACZ)</Link>.
          </section>
          <h2 className="ASML_Heading !text-[32px]/[43px] !font-[900]">Database Collections</h2>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            Our noSQL database is structured as the following two collections:
          </section>
          <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]"> 1. Companies</h3>
          <section className="ASML_Text Paragraph whitespace-pre-wrap" translate="no">
            <ul> {/* Note that the indentation here is rendered, whitespace edits will modify the website */}
              {`{
      "id" : "platform",
      "name" : "Platform Name",
      "url" : "https://www.platform.com",
      "doc_urls": {
            "Terms of Service" : "https://www.platform.com/tos",
            "Privacy Policy" : "https://www.platform.com/privacy",
            "Community Guidelines" : "https://www.platform.com/guidelines",
            "Transparency Report" : "https://www.platform.com/report"
      }
}`}
            </ul>
          </section>
          <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700]"> 2. Documents</h3>
          <section className="ASML_Text Paragraph whitespace-pre-wrap" translate="no">
            <ul> {/* Note that the indentation here is rendered, whitespace edits will modify the website */}
              {`{
      "company_id" : "company_oid",
      "path" : "company_oid/policy_name/unix_timestamp.file_extension",
      "type" : "policy_name",
      "date_fetched" : {
            "$date" : "datetime_object"
      },
      "public_url" : "stored_document_link",
      "original_url" : "original_live_document_link",
      "format" : "file_extension"
}`}
            </ul>
          </section>
          
          <h2 className="ASML_Heading !text-[32px]/[43px] !font-[900]">Database Access</h2>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            For researchers seeking full database access for a formal research purpose, please <Link href="https://forms.gle/zNYsAqTcJz2iPw3j9" className="underline whitespace-nowrap">contact us<img className="w-[6px] inline ml-1 mb-1" src="/Arrow_right_logomark.png" alt="" /></Link>
          </section>

          <h2 className="ASML_Heading !text-[32px]/[43px] !font-[900]">Request Addition</h2>
          <section className="ASML_Text Paragraph whitespace-pre-wrap">
            The<span translate="no"> Transparency Hub </span>is a living dataset. If you have a policy or platform you would like us to track, please <Link href="https://docs.google.com/forms/d/e/1FAIpQLSd52zO1B0H5EvNv1P2favczcwV9N7X54eqSlvUxqsEvdkc8nA/viewform" className="underline whitespace-nowrap">request a new policy<img className="w-[6px] inline ml-1 mb-1" src="/Arrow_right_logomark.png" alt="" /></Link>
          </section>
        </div>
      </div>
    </div>
  );
}