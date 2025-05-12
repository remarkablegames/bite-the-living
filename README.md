<p align="center">
  <img src="https://github.com/remarkablegames/bite-the-living/blob/master/public/logo.png" alt="Bite the Living">
</p>

# Bite the Living

![release](https://img.shields.io/github/v/release/remarkablegames/bite-the-living)
[![build](https://github.com/remarkablegames/bite-the-living/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/bite-the-living/actions/workflows/build.yml)

🧟 Bite the Living!

Play the game on:

- [remarkablegames](https://remarkablegames.org/bite-the-living)

## Credits

- [Zombie Apocalypse AssetPack](https://pixelrogueknight.itch.io/zombie-apocalypse-assetpack)

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
