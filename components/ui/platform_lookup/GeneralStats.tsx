export default function GeneralStats({
  platformStats,
}: {
  platformStats: {
    company_count: number;
    document_count: number;
    years_old: number;
  };
}) {
  const num_platforms = platformStats.company_count;
  const num_policies = platformStats.document_count;
  const years = platformStats.years_old;

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full justify-between">
      <div className="bg-[#00000033] flex flex-col items-center justify-center p-4 sm:w-1/3 w-full rounded-[8px]">
        <h1 className="ASML_Heading !text-[40px]/[55px] !font-bold">{num_platforms}+</h1>
        <p className="ASML_Text Paragraph">Platforms tracked</p>
      </div>
      <div className="bg-[#00000033] flex flex-col items-center justify-center p-4 sm:w-1/3 w-full rounded-[8px]">
        <h1 className="ASML_Heading !text-[40px]/[55px] !font-bold">{num_policies.toLocaleString()}+</h1>
        <p className="ASML_Text Paragraph">Policies archived</p>
      </div>
      <div className="bg-[#00000033] flex flex-col items-center justify-center p-4 sm:w-1/3 w-full rounded-[8px]">
        <h1 className="ASML_Heading !text-[40px]/[55px] !font-bold">{years}+</h1>
        <p className="ASML_Text Paragraph">Years spanned</p>
      </div>
    </div>
  );
}