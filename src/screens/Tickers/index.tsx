'use client';
import PageContainer from "@/components/ui/PageContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchTickers } from "@/store/reducers/TickerSlice/actionCreators";
import { useEffect } from "react";

const Tickers = () => {
    const dispatch = useAppDispatch();
    const { tickers } = useAppSelector(state => state.tickerReducer);

    useEffect(() => {
        console.log('here 4')
        dispatch(fetchTickers());
    }, [])

    return (
        <PageContainer>
            {tickers.length ? 'yes': 'none'}
        </PageContainer>
    )
}

export default Tickers;