# Kelowna Islamic Center Kiosk App

The KIC Kiosk App is a [SvelteKit](https://kit.svelte.dev/) web application deployed to masjid display kiosks. 
It replaces the traditional manual prayer time clocks with a real-time digital display connected to the backend services shared with the mobile application.  

The full documentation for this repository can be found on the [**Official Documentation Website**](https://kelowna-islamic-center.github.io/documentation/kiosk-app/).

[![Read the Documentation](https://img.shields.io/badge/Read%20the%20Full%20Documentation-4CAF50?style=for-the-badge)](https://kelowna-islamic-center.github.io/documentation/kiosk-app/)

## Features

- 📺 Fullscreen prayer times kiosk display for prayer times and announcements  
- 🔔 Real-time announcements carousel via Firestore
- 🕌 Designed for large display screens inside the masjid

## Prerequisites

- [Node.js](https://nodejs.org) (v18 or later)  
- [Firebase CLI](https://firebase.google.com/docs/cli) 

## Getting Started

Clone and install dependencies:

```bash
git https://github.com/Kelowna-Islamic-Center/kiosk
cd kiosk
npm install
````

Run in development mode:

```bash
npm run dev
```

## Environment Setup

The app requires a `.env` file with the following variables:

```env
PUBLIC_API_LINK="https://<your-api-endpoint>"
PUBLIC_FB_API_KEY="your-key"
PUBLIC_FB_AUTH_DOMAIN="your-domain"
PUBLIC_FB_PROJECT_ID="your-project-id"
PUBLIC_FB_STORAGE_BUCKET="your-bucket"
PUBLIC_FB_MESSAGING_SENDER_ID="your-sender-id"
PUBLIC_FB_APP_ID="your-app-id"
```

## Deployment

The kiosk app is deployed with **Firebase Hosting** using SSR:

```bash
npm run build
firebase deploy --only hosting
```

## Display Setup

For kiosk displays:

* Use Google Chrome in kiosk mode (`--kiosk --app=<url>`)
* Recommended: lightweight Linux distro or Raspberry Pi setup for minimal overhead

See [Display Guide](https://kelowna-islamic-center.github.io/documentation/kiosk-app/display-guide/) for more details.


## License

GPL-v3
