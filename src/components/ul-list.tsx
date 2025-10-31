import { Text, type TextProps } from "./ui/text";

interface UlListProps extends Omit<TextProps, "as" | "asChild"> {
  items: (string | { __html: string })[];
}

export function UlList({ items, ...props }: UlListProps) {
  return (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === "string" ? (
            <Text {...props} dangerouslySetInnerHTML={{ __html: item }} />
          ) : (
            <Text {...props} dangerouslySetInnerHTML={item} />
          )}
        </li>
      ))}
    </ul>
  );
}
