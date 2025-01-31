export {}

type KeyValueTuple<K, V> = [key: K, value: V]
type VoidTuple = [undefined, undefined]
type PredicateBlock<K, V> = (value: V, key: K, map: Map<K, V>) => boolean

declare global {
	interface Map<K, V> {
		get isEmpty(): boolean

		toKeys(): K[]
		toKeySet(): Set<K>
		toValues(): V[]
		toEntries(): KeyValueTuple<K, V>[]

		includes: (value: V) => boolean
		find: (predicate: PredicateBlock<K, V>) => KeyValueTuple<K, V> | VoidTuple
		findKey: (predicate: PredicateBlock<K, V>) => K | undefined
		filter: (predicate: PredicateBlock<K, V>) => Map<K, V>
		remove: (predicate: PredicateBlock<K, V>) => Map<K, V>
		copy: (block?: (map: Map<K, V>) => void) => Map<K, V>
	}
}

Object.defineProperty(Map.prototype, "isEmpty", {
	get: function <K, V>(this: Map<K, V>): boolean {
		return this.size === 0
	}
})

Object.defineProperty(Map.prototype, "toKeys", {
	value: function <K, V>(this: Map<K, V>): K[] {
		return Array.from(this.keys())
	}
})

Object.defineProperty(Map.prototype, "toKeySet", {
	value: function <K, V>(this: Map<K, V>): Set<K> {
		return new Set(this.keys())
	}
})

Object.defineProperty(Map.prototype, "toValues", {
	value: function <K, V>(this: Map<K, V>): V[] {
		return Array.from(this.values())
	}
})

Object.defineProperty(Map.prototype, "toEntries", {
	value: function <K, V>(this: Map<K, V>): KeyValueTuple<K, V>[] {
		return Array.from(this.entries())
	}
})

Object.defineProperty(Map.prototype, "includes", {
	value: function <K, V>(this: Map<K, V>, value: V): boolean {
		for (const currentValue of this.values()) {
			if (currentValue === value) {
				return true
			}
		}

		return false
	}
})

Object.defineProperty(Map.prototype, "find", {
	value: function <K, V>(this: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): KeyValueTuple<K, V> | VoidTuple {
		for (const [key, value] of this) {
			if (predicate(value, key, this)) {
				return [key, value]
			}
		}

		return [undefined, undefined]
	}
})

Object.defineProperty(Map.prototype, "findKey", {
	value: function <K, V>(this: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): K | undefined {
		for (const [key, value] of this) {
			if (predicate(value, key, this)) {
				return key
			}
		}

		return undefined
	}
})

Object.defineProperty(Map.prototype, "filter", {
	value: function <K, V>(this: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): Map<K, V> {
		const mutableMap = new Map<K, V>()

		for (const [key, value] of this) {
			if (predicate(value, key, this)) {
				mutableMap.set(key, value)
			}
		}

		return mutableMap
	}
})

Object.defineProperty(Map.prototype, "remove", {
	value: function <K, V>(this: Map<K, V>, predicate: (value: V, key: K, map: Map<K, V>) => boolean): Map<K, V> {
		for (const [key, value] of this) {
			if (!predicate(value, key, this)) {
				this.delete(key)
			}
		}

		return this
	}
})

Object.defineProperty(Map.prototype, "copy", {
	value: function <K, V>(this: Map<K, V>, block?: (map: Map<K, V>) => void): Map<K, V> {
		const mutableMap = new Map(this.entries())

		if (block) {
			block(mutableMap)
		}

		return mutableMap
	}
})
