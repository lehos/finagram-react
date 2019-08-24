import {removeElem, removeElemById, arrayToMap, arrayToMapDeep} from './array'

describe('arrayToMap', () => {
  test('makes hash map from array', () => {
    const arr = [{id: '1'}, {id: '2'}]
    const exp = {'1': {id: '1'}, '2': {id: '2'}}

    expect(arrayToMap(arr)).toEqual(exp)
  })

  test('with custom id field', () => {
    const arr = [{pid: '1'}, {pid: '2'}]
    const exp = {'1': {pid: '1'}, '2': {pid: '2'}}

    expect(arrayToMap(arr, 'pid')).toEqual(exp)
  })
})

describe('arrayToMapDeep', () => {
  test('makes hash map from nested array', () => {
    const arr = [{id: '1'}, {id: '2', children: [{id: '3'}]}]
    const exp = {
      '1': {id: '1'},
      '2': {id: '2', children: [{id: '3'}]},
      '3': {id: '3'}
    }

    expect(arrayToMapDeep(arr)).toEqual(exp)
  })
})

describe('removeElemById', () => {
  test('removes elem in flat array', () => {
    const arr = [{id: '1'}, {id: '2'}]
    expect(removeElemById(arr, '2')).toEqual(true)
    expect(arr).toEqual([{id: '1'}])
  })

  test('removes elem in deep level', () => {
    const arr = [{id: '1'}, {id: '2', children: [{id: '3'}]}]
    const expArr = [{id: '1'}, {id: '2'}]
    expect(removeElemById(arr, '3')).toEqual(true)
    expect(arr).toEqual(expArr)
  })

  test('removes nested elem at first level', () => {
    const arr = [{id: '1'}, {id: '2', children: [{id: '3'}]}]
    const expArr = [{id: '1'}]
    expect(removeElemById(arr, '2')).toEqual(true)
    expect(arr).toEqual(expArr)
  })

  test('removes flat elem at first level', () => {
    const arr = [{id: '1'}, {id: '2', children: [{id: '3'}]}]
    const expArr = [{id: '2', children: [{id: '3'}]}]
    expect(removeElemById(arr, '1')).toEqual(true)
    expect(arr).toEqual(expArr)
  })

  test('do nothing if elem not found', () => {
    const arr = [{id: '1'}, {id: '2', children: [{id: '3'}]}]
    const exp = [{id: '1'}, {id: '2', children: [{id: '3'}]}]
    expect(removeElemById(arr, '1234')).toEqual(false)
    expect(arr).toEqual(exp)
  })
})

describe('removeElem', () => {
  test('removes elem by link', () => {
    const obj = {id: '2'}
    const arr = [{id: '1'}, obj]
    const exp = [{id: '1'}]

    const res = removeElem(arr, {el: obj})
    expect(res).toBe(true)
    expect(arr).toEqual(exp)
  })

  test('removes elem with clb', () => {
    const arr = [{id: '1'}, {id: '2'}]
    const exp = [{id: '1'}]

    const res = removeElem(arr, {clb: el => el.id === '2'})
    expect(res).toBe(true)
    expect(arr).toEqual(exp)
  })

  test('do nothing when elem not found', () => {
    const arr = [{id: '1'}, {id: '2'}]
    const exp = [{id: '1'}, {id: '2'}]

    const res = removeElem(arr, {clb: el => el.id === '3'})
    expect(res).toBe(false)
    expect(arr).toEqual(exp)
  })

  test('do nothing when no param', () => {
    const arr = [{id: '1'}, {id: '2'}]
    const exp = [{id: '1'}, {id: '2'}]

    const res = removeElem(arr, {})
    expect(res).toBe(false)
    expect(arr).toEqual(exp)
  })
})
