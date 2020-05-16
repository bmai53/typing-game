// Return a CSS HSL string
export const hsl = value => {
    const percent = Math.min(120, value+20)
    return (
        `hsl(${percent}, 100%, 50%)`
    )
}
