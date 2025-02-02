export {}

declare global {
	interface Number {
		toRounded(): number
		toFloored(): number
		toCeiled(): number
		toClamped(min: number, max: number): number
		toNegated(): number
		toPadded(maxLength: number): string

		magnitude(): number
	}
}

Object.defineProperty(Number.prototype, "toRounded", {
	value: function (this: number): number {
		return Math.round(this)
	}
})

Object.defineProperty(Number.prototype, "toFloored", {
	value: function (this: number): number {
		return Math.floor(this)
	}
})

Object.defineProperty(Number.prototype, "toCeiled", {
	value: function (this: number): number {
		return Math.ceil(this)
	}
})

Object.defineProperty(Number.prototype, "toClamped", {
	value: function (this: number, min: number, max: number): number {
		return Math.clamp(this, min, max)
	}
})

Object.defineProperty(Number.prototype, "toNegated", {
	value: function (this: number): number {
		return -this
	}
})

Object.defineProperty(Number.prototype, "toPadded", {
	value: function (this: number, maxLength: number): string {
		return this.toString().padStart(maxLength, "0")
	}
})

Object.defineProperty(Number.prototype, "magnitude", {
	value: function (this: number): number {
		return Math.abs(this)
	}
})
