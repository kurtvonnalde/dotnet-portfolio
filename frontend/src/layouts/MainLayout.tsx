import { MessageSquareText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { sendChatMessage } from "../services/chatService";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import TabBar, { type WorkspaceTheme } from "./TabBar";
import ChatPanel, { type ChatMessage } from "./ChatPanel";

const WELCOME_ID = 1;
const MAX_HISTORY = 6;
const THEME_KEY = "portfolio-theme";

export default function MainLayout() {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const [theme, setTheme] = useState<WorkspaceTheme>(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
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

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

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

  return (
    <div className="workspace-shell flex min-h-screen w-full flex-col lg:h-screen lg:flex-row lg:overflow-hidden" data-theme={theme}>
      <ActivityBar
        explorerOpen={explorerOpen}
        chatOpen={chatOpen}
        onToggleExplorer={() => setExplorerOpen((current) => !current)}
        onToggleChat={() => setChatOpen((current) => !current)}
      />

      <div className={`${explorerOpen ? "lg:block" : "lg:hidden"} h-[260px] w-full shrink-0 lg:h-full lg:w-[260px]`}>
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:h-full lg:overflow-hidden">
        <TabBar
          theme={theme}
          onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        />

        <main className="workspace-content min-w-0 flex-1 p-6 lg:overflow-y-auto lg:p-8">
          <div className="mx-auto w-full min-w-0 max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>

      {chatOpen && (
        <ChatPanel
          messages={messages}
          draft={draft}
          setDraft={setDraft}
          isSending={isSending}
          sendMessage={sendMessage}
          scrollRef={scrollRef}
          onClose={() => setChatOpen(false)}
        />
      )}

      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setChatOpen((current) => !current)}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0078d4] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 lg:hidden"
      >
        <MessageSquareText className="h-5 w-5" />
      </button>
    </div>
  );
}
