import {removeElemById} from './array'

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
