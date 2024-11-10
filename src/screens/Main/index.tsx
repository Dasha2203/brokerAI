'use client';
import { useAppSelector } from "@/hooks/redux"

const Main = () => {
  const {tickers} = useAppSelector((state) => state.tickerReducer)
  return (
    <div>
      {tickers.length ? 'MANY': 'NONR'}
    </div>
  )
}

export default Main