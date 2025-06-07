import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
}

function ViewAllButton({ href }: ViewAllButtonProps) {
  return (
    <div className=" flex justify-center items-center mt-6">
      <Link href={href}>
        <button className="flex items-center cursor-pointer gap-2 px-4 justify-center py-2 rounded-sm bg-primaryColor text-whiteColor font-medium ">
          View All
          <ArrowRight />
        </button>
      </Link>
    </div>
  );
}

export default ViewAllButton;
