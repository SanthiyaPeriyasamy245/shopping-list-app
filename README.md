🛒 Shopping List App – Firebase-Powered Progressive Web App

- ✅ Built using HTML, CSS, JavaScript, and Firebase
- 📱 Designed as a Progressive Web App with installable behavior
- 🔧 Used import to load required Firebase modules
- 🚀 Initialized the app via initializeApp() with the Firebase config
- 🗄️ Accessed Realtime Database using getDatabase()
- 📌 Utilized ref() to target specific database paths (e.g., "shopping-list")
- ➕ Added list items using push() (auto-generates unique item IDs)
- 🔄 Real-time sync achieved with onValue() to reflect updates instantly
- 🆔 Leveraged unique IDs for deleting individual items with precision
- 🔍 Converted Firebase objects to arrays using Object.entries(), Object.keys(), and snapshot.val()
- 🧱 Dynamically rendered items using createElement() (preferred over innerHTML)
- ✋ Disabled text selection using CSS user-select: none for smoother UX
- 📐 Included <meta name="viewport"> for mobile responsiveness
- 🌟 Added a favicon and manifest.json for standalone, installable app behavior
- 📥 Enabled downloading the list via Blob and URL.createObjectURL()—generates a .txt file for offline use


