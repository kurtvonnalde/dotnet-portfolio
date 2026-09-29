import { MessageSquareText, SendHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { sendChatMessage } from "../services/chatService";
import Sidebar from "./Sidebar";

type ChatMessage = {
  id: number;
  sender: "assistant" | "user";
  text: string;
};

const WELCOME_ID = 1;
const MAX_HISTORY = 6;
const CHAT_HINT_KEY = "krawl-chat-hint-seen";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatHint, setShowChatHint] = useState(
    () => window.localStorage.getItem(CHAT_HINT_KEY) !== "true",
  );
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: WELCOME_ID,
      sender: "assistant",
      text: "Welcome! I’m Krawl, Kurt's AI Assistant. Ask me about his projects, experience, skills, or services.",
    },
  ]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  const sendMessage = async () => {
    const trimmed = draft.trim();

    if (!trimmed || isSending) {
      return;
    }

    const history = messages
      .filter((m) => m.id !== WELCOME_ID)
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.sender, content: m.text }));

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: "user", text: trimmed },
    ]);
    setDraft("");
    setIsSending(true);

    let reply: string;
    try {
      reply = (await sendChatMessage(trimmed, history)).answer;
    } catch (error) {
      reply = error instanceof Error ? error.message : "Something went wrong.";
    } finally {
      setIsSending(false);
    }

    setMessages((current) => [
      ...current,
      { id: Date.now() + 1, sender: "assistant", text: reply },
    ]);
  };

  const dismissChatHint = () => {
    window.localStorage.setItem(CHAT_HINT_KEY, "true");
    setShowChatHint(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5ef]">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar />

          <main className="min-w-0 p-6 lg:p-8">
            <div className="mx-auto w-full min-w-0 max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {!isOpen && showChatHint && (
          <div
            role="tooltip"
            className="flex w-[min(280px,calc(100vw-2.5rem))] items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-xl"
          >
            <div>
              <p className="font-semibold text-slate-900">Kurt's AI chatbot</p>
              <p className="mt-1 leading-relaxed">
                Ask about projects, skills, or experience.
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss chatbot tip"
              onClick={dismissChatHint}
              className="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {isOpen && (
          <div className="flex w-[340px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-slate-100">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-slate-100 ring-1 ring-white/10">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Krawl</p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex h-[420px] flex-col bg-[#f4f3f1]">
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        message.sender === "assistant"
                          ? "bg-white text-slate-700 ring-1 ring-slate-200"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-white px-3 py-2 text-sm text-slate-400 ring-1 ring-slate-200">
                      Krawl is thinking...
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 bg-white p-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-2">
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
                    className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />

                  <button
                    type="button"
                    aria-label="Send message"
                    onClick={sendMessage}
                    disabled={isSending}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700 disabled:opacity-50"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="Open chat"
          onClick={() => {
            if (!isOpen) {
              dismissChatHint();
            }
            setIsOpen((current) => !current);
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/15 ring-4 ring-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-slate-800"
        >
          <MessageSquareText className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
