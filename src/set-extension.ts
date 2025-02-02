export {}

declare global {
	interface Set<T> {
		get isEmpty(): boolean

		intersects<T>(otherSet: Set<T>): boolean
		disjoint<T>(otherSet: Set<T>): boolean
		equals<T>(otherSet: Set<T>): boolean

		isSubset<T>(otherSet: Set<T>): boolean
		isStrictSubset<T>(otherSet: Set<T>): boolean
		isSuperset<T>(otherSet: Set<T>): boolean
		isStrictSuperset<T>(otherSet: Set<T>): boolean

		map<U>(block: (element: T, set: Set<T>) => U): U[]
		flatMap<U>(block: (element: T, set: Set<T>) => U[]): U[]
		compactMap<U>(block: (element: T, set: Set<T>) => U | undefined): NonNullable<U>[]
		filter(block: (element: T, set: Set<T>) => boolean): Set<T>
		reduce<U>(block: (reducedValue: U, element: T, set: Set<T>) => U, initialValue: U): U

		subtract<T>(otherSet: Set<T>): Set<T>
		union<T>(otherSet: Set<T>): Set<T>
		intersect<T>(otherSet: Set<T>): Set<T>
		symmetricDifference<T>(otherSet: Set<T>): Set<T>
		truncate<T>(): Set<T>

		formSubtraction<T>(otherSet: Set<T>): Set<T>
		formUnion<T>(otherSet: Set<T>): Set<T>
		formIntersection<T>(otherSet: Set<T>): Set<T>
		formSymmetricDifference<T>(otherSet: Set<T>): Set<T>

		sorted(): T[]
		sorted(block: (lhs: T, rhs: T) => number): T[]

		copy(): Set<T>

		toArray(): T[]
		toString(): string
	}
}

Object.defineProperty(Set.prototype, "isEmpty", {
	get: function <T>(this: Set<T>): boolean {
		return this.size === 0
	}
})

Object.defineProperty(Set.prototype, "intersects", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): boolean {
		for (const value of this) {
			if (otherSet.has(value)) {
				return true
			}
		}

		return false
	}
})

Object.defineProperty(Set.prototype, "disjoint", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): boolean {
		for (const value of this) {
			if (otherSet.has(value)) {
				return false
			}
		}

		for (const value of otherSet) {
			if (this.has(value)) {
				return false
			}
		}

		return true
	}
})

Object.defineProperty(Set.prototype, "equals", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): boolean {
		if (this.size !== otherSet.size) {
			return false
		}

		for (const element of this) {
			if (!otherSet.has(element)) {
				return false
			}
		}

		return true
	}
})

Object.defineProperty(Set.prototype, "isSubset", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): boolean {
		for (const value of this) {
			if (!otherSet.has(value)) {
				return false
			}
		}

		return true
	}
})

Object.defineProperty(Set.prototype, "isStrictSubset", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): boolean {
		return this.size < otherSet.size && this.isSubset(otherSet)
	}
})

Object.defineProperty(Set.prototype, "isSuperset", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): boolean {
		return otherSet.isSubset(this)
	}
})

Object.defineProperty(Set.prototype, "isStrictSuperset", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): boolean {
		return this.size > otherSet.size && this.isSuperset(otherSet)
	}
})

Object.defineProperty(Set.prototype, "map", {
	value: function <T, U>(this: Set<T>, block: (element: T, set: Set<T>) => U): U[] {
		return this.reduce<U[]>((mappedValues, element) => {
			mappedValues.push(block(element, this))
			return mappedValues
		}, [])
	}
})

Object.defineProperty(Set.prototype, "flatMap", {
	value: function <T, U>(this: Set<T>, block: (element: T, set: Set<T>) => U[]): U[] {
		return this.reduce<U[]>((mappedValues, element) => {
			mappedValues.push(...block(element, this))
			return mappedValues
		}, [])
	}
})

Object.defineProperty(Set.prototype, "compactMap", {
	value: function <T, U>(this: Set<T>, block: (element: T, set: Set<T>) => U): NonNullable<U>[] {
		const mappedValues: NonNullable<U>[] = []

		this.forEach(element => {
			const mappedValue = block(element, this)

			if (mappedValue === undefined || mappedValue === null) {
				return
			}

			mappedValues.push(mappedValue as NonNullable<U>)
		})

		return mappedValues
	}
})

Object.defineProperty(Set.prototype, "filter", {
	value: function <T>(this: Set<T>, block: (element: T, set: Set<T>) => boolean): Set<T> {
		const filteredSet = new Set<T>()

		this.forEach(element => {
			if (block(element, this)) {
				filteredSet.add(element)
			}
		})

		return filteredSet
	}
})

Object.defineProperty(Set.prototype, "reduce", {
	value: function <T, U>(this: Set<T>, block: (reducedValue: U, element: T, set: Set<T>) => U, initialValue: U): U {
		let reducedValue = initialValue

		for (const element of this) {
			reducedValue = block(reducedValue, element, this)
		}

		return reducedValue
	}
})

Object.defineProperty(Set.prototype, "subtract", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		for (const value of otherSet) {
			this.delete(value)
		}

		return this
	}
})

Object.defineProperty(Set.prototype, "union", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		for (const value of otherSet) {
			this.add(value)
		}

		return this
	}
})

Object.defineProperty(Set.prototype, "intersect", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		for (const value of this) {
			if (!otherSet.has(value)) {
				this.delete(value)
			}
		}

		return this
	}
})

Object.defineProperty(Set.prototype, "symmetricDifference", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		const intersection = new Set(this).intersect(otherSet)
		this.union(otherSet).subtract(intersection)

		return this
	}
})

Object.defineProperty(Set.prototype, "formSubtraction", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		return new Set<T>(this).subtract(otherSet)
	}
})

Object.defineProperty(Set.prototype, "formUnion", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		return new Set<T>(this).union(otherSet)
	}
})

Object.defineProperty(Set.prototype, "formIntersection", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		return new Set<T>(this).intersect(otherSet)
	}
})

Object.defineProperty(Set.prototype, "formSymmetricDifference", {
	value: function <T>(this: Set<T>, otherSet: Set<T>): Set<T> {
		return new Set<T>(this).symmetricDifference(otherSet)
	}
})

Object.defineProperty(Set.prototype, "sorted", {
	value: function <T>(this: Set<T>, block?: (lhs: T, rhs: T) => number): T[] {
		return [...this.values()].sort(block)
	}
})

Object.defineProperty(Set.prototype, "copy", {
	value: function <T>(this: Set<T>): Set<T> {
		return new Set<T>(this)
	}
})

Object.defineProperty(Set.prototype, "toArray", {
	value: function <T>(this: Set<T>): T[] {
		return [...this.values()]
	}
})

Object.defineProperty(Set.prototype, "toString", {
	value: function <T>(this: Set<T>): string {
		return this.map(String).join(", ")
	}
})
