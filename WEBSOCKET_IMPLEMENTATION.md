# WebSocket Notification System - Implementation Guide

## Overview

The WebSocket notification system has been successfully implemented in the German Butcher frontend. This system provides real-time notifications for order events using Socket.IO.

## Files Created

### Core Files

1. **Types** - `utils/types.ts`
   - `NotificationData` interface
   - `Notification` interface
   - `NotificationContextType` interface
   - `PaymentStatus` enum (uses existing type)
   - `OrderStatus` enum

2. **Context** - `contexts/notification-context.tsx`
   - React Context for notification state

3. **Provider** - `providers/notification-provider.tsx`
   - Manages WebSocket connection
   - Handles all notification events
   - Integrates with Sonner toast notifications
   - Auto-connects based on user authentication

4. **Hook** - `hooks/use-notification.ts`
   - Custom hook to access notification context
   - Provides: `socket`, `notifications`, `isConnected`, `clearNotifications`, `removeNotification`

5. **Components**:
   - `components/notification-panel.tsx` - Full notification list panel
   - `components/notification-bell.tsx` - Bell icon with badge for header

### Configuration

6. **Environment Variable** - `.env`
   ```
   NEXT_PUBLIC_SOCKET_URL=https://api.germanbutcherbd.com
   ```

7. **Root Layout** - `app/layout.tsx`
   - NotificationProvider integrated at root level

## Features

### Automatic Connection
- Connects automatically when user is logged in
- Passes `userId` and `isAdmin` status to server
- Auto-reconnection with exponential backoff
- Connection status indicator

### Event Handlers

#### For Admin Users
- `newOrder` - Triggered when new order is placed
  - Shows toast notification
  - Adds to notification list
  - Displays order number and customer name

#### For All Users
- `orderConfirmation` - Order confirmed
- `orderStatusUpdate` - Order status changes (pending → processing → shipped → delivered)
- `paymentStatusUpdate` - Payment status changes
- `notification` - Custom notifications
- `broadcast` - System-wide notifications

### Toast Notifications
All events automatically show toast notifications using Sonner:
- Success toasts for new orders and confirmations
- Info toasts for status updates
- Custom messages for broadcasts

### Notification Storage
- Stores all notifications in state
- Displays in notification panel
- Shows relative time (e.g., "2 minutes ago")
- Can clear all or individual notifications

## Usage Examples

### 1. Add Notification Bell to Header

Add to your header component (e.g., `components/header/navbar.tsx`):

```tsx
import { NotificationBell } from "@/components/notification-bell";

export function Navbar() {
  return (
    <header>
      {/* Your existing header content */}

      {/* Add notification bell (only shows for logged-in users) */}
      <NotificationBell />
    </header>
  );
}
```

### 2. Display Notification Panel in Dashboard

```tsx
import { NotificationPanel } from "@/components/notification-panel";

export function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Standalone notification panel */}
      <NotificationPanel />
    </div>
  );
}
```

### 3. Access Notification Data Programmatically

```tsx
"use client";

import { useNotification } from "@/hooks/use-notification";

export function CustomComponent() {
  const { socket, notifications, isConnected } = useNotification();

  // Check connection status
  if (!isConnected) {
    return <div>Connecting to notification server...</div>;
  }

  // Access notifications
  const unreadCount = notifications.length;

  // Send custom event (if needed)
  const sendCustomEvent = () => {
    socket?.emit("customEvent", { data: "value" });
  };

  return (
    <div>
      <p>Unread notifications: {unreadCount}</p>
      <button onClick={sendCustomEvent}>Send Custom Event</button>
    </div>
  );
}
```

### 4. Filter Notifications by Type

```tsx
"use client";

import { useNotification } from "@/hooks/use-notification";

export function OrderNotifications() {
  const { notifications } = useNotification();

  // Filter only order-related notifications
  const orderNotifications = notifications.filter(n =>
    n.event === 'newOrder' ||
    n.event === 'orderStatusUpdate'
  );

  return (
    <div>
      <h2>Order Notifications ({orderNotifications.length})</h2>
      {orderNotifications.map((notif, idx) => (
        <div key={idx}>
          Order {notif.data.orderNo}: {notif.data.orderStatus}
        </div>
      ))}
    </div>
  );
}
```

### 5. Listen for Specific Events

```tsx
"use client";

import { useNotification } from "@/hooks/use-notification";
import { useEffect } from "react";

export function OrderTracker({ orderId }: { orderId: string }) {
  const { socket, notifications } = useNotification();

  useEffect(() => {
    if (!socket) return;

    // Listen for specific order updates
    const handleOrderUpdate = (data: any) => {
      if (data.data.orderId === orderId) {
        console.log("Your order was updated:", data);
        // Custom handling
      }
    };

    socket.on("orderStatusUpdate", handleOrderUpdate);

    return () => {
      socket.off("orderStatusUpdate", handleOrderUpdate);
    };
  }, [socket, orderId]);

  return <div>Tracking order {orderId}...</div>;
}
```

## Conditional Rendering

The NotificationProvider only connects when a user is logged in. Use conditional rendering for notification components:

```tsx
import { getUser } from "@/actions/auth";
import { NotificationBell } from "@/components/notification-bell";

export async function Header() {
  const user = await getUser();

  return (
    <header>
      {/* Other header items */}

      {user && <NotificationBell />}
    </header>
  );
}
```

Or for client components:

```tsx
"use client";

import { useNotification } from "@/hooks/use-notification";

export function ConditionalNotifications() {
  const { isConnected } = useNotification();

  // Component will render but won't show content if not connected
  if (!isConnected) return null;

  return <NotificationBell />;
}
```

## Testing

### Test in Browser Console

```javascript
// Open browser console on your site
const { socket } = useNotification(); // If you expose it in React DevTools

// Or test from any page after logging in
// The socket will auto-connect
```

### Test with Socket.IO Client Library

```html
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
  const socket = io('https://api.germanbutcherbd.com/notifications', {
    query: { userId: '1', isAdmin: 'false' }
  });

  socket.on('connect', () => console.log('Connected'));
  socket.on('orderConfirmation', (data) => console.log('Order:', data));
</script>
```

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

### Staging
```env
NEXT_PUBLIC_SOCKET_URL=https://staging-api.germanbutcherbd.com
```

### Production (current)
```env
NEXT_PUBLIC_SOCKET_URL=https://api.germanbutcherbd.com
```

## Notification Event Structure

All notifications follow this structure:

```typescript
{
  event: 'newOrder' | 'orderConfirmation' | 'orderStatusUpdate' | 'paymentStatusUpdate' | 'notification' | 'broadcast',
  data: {
    orderId: string,
    orderNo: string,
    userId: string,
    orderStatus?: string,
    paymentStatus?: string,
    totalValue?: number,
    items?: any[],
    user?: {
      id: number,
      name: string,
      email: string,
      mobileNumber: string
    },
    address?: any,
    createdAt?: Date,
    updatedAt?: Date,
    title?: string,      // For custom notifications
    message?: string     // For custom notifications
  },
  timestamp: Date
}
```

## Customization

### Change Toast Duration

Edit `providers/notification-provider.tsx`:

```typescript
toast.success("New Order Received!", {
  description: `Order ${data.data.orderNo}`,
  duration: 10000, // Change from 5000 to 10000ms (10 seconds)
});
```

### Customize Toast Appearance

The Sonner toasts can be styled via the `Toaster` component in `app/layout.tsx`:

```tsx
<Toaster
  richColors
  position="top-right"
  expand={true}
  closeButton
/>
```

### Add Sound Notifications

```typescript
// In notification-provider.tsx
const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.play();
};

// In event handlers
newSocket.on("newOrder", (data: Notification) => {
  playNotificationSound();
  // ... rest of handler
});
```

### Persist Notifications to LocalStorage

```typescript
// Save notifications
useEffect(() => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
}, [notifications]);

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('notifications');
  if (saved) {
    setNotifications(JSON.parse(saved));
  }
}, []);
```

## Troubleshooting

### WebSocket Not Connecting

1. Check if user is logged in: `const user = await getUser()`
2. Check browser console for errors
3. Verify `NEXT_PUBLIC_SOCKET_URL` is set correctly
4. Check network tab for WebSocket connection attempts

### Notifications Not Appearing

1. Check if `isAdmin` is set correctly for admin events
2. Verify the backend is emitting events
3. Check browser console for event logs
4. Ensure NotificationProvider is wrapping your components

### Toast Not Showing

1. Verify `<Toaster richColors />` is in layout.tsx
2. Check if Sonner is installed: `pnpm list sonner`
3. Check browser console for errors

## Performance Considerations

- Notifications are stored in memory (state)
- Consider limiting stored notifications (e.g., keep last 50)
- Implement pagination for large notification lists
- Use React.memo for NotificationPanel if needed

```typescript
// Limit notifications to last 50
setNotifications((prev) => [data, ...prev].slice(0, 50));
```

## Security Notes

- WebSocket connections are authenticated via userId
- Admins only receive admin-specific events
- Use HTTPS/WSS in production
- Consider adding JWT token authentication for WebSocket handshake

## Next Steps

1. Add the NotificationBell to your header component
2. Test notifications with real order events
3. Consider adding notification preferences (e.g., mute specific events)
4. Add notification history page for viewing old notifications
5. Implement notification read/unread status
6. Add notification action buttons (e.g., "View Order")

## Support

For issues or questions:
- Check browser console for errors
- Review WebSocket documentation: https://socket.io/docs/v4/
- Check backend logs for event emissions
