"use client";

import { useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import {
  Bold,
  Code2,
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Search,
  Strikethrough,
  Table2,
  Underline,
  Undo2,
  Video,
} from "lucide-react";
import { MediaModal, uploadFile } from "./MediaPicker";
import { api, inputCls, useToast } from "./ui";

type LinkTarget = { group: string; title: string; path: string };

export default function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const [html, setHtml] = useState(value);
  const [media, setMedia] = useState(false);
  const toast = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https", HTMLAttributes: { rel: null, target: null } },
      }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      Table,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "post-body min-h-[460px] px-5 py-6 outline-none sm:px-8" },
      // Drop or paste an image file to upload it to Cloudinary and insert it.
      handleDrop: (view, event, _slice, moved) => {
        const file = event.dataTransfer?.files?.[0];
        if (moved || !file?.type.startsWith("image/")) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        uploadFile(file).then(
          (m) => view.dispatch(view.state.tr.insert(pos ?? view.state.selection.from, view.state.schema.nodes.image.create({ src: m.url, alt: "" }))),
          (e) => toast(e.message, "error"),
        );
        return true;
      },
      handlePaste: (view, event) => {
        const file = [...(event.clipboardData?.files ?? [])].find((f) => f.type.startsWith("image/"));
        if (!file) return false;
        uploadFile(file).then(
          (m) => view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src: m.url, alt: "" }))),
          (e) => toast(e.message, "error"),
        );
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  function switchMode(next: "visual" | "html") {
    if (!editor || next === mode) return;
    if (next === "html") setHtml(editor.getHTML());
    else {
      editor.commands.setContent(html);
      onChange(editor.getHTML());
    }
    setMode(next);
  }

  return (
    <div className="rounded-2xl border border-navy/10 bg-white">
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 rounded-t-2xl border-b border-navy/8 bg-white/95 px-2 py-2 backdrop-blur lg:top-0">
        {mode === "visual" && editor ? <Toolbar editor={editor} onImage={() => setMedia(true)} /> : <span className="px-2 text-xs font-bold text-muted">Editing raw HTML</span>}
        <div className="ml-auto flex rounded-lg bg-navy-50 p-0.5 text-xs font-bold">
          {(["visual", "html"] as const).map((m) => (
            <button key={m} type="button" onClick={() => switchMode(m)} className={`rounded-md px-2.5 py-1.5 ${mode === m ? "bg-white shadow-sm" : "text-muted"}`}>
              {m === "visual" ? "Visual" : "HTML"}
            </button>
          ))}
        </div>
      </div>

      {mode === "visual" ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          value={html}
          onChange={(e) => {
            setHtml(e.target.value);
            onChange(e.target.value);
          }}
          spellCheck={false}
          className="block min-h-[460px] w-full resize-y rounded-b-2xl bg-navy-950 p-5 font-mono text-[13px] leading-relaxed text-navy-100 outline-none"
        />
      )}

      {editor && mode === "visual" && <InternalLinks editor={editor} />}

      <MediaModal
        open={media}
        onClose={() => setMedia(false)}
        onPick={(m) => {
          const alt = prompt("Alt text for this image (describe it, ideally with your keyword):", "") ?? "";
          editor?.chain().focus().setImage({ src: m.url, alt }).run();
        }}
      />
    </div>
  );
}

function Toolbar({ editor, onImage }: { editor: Editor; onImage: () => void }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      p: e.isActive("paragraph"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      h4: e.isActive("heading", { level: 4 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      ul: e.isActive("bulletList"),
      ol: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      code: e.isActive("codeBlock"),
      link: e.isActive("link"),
      undo: e.can().undo(),
      redo: e.can().redo(),
    }),
  });
  const c = () => editor.chain().focus();

  function setLink() {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = prompt("Link URL (use /path for pages on this site, https://... for other sites):", prev ?? "");
    if (url === null) return;
    if (!url) return c().extendMarkRange("link").unsetLink().run();
    if (editor.state.selection.empty && !prev) {
      const text = prompt("Link text:", url) || url;
      return c().insertContent({ type: "text", text, marks: [{ type: "link", attrs: { href: url } }] }).run();
    }
    c().extendMarkRange("link").setLink({ href: url }).run();
  }

  function embedVideo() {
    const url = prompt("YouTube URL:");
    const id = url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1];
    if (!id) return;
    c().insertContent(`<p><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" allowfullscreen></iframe></p>`).run();
  }

  const groups: { icon: React.ElementType; label: string; on?: boolean; run: () => void; disabled?: boolean }[][] = [
    [
      { icon: Pilcrow, label: "Paragraph", on: s.p, run: () => c().setParagraph().run() },
      { icon: Heading2, label: "Heading 2", on: s.h2, run: () => c().toggleHeading({ level: 2 }).run() },
      { icon: Heading3, label: "Heading 3", on: s.h3, run: () => c().toggleHeading({ level: 3 }).run() },
      { icon: Heading4, label: "Heading 4", on: s.h4, run: () => c().toggleHeading({ level: 4 }).run() },
    ],
    [
      { icon: Bold, label: "Bold", on: s.bold, run: () => c().toggleBold().run() },
      { icon: Italic, label: "Italic", on: s.italic, run: () => c().toggleItalic().run() },
      { icon: Underline, label: "Underline", on: s.underline, run: () => c().toggleUnderline().run() },
      { icon: Strikethrough, label: "Strikethrough", on: s.strike, run: () => c().toggleStrike().run() },
    ],
    [
      { icon: List, label: "Bullet list", on: s.ul, run: () => c().toggleBulletList().run() },
      { icon: ListOrdered, label: "Numbered list", on: s.ol, run: () => c().toggleOrderedList().run() },
      { icon: Quote, label: "Quote", on: s.quote, run: () => c().toggleBlockquote().run() },
      { icon: Code2, label: "Code block", on: s.code, run: () => c().toggleCodeBlock().run() },
      { icon: Minus, label: "Divider", run: () => c().setHorizontalRule().run() },
      { icon: Table2, label: "Insert table", run: () => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    ],
    [
      { icon: Link2, label: "Add / edit link", on: s.link, run: setLink },
      { icon: Link2Off, label: "Remove link", run: () => c().extendMarkRange("link").unsetLink().run(), disabled: !s.link },
      { icon: ImagePlus, label: "Insert image", run: onImage },
      { icon: Video, label: "Embed YouTube video", run: embedVideo },
    ],
    [
      { icon: Undo2, label: "Undo", run: () => c().undo().run(), disabled: !s.undo },
      { icon: Redo2, label: "Redo", run: () => c().redo().run(), disabled: !s.redo },
    ],
  ];

  return (
    <>
      {groups.map((g, i) => (
        <div key={i} className="flex items-center gap-0.5 border-r border-navy/8 pr-1 last:border-0">
          {g.map(({ icon: Icon, label, on, run, disabled }) => (
            <button
              key={label}
              type="button"
              title={label}
              aria-label={label}
              aria-pressed={on}
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={run}
              className={`grid size-8 place-items-center rounded-lg transition disabled:opacity-30 ${on ? "bg-navy text-white" : "text-navy hover:bg-navy-50"}`}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      ))}
    </>
  );
}

/** Searchable list of site pages and posts; inserts an internal link at the cursor or on the selected text. */
function InternalLinks({ editor }: { editor: Editor }) {
  const [targets, setTargets] = useState<LinkTarget[] | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && !targets) api<LinkTarget[]>("/api/admin/links").then(setTargets, () => setTargets([]));
  }, [open, targets]);

  const used = useEditorState({ editor, selector: ({ editor: e }) => [...e.getHTML().matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]) });
  const filtered = useMemo(() => (targets ?? []).filter((t) => `${t.title} ${t.path}`.toLowerCase().includes(q.toLowerCase())), [targets, q]);

  function insert(t: LinkTarget) {
    const chain = editor.chain().focus();
    if (editor.state.selection.empty) chain.insertContent({ type: "text", text: t.title, marks: [{ type: "link", attrs: { href: t.path } }] }).insertContent(" ").run();
    else chain.setLink({ href: t.path }).run();
  }

  return (
    <div className="border-t border-navy/8">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-extrabold">
        <span className="flex items-center gap-2">
          <Link2 className="size-4 text-leaf-600" /> Internal linking
          <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-bold text-muted">{used.length} internal links in this post</span>
        </span>
        <span className="text-xs font-bold text-leaf-600">{open ? "Hide" : "Show pages"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="mb-3 text-xs text-muted">Select text in the editor and click a page to link it, or click with nothing selected to insert the page title as a link.</p>
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search loan programs, local pages, posts..." className={`${inputCls} pl-9`} />
          </label>
          <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-navy/8">
            {!targets ? (
              <p className="p-4 text-sm text-muted">Loading pages...</p>
            ) : (
              Object.entries(Object.groupBy(filtered, (t) => t.group)).map(([group, list]) => (
                <div key={group}>
                  <p className="sticky top-0 bg-navy-50 px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-muted uppercase">{group}</p>
                  {list!.map((t) => (
                    <button
                      key={t.path}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => insert(t)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-leaf-100/50"
                    >
                      <span className="truncate font-semibold">{t.title}</span>
                      <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
                        {used.includes(t.path) && <span className="rounded-full bg-leaf-100 px-2 py-0.5 font-bold text-leaf-600">linked</span>}
                        {t.path}
                      </span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
