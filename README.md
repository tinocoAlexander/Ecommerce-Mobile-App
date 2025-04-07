# 🛍️ Ecommerce Mobile App

Mobile application built with **React Native + Expo** for an online store, allowing users to register, log in, browse products, manage their shopping cart, place orders, and view their profile.

---

## 🚀 Main Features

- 📱 **Home Screen**:
  - Personalized greeting with the user's name
  - Recommended "For You" product section
  - Promotional banner with countdown timer
  - Brand section (images loaded from assets)

- 🛒 **Product List Screen**:
  - Displays all available products
  - Tap opens modal with product info and add-to-cart button

- 🧺 **Cart Screen**:
  - Displays added products
  - Users can update quantity or remove items
  - Dynamic total display
  - Checkout button sends real HTTP POST request to register the order

- 👤 **User Profile Screen**:
  - Displays circular avatar (placeholder)
  - Shows username and phone (from JWT token)
  - Logout button clears session

- 🔐 **Authentication**:
  - Login via JWT (stored in AsyncStorage)
  - User registration (`username`, `password`, `phone`)
  - Password recovery (sends email through backend with RabbitMQ)

---

## 🛠️ Tech Stack

- **React Native** + **Expo**
- **React Navigation** (stack + bottom tabs)
- **Context API** for cart state
- **Axios** for API requests
- **AsyncStorage** for persisting JWT
- **base-64** for decoding JWT payload

---

## 🌐 Backend Integration

This app connects to a real backend hosted on Railway:

- User registration and login
- Password recovery
- Fetching all products
- Registering orders (with `clientId`, `products`, and `total`)

---

## 🧪 Project Structure

```
📁 Ecommerce-mobile-app/
├── assets/
│   ├── Logo.png
│   ├── avatar.png
│   └── brands/
├── contexts/
│   └── CartContext.js
├── navigation/
│   └── AppNavigator.js
├── screens/
│   ├── HomeScreen.js
│   ├── ProductListScreen.js
│   ├── CartScreen.js
│   ├── ProfileScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   └── ForgotPasswordScreen.js
├── api.js
├── App.js
└── ...
```

---

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/youruser/Ecommerce-mobile-app.git
cd Ecommerce-mobile-app

# 2. Install dependencies
npm install

# 3. Run the development server
npx expo start
```

---

## 🔐 Authentication Notes

- JWT is stored in `AsyncStorage` under the key `userToken`
- Orders are created with:
  - `clientId` from the token
  - `products`: list of `{ productId, quantity }`
  - `total`: auto-calculated
  - `status`: default to "pendiente"

---

## 🔮 Future Improvements

- Edit profile details
- Purchase history screen
- Change profile photo
- Add favorite products

---

## 👨‍💻 Author

Developed by **Alexander Tinoco Sanchez**.
Built with passion to deliver a modern and intuitive ecommerce experience.

---

