type Props = {
  id: string;
  title: string;
  /** Right-hand note, e.g. "Android · iOS" */
  note: string;
  count?: number;
};

/** "03" style count for a shelf */
function padCount(count: number): string {
  return String(count).padStart(2, "0");
}

export function ShelfHead({ id, title, note, count }: Props) {
  const meta = count === undefined ? note : `${note} · ${padCount(count)}`;
  return (
    <div className="shelf-head">
      <h2 id={id}>{title}</h2>
      <p className="label m-0">{meta}</p>
    </div>
  );
}
