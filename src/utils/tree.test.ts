import { Dict, TreeItem, Tree } from '@/domains/entity'
import { makeTreeFromMap } from './tree'

describe(makeTreeFromMap.name, () => {
  test('makes nested array from map', () => {
    const map: Dict<TreeItem> = {
      '1': { id: '1', parentId: null },
      '12': { id: '12', parentId: '1' },
      '123': { id: '123', parentId: '12' },
      '2': { id: '2', parentId: null }
    }
    const exp: Tree = [
      {
        id: '1',
        parentId: null,
        children: [
          {
            id: '12',
            parentId: '1',
            children: [{ id: '123', parentId: '12' }]
          }
        ]
      },
      { id: '2', parentId: null }
    ]

    expect(makeTreeFromMap(map)).toEqual(exp)
  })
})
