[![Build Status](https://travis-ci.org/FabricElements/fabric-algolia.svg?branch=master)](https://travis-ci.org/FabricElements/fabric-algolia)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/FabricElements/fabric-algolia)

## \<fabric-algolia\>

`fabric-algolia` is a [Polymer 2](http://polymer-project.org) Algolia search component. 

## Installation

Install `fabric-algolia` with Bower

```shell
$ bower install --save FabricElements/fabric-algolia
```

## Usage

Import it into the `<head>` of your page

```html
<link rel="import" href="bower_components/fabric-algolia/fabric-algolia.html">
```

### Example: basic usage

```html
<fabric-algolia application-id=""
                api-key=""
                index=""
                query=""
                response=""
                ></fabric-algolia>
```

* `application-id` (string) - Your Algolia Application ID.
* `api-key` (string) - Your Algolia API key.
* `index` (string) - Your Algolia records.
* `query` (string) - Fields that should be include in the response.
* `response` (object) - Algolia's response.

> See [demo file](./demo/index.html) for examples.

### Other attributes

* `settings` (object) - Search settings.
* `error` (object) - Error.

### Events

* `error-changed` - Fired when the `error` property has changed.
* `response-changed` - Fired when the `response` property has changed.

## Contributing

Please check [CONTRIBUTING](./CONTRIBUTING.md).

## License

Released under the [BSD 3-Clause License](./LICENSE.md).
