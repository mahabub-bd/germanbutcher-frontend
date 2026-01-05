"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotification } from "@/hooks/use-notification";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCircle2, CreditCard, Info, Package, X } from "lucide-react";

export function NotificationPanel() {
  const { notifications, isConnected, clearNotifications, removeNotification } = useNotification();

  const getNotificationIcon = (event: string) => {
    switch (event) {
      case "newOrder":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "orderConfirmation":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "orderStatusUpdate":
        return <Package className="h-5 w-5 text-orange-500" />;
      case "paymentStatusUpdate":
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      case "notification":
      case "broadcast":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationTitle = (event: string) => {
    switch (event) {
      case "newOrder":
        return "New Order";
      case "orderConfirmation":
        return "Order Confirmed";
      case "orderStatusUpdate":
        return "Order Status Update";
      case "paymentStatusUpdate":
        return "Payment Update";
      case "notification":
        return "Notification";
      case "broadcast":
        return "System Notification";
      default:
        return "Notification";
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          {notifications.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {notifications.length}
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearNotifications}
              className="h-8 px-2"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No notifications yet</p>
              <p className="text-xs text-gray-400 mt-1">
                You'll be notified about order updates here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="relative flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.event)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold">
                        {notification.data.title || getNotificationTitle(notification.event)}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(index)}
                        className="h-6 w-6 p-0 hover:bg-destructive/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.data.message ||
                        `Order ${notification.data.orderNo || "N/A"}`}
                    </p>
                    {notification.data.totalValue && (
                      <p className="text-xs font-medium text-primary mt-1">
                        Amount: ৳{notification.data.totalValue.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {formatDistanceToNow(new Date(notification.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
