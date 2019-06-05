# Foyer-Front

Application pour la gestion des télés du foyer

## Authors

```
Made initially for an LO10 Project. The team was composed of Arnaud Dufour, Frederic Chen and Lucie Colin
```

## Requirements

* [Node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

## Installation

```
git clone git@github.com:ungdev/Foyer-Front.git
# or
git clone https://github.com/ungdev/Foyer-Front.git

cd Foyer-Front
yarn
```

## Configuration

```
# copy env file for all environments
cp .env .env.local
# makes your changes in .env.local, which will not be pushed
nano .env.local

# copy env file for development environment
cp .env.development .env.development.local
# makes your changes in .env.development.local, which will not be pushed
nano .env.development.local
```

## Commands

```
yarn dev    # development server
yarn build  # build production assets
yarn start  # static server
```

## Structure
