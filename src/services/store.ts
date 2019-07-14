import {accountStore} from '@/domains/account';
import {classifierStore} from '@/domains/classifier';

export function initStores() {
  accountStore.init()
  classifierStore.init()
}
