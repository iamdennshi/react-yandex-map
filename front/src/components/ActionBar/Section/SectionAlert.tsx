import ItemWithDesc from "./ItemWithDesc";

export default function SectionAlert({ children }: { children: string }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-primary text-center mt-2">
        {children}
      </h2>
      <div className="text-xs text-center text-[#B2ABAB] pb-2 border-solid border-b-2 border-[#E6EDEE]"></div>
      <div className="h-full overflow-y-scroll">
        <ItemWithDesc
          title={
            "Пользователь (Иван Иванов) добавил новый элемент (Скамейка - ID 24)"
          }
          description={"15.10.23 08:44"}
        />
        <ItemWithDesc
          title={
            "Пользователь (Иван Иванов) добавил новый элемент (Липа мелколистная - ID 43)"
          }
          description={"14.10.23 15:05"}
        />
        <ItemWithDesc
          title={
            "Пользователь (Иван Иванов) изменил комментарий элемента (Клён остролистный - ID 32) с (нужнается в обработке) на (обработан)"
          }
          description={"14.10.23 12:45"}
        />
      </div>
    </>
  );
}
