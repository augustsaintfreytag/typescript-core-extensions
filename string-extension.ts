export {}

declare global {
	interface String {
		get isEmpty(): boolean
		get first(): string | undefined
		get last(): string | undefined

		indices(): number[]

		unshift(substring: string): string
		push(substring: string): string

		toCapitalized(): string
		toTruncated(maxLength: number): string
	}
}

Object.defineProperty(String.prototype, "isEmpty", {
	get: function (this: string) {
		return this.length === 0
	}
})

Object.defineProperty(String.prototype, "first", {
	get: function (this: string) {
		return this[0]
	}
})

Object.defineProperty(String.prototype, "last", {
	get: function (this: string) {
		return this[this.length - 1]
	}
})

Object.defineProperty(String.prototype, "indices", {
	value: function (this: string): number[] {
		return Array.from(this).indices()
	}
})

Object.defineProperty(String.prototype, "unshift", {
	value: function (this: string, substring: string) {
		return substring + this
	}
})

Object.defineProperty(String.prototype, "push", {
	value: function (this: string, substring: string) {
		return this + substring
	}
})

Object.defineProperty(String.prototype, "toCapitalized", {
	value: function (this: string): string {
		return this.substring(0, 1).toUpperCase() + this.substring(1)
	}
})

Object.defineProperty(String.prototype, "toTruncated", {
	value: function (this: string, maxLength: number): string {
		if (this.length <= maxLength) {
			return this
		}

		return this.substring(0, maxLength) + "…"
	}
})
