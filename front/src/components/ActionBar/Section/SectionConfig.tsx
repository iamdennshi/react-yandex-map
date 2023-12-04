export default function SectionConfig({ children }: { children: string }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-primary text-center mt-2">
        {children}
      </h2>
      <div className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]"></div>
      <div className="h-full overflow-y-scroll"></div>
    </>
  );
}
