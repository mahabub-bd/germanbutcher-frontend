# Quick Start: WebSocket Notifications

## What's Been Installed

The WebSocket notification system is now fully integrated and ready to use!

## ✅ Completed Setup

1. ✅ Installed `socket.io-client` package
2. ✅ Created TypeScript types
3. ✅ Created notification context and provider
4. ✅ Created custom `useNotification` hook
5. ✅ Created UI components (NotificationBell & NotificationPanel)
6. ✅ Added environment variable
7. ✅ Integrated NotificationProvider in root layout

## 🚀 Quick Implementation (3 Steps)

### Step 1: Add to Header (For All Users)

Find your header component and add the notification bell:

```tsx
import { NotificationBell } from "@/components/notification-bell";

// In your header component
<NotificationBell />
```

**Example location**: `components/header/navbar.tsx` or similar

### Step 2: Add to Admin Dashboard (For Admins)

Add the notification panel to your admin dashboard:

```tsx
import { NotificationPanel } from "@/components/notification-panel";

// In your admin dashboard
<NotificationPanel />
```

**Example location**: `app/admin/page.tsx` or `app/admin/dashboard/page.tsx`

### Step 3: Test It! 🎉

1. Log in to your application
2. Check browser console - you should see: "Connected to notification server"
3. Place a test order from the backend or trigger a notification
4. You should see:
   - A toast notification appear
   - The notification bell badge update
   - The notification appear in the panel

## 📁 Files Created

### Core Implementation
- `utils/types.ts` - TypeScript interfaces (updated)
- `contexts/notification-context.tsx` - React context
- `providers/notification-provider.tsx` - WebSocket provider
- `hooks/use-notification.ts` - Custom hook

### UI Components
- `components/notification-bell.tsx` - Bell icon with badge
- `components/notification-panel.tsx` - Full notification list
- `components/examples/header-with-notifications.tsx` - Header example
- `components/examples/admin-dashboard-with-notifications.tsx` - Dashboard example

### Configuration
- `.env` - Added `NEXT_PUBLIC_SOCKET_URL`
- `app/layout.tsx` - Added NotificationProvider

### Documentation
- `WEBSOCKET_IMPLEMENTATION.md` - Full documentation
- `QUICK_START_NOTIFICATIONS.md` - This file

## 🎨 Components Overview

### NotificationBell
- Bell icon with unread badge
- Popover with notification list
- Perfect for headers/navigation

### NotificationPanel
- Full notification panel
- Shows all notifications with details
- Connection status indicator
- Clear all/individual notifications
- Perfect for dashboards/sidebars

## 🔧 Available Hook Methods

```tsx
const {
  socket,              // Socket.IO instance
  notifications,       // Array of notifications
  isConnected,         // Connection status (boolean)
  clearNotifications,  // Clear all notifications
  removeNotification,  // Remove single notification by index
} = useNotification();
```

## 📡 Events Received

- `newOrder` - New order placed (Admin only)
- `orderConfirmation` - Order confirmed (Customer)
- `orderStatusUpdate` - Order status changed
- `paymentStatusUpdate` - Payment status changed
- `notification` - Custom notification
- `broadcast` - System-wide notification

## 🎯 Where to Add Components

### Customer-Facing Pages
```
app/(main)/layout.tsx           → NotificationBell in header
app/account/orders/page.tsx     → NotificationPanel (optional)
```

### Admin Pages
```
app/admin/layout.tsx            → NotificationBell in header
app/admin/dashboard/page.tsx    → NotificationPanel
app/admin/orders/page.tsx       → NotificationPanel (optional)
```

## 🧪 Testing Checklist

- [ ] Log in and verify WebSocket connection in console
- [ ] Check notification bell appears in header
- [ ] Create a test order (admin should see notification)
- [ ] Check toast notification appears
- [ ] Check notification appears in panel
- [ ] Test "Clear All" button
- [ ] Test individual notification removal
- [ ] Test with admin and non-admin users

## 🐛 Troubleshooting

### No Connection
- Check: Is user logged in? (getUser() returns user)
- Check: Browser console for connection errors
- Check: Environment variable is set correctly

### No Notifications
- Check: Backend is emitting events
- Check: User ID matches between frontend and backend
- Check: isAdmin flag is correct for admin events

### No Toast
- Check: Toaster component is in layout.tsx
- Check: Sonner package is installed

## 📖 Full Documentation

See [WEBSOCKET_IMPLEMENTATION.md](./WEBSOCKET_IMPLEMENTATION.md) for:
- Advanced usage examples
- Customization options
- Event structure details
- Performance tips
- Security considerations

## 💡 Pro Tips

1. **Start Simple**: Add NotificationBell to header first
2. **Test with Real Data**: Trigger actual order events
3. **Customize Toasts**: Edit toast duration/position in provider
4. **Add Sounds**: Add notification sounds for better UX
5. **Mobile Responsive**: Components are mobile-friendly by default

## 🎉 You're Ready!

The system is fully set up. Just add the components to your pages and start receiving real-time notifications!
