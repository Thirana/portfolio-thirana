import { isValidElement, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodeToggle from "@/components/CodeToggle";
import Diagram from "@/components/Diagram";
import Callout from "@/components/Callout";
import GuideMap from "@/components/GuideMap";
import MoreDetail from "@/components/MoreDetail";
import Part from "@/components/Part";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return getTextContent(props.children);
  }

  return "";
}

function extractMermaidChart(children: ReactNode): string | null {
  if (!isValidElement(children)) {
    return null;
  }

  const props = children.props as {
    className?: string;
    "data-language"?: string;
    children?: ReactNode;
  };
  const className = typeof props.className === "string" ? props.className : "";
  const dataLang = props["data-language"];

  if (
    !className.split(/\s+/).includes("language-mermaid") &&
    dataLang !== "mermaid"
  ) {
    return null;
  }

  return getTextContent(props.children).trim();
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ className, ...props }) => (
      <a
        className={`text-gl-primary underline decoration-gl-primary/35 underline-offset-[3px] transition-colors hover:text-gl-primary-hover hover:decoration-current ${
          className ?? ""
        }`}
        {...props}
      />
    ),
    img: ({ className, alt = "", ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`rounded-[14px] shadow-gl ${className ?? ""}`}
        alt={alt}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={`card mt-2 mb-6 border-0 px-5 py-4 font-normal not-italic text-gl-text [&>p]:m-0 [&>p+p]:mt-3 [&>p]:before:content-none [&>p]:after:content-none ${
          className ?? ""
        }`}
        {...props}
      />
    ),
    pre: ({ children, className, ...props }) => {
      const chart = extractMermaidChart(children);

      if (chart) {
        return <MermaidDiagram chart={chart} className={className} />;
      }

      return (
        <pre
          className={`not-prose card my-6 overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed ${className ?? ""}`}
          {...props}
        >
          {children}
        </pre>
      );
    },
    table: ({ className, ...props }) => (
      <div className="mdx-table not-prose my-6 overflow-x-auto rounded-[14px] bg-gl-surface shadow-gl [scrollbar-width:thin]">
        <table
          className={`w-full border-collapse sm:min-w-[36rem] font-sans text-[14px] leading-[1.5] [&_code]:whitespace-nowrap [&_td]:border-t [&_td]:border-gl-border [&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-gl-text-muted sm:[&_td:first-child]:min-w-[8rem] [&_td:first-child]:text-gl-text [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-medium [&_th]:text-gl-text ${
            className ?? ""
          }`}
          {...props}
        />
      </div>
    ),
    CodeToggle,
    Diagram,
    Callout,
    GuideMap,
    MoreDetail,
    Part,
    ...components,
  };
}
