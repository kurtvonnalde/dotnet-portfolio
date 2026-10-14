import { SendHorizontal, Sparkles, X } from "lucide-react";
import type { RefObject } from "react";

export type ChatMessage = {
  id: number;
  sender: "assistant" | "user";
  text: string;
};

type ChatPanelProps = {
  messages: ChatMessage[];
  draft: string;
  setDraft: (value: string) => void;
  isSending: boolean;
  sendMessage: () => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export default function ChatPanel({
  messages,
  draft,
  setDraft,
  isSending,
  sendMessage,
  scrollRef,
  onClose,
}: ChatPanelProps) {
  return (
    <aside className="workspace-chat-panel fixed bottom-20 right-5 z-50 flex max-h-[70vh] w-[min(340px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border shadow-2xl lg:static lg:bottom-auto lg:right-auto lg:h-full lg:max-h-none lg:w-[360px] lg:shrink-0 lg:rounded-none lg:border-b-0 lg:border-l lg:border-r-0 lg:border-t-0 lg:shadow-none">
      <div className="workspace-chat-header flex items-center justify-between border-b px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#0078d4]" />
          <span className="workspace-chat-muted text-[11px] font-semibold uppercase tracking-[0.12em]">Chat</span>
        </div>
        <button
          type="button"
          aria-label="Close chat"
          onClick={onClose}
          className="workspace-chat-muted rounded p-1 transition-colors hover:bg-[var(--chrome-hover)] hover:text-[var(--chrome-text)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "assistant" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-[13px] leading-relaxed ${
                message.sender === "assistant" ? "workspace-chat-assistant" : "bg-[#0078d4] text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="workspace-chat-assistant rounded-lg px-3 py-2 text-[13px]">Krawl is thinking...</div>
          </div>
        )}
      </div>

      <div className="workspace-chat-footer border-t p-2.5">
        <div className="workspace-chat-input flex items-center gap-2 rounded-md border px-2.5 py-2">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
              }
            }}
            maxLength={500}
            placeholder="Ask about Kurt's work..."
            className="workspace-chat-text w-full border-0 bg-transparent text-[13px] placeholder:text-[var(--chat-muted)] focus:outline-none"
          />
          <button
            type="button"
            aria-label="Send message"
            onClick={sendMessage}
            disabled={isSending}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0078d4] text-white transition hover:bg-[#1483da] disabled:opacity-50"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
