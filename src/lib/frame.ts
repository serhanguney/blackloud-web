import Tempus from 'tempus';

// Tempus is the only rAF loop. Reads run in the first three slots, writes flush
// last, so a frame never interleaves them and forces a synchronous layout.
//
// Never unsubscribe from inside a Tempus callback. Its dispatch indexes back
// into the callback array it has just filtered, throws, and takes the whole
// loop down with it. Keep the subscription and let it no-op instead.
export const FRAME_ORDER = {
  scroll: 0,
  animation: 100,
  render: 200,
  write: 1000,
} as const;

const writeQueue: (() => void)[] = [];

// The unsubscribe is dropped on purpose, so guard against a module re-eval under
// HMR stacking a second flush that then runs every frame forever.
const FLUSH_KEY = Symbol.for('blackloud.frame.flush');
const registry = globalThis as unknown as Record<symbol, boolean>;

if (!registry[FLUSH_KEY]) {
  Tempus.add(
    () => {
      for (const fn of writeQueue) fn();
      writeQueue.length = 0;
    },
    { order: FRAME_ORDER.write, label: 'frame:write' },
  );
  registry[FLUSH_KEY] = true;
}

export const mutate = <T>(fn: () => T): Promise<T> =>
  new Promise<T>((resolve) => {
    writeQueue.push(() => {
      resolve(fn());
    });
  });
