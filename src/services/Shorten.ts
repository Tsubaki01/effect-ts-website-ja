import * as KVS from "@effect/platform/KeyValueStore"
import { Effect, Layer } from "effect"
import { VercelOrMemoryKVS as VercelOrMemoryKVSLive } from "./VercelKVS"
import * as Crypto from "node:crypto"
import { ShortenError } from "./Shorten/domain"

const constMaxSize = 128 * 1024

const make = Effect.gen(function* (_) {
  const kvs = yield* KVS.KeyValueStore
  const store = KVS.prefix(kvs, "shorten/")

  const shorten = (thing: string) =>
    Effect.gen(function* (_) {
      if (thing.length > constMaxSize) {
        return yield* new ShortenError({
          reason: "TooLarge",
          method: "shorten"
        })
      }
      const hash = Crypto.createHash("sha256")
        .update(thing)
        .digest("hex")
        .slice(0, 12)
      if (yield* store.has(hash)) {
        return hash
      }
      yield* store.set(hash, thing)
      return hash
    }).pipe(
      Effect.catchIf(
        (err) => err._tag !== "ShortenError",
        (_) =>
          new ShortenError({
            reason: "Unknown",
            method: "shorten"
          })
      )
    )

  const retrieve = (hash: string) =>
    store.get(hash).pipe(
      Effect.mapError(
        (_) =>
          new ShortenError({
            reason: "Unknown",
            method: "retrieve"
          })
      )
    )

  return { shorten, retrieve } as const
})

export class Shorten extends Effect.Tag("app/Shorten")<
  Shorten,
  Effect.Effect.Success<typeof make>
>() {
  static Live = Layer.effect(Shorten, make).pipe(
    Layer.provide(VercelOrMemoryKVSLive)
  )
}
