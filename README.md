

# 🧬 Pokedex App (Vite + React)

A simple standalone Pokédex web app built with **Vite** and **React**. It displays a list of all Pokémon, includes a search functionality, and shows basic Pokémon details on card click. [more upgrades coming soon!!]

---

## 🚀 Features

- 🔍 **Search Pokémon** by name.
- 🧾 **List of all Pokémon** (fetched from [PokeAPI](https://pokeapi.co/)).
- 📄 **Detailed info view** for each Pokémon (types, stats, height, weight).
- ⚡ Built with **Vite** for fast dev and optimized build.
- 🎨 Styled using **Tailwind CSS**.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm or yarn

### Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/pokedex.git
cd pokedex
```

2. **Install dependencies:**

```bash
npm install
# or
yarn
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

4. **Build for production:**

```bash
npm run build
```

---

## 🌐 Deployment

This project uses **HashRouter**, making it compatible with **GitHub Pages** and other static file hosts.

To deploy to GitHub Pages:

1. Add this to your `package.json`:

```json
"homepage": "https://yourusername.github.io/repo-name"
```

2. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts in `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:

```bash
npm run deploy
```

---

## 🔮 Roadmap & Future Plans

This is just the beginning! Here's what's coming next:

* ✅ **Improved Pokémon detail page** with base stats charts and abilities
* 🌙 **Dark Mode toggle**
* 📁 **Filter by type, generation, or region**
* 💾 **Offline support (PWA)**
* 🔥 **Pokémon team builder**
* 👤 **User accounts + saved teams (with Firebase or Supabase)**

---

## 🤝 Contributing

Feel free to fork and contribute! Pull requests and feedback are welcome.

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📦 Tech Stack

* ⚛️ React (with hooks)
* ⚡ Vite
* 🎨 Tailwind CSS
* 🔗 React Router DOM
* 🌐 PokeAPI

---

## 📄 License

MIT License. Free to use and modify.

---

## 🙌 Acknowledgements

* [PokeAPI](https://pokeapi.co/) for the Pokémon data
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)

---

### 🔗 Live Demo

[👉 Click here to try the live app](https://mannan88.github.io/pokedex/)
