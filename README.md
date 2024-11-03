*(Artwork pending)*

# TypeScript Core Extensions

An assortment of extensions to TypeScript core types `Number`, `String`, `Array`, `Set`, and other types to drastically improve DX in everyday operations. Inspired by Swift.

## Installation

The included modules are raw TypeScript source files, intended to be either dropped into a project directly or installed as a submodule into a suitable location. It is recommended to define a convenience import module that imports all of the extensions and import this module *once* at the root of your projects. This library mutates built-in types and adds to their functionality directly.

## Features

The extension modules add the following convenience methods. Existing methods are not modified.

### String Type
  - `isEmpty: boolean`
  - `first: string | undefined`
  - `last: string | undefined`
  - `indices(): number[]`
  - `unshift(substring: string): string`
  - `push(substring: string): string`
  - `toCapitalized(): string`
  - `toTruncated(maxLength: number): string`

### Number Type
  - `toRounded(): number`
  - `toFloored(): number`
  - `toCeiled(): number`
  - `toClamped(min: number, max: number): number`
  - `toNegated(): number`
  - `toPadded(maxLength: number): string`
  - `magnitude(): number`

### Array Extension
  - `compact()`
  - `compactMap<U>(block: (element: T, index: number, array: T[]) => U | undefined): NonNullable<U>[]`
  - `flatMap<U>(block: (element: T, index: number, array: T[]) => U[] | undefined): U[]`
  - `setMap<U>(block: (element: T, index: number, array: T[]) => U | undefined): Set<U>`
  - `mapFirst<U>(block: (element: T, index: number, array: T[]) => U | undefined): U | undefined`
  - `copy(): T[]`
  - `merge(otherArray: T[]): T[]`
  - `remove(predicate: (element: T, index: number, array: T[]) => boolean | undefined): T[]`
  - `removeElement(element: T): T | undefined`
  - `removeAt(index: number): T | undefined`
  - `reversed(): T[]`
  - `sorted(block?: (lhs: T, rhs: T) => number): T[]`
  - `sortedByProperty(block: (value: T) => string | undefined): T[]`
  - `sortedNumerically(): number[]`
  - `indices(): number[]`
  - `isEmpty: boolean`
  - `first: T | undefined`
  - `last: T | undefined`
  - `toSet(): Set<T>`
  - `toChunked(chunkSize: number): T[][]`

### Map Extension
  - `isEmpty: boolean`
  - `toKeys(): K[]`
  - `toKeySet(): Set<K>`
  - `toValues(): V[]`
  - `toEntries(): KeyValueTuple<K, V>[]`
  - `includes(value: V): boolean`
  - `find(predicate: PredicateBlock<K, V>): KeyValueTuple<K, V> | VoidTuple`
  - `findKey(predicate: PredicateBlock<K, V>): K | undefined`
  - `filter(predicate: PredicateBlock<K, V>): Map<K, V>`
  - `remove(predicate: PredicateBlock<K, V>): Map<K, V>`
  - `copy(block?: (map: Map<K, V>) => void): Map<K, V>`

### Set Type
  - `isEmpty: boolean`
  - `intersects(otherSet: Set<T>): boolean`
  - `disjoint(otherSet: Set<T>): boolean`
  - `equals(otherSet: Set<T>): boolean`
  - `isSubset(otherSet: Set<T>): boolean`
  - `isStrictSubset(otherSet: Set<T>): boolean`
  - `isSuperset(otherSet: Set<T>): boolean`
  - `isStrictSuperset(otherSet: Set<T>): boolean`
  - `map<U>(block: (element: T, set: Set<T>) => U): U[]`
  - `flatMap<U>(block: (element: T, set: Set<T>) => U[]): U[]`
  - `compactMap<U>(block: (element: T, set: Set<T>) => U | undefined): NonNullable<U>[]`
  - `filter(block: (element: T, set: Set<T>) => boolean): Set<T>`
  - `reduce<U>(block: (reducedValue: U, element: T, set: Set<T>) => U, initialValue: U): U`
  - `subtract(otherSet: Set<T>): Set<T>`
  - `union(otherSet: Set<T>): Set<T>`
  - `intersect(otherSet: Set<T>): Set<T>`
  - `symmetricDifference(otherSet: Set<T>): Set<T>`
  - `formSubtraction(otherSet: Set<T>): Set<T>`
  - `formUnion(otherSet: Set<T>): Set<T>`
  - `formIntersection(otherSet: Set<T>): Set<T>`
  - `formSymmetricDifference(otherSet: Set<T>): Set<T>`
  - `sorted(block?: (lhs: T, rhs: T) => number): T[]`
  - `copy(): Set<T>`
  - `toArray(): T[]`
  - `toString(): string`

### Math Extension
  - `clamp(value: number, min: number, max: number): number`

### Regular Expression
  - `execAll(value: string): RegExpExecArray[]`

## License

This library was written by August Saint Freytag and is released and distributed under the MIT License. It may be used for non-commercial and commercial projects without limitations. It may also be shared, modified, or redistributed with basic attribution.