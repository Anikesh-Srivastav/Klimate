# 🌦️ Klimate

**Klimate** is a sleek, modern weather application built with React and TypeScript. It delivers accurate, real-time weather updates using custom hooks and TanStack Query, wrapped in a beautiful, responsive UI using Tailwind CSS and ShadCN components.

---

<!-- ## 🚀 Live Demo

🔗 [klimate-zeta.vercel.app](https://klimate-zeta.vercel.app)-->

---

## 🧱 Tech Stack

- **React + TypeScript** – Component-based architecture with static typing
- **Vite** – Superfast bundler for development & production
- **Tailwind CSS** – Utility-first CSS styling
- **ShadCN UI** – Accessible component library
- **TanStack Query** – Efficient data fetching and caching
- **Custom Hooks** – Encapsulated logic for weather, location, and history

---

## ✨ Features

### 🔍 Weather at a Glance
- Displays **current weather**, **hourly forecast**, and **detailed stats**
- Automatically detects **your location** using browser geolocation

### ❤️ Favorite Cities
- Mark cities as favorites for quick access
- Favorites saved in `localStorage`

### 🧠 Custom Hooks (🏗️ Code Reusability)
- `useWeatherQuery` – Fetches weather data using latitude & longitude
- `useForecastQuery` – Retrieves hourly/daily forecast
- `useLocationSearch` – Search cities using Geocoding API
- `useSearchHistory` – Tracks and persists past searches

### 📱 Responsive & Accessible
- Mobile-friendly, accessible interface using ShadCN + Tailwind
- Consistent dark mode design

---

## 🛠️ Installation & Usage

```bash
# Clone the repo
git clone https://github.com/Anikesh-Srivastav/Klimate.git
cd Klimate

# Install dependencies
npm install
# or
yarn

# Start the development server
npm run dev
# or
yarn dev
