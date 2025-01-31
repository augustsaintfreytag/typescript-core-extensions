export {}

declare global {
	interface Array<T> {
		compact(): NonNullable<T>[]
		compactMap<U>(block: (element: T, index: number, array: T[]) => U | undefined): U[]
		flatMap<U>(block: (element: T, index: number, array: T[]) => U[] | undefined): U[]
		setMap<U>(block: (element: T, index: number, array: T[]) => U | undefined): Set<U>
		mapFirst<U>(block: (element: T, index: number, array: T[]) => U | undefined): U | undefined

		copy(): T[]

		merge(otherArray: T[]): T[]

		remove(predicate: (element: T, index: number, array: T[]) => boolean | undefined): T[]
		removeElement(element: T): T | undefined
		removeAt(index: number): T | undefined

		reversed(): T[]
		sorted(block?: (lhs: T, rhs: T) => number): T[]
		sortedByProperty(block: (value: T) => string | undefined): T[]
		sortedNumerically(): number[]

		indices(): number[]

		get isEmpty(): boolean
		get first(): T | undefined
		get last(): T | undefined

		toSet(): Set<T>

		toChunked(chunkSize: number): T[][]
	}
}

Object.defineProperty(Array.prototype, "isEmpty", {
	get: function <T>(this: T[]): boolean {
		return this.length === 0
	}
})

Object.defineProperty(Array.prototype, "compact", {
	value: function <T>(this: T[]): NonNullable<T>[] {
		return this.filter(element => element !== undefined && element !== null) as NonNullable<T>[]
	}
})

Object.defineProperty(Array.prototype, "compactMap", {
	value: function <T, U>(this: T[], block: (element: T, index: number, array: T[]) => U | undefined): NonNullable<U>[] {
		const elements: NonNullable<U>[] = []

		this.forEach((element, index) => {
			const mappedElement = block(element, index, this)

			if (mappedElement === undefined || mappedElement === null) {
				return
			}

			elements.push(mappedElement as NonNullable<U>)
		})

		return elements
	}
})

Object.defineProperty(Array.prototype, "flatMap", {
	value: function <T, U>(this: T[], block: (element: T, index: number, array: T[]) => U[] | undefined): U[] {
		const elements: U[] = []

		this.forEach((element, index) => {
			const mappedCollection = block(element, index, this)

			if (mappedCollection === undefined || mappedCollection === null || mappedCollection.isEmpty) {
				return
			}

			elements.push(...mappedCollection)
		})

		return elements
	}
})

Object.defineProperty(Array.prototype, "setMap", {
	value: function <T, U>(this: T[], block: (element: T, index: number, array: T[]) => U | undefined): Set<U> {
		const set = new Set<U>()

		for (const [index, value] of this.entries()) {
			const mappedValue = block(value, index, this)

			if (mappedValue !== undefined) {
				set.add(mappedValue)
			}
		}

		return set
	}
})

Object.defineProperty(Array.prototype, "mapFirst", {
	value: function <T, U>(this: T[], block: (element: T, index: number, array: T[]) => U | undefined): U | undefined {
		for (const [index, value] of this.entries()) {
			const mappedValue = block(value, index, this)

			if (mappedValue !== undefined) {
				return mappedValue
			}
		}

		return undefined
	}
})

Object.defineProperty(Array.prototype, "copy", {
	value: function <T>(this: T[]): T[] {
		return this.slice()
	}
})

Object.defineProperty(Array.prototype, "merge", {
	value: function <T>(this: T[], otherArray: T[]): T[] {
		this.push(...otherArray)
		return this
	}
})

Object.defineProperty(Array.prototype, "remove", {
	value: function <T>(this: T[], predicate: (element: T, index: number, array: T[]) => boolean | undefined): T[] {
		const removedElements: T[] = []

		for (const index of this.indices().reversed()) {
			if (predicate(this[index], index, this)) {
				removedElements.push(...this.splice(index, 1))
			}
		}

		return removedElements
	}
})

Object.defineProperty(Array.prototype, "removeElement", {
	value: function <T>(this: T[], element: T): T | undefined {
		return this.remove(elementToCheck => elementToCheck === element).first
	}
})

Object.defineProperty(Array.prototype, "removeAt", {
	value: function <T>(this: T[], index: number): T | undefined {
		return this.splice(index, 1).first
	}
})

Object.defineProperty(Array.prototype, "reversed", {
	value: function <T>(this: T[]): T[] {
		return [...this].reverse()
	}
})

Object.defineProperty(Array.prototype, "sorted", {
	value: function <T>(this: T[], block?: (lhs: T, rhs: T) => number): T[] {
		return [...this].sort(block)
	}
})

Object.defineProperty(Array.prototype, "sortedByProperty", {
	value: function <T>(this: T[], block: (value: T) => string | undefined): T[] {
		return this.sorted((lhs, rhs) => {
			const [lhsv, rhsv] = [block(lhs), block(rhs)]

			if (lhsv === undefined || rhsv === undefined) {
				return 0
			}

			if (lhsv < rhsv) {
				return -1
			}

			if (lhsv > rhsv) {
				return 1
			}

			return 0
		})
	}
})

Object.defineProperty(Array.prototype, "sortedNumerically", {
	value: function <T>(this: T[]): number[] {
		return this.map(Number).sorted((lhs, rhs) => {
			if (lhs < rhs) {
				return -1
			}

			if (lhs > rhs) {
				return 1
			}

			return 0
		})
	}
})

Object.defineProperty(Array.prototype, "indices", {
	value: function <T>(this: T[]): number[] {
		return this.reduce((indices: number[], _, index: number) => {
			indices.push(index)
			return indices
		}, [])
	}
})

Object.defineProperty(Array.prototype, "first", {
	get: function <T>(this: T[]) {
		return this[0]
	}
})

Object.defineProperty(Array.prototype, "last", {
	get: function <T>(this: T[]) {
		return this[this.length - 1]
	}
})

Object.defineProperty(Array.prototype, "toSet", {
	value: function <T>(this: T[]): Set<T> {
		return new Set(this)
	}
})

Object.defineProperty(Array.prototype, "toChunked", {
	value: function <T>(this: T[], chunkSize: number): T[][] {
		const chunks: T[][] = []

		for (const index of this.indices()) {
			if (index % chunkSize === 0) {
				chunks.push([])
			}

			chunks.last!.push(this[index])
		}

		return chunks
	}
})
