import {fakePromise} from '@/domains/api';

import {currencyMocks} from './mocks';
import {Currency} from './currency';

export function getList(): Promise<Currency[]> {
  return fakePromise(currencyMocks)
}
