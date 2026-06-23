import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="w-full h-[60px] bg-background" />
      <div className="w-full h-[24px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
      <div className="w-full flex bg-black px-6 py-7 flex-col xl:flex-row-reverse whitespace-nowrap">
        <div className="ASML_Text Navigation text-left flex lg:flex-row flex-col pb-4 text-white text-xl font-bold gap-10">
          <Link className="p-[10px] hover:bg-[#FFFFFF33] mb-auto mr-auto" href="/legal">
            Legal
          </Link>
          <Link className="p-[10px] hover:bg-[#FFFFFF33] mb-auto mr-auto" href="https://docs.google.com/forms/d/e/1FAIpQLSd52zO1B0H5EvNv1P2favczcwV9N7X54eqSlvUxqsEvdkc8nA/viewform" target="_blank" rel="noopener noreferrer">
            Request New Policy
          </Link>
          <Link className="p-[10px] hover:bg-[#FFFFFF33] mb-auto mr-auto" href="https://forms.gle/zNYsAqTcJz2iPw3j9" target="_blank" rel="noopener noreferrer">
            Contact Us
          </Link>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <a href="http://berkmancenter.org/" target="_blank" rel="noopener noreferrer">
            <img className="h-[50px]" title="Berkman Klein Center" src="/BKC_title.svg" alt="Berkman Klein Center logo" />
          </a>
          <div className="text-left flex flex-row pb-4 pt-4 ASML_Text font-normal gap-12 underline leading-6 text-base">
            <Link href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank" rel="noopener noreferrer">
              Licenses
            </Link>
            <Link href="https://accessibility.huit.harvard.edu/digital-accessibility-policy" target="_blank" rel="noopener noreferrer">
              Accessibility
            </Link>
          </div>
          <span className="ASML_Text Paragraph text-left ASML_Text text-xl font-bold whitespace-normal" translate="no">
            &copy; 2026 President and Fellows of Harvard College
          </span>
        </div>
      </div>
      <div className="w-full h-[24px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
    </footer >
  )
}
