# CSS-ML

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
