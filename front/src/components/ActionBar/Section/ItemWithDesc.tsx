export default function ItemWithDesc(props: ItemWithDescProps) {
  return (
    <div className="bg-[#F2F6F6] rounded-[15px] px-[18px] py-[16px] mt-[12px] active:bg-[#CCDADC] transition-all text-primary font-bold">
      <dl className="flex justify-between ">
        <dt>{props.title}</dt>
        <dd className={"text-right"}>{props.description}</dd>
      </dl>
    </div>
  );
}
