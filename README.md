# SkipLinks

## Data attributes

### data-skip-link

Create a relationship between two elements. The element with the data attribute become clickable, no matter if it is an anchor, an list element or everything else. The value of the data attribute generates the relationshipt to an container with this particular id.

```html
<span data-skip-link="rel-container">Link</span>
<div id="rel-container">Content</div>
```

### data-skip-close

This data attribute is for an additional close link. The value is the ID of the container which would be closed.

```html
<span data-skip-link="rel-container">Link</span>
<div id="rel-container">
  <p>Content</p>
  <span data-skip-close="rel-container">X</span>
</div>
```

### data-skip-group

With this data attribute you can group links together. It only can be one open so the siblings close every time another group member is clicked.

```html
<ul>
  <li>
    <a href="#" data-skip-link="content-1" data-skip-group="nav">Content One</a>
    <a href="#" data-skip-link="content-2" data-skip-group="nav">Content Two</a>
  </li>
</ul>
<div id="content-1">Content One</div>
<div id="content-2">Content Two</div>
```

### data-skip-breakpoint

To stop the skip link functionality on a specific breakpoint you can use the `data-skip-breakpoint` attribute. In the following scenario the `data-skip-link` whould not be usable under 960px.

```html
<span data-skip-link="rel-container" data-skip-breakpoint="960">Link</span>
<div id="rel-container">Content</div>
```

### data-skip-breakpoint-close

If you want to close an open target on a specific breakpoint you can use the `data-skip-breakpoint` plus the `data-skip-breakpoint-close` attribute.

```html
<span data-skip-link="rel-container" data-skip-breakpoint="960" data-skip-breakpoint-close>Link</span>
<div id="rel-container">Content</div>
```

### data-skip-state

With the value open this data attribute trigger the skip link just on load so that it woult be active.

```html
<span data-skip-link="rel-container" data-skip-state="open">Link</span>
<div id="rel-container">Content</div>
```

### data-skip-class

By default the class that whould be toggled is "is-visible". If you want your own class that whould be toggled add the `data-skip-class`attribute

```html
<span data-skip-link="rel-container" data-skip-class="my-is-visible-class">Link</span>
<div id="rel-container">Content</div>
```

### data-skip-ignore-body

By default a click on every element which is not a skip link or target trigger the close event for all open skip targets. With the `data-skip-ignore-body` attribute the global close whould be ignored on this element.

```html
<span data-skip-link="rel-container" data-skip-ignore-body="true">Link</span>
<div id="rel-container">Content</div>
```

## Events

### skipper:stateChange

With the `skipper:stateChange` you can add own logic to changes of each skip-link. The `event` argument contains the changed skip-link under the `detail` attribute.

```html
document.addEventListener('skipper:stateChange', (e) => {
  console.log(`${e.type}: `, e.detail.cache);
});
```
