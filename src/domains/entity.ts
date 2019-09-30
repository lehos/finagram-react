export type Tree<T extends Tree = {id: string; children?: Tree[]}> = {
  id: string
  children?: T[]
}
