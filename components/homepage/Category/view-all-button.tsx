import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
  children?: React.ReactNode;
}

function ViewAllButton({ href, children = "View All" }: ViewAllButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <Link href={href}>
        <Button className="bg-primaryColor hover:bg-primaryColor/90 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export default ViewAllButton;
