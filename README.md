# Adonis Documentation

This project contains the website hosted on http://adonisjs.com. Pull the documentation from [https://github.com/adonisjs/docs](https://github.com/adonisjs/docs) and compile the markup files into HTML.

> Did we tell you, the docs are built using AdonisJs itself :smile:

## Setup
The easiest thing to do.

1. **Clone the repo**
```
git clone git@github.com:adonisjs/adonis-documentation
```
2. **Cd and Run Setup**
```bash
cd adonis-documentation && npm run setup
```
3. **Create env config**
```bash
cp .env.example .env
```
4. **Start server**
```bash
npm run dev
```

## Compiling Styles & Scripts
All styles and scripts are saved inside the `resources/assets` directory. Make sure not to touch any file inside the `public` directory, since all files are auto-generated. Run the following command to watch for styles & scripts changes and also compile them.

```bash
npm run watch
```

## Contributing

Feel free to contribute to the project by improving the design/layout. Make sure to create a PR for the `develop` branch and not the `master` branch.
