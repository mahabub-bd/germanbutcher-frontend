"use client";

import { NotificationPanel } from "@/components/notification-panel";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotification } from "@/hooks/use-notification";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { useState } from "react";

export function NotificationBell() {
  const { notifications } = useNotification();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative inline-flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md bg-primaryColor py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primaryColor focus:opacity-90 focus:shadow-none active:bg-primaryColor active:opacity-90 hover:bg-primaryColor hover:opacity-90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <Bell className="h-5 w-5" />
          </Button>
          {notifications.length > 0 && (
            <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white">
              {notifications.length > 9 ? "9+" : notifications.length}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[calc(100vw-2rem)] p-0",
          "md:w-[520px]",
          "max-h-[80vh]",
          "overflow-hidden"
        )}
        align="center"
        side="bottom"
      >
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  );
}
