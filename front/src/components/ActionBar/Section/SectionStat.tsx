import ItemWithDesc from "./ItemWithDesc";

export default function SectionStat(props: SectionStatProps) {
  const totalTrees = props.totalElements.trees + " шт";
  const totalArea = "1000 кв.м"; // FIXME
  const totalFurnitures = props.totalElements.furnitures + " шт";
  return (
    <>
      <h2 className="text-2xl font-bold text-primary text-center mt-2">
        {props.children}
      </h2>
      <div className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]"></div>
      <div className="h-full overflow-y-scroll">
        <ItemWithDesc title={"Общая площадь"} description={totalArea} />

        <div className="bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all">
          <input className="accordion" id="one" type="checkbox" />
          <label htmlFor="one">
            <div className="flex text-primary font-bold">
              <div className="pr-2 ">
                <svg
                  className="accordion-arrow h-full transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                >
                  <path d="M0 11L-4.80825e-07 0L7 5.5L0 11Z" fill="#024751" />
                </svg>
              </div>
              <p>Зеленые насаждения</p>
              <span className="block flex-1 text-right">{totalTrees}</span>
            </div>
            <ul className="hidden accordion-item border-t-2 border-[#E6EDEE] mt-2 pt-1">
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">деревьев</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">{totalTrees}</span>
              </li>
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">кустариков</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">0 шт</span>
              </li>
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">цветников</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">0 шт</span>
              </li>
            </ul>
          </label>
        </div>

        <div className=" bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all">
          <input className="accordion" id="two" type="checkbox" />
          <label htmlFor="two" className="">
            <div className="flex text-primary font-bold">
              <div className="pr-2 ">
                <svg
                  className="accordion-arrow h-full transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="11"
                  viewBox="0 0 7 11"
                  fill="none"
                >
                  <path d="M0 11L-4.80825e-07 0L7 5.5L0 11Z" fill="#024751" />
                </svg>
              </div>
              <p>МАФ</p>
              <span className="block flex-1 text-right">{totalFurnitures}</span>
            </div>
            <ul className="hidden accordion-item border-t-2 border-[#E6EDEE] mt-2 pt-1">
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">скамьи</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">
                  {totalFurnitures}
                </span>
              </li>
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">мусорные урны</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">0 шт</span>
              </li>
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">фонари</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">0 шт</span>
              </li>
            </ul>
          </label>
        </div>
      </div>
    </>
  );
}
