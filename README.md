# Angular - My Notes 5
# Extra details about Angular architecture
## Styling & View Encapsulation
### Global CSS/SCSS Styles
In Angular, defining a global CSS file can be done either through `angular.json` or `index.html`. The best practice is to define it in `angular.json`. This approach ensures that the global styles are centrally managed and consistently applied across the entire application.

### View Encapsulation
View Encapsulation in Angular controls how styles defined in a component's template affect the rest of the application. It's important to manage how CSS rules defined in one component affect or override the styles in other components. In summary, View Encapsulation refers to strategies that determine the scope and impact of styles defined in any component of the application. There are three strategies:
- `ViewEncapsulation.None`: Used when no encapsulation is desired. CSS rules defined in one component will affect other components loaded on the page.
- `ViewEncapsulation.Emulated`: This strategy applies a marking method to encapsulate the CSS rules within a component.
- `ViewEncapsulation.ShadowDOM`: In this strategy, the browser creates a separate Shadow DOM for the application. This Shadow DOM keeps all its properties, state, and CSS rules hidden.

### Dynamically Styling Elements
With Style Binding, elements can be dynamically or programmatically styled.
```html
<p [style.color]="color">Some text</p>
<!-- style binding with conditions -->
<p [style.color]="getColor()"> Some another text</p>
```
```javascript
color: string = "red";
getColor(): string {
    return "green";
};
```
Note: Similarly, Class Binding can be done using `ClassName` with the same logic.

### Adding Bootstrap to an Angular Application:
- First, install the Bootstrap library:
`npm i bootstrap`
- Then, access the physical files of the library in the `node_modules` directory.
- Finally, reference the CSS and JS files from the library in the `angular.json` file appropriately. This ensures that Bootstrap styles and scripts are properly loaded and available for use in the Angular application.