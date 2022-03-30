# Power Play Parser

Parsing the NHL API play stream it's very hard to determine when a power play is happening. This library is meant toprovide information about the duration and timing of power plays.

## Usage

```ts
import { parsePowerPlays } from 'power-play-parser'
import fetch from 'node-fetch'

const url = new URL(
  `https://statsapi.web.nhl.com/api/v1/game/${gamePk}/feed/live`
)

const resp = await fetch(url.href).then(
  (resp) => resp.json() as Promise<GameData>
)

const { powerPlays } = parsePowerPlays(resp.liveData.plays.allPlays)
```

## License

Copyright 2022 Talby Atlas

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
