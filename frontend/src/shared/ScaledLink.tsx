import { Link } from "react-router-dom";

export default function ScaledLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`hover:scale-[1.1] transition duration-300 ${className }`}
    >
      {children}
    </Link>
  );
}
