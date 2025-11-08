import ScaledLink from "../shared/ScaledLink";

export default function Header() {
  return (
    <header className="w-full sticky top-0 flex justify-between items-center p-4 bg-[#0B0D11] text-white border-b-[1px] border-[#E11D48]">
      <ScaledLink to="/dashboard" className="">
        Study App
      </ScaledLink>
      <ScaledLink to="/profile">Account</ScaledLink>
    </header>
  );
}
