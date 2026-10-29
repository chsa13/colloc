import { useMemo } from 'react';
import katex from 'katex';
import { marked } from 'marked';

// Markdown + формулы. Сначала вырезаем формулы в заглушки, чтобы Markdown не трогал
// подчёркивания и звёздочки внутри LaTeX, потом рендерим Markdown и вставляем KaTeX.
const cache = new Map<string, string>();

export function renderMd(src: string, inline = false): string {
  const key = (inline ? 'i:' : 'b:') + src;
  const hit = cache.get(key);
  if (hit) return hit;

  const math: string[] = [];
  const stash = (tex: string, display: boolean) => {
    let html: string;
    try {
      html = katex.renderToString(tex.trim(), { displayMode: display, throwOnError: false });
    } catch {
      html = `<code>${tex}</code>`;
    }
    math.push(html);
    return `KTXMATH${math.length - 1}KTX`;
  };

  let text = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => stash(t, true));
  text = text.replace(/\$([^$\n]+?)\$/g, (_, t) => stash(t, false));

  let html = inline ? (marked.parseInline(text) as string) : (marked.parse(text) as string);
  html = html.replace(/KTXMATH(\d+)KTX/g, (_, i) => math[Number(i)]);
  // Ссылки внутри сайта пишутся от его корня: [Карточки](/linal-kr2/cards).
  html = html.replace(/href="\/(?!\/)/g, `href="${import.meta.env.BASE_URL}`);
  cache.set(key, html);
  return html;
}

export function Md({ text, inline, className }: { text: string; inline?: boolean; className?: string }) {
  const html = useMemo(() => renderMd(text, inline), [text, inline]);
  const Tag = inline ? 'span' : 'div';
  return <Tag className={className ? `md ${className}` : 'md'} dangerouslySetInnerHTML={{ __html: html }} />;
}
