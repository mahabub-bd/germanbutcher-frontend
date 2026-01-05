"use client";

import { NotificationPanel } from "@/components/notification-panel";
import { Badge } from "@/components/ui/badge";
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
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 text-[10px] rounded-full"
            >
              {notifications.length > 9 ? "9+" : notifications.length}
            </Badge>
          )}
        </Button>
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
