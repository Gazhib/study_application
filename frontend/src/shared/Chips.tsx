export default function Chips({
  onClick = () => {},
  isActive = false,
  children,
}: {
  onClick?: (option: string) => void;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  const activeStyle = {
    backgroundColor: isActive ? "#FFE4E9" : "",
    color: isActive ? "#9F1239" : "",
  };

  return (
    <button
      type="button"
      onClick={() => onClick(children as string)}
      style={activeStyle}
      className="text-[16px] flex-1 hover:scale-[1.05] hover:bg-[#1A1E27] transition duration-300  cursor-pointer rounded-full px-3 py-1 bg-[#151922] text-[#E5E7EBB3] border-[1px] border-[#1F2430]"
    >
      {children}
    </button>
  );
}
