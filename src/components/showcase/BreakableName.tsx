import { Fragment } from "react";

/** Names longer than this get a smaller display size on the project page */
export const LONG_NAME = 14;

/**
 * A project name that may wrap only after "_" or "&", so "Find&Filter_Tenders-Afg"
 * breaks as "Find&Filter_ / Tenders-Afg" instead of inside a word.
 */
export function BreakableName({ name }: { name: string }) {
  const parts = name.split(/(?<=[_&])/);
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${index}-${part}`}>
          {index > 0 && <wbr />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
