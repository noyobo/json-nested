# json-nested

Parse all possible nested JSON strings


## Usage

```ts
import { parse } from 'json-nested';

var reuslt = parse({
  a: JSON.stringify({
    b: JSON.stringify({
      c: JSON.stringify({
        d: 1,
      }),
    }),
  }),
})

reuslt = {
  a: {
    b: {
      c: {
        d: 1,
      },
    },
  },
}
```
