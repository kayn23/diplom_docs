type Mods = Record<string, boolean | string>;

type ClassNamesOptions = {
  mods?: Mods;
  additional?: string[];
};

export function classNames(
  cls: string,
  options: ClassNamesOptions = {}
): string {
  return [
    cls,
    Object.entries(options.mods || [])
      .filter(([, value]) => !!value)
      .map(([key]) => key),
    ...(options.additional || []),
  ].join(" ");
}
