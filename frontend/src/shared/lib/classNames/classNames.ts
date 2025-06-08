export type Mods = Record<string, boolean | string | undefined>;

type ClassNamesOptions = {
  mods?: Mods;
  additional?: (string | undefined)[];
};

export function classNames(cls: string, options: ClassNamesOptions = {}): string {
  return [
    cls,
    Object.entries(options.mods || [])
      .filter(([, value]) => !!value)
      .map(([key]) => key),
    ...(options.additional || []).filter(Boolean),
  ].join(' ');
}
