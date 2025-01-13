# Creative Theme for Jekyll (Amin Taheri CV)

A Jekyll implementation of the [Creative Theme](http://startbootstrap.com/template-overviews/creative/) template by [Start Bootstrap](http://startbootstrap.com).

Creative is a one page Bootstrap theme for creatives, small businesses, and other multipurpose uses.
The theme includes a number of rich features and plugins that you can use as a great boilerplate for your next Jekyll project! 

See it live in action at <https://amintaheri23.github.io>

## To use the Creative Theme template in your project

- Start by adding your info in `_config.yml`
- In `_layouts/front.html` reorder or remove section as you prefer.

# Install Ruby and Bundler

Ensure Ruby and Bundler are installed:

```bash
sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev
echo '# Install Ruby Gems to ~/.gem' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/.gem"' >> ~/.bashrc
echo 'export PATH="$HOME/.gem/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install bundler
```

# Install Jekyll and Project Dependencies

If `Gemfile` exists in the project root, install the required gems:

```bash
bundle install
```
If not, install Jekyll globally:

```bash
gem install jekyll
```

# Build and Serve the Website

Use Jekyll to build and serve your website locally:

```bash
bundle exec jekyll serve
jekyll serve
```
