# Icons how-to

We opted for a more "manual" approach for icons.

1. Get the minified SVG markup

```
<svg width="24" height="24">
  <path fill="#000" fill-opacity=".91" fill-rule="evenodd" d="M12 10.584l7.071-7.071a1 1 0 0 1 1.414 1.414l-7.07 7.071 7.07 7.071a1 1 0 1 1-1.414 1.414L12 13.413l-7.071 7.07a1 1 0 0 1-1.414-1.414l7.07-7.07-7.07-7.072a1 1 0 1 1 1.414-1.414L12 10.584z"/>
</svg>
```

2. Copy the inner parts, don't include the actuall `<svg />` tag.

```
<path fill="#000" fill-opacity=".91" fill-rule="evenodd" d="M12 10.584l7.071-7.071a1 1 0 0 1 1.414 1.414l-7.07 7.071 7.07 7.071a1 1 0 1 1-1.414 1.414L12 13.413l-7.071 7.07a1 1 0 0 1-1.414-1.414l7.07-7.07-7.07-7.072a1 1 0 1 1 1.414-1.414L12 10.584z"/>
```

...also remove attributes like fill, fill-opacity, fill-rule etc. that are not needed.

3. Create a copy of an existing icon in "icons" folder and add your new SVG markup to that copy.
4. Add you new icon to the icon export index.js file.

## Icon extras

1. If the icon is of a different size than 24px, you can add that size directly to the icon like so:

```
function StarLarge() {
    return (
      <path d="M35.583 44L22 35.124 8.417 44l3.825-16.339L0 16.79l15.976-1.223L22 0l6.024 15.567L44 16.79 31.758 27.661z" />
    );
}

StarLarge.iconSize = '44px'

export default withIcon(StarLarge);
```

2. If you need to set a special color on a specific path for your icon:

```
function StarLarge() {
    return (
      <path fill="hotpink" d="M35.583 44L22 35.124 8.417 44l3.825-16.339L0 16.79l15.976-1.223L22 0l6.024 15.567L44 16.79 31.758 27.661z" />
    );
}
```

## Helpful tools

1. [SVGOMG on the web](https://jakearchibald.github.io/svgomg/) is a great tool that will help out with minification and the copy part of SVG markup.
