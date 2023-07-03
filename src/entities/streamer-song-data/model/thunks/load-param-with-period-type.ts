import { Period } from 'shared/types'
import { LoadParamType } from './load-param-type'

export interface LoadParamWithPeriodType extends LoadParamType {
    period: Period
}
