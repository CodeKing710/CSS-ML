# CSS-ML

[![Latest Release](https://img.shields.io/github/v/release/CodeKing710/CSS-ML?color=green)](https://github.com/CodeKing710/CSS-ML/releases/latest)
[![License GPL v3](https://img.shields.io/github/license/CodeKing710/CSS-ML)](https://github.com/CodeKing710/CSS-ML/LICENSE)

CSS-ML is a non-HTML tag based renderer designed to automatically render your design based on CSS based APIs without all the extra hassle. Please note some knowledge of CSS is required to use these properly. CSS-ML **does not** provide theming as the goal is to be lightweight and to allow the developer flexibility on colors and layout decisions by providing preformats and components to make development easier without having to move between `.html` and `.css` files more than necessary. No more banging your head on the keyboard when trying to format your site pages :)

![FG Blinds Meme](https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyOGk3bDVycWtxMXhxMHN0enludGo4eDl4bW5tbGx6NWozMDVxcTJiZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yYSSBtDgbbRzq/giphy-downsized.gif)

*GIF via [GIPHY](https://giphy.com/gifs/frustrated-annoyed-programming-yYSSBtDgbbRzq). Content rights belong to the original creator/owner.*

## Instructions

You have two options for using CSS-ML;

- Clone the repo down and use from source
- Use GitHub's jsDelivr CDN to grab the CSS and JS files

Once those are in, CSS-ML will handle the rest, including a dependency factory called `loaded.js` that was also made by yours truly.
Most simple option here is to include this tag as it will pull in all the CSS-ML dependencies in one go:

```js
<script type="module" src="https://cdn.jsdelivr.net/gh/CodeKing710/css-ml@main/css-ml.js"></script>
```

Note that this is a module and will be treated as such, and all code that needs run once the DOM is fully loaded will be run then as per the dependency usage in `loaded.js`

## Features

CSS-ML provides HTML tags to use for various container types such as `<flex>` and `<grid>`, as well as preformatted containers like `<wrapper>` that must follow a specific layout format to work properly.

### Flex/Grid containers

The flex and grid container tags allows attributes that are normally defined in CSS to be defined right there on the container. Items within will behave the way you want them to. Children items can have attributes for `order` and `flex-size` defined to allow the behaviour to be more predictable.

*NOTE: All properties that get assigned with CSS to these tags are able to be overridden with your own CSS as the CSS-ML properties are defined within the cssml layer. No more worrying about using `!important` to force your changes that you want over the frameworks :)*

**More documentation can be found at [CSS-ML Documentation](https://codeking710.github.com/css-ml)**
