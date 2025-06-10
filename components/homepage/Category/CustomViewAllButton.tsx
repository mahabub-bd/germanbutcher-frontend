import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
}

function ViewAllButton({ href }: ViewAllButtonProps) {
  return (
    <div className=" flex justify-center items-center mt-6">
      <Link href={href}>
        <Button className="flex items-center cursor-pointer gap-2 px-4 justify-center bg-primaryColor hover:bg-secondaryColor py-2 text-white font-medium ">
          View All
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
}

export default ViewAllButton;
