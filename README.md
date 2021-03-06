# ngstrap-modals

An angular service to generate common modal dialogs using [Angular Strap](http://mgcrea.github.io/angular-strap).

### Installation

Install using `bower`.

```shell
$ bower install ngstrap-modals
```

### Usage

Add `ngstrapModals` as a dependency in your app.
```js
angular.module('myapp', ['ngstrapModals']);
```

Use `ngstrapModals` service in your app controllers to create modals.

```js
angular
  .module('myapp')
  .controller('myController', ['ngstrapModals', function(ngstrapModals) {
     // ... your code here ... //

     ngstrapModals.alert(options);
     ngstrapModals.confirm(options);
     ngstrapModals.prompt(options);
   }]);
```

### Demo

Check out the examples [here](https://31piy.github.io/ngstrap-modals).

### Types

#### Alert

```js
ngstrapModals.alert({
  heading: "Howdy!",
  description: "Hello from an alert modal dialog. Please click on Ok to dismiss."
});
```

#### Confirm

```js
ngstrapModals.confirm({
  heading: "Did you like this plugin?"
}).then(function (response) {
  if (response) {
    // Do something if user approves
  } else {
    // Do something else if user declines
  }
});
```

#### Prompt

```js
ngstrapModals.prompt({
  heading: "Hey visitor, what's your name?"
}).then(function(response) {
  if (!response) {
    // Do something if user cancels
  } else {
    // Do something if user enters something
  }
});
```

### Customization

You can pass options in a JavaScript object to customize a dialog.

<table class="table table-bordered">
  <thead>
    <tr>
      <th class="text-center" rowspan="2">Option</th>
      <th class="text-center" rowspan="2">Description</th>
      <th class="text-center" colspan="3">Available in</th>
    </tr>
    <tr>
      <th class="text-center">Alert</th>
      <th class="text-center">Confirm</th>
      <th class="text-center">Prompt</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><code>title</code></td>
      <td>Specifies the title content of the modal</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
    </tr>
    <tr>
      <td><code>heading</code></td>
      <td>Specifies the heading of the modal</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>Specifies the description text of the modal</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
    </tr>
    <tr>
      <td><code>okButtonText</code></td>
      <td>Specifies the text to show on the Ok button</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
    </tr>
    <tr>
      <td><code>cancelButtonText</code></td>
      <td>Specifies the text to show on the Cancel button</td>
      <td class="text-center"></td>
      <td class="text-center">&#x2714;</td>
      <td class="text-center">&#x2714;</td>
    </tr>
    <tr>
      <td><code>placeholder</code></td>
      <td>Specifies the text to show as a placeholder of the input</td>
      <td class="text-center"></td>
      <td class="text-center"></td>
      <td class="text-center">&#x2714;</td>
    </tr>
    <tr>
      <td><code>initValue</code></td>
      <td>Specifies the initial value of the input</td>
      <td class="text-center"></td>
      <td class="text-center"></td>
      <td class="text-center">&#x2714;</td>
    </tr>
  </tbody>
</table>
