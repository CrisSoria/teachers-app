import { Text, type TextProps } from "./ui/text";

interface OlListProps extends Omit<TextProps, "as" | "asChild"> {
  items: (string | { __html: string })[];
}

// con esta funcion verificamos si el string tiene html tags. Recordar que el atributo para aplicar estilos debe ser: class y no className.
const hasHtmlTags = (str: string) => /<[a-z][\s\S]*>/i.test(str);

export function OlList({ items, ...props }: OlListProps) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="shrink-0">{index + 1}.</span>
          <div className="flex-1">
            {typeof item === "string" ? (
              hasHtmlTags(item) ? (
                <Text {...props} dangerouslySetInnerHTML={{ __html: item }} className="inline" />
              ) : (
                <Text {...props} className="inline">{item}</Text>
              )
            ) : (
              <Text {...props} dangerouslySetInnerHTML={item} className="inline" />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
