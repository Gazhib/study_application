export default function ControlButton({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className="px-8 py-4 border-[1px] border-[#51131] rounded-[6px] cursor-pointer">
      {children}
    </button>
  );
}
