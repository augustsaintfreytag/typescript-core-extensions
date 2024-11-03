export {}

declare global {
	interface Math {
		clamp(value: number, min: number, max: number): number
	}
}

Object.defineProperty(Math, "clamp", {
	value: function (value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max)
	}
})
