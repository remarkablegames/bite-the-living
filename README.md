<p align="center">
  <img src="https://github.com/remarkablegames/bite-the-living/blob/master/public/logo.png?raw=true" alt="Bite the Living" width="300">
</p>

# Bite the Living

![release](https://img.shields.io/github/v/release/remarkablegames/bite-the-living)
[![build](https://github.com/remarkablegames/bite-the-living/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/bite-the-living/actions/workflows/build.yml)

🧟 Control zombies and attack humans!

This game was made for [Pixel Game Jam 2025](https://itch.io/jam/-pixel-game-jam-2025), which the theme was **From the Dead**.

Play the game on:

- [remarkablegames](https://remarkablegames.org/bite-the-living)

## Credits

### Art

- [Zombie Apocalypse AssetPack](https://pixelrogueknight.itch.io/zombie-apocalypse-assetpack)

### Music

- [Free Horror Music Pack](https://void1gaming.itch.io/free-horror-music-pack)

### Sound

- [080886_Bullet](https://pixabay.com/sound-effects/080886-bullet-39738/)
- [080998_Bullet Hit](https://pixabay.com/sound-effects/080998-bullet-hit-39870/)
- [086553_Bullet Hit](https://pixabay.com/sound-effects/086553-bullet-hit-39853/)
- [Zombie sound](https://pixabay.com/sound-effects/zombie-sound-224167/)
- [bulletshot impact (Sound effect)](https://pixabay.com/sound-effects/bulletshot-impact-sound-effect-230462/)
- [platzender Kopf](https://pixabay.com/sound-effects/platzender-kopf-107522/)

### Development

- [Rob Cohen](https://github.com/rmacohen)
- [remarkablemark](https://github.com/remarkablemark)

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#readme)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/bite-the-living.git
cd bite-the-living
```

Install the dependencies:

```sh
npm install
```

Update the environment variables:

```sh
cp .env .env.local
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the game for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your game is ready to be deployed!

### `npm run bundle`

Builds the game and packages it into a Zip file in the `dist` folder.

Your game can be uploaded to your server, [Itch.io](https://itch.io/), [Newgrounds](https://www.newgrounds.com/), etc.

## License

[MIT](LICENSE)
