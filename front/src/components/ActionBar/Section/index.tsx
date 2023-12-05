import { useEffect, useRef, useState } from "react";
import SectionConfig from "./SectionConfig";
import SectionAlert from "./SectionAlert";
import SectionStat from "./SectionStat";

export default function Section(props: SectionProps) {
  const TOP_POS = window.isAndroid ? 107 : 80;
  const refInfo = useRef(null);
  const [activeSection, setActiveSection] = useState(1);

  const transitionEnd = () => {
    if (props.active != 0) {
      setActiveSection(props.active);
    }
  };

  useEffect(() => {
    if (props.active != 0 && props.prevActive == 0) {
      setActiveSection(props.active);
    }
  }, [props.active]);

  return (
    <div
      ref={refInfo}
      onTransitionEnd={transitionEnd}
      className={`absolute z-10 bg-white transition-all duration-500  h-full left-0 right-0  rounded-3xl `}
      style={{
        top: props.active == activeSection ? TOP_POS : "100%",
      }}
    >
      <div className="h-full px-[24px] pt-2 pb-[280px] ">
        <div className="w-[40px] h-[4px] bg-primary opacity-30 rounded m-auto"></div>

        {activeSection == 1 && (
          <SectionStat totalElements={props.totalElements}>
            Характеристика объекта
          </SectionStat>
        )}
        {activeSection == 2 && <SectionAlert>Уведомления</SectionAlert>}
        {activeSection == 3 && <SectionConfig>Конфигурация</SectionConfig>}
      </div>
    </div>
  );
}
