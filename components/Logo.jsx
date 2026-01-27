import { PartyPopper } from "lucide-react";
import Link from "next/link";

export default function Logo({ siteName = "MySocials" }) {
  return (
    <Link
      href="/"
      className="select-none hover:bg-secondary py-1 px-3 rounded-md flex items-center gap-1.5"
    >
      <h1 className="text-lg font-semibold">{siteName}</h1>
      <PartyPopper className="!h-4 !w-4" />
    </Link>
  );
}
