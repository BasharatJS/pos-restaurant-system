# 🔥 Firestore Database Setup Instructions

## 📋 **What's Been Fixed & Implemented:**

### ✅ **Background Color Issues:**
- **Fixed** waiter dashboard background - now properly dark (#1f1f1f) 
- **Fixed** white/black background inconsistencies
- **Applied** inline styles and CSS classes to ensure consistent dark background

### ✅ **Real-time Database Integration:**
- **All tables start as "available"** - managed by Firestore
- **Real-time updates** - changes sync across all connected devices
- **Complete CRUD operations** for tables, orders, menu items

---

## 🚀 **Firestore Security Rules to Add:**

**Copy and paste these rules in your Firebase Console > Firestore Database > Rules:**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }
    
    function isWaiterOrAbove() {
      return hasRole('waiter') || hasRole('manager') || hasRole('admin');
    }
    
    function isManagerOrAbove() {
      return hasRole('manager') || hasRole('admin');
    }
    
    function isAdmin() {
      return hasRole('admin');
    }

    // Users collection - for storing user roles
    match /users/{userId} {
      allow read, write: if isOwner(userId) || isAdmin();
    }

    // Tables collection
    match /tables/{tableId} {
      // Anyone authenticated can read tables
      allow read: if isAuthenticated();
      // Only waiters and above can update table status
      allow write: if isWaiterOrAbove();
    }

    // Menu Items collection
    match /menuItems/{itemId} {
      // Anyone authenticated can read menu items
      allow read: if isAuthenticated();
      // Only managers and above can modify menu items
      allow write: if isManagerOrAbove();
    }

    // Orders collection
    match /orders/{orderId} {
      // Allow read if authenticated
      allow read: if isAuthenticated();
      // Allow create/update if waiter or above
      allow create: if isWaiterOrAbove() && 
                   request.auth.uid == resource.data.waiterId;
      allow update: if isWaiterOrAbove() && 
                   (request.auth.uid == resource.data.waiterId || isManagerOrAbove());
      // Only managers and above can delete orders
      allow delete: if isManagerOrAbove();
    }

    // Order Items collection
    match /orderItems/{itemId} {
      // Allow read if authenticated
      allow read: if isAuthenticated();
      // Allow create/update/delete if waiter or above
      allow write: if isWaiterOrAbove();
    }

    // Analytics and reports (admin only)
    match /analytics/{document=**} {
      allow read, write: if isAdmin();
    }

    // Restaurant settings (manager and admin only)
    match /settings/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isManagerOrAbove();
    }

    // Default deny rule for all other documents
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 📊 **Database Collections Structure:**

### 🏓 **Tables Collection:**
```javascript
{
  "id": 1,
  "number": 1,
  "status": "available", // available | occupied | reserved | billing
  "capacity": 4,
  "createdAt": timestamp,
  "updatedAt": timestamp
}
```

### 📋 **Orders Collection:**
```javascript
{
  "tableId": 1,
  "items": [...], // Array of order items
  "status": "active", // active | hold | completed | cancelled
  "total": 250.50,
  "waiterId": "user-uid",
  "createdAt": timestamp,
  "updatedAt": timestamp
}
```

### 🍽️ **Menu Items Collection:**
```javascript
{
  "name": "Aalu Paratha",
  "price": 55.50,
  "category": "food", // food | fast-food | sweet | chinese | popular
  "available": true,
  "createdAt": timestamp,
  "updatedAt": timestamp
}
```

---

## 🎯 **Real-time Features Implemented:**

1. **🔄 Live Table Status Updates** - When waiter selects table, status changes to "occupied" in real-time
2. **📱 Multi-device Sync** - All connected devices see updates instantly
3. **🏪 Auto-initialization** - Tables (1-24) and menu items are created automatically on first load
4. **💾 Persistent Orders** - HOLD and CHECKOUT save orders to database
5. **🔐 Role-based Security** - Waiters can only modify their own orders

---

## 🚀 **How to Apply Rules:**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `pos-restaurent-system`
3. Go to **Firestore Database**
4. Click on **Rules** tab
5. **Replace** existing rules with the rules above
6. Click **Publish**

---

## ✅ **Ready to Test:**

- **Login** with your Firebase credentials
- **Select Waiter** role
- **All 24 tables** will show as "Available" initially
- **Click any table** - it becomes "Occupied" 
- **Add menu items** - they save to database
- **HOLD/CHECKOUT** - orders are saved permanently
- **Real-time sync** across all devices!

Your POS system now has **complete real-time database integration**! 🎉