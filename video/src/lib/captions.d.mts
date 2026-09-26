export type Caption = { start: number; end: number; text: string };
export function chunk(text: string, max: number): string[];
export function captionChunks(cues: { vo: { id: string; at: number; slot: number; caption: string; burn?: boolean }[] }, manifest: Record<string, { sec: number }>, max: number, opts?: { burnedOnly?: boolean }): Caption[];
