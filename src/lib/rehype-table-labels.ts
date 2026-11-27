/**
 * Copies each table's header text onto its body cells as `data-label`, so on
 * phones the CSS can stack every row into a block and still name each value
 * (see `.mdx-table` in globals.css). Wide tables then read top to bottom
 * instead of scrolling sideways.
 */

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

function findAll(node: HastNode, tagName: string, out: HastNode[] = []) {
  for (const child of node.children ?? []) {
    if (child.type !== "element") continue;
    if (child.tagName === tagName) out.push(child);
    // Do not descend into a nested table; it gets its own pass.
    if (child.tagName !== "table") findAll(child, tagName, out);
  }
  return out;
}

function labelTable(table: HastNode) {
  const headerRow = findAll(table, "thead")[0];
  if (!headerRow) return;
  const labels = findAll(headerRow, "th").map((th) => textOf(th).trim());

  for (const body of findAll(table, "tbody")) {
    for (const row of findAll(body, "tr")) {
      const cells = (row.children ?? []).filter(
        (c) => c.type === "element" && c.tagName === "td",
      );
      cells.forEach((cell, i) => {
        const label = labels[i];
        if (label) cell.properties = { ...cell.properties, dataLabel: label };
      });
    }
  }
}

function walk(node: HastNode) {
  if (node.type === "element" && node.tagName === "table") labelTable(node);
  for (const child of node.children ?? []) walk(child);
}

export default function rehypeTableLabels() {
  return (tree: HastNode) => {
    walk(tree);
  };
}
