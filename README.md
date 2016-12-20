# Adonis Documentation

This project contains the website hosted on http://adonisjs.com. The pull documentation from [https://github.com/adonisjs/docs](https://github.com/adonisjs/docs) and compile the markup files into HTML.

> Did we told you, the docs are built using AdonisJs itself :smile:

## Setup
The most easiest thing to do.

1. **Clone the repo**
```
git clone git@github.com/adonisjs/adonis-documentation
```
2. **Cd and Run Setup**
```bash
cd adonis-documentation && npm run setup
```
3. **Start server**
```bash
npm run dev
```

## Compiling Styles & Scripts
All styles and scripts are saved inside `resources/assets` directory. Make sure not to touch any file inside the `public` directory, since all files are auto-generated. Run the following command for watch for styles & scripts changes and compile them.

```bash
npm run watch
```

## Contributing

Feel free to contribute to the project by improving the design/layout. Make sure to create a PR for the `develop` branch and not the `master` branch.
