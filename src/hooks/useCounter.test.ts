import { renderHook } from "@testing-library/react"
import { useCounter } from "./useCounter"
import { act } from "react-dom/test-utils"

describe("useCounter", () => {
    // 初回レンダリング時 => countが0
    test("初期値が0であること", () => {
        const { result } = renderHook(() => useCounter())

        expect(result.current.count).toBe(0)
    })

    //CountUpした回数によってCountの値が増加する　CountUp３　→ Count＝３
    test("CounterUpした回数がCountの値になる",()=>{
    //   for(let i = 0; i < 3; i++){
    //     useCounter() ;
    //   }
      const { result } = renderHook(() => useCounter())

      act(() => {
        // forにしてもいいかも！
        result.current.countUp()
        result.current.countUp()
        result.current.countUp()
      })

      expect(result.current.count).toBe(3)
    })
    

})
