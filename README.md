# constrained-map

## Install

```bash
npm install constrained-map
```

## Usage

```ts
import { ConstrainedMap } from 'constrained-map'

class Request { /* ... */ }
const map = new ConstrainedMap<[[Request, number], [string, string]]>

const requestKey = new Request()
map.set(requestKey, 1)

const requestValue = map.get(requestKey) // type constrained to number


const strKey = 'key'
map.set(strKey, 'value')

const strValue = map.get(strKey) // type constrained to string
```

## Credits

- Me, myself and I

