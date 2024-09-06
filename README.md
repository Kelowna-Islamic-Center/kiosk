<h1 align="center">
  Kelowna Islamic Center Web (Mosque Display) - V4 (SvelteKit w/Firebase)
</h1>
<p align="center">
<a href="https://play.google.com/store/apps/details?id=com.kelownamasjid.android.app">Android App</a> -
<a href="https://apps.apple.com/us/app/kelowna-islamic-center/id1479503537?ls=1">iOS App</a> -
<a href="https://kelownaislamiccenter.web.app/">KIOSK Web App</a>
<br><br>
The Kelowna Islamic Center Kiosk Client and Firebase functions. The github repos for the mobile apps is seperate and can be requested if not provided.
</p>

<blockquote>
This is the 4th major version of KIC-Web Kiosk and is built with SvelteKit and Firebase. Previous versions built with jQuery and PHP and can be found in the legacy project "KIC-Web".
</blockquote>


## API Structure
The API has migrated to Firebase functions and BCMA API. All data is requested directly from either Firebase or BCMA's API.

All modifications require authentication. Authentication is done through Firebase authentication. 

## Database Structure
The Kelowna Islamic Center platform now uses Cloud Firestore as its database. Access to the firebase console project can be requested from maintainer. <br><br>


## Kiosk App Structure
The Kiosk Web Application is written with SvelteKit. The browser support for the app currently is Chrome 60+ and most versions of Firefox. <br>

## Developing the Kiosk Web App

Once you've cloned this project, the other steps are exactly the same as a regular SvelteKit project. You can start by installing dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the Kiosk app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

There are no releases, all versions of the app are built and deployed directly from this master branch. Legacy releases are within the "KIC-Web" project.<br>

## License & About
If any part of the documentation is not clear, the maintainer of the repository at the time can be contacted. 
The app is not licensed under any license. It is currently proprietary.

Current Maintainer: Musab Hassan<br>
<a href="https://musabhassan.com">Website</a> -
<a href="mailto://musabhassan04@gmail.com">Email</a> -
<a href="https://github.com/Musab-Hassan/">Github</a>

Assalamulaikum.