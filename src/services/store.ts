import {currencyStore} from '@/domains/currency';
import {accountStore} from '@/domains/account';
import {classifierStore} from '@/domains/classifier';

export function initStores() {
  currencyStore.init()
  accountStore.init()
  classifierStore.init()
}
