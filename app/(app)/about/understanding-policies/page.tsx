import Accordion from "@/components/ui/about/Accordion";
import Breadcrumb from "@/components/ui/Breadcrumb";
import DocTypeCards from "@/components/ui/DocTypeCards";

type AccordionItem = {
  question: string;
  answer: React.ReactNode;
};

export default function UnderstandingPolicies() {
  const pp_qa: AccordionItem[] = [
    {
      question: "What it is",
      answer: (
        <> 
          A privacy policy explains how a company collects, uses, stores, and shares your
personal data. Several laws require companies to publish these disclosures, though each
applies to different regions and populations. The European Union’s General Data
Protection Regulation (GDPR) covers companies that process data of EU residents;
California’s Consumer Privacy Act (CCPA) applies to certain businesses handling the data
of California residents; and the Children's Online Privacy Protection Act (COPPA) is a U.S.
federal law focused specifically on data collected from children under 13.
        </>
      )
    },
    {
      question: "What is usually in it",
      answer: (
        <>
          Privacy policies typically describe a broad range of data practices,
including information you provide directly (name, email, date of birth), behavioral data the
platform collects automatically (clicks, dwell time on posts, and location data), device and
browser information, and data acquired from third-party brokers. They also outline with
whom your data is shared, including advertisers, analytics providers, business partners,
and, in some cases, law enforcement agencies.
        </>
      )
    },
    {
      question: "Why it matters to you",
      answer: (
        <>
          These documents are intended to help users make informed choices
about their data, but in practice, they are often difficult to read and navigate. An analysis by
the <span translate="no">Transparency Hub</span>'s Policy Analytics Dashboard found that, within its dataset, about
86% of privacy policies require college-level reading ability, and only 37% clearly include
explicit opt-in or opt-out language. Even when policies are readable, the choices offered are
often limited. Many platforms bury opt-out settings deep within menus or design them to be
difficult to locate. Under GDPR and CCPA, users do have specific rights, including the
right to access their data, request corrections, request deletion, and, in some cases, transfer
their data to another service. However, awareness of these rights remains relatively low
among users.
          <br />
          <br />
          There are also real-world consequences when privacy practices do not match stated
commitments. In 2019, a major global social media company received a $5 billion penalty
from the U.S. Federal Trade Commission (FTC) for misleading users about their ability to
control personal information. Central to the case was the gap between what the company’s
privacy policies and settings promised and how user data was shared in practice.
        </>
      )
    },
    {
      question: "Why tracking changes matters",
      answer: (
        <>
          Companies frequently update their privacy policies to
expand the types of data they collect or to change how that data is shared. Even a minor
revision buried within a long document can signal a significant shift in data practices.
Tracking these updates helps surface meaningful changes before they go unnoticed.
          <br />
          <br />
          There is also a practical reason to keep old versions on file. When a dispute arises
between a user and a platform, the terms that were in place at the time usually apply. But
platforms do not always keep prior versions available on their websites. That makes it
hard for users to point to the rules they originally agreed to. By archiving each version as
it changes, the <span translate="no">Transparency Hub</span> helps preserve that record.
        </>
      )
    },
  ];

  const tc_qa: AccordionItem[] = [
    {
      question: "What it is",
      answer: (
        <> 
          A Terms and Conditions, or Terms of Service (ToS), is the contract you agree to when you click “I Agree”
or “Sign Up.” Courts generally treat this action as legally binding consent, even if the
document is never read. However, not every clause in a ToS is automatically enforceable.
Courts in some jurisdictions have struck down specific provisions (e.g., arbitration clauses)
on grounds of unconscionability or unfairness.
        </>
      )
    },
    {
      question: "What is usually in it",
      answer: (
        <>
          A Terms and Conditions outlines the rules governing the relationship between you and
the platform. It typically explains what users are allowed to do (and what may result in
account termination), what rights the platform has over user-generated content, how the
company may modify the terms, and how disputes are resolved.
        </>
      )
    },
    {
      question: "Why it matters to you",
      answer: (
        <>
          Many users do not realize that creating an account may involve
granting platforms broad rights over their content. For example, some platforms require a
license allowing them to use, copy, modify, and distribute user-uploaded content. This
means that a photo you upload may be reused in advertisements, sublicensed to partners, or
repurposed in ways you did not anticipate.
          <br />
          <br />
          Many Terms and Conditions agreements also include mandatory arbitration clauses. These provisions can
make it difficult to sue the company in court or participate in class-action lawsuits, instead
requiring disputes to be resolved through private arbitration. An analysis by <span translate="no">Transparency
Hub</span>'s Policy Analytics Dashboard found that, within its dataset, roughly 74% of platforms
with arbitration clauses use highly restrictive versions available. Moreover, platforms often
reserve the right to modify their ToS at any time, sometimes without direct notice to users.
Continued use of the service typically constitutes acceptance of updated terms.
        </>
      )
    },
    {
      question: "Why tracking changes matters",
      answer: (
        <>
          When a platform quietly updates its Terms and Conditions,
user rights can change significantly. Tracking these updates over time helps identify when
companies introduce new restrictions, expand content licenses, or weaken user protections.
        </>
      )
    },
  ];

  const cs_qa: AccordionItem[] = [
    {
      question: "What it is",
      answer: (
        <> 
          Community Standards (sometimes called “Community Guidelines”) define
what content and behavior are allowed on a platform. They establish the boundaries of
acceptable speech and activity in spaces used by millions or even billions of users.
        </>
      )
    },
    {
      question: "What is usually in it",
      answer: (
        <>
          These documents address categories such as hate speech,
harassment, misinformation, nudity, violent content, spam, and child safety. They explain
what may lead to content removal, account suspension, or permanent bans. Most major
platforms apply escalating enforcement systems: a first violation may result in a warning,
while repeated violations can lead to account termination.
        </>
      )
    },
    {
      question: "Why it matters to you",
      answer: (
        <>
          Community standards form the foundation of content moderation:
the process by which platforms review and remove posts, images, videos, and accounts that
violate their rules. Enforcement relies on a combination of automated systems and human
reviewers, and neither is perfect. As a result, legitimate content may be removed in error,
while violating content may sometimes remain online. These rules are not abstract. They
shape what you can say, what you can see, and how platforms respond when they determine
that content has crossed a line. They also influence what information is surfaced through
algorithmic recommendation systems.
          <br />
          <br />
          When a platform updates its community standards,
the practical boundaries of online speech can shift accordingly. Unlike Terms and Conditions,
which function as legal contracts between users and platforms, community guidelines
operate more like internal “house rules.” However, violations of these rules still carry real
consequences, which are ultimately grounded in the platform’s Terms and Conditions.
        </>
      )
    },
    {
      question: "Why tracking changes matters",
      answer: (
        <>
          Platforms regularly revise their community standards in
response to public pressure, regulatory changes, and emerging online harms. Tracking such
updates over time can reveal how companies redefine acceptable speech and behavior—
expanding or narrowing what users are allowed to say, share, and experience online.
        </>
      )
    },
  ];

  const op_qa: AccordionItem[] = [
    {
      question: "Transparency Reports",
      answer: (
        <>
          Transparency Reports are periodic disclosures—typically published every six
months or once a year—that provides data on government requests for user information,
content removal orders, and a platform's own enforcement of its community guidelines.
        </>
      )
    },
    {
      question: "Copyright and IP Policies",
      answer: (
        <>
          Copyright and IP Policies explain how platforms handle copyright infringement
claims.
          <br />
          <br />
          Under the U.S. Digital Millennium Copyright Act (DMCA), platforms follow a notice-
and-takedown system: a rights holder submits a complaint, and the platform typically
removes the content promptly to preserve its legal safe harbor protections. The DMCA
also provides a counter-notice procedure. If you believe your content was removed in
error, you may submit a counter-notification. The platform may restore the content
unless the original complainant files a lawsuit.
          <br />
          <br />
          In practice, however, counter-notices are filed far less often than takedown requests,
and critics have noted the system’s incentives tend to favor removal over preservation.
      </>  
      )   
    },
    {
      question: "Law Enforcement Guidelines",
      answer: (
        <>
          Law Enforcement Guidelines outline how platforms respond to government requests
for user data. They specify what types of information may be disclosed and what legal
process is required to obtain it. Different categories of data—such as basic subscriber
information, metadata, and content—are typically subject to different legal thresholds.
        </>
      )
    },
    {
      question: "Advertising and Data Policies",
      answer: (
        <>
          Advertising and Data Policies describe how platforms target advertisements and what
data drives that targeting. They explain the types of user profiles platforms build and
how advertisers can use those profiles to reach specific audiences.
        </>
      )
    },
  ];

  return (
    <div className="bg-background pt-6 px-6 h-full flex flex-col items-center">
      <div className="w-[80vw] max-w-[1016px] flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <Breadcrumb previous_page="About" current_page="Understanding Policies" link="/about" />
          <h1 className="ASML_Heading !text-[45px]/[62px]"> 
            Understanding Policy Documents
          </h1>
          <h4 className="ASML_Heading !text-[30px]/[30px] !font-bold">
            A guide to the documents that govern your digital life
          </h4>
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
        </section>
        <div className="flex flex-col gap-6">
          <section className="ASML_Text Paragraph whitespace-pre-wrap lg:mr-[288px]">
            Every time you sign up for an app or website, you agree to a set of rules written by the company. These documents are often long, filled with legalese, and rarely read in full. Yet they matter: they determine what happens to your data, your content, and, in some cases, your rights. 
            <br /><br />We index a variety of policy types:
          </section>
          <DocTypeCards colored={true} interactive={true} />

          <h2 className="ASML_Heading !text-[32px]/[43px] !font-[900]">Policy Explanations</h2>
          <section id="privacy-policies" className="flex flex-row justify-between gap-24">
            <div className="flex flex-col gap-4">
              <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700] flex flex-row items-center gap-2">
                <img className="w-8 h-8 inline" title="Privacy Policies icon" src="/policy_index/eye.svg" alt="Icon graphic representing an eye"/>
                Privacy Policies
              </h3>
              <Accordion items={pp_qa}/>
            </div>
            <img 
              className="h-[192px] w-[192px] lg:block hidden" 
              src="/about/internet-privacy.svg"
              title="Privacy Policies graphic" 
              alt="Graphic depicting a shield and lock over a webpage"
              />
          </section>
          <section id="terms-and-conditions" className="flex flex-row justify-between gap-24">
            <div className="flex flex-col gap-4">
              <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700] flex flex-row items-center gap-2">
                <img className="w-8 h-8 inline" title="Terms and Conditions icon" src="/policy_index/file-text.svg" alt="Icon graphic representing a document"/>
                Terms and Conditions
              </h3>
              <Accordion items={tc_qa}/>
            </div>
            <img 
              className="h-[192px] w-[192px] lg:block hidden" 
              src="/about/accept-file.svg"
              title="Terms and Conditions graphic" 
              alt="Graphic depicting a document with a check mark over it"
              />
          </section>
          <section id="community-standards" className="flex flex-row justify-between gap-24">
            <div className="flex flex-col gap-4">
              <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700] flex flex-row items-center gap-2">
                <img className="w-8 h-8 inline" title="Community Guidelines icon" src="/policy_index/users.svg" alt="Icon graphic representing two people"/>
                Community Standards
              </h3>
              <Accordion items={cs_qa}/>
            </div>
            <img 
              className="h-[192px] w-[192px] lg:block hidden" 
              src="/about/community-standards.svg"
              title="Community Standards graphic" 
              alt="Graphic depicting a representation of community with two hands holding hearts"
              />
          </section>
          <section id="other" className="flex flex-row justify-between gap-24">
            <div className="flex flex-col gap-4 lg:mr-[288px]">
              <h3 className="ASML_Heading !text-[28px]/[38px] !font-[700] flex flex-row items-center gap-2">
                <img className="w-8 h-8 inline" title="Other icon" src="/policy_index/other.svg" alt="Icon graphic representing a stack of documents"/>
                Other Policies
              </h3>
            <Accordion items={op_qa}/>
            </div>
          </section>
          <div className="w-full h-[6px] bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red" />
          <section className="ASML_Text Paragraph whitespace-pre-wrap lg:mr-[288px]">
            These documents collectively shape your rights, your privacy, and your voice
            on the platforms you use every day. They are updated frequently, often without prominent notice.
            The Transparency Hub exists to make those changes visible, searchable, and comparable, enabling
            researchers, journalists, policymakers, and everyday users to ask informed questions about and
            critically assess the rules platforms create.
          </section>
        </div>
      </div>
    </div>
  );
}