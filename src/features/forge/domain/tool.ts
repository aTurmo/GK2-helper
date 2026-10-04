export type Tool =
  | { readonly mode: 'select' }
  | { readonly mode: 'place'; readonly kindId: string }
  | { readonly mode: 'erase' }

export const SELECT_TOOL: Tool = { mode: 'select' }
export const ERASE_TOOL: Tool = { mode: 'erase' }
