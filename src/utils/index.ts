export function arrayToMap<T extends {id: string}>(obj: T[]): Record<string, T> {
  return obj.reduce((acc: {[key: string]: T}, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})
}
