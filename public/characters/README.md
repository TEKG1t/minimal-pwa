# Character animations

Character art lives in this folder so it can be addressed by stable URLs and
cached by the PWA:

```text
characters/
└── pigeon/
    ├── idle.json
    ├── idle_1.png
    ├── idle_2.png
    ├── idle_3.png
    └── idle_4.png
```

Each animation has one JSON manifest. Frame paths are relative to that
manifest, so the same format works for every character and animation:

```json
{
  "id": "idle",
  "frames": ["idle_1.png", "idle_2.png", "idle_3.png", "idle_4.png"],
  "fps": 8,
  "loop": true,
  "anchor": { "x": 0.5, "y": 1 }
}
```

- `frames` controls the playback order.
- `fps` is the playback speed and should usually be between 4 and 12.
- `loop` is `false` for one-shot animations such as `attack`.
- `anchor` is optional normalized positioning metadata (`0` to `1`) for
  placing the character's feet or center consistently.

Use lowercase names and keep each character's frames at the same dimensions.
For a new animation, add its manifest and PNG files beside the other
animations, for example `walk.json` and `walk_1.png`.

The app serves these assets from `/characters/...`; do not import them from
TypeScript. This keeps character packs data-driven and lets the service worker
cache them for offline play.
