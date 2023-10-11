import { useEffect, useRef, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import transitionEnd = Simulate.transitionEnd;
interface InfoParams {
  active: number;
  setActive: Function;
  place: PlaceInfo;
}

interface InfoObjectParams {
  setActive: Function;
  place: PlaceInfo;
}

export function Info(props: InfoParams) {
  const TOP_POS = window.isAndroid ? 107 : 80;
  const refInfo = useRef(null);
  const [activeInfo, setActiveInfo] = useState(1);

  console.log(activeInfo, props.active);

  const transitionEnd = () => {
    if (props.active != 0) {
      setActiveInfo(props.active);
    }
  };

  return (
    <div
      ref={refInfo}
      onTransitionEnd={transitionEnd}
      className={`absolute z-10 bg-white transition-all duration-500  h-full left-0 right-0  rounded-3xl `}
      style={{
        top: props.active == activeInfo ? TOP_POS : "100%",
      }}
    >
      <div className="h-full px-[24px] pt-2 pb-[280px] ">
        <div className="w-[40px] h-[4px] bg-primary opacity-30 rounded m-auto"></div>

        {activeInfo == 1 && (
          <InfoObject setActive={props.setActive} place={props.place} />
        )}
        {activeInfo == 2 && <div>Hello World</div>}
      </div>
    </div>
  );
}
export function InfoObject(props: InfoObjectParams) {
  const totalTrees = props.place.trees.length + " шт";
  const totalArea = props.place.parameters.totalArea + " кв.м";
  const totalFurniture = props.place.furniture.length + " шт";
  return (
    <>
      <h2 className="text-2xl font-bold text-primary text-center mt-2">
        Характеристики объекта
      </h2>
      <h3 className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]">
        Территория объекта относится к{" "}
        <span className="text-secondary">II категории содержания</span>
      </h3>
      <div className="h-full overflow-y-scroll">
        <div className="bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all">
          <dl className="flex justify-between text-primary font-bold">
            <dt>Общая площадь</dt>
            <dd>{totalArea}</dd>
          </dl>
        </div>

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
              <span className="block flex-1 text-right">{totalFurniture}</span>
            </div>
            <ul className="hidden accordion-item border-t-2 border-[#E6EDEE] mt-2 pt-1">
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">скамьи</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">
                  {totalFurniture}
                </span>
              </li>
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">урны</p>
                <div className="basis-full h-[17px] border-b-[2px] border-[#ABC2C5] border-dotted"></div>
                <span className="block whitespace-nowrap">0 шт</span>
              </li>
              <li className="flex text-primary gap-1 mt-1">
                <p className="pl-[15px] whitespace-nowrap">фанари</p>
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

export function Test(props: InfoObjectParams) {
  return <p>Hello</p>;
}
