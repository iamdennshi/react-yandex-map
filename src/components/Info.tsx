import { useEffect, useRef, useState } from "react";
interface InfoParams {
  active: number;
  prevActive: number;
  place: PlaceInfo;
}

interface InfoObjectParams {
  place: PlaceInfo;
}

export default function Info(props: InfoParams) {
  const TOP_POS = window.isAndroid ? 107 : 80;
  const refInfo = useRef(null);
  const [activeInfo, setActiveInfo] = useState(1);

  const transitionEnd = () => {
    if (props.active != 0) {
      setActiveInfo(props.active);
    }
  };

  useEffect(() => {
    if (props.active != 0 && props.prevActive == 0) {
      setActiveInfo(props.active);
    }
  }, [props.active]);

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

        {activeInfo == 1 && <InfoStat place={props.place} />}
        {activeInfo == 2 && <InfoAlert />}
        {activeInfo == 3 && <InfoConfig />}
      </div>
    </div>
  );
}

interface InfoItemWithDescProps {
  title: string;
  description: string;
}

function InfoItemWithDesc(props: InfoItemWithDescProps) {
  return (
    <div className="bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all text-primary font-bold">
      <dl className="flex justify-between ">
        <dt>{props.title}</dt>
        <dd className={"whitespace-nowrap"}>{props.description}</dd>
      </dl>
    </div>
  );
}

function InfoStat(props: InfoObjectParams) {
  const totalTrees = props.place.trees.length + " шт";
  const totalArea = props.place.parameters.totalArea + " кв.м";
  const totalFurniture = props.place.furniture.length + " шт";
  return (
    <>
      <h2 className="text-2xl font-bold text-primary text-center mt-2">
        Характеристики объекта
      </h2>
      <div className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]"></div>
      <div className="h-full overflow-y-scroll">
        <InfoItemWithDesc title={"Общая площадь"} description={totalArea} />

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

function InfoAlert() {
  return (
    <>
      <h2 className="text-2xl font-bold text-primary text-center mt-2">
        Уведомления
      </h2>
      <div className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]"></div>
      <div className="h-full overflow-y-scroll">
        <InfoItemWithDesc
          title={
            "Пользователь (Иван Иванов) добавил новый элемент (Уличный фонарь - ID 24)"
          }
          description={"15.10.23 08:44"}
        />
        <InfoItemWithDesc
          title={
            "Пользователь (Иван Иванов) добавил новый элемент (Липа мелколистная - ID 43)"
          }
          description={"14.10.23 15:05"}
        />
        <InfoItemWithDesc
          title={
            "Пользователь (Иван Иванов) изменил комментарий элемента (Клён остролистный - ID 32) с (нужнается в обработке) на (обработан)"
          }
          description={"14.10.23 12:45"}
        />
      </div>
    </>
  );
}

function InfoConfig() {
  return (
    <>
      <h2 className="text-2xl font-bold text-primary text-center mt-2">
        Конфигурация
      </h2>
      <div className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]"></div>
      <div className="h-full overflow-y-scroll"></div>
    </>
  );
}
