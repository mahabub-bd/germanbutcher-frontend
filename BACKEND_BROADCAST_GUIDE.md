# Backend Setup for Offer Notifications

## Overview

The frontend is ready to send offer notifications. You need to add a handler on your backend to receive the `sendBroadcast` event from admin users and broadcast it to all connected users.

## Backend Implementation

### Socket.IO Event Handler

Add this to your backend Socket.IO server (usually in your WebSocket/Socket.IO setup file):

```javascript
// Example: backend/websocket/notifications.js or similar

const io = require('socket.io')(server);
const notificationsNamespace = io.of('/notifications');

notificationsNamespace.on('connection', (socket) => {
  const { userId, isAdmin } = socket.handshake.query;

  console.log(`User ${userId} connected (Admin: ${isAdmin})`);

  // Handle broadcast requests from admin users
  socket.on('sendBroadcast', (data) => {
    // Verify the user is an admin
    if (isAdmin !== 'true') {
      socket.emit('error', { message: 'Unauthorized: Only admins can send broadcasts' });
      return;
    }

    console.log('Broadcasting notification from admin:', data);

    // Broadcast to ALL connected users (including the sender)
    notificationsNamespace.emit('broadcast', {
      event: 'broadcast',
      data: data.data,
      timestamp: new Date()
    });

    // Send confirmation back to the admin
    socket.emit('broadcastSent', {
      success: true,
      message: 'Broadcast sent successfully'
    });
  });

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
  });
});
```

### Alternative: REST API Endpoint

If you prefer to use a REST API endpoint instead of Socket.IO emit:

```javascript
// backend/routes/notifications.js

const express = require('express');
const router = express.Router();

// Middleware to verify admin (adjust based on your auth system)
const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Send broadcast notification
router.post('/broadcast', requireAdmin, async (req, res) => {
  const { title, message, discount, offerId } = req.body;

  // Validate input
  if (!title || !message) {
    return res.status(400).json({
      error: 'Title and message are required'
    });
  }

  try {
    // Get Socket.IO instance (adjust based on your setup)
    const io = req.app.get('io');

    // Broadcast to all connected users
    io.of('/notifications').emit('broadcast', {
      event: 'broadcast',
      data: {
        title,
        message,
        discount: discount || undefined,
        offerId: offerId || undefined,
        type: 'offer'
      },
      timestamp: new Date()
    });

    // Log the broadcast
    console.log('Broadcast sent:', { title, message });

    // Optional: Save to database for notification history
    // await NotificationHistory.create({ title, message, type: 'offer', sentBy: req.user.id });

    res.json({
      success: true,
      message: 'Broadcast sent successfully'
    });
  } catch (error) {
    console.error('Error sending broadcast:', error);
    res.status(500).json({
      error: 'Failed to send broadcast'
    });
  }
});

module.exports = router;
```

### Update Frontend Component (if using REST API)

If you choose the REST API approach, update the component:

```typescript
// In components/admin/notifications/send-offer-notification.tsx
// Replace the handleSendOffer function:

const handleSendOffer = async () => {
  // Validation
  if (!title.trim()) {
    toast.error("Please enter an offer title");
    return;
  }

  if (!message.trim()) {
    toast.error("Please enter an offer message");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('/api/notifications/broadcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        message,
        discount: discount || undefined,
        offerId: offerId || undefined,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    toast.success("Offer notification sent successfully!", {
      description: `Sent to all connected users`,
      duration: 5000,
    });

    // Clear form
    setTitle("");
    setMessage("");
    setDiscount("");
    setOfferId("");
  } catch (error) {
    console.error("Error sending offer notification:", error);
    toast.error("Failed to send offer notification");
  } finally {
    setIsLoading(false);
  }
};
```

## Testing

### 1. Test Socket.IO Method

Open browser console on the admin page and check:
```javascript
// Should see the emit happening
socket.emit('sendBroadcast', {...})
```

### 2. Test REST API Method

```bash
curl -X POST https://api.germanbutcherbd.com/api/notifications/broadcast \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "Test Offer",
    "message": "This is a test notification",
    "discount": "50%"
  }'
```

### 3. Monitor Backend Logs

Watch your backend console for:
- Connection logs
- Broadcast emission logs
- Any errors

## Security Considerations

1. **Authentication**: Always verify the user is an admin before allowing broadcasts
2. **Rate Limiting**: Consider adding rate limiting to prevent spam
3. **Content Validation**: Sanitize title and message to prevent XSS
4. **Logging**: Log all broadcasts with admin user info for audit trail

```javascript
// Example rate limiting with express-rate-limit
const rateLimit = require('express-rate-limit');

const broadcastLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each admin to 10 broadcasts per window
  message: 'Too many broadcasts, please try again later'
});

router.post('/broadcast', requireAdmin, broadcastLimiter, async (req, res) => {
  // ... handler code
});
```

## Optional Enhancements

### 1. Save Notification History

```javascript
// Create a NotificationHistory model
const NotificationHistory = require('../models/NotificationHistory');

// In the broadcast handler
await NotificationHistory.create({
  title,
  message,
  discount,
  offerId,
  type: 'offer',
  sentBy: adminUserId,
  sentAt: new Date(),
  recipientCount: io.of('/notifications').sockets.size // Number of connected users
});
```

### 2. Add Scheduling

Allow admins to schedule notifications for later:

```javascript
router.post('/broadcast/schedule', requireAdmin, async (req, res) => {
  const { title, message, scheduledFor } = req.body;

  // Save to database with scheduled time
  await ScheduledNotification.create({
    title,
    message,
    scheduledFor: new Date(scheduledFor),
    status: 'pending'
  });

  // Use a job queue (Bull, Agenda, etc.) to send at scheduled time
  notificationQueue.add('sendBroadcast', { title, message }, {
    delay: new Date(scheduledFor) - new Date()
  });

  res.json({ success: true });
});
```

### 3. Target Specific User Groups

```javascript
socket.on('sendTargetedBroadcast', (data) => {
  const { userGroup, message } = data; // e.g., userGroup: 'premium-customers'

  // Emit only to specific user group
  notificationsNamespace.to(userGroup).emit('broadcast', {
    event: 'broadcast',
    data: message,
    timestamp: new Date()
  });
});
```

## Troubleshooting

### Notification not reaching users
1. Check backend logs for emit confirmation
2. Verify namespace is correct (`/notifications`)
3. Check if users are connected: `io.of('/notifications').sockets.size`

### Admin can't send notifications
1. Verify `isAdmin` query parameter is correctly set
2. Check authentication in backend handler
3. Look for CORS or connection issues

### Notifications delayed
1. Check server load
2. Verify WebSocket connection is stable
3. Consider using Redis adapter for Socket.IO in production

## Production Checklist

- [ ] Admin authentication is enforced
- [ ] Rate limiting is enabled
- [ ] Content is validated and sanitized
- [ ] Broadcasts are logged for audit
- [ ] HTTPS/WSS is used
- [ ] Error handling is implemented
- [ ] Monitoring is set up
- [ ] Redis adapter is configured (if scaling)

## Support

For Socket.IO documentation: https://socket.io/docs/v4/
For Express.js documentation: https://expressjs.com/
