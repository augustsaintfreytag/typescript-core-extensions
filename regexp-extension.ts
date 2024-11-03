export {}

declare global {
	interface RegExp {
		execAll(value: string): RegExpExecArray[]
	}
}

Object.defineProperty(RegExp.prototype, "execAll", {
	value: function (this: RegExp, value: string): RegExpExecArray[] {
		const matches: RegExpExecArray[] = []

		let match: RegExpExecArray | null

		while ((match = this.exec(value))) {
			matches.push(match)
		}

		return matches
	}
})
