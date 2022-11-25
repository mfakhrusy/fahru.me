# Bartholomew Site Template

This repository is a template for creating new [Bartholomew](https://github.com/fermyon/bartholomew) websites.

## Directory Structure:

- `config/site.toml`: The main configuration file for your site. You should edit this.
- `content/`: Your markdown files go in here.
- `scripts/` (advanced): If you want to write your owh Rhai scripts, they go here.
- `spin.toml`: The configuration file for the Spin application.
- `static/`: Static assets like images, CSS, and downloads go in here.
- `templates/`: Your handlebars templates go here. 

## Installation of Spin

To use Bartholomew, you will need to install [Spin](https://spin.fermyon.dev).
Once you have Wagi installed, you can continue setting up Bartholomew.

To start your website, run the following command from this directory:

```console
$ spin up --follow-all
spin up --follow-all
Serving HTTP on address http://127.0.0.1:3000
Available Routes:
  bartholomew: http://127.0.0.1:3000 (wildcard)
  fileserver: http://127.0.0.1:3000/static (wildcard)
```

Now you can point your web browser to `http://localhost:3000/` and see your new Bartholomew site.

## About the License

This repository uses CC0. To the greatest extent possible, you are free to use this content however you want.
You may relicense the code in this repository to your own satisfaction, including proprietary licenses.
