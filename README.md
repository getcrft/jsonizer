# @crft/jsonizer

JSON Schema all the Objects! It works in the browser and Node.

Checkout the [example](https://codesandbox.io/s/json-schema-izer-viems?file=/src/App.js) code sandbox.

## Usage

Install:

```bash
yarn add @crft/jsonizer
```

then call it like:

```js
import { schemaGenerator } from '@crft/jsonizer';

const result = schemaGenerator({
  bacon: true
});
```

the result will look like:

```js
{
  type: 'object',
  required: [],
  properties: {
    bacon: {
      title: 'Bacon',
      type: 'boolean',
      examples: [true]
    }
  }
}
```
