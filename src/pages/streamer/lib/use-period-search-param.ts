import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ALL_AVAILABLE_PERIODS, Period } from 'shared/types'

export const usePeriodSearchParam = (): Period => {
    const [period, setPeriod] = useState<Period>('week')
    const [searchParams, _] = useSearchParams()

    const getPeriodFromSearchParams = useCallback(() => {
        const searchPeriod = searchParams.get('period')
        if (searchPeriod == null || !ALL_AVAILABLE_PERIODS.includes(searchPeriod)) {
            return 'week'
        }

        return searchPeriod as Period
    }, [searchParams])

    useEffect(() => {
        setPeriod(getPeriodFromSearchParams())
    }, [getPeriodFromSearchParams, searchParams])

    return period
}
