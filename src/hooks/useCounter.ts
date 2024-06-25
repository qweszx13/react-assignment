import { useState } from "react"

type CountDown = () => void
type CountUp = () => void

type Feature = {
    // count: number
    countDown: CountDown
    countUp: CountUp
}
export const useCounter = (): Feature => {
    const [value, setValue] = useState(0)
    const count = value
    const countUp = () => setValue(previous => previous + 1)
    const countDown = () => setValue(previous => previous - 1)

    return ({
        // count,
        countDown,
        countUp,
    })
}