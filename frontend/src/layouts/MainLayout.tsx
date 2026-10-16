import { MessageSquareText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { sendChatMessage } from "../services/chatService";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import TabBar, { type WorkspaceTheme } from "./TabBar";
import ChatPanel, { type ChatMessage } from "./ChatPanel";
import StatusBar from "./StatusBar";

const WELCOME_ID = 1;
const MAX_HISTORY = 6;
const THEME_KEY = "portfolio-theme";
const MIN_EDITOR_WIDTH = 720;
const ACTIVITY_WIDTH = 48;
const EXPLORER_WIDTH = 260;
const CHAT_WIDTH = 360;

export default function MainLayout() {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [preferredPane, setPreferredPane] = useState<"explorer" | "chat">("explorer");
  const desktop = viewportWidth >= 1024;
  const bothPanesFit = viewportWidth >= MIN_EDITOR_WIDTH + ACTIVITY_WIDTH + EXPLORER_WIDTH + CHAT_WIDTH;
  const chatDocked = desktop && viewportWidth >= MIN_EDITOR_WIDTH + ACTIVITY_WIDTH + CHAT_WIDTH;
  const explorerVisible = explorerOpen && (
    !desktop || (
      viewportWidth >= MIN_EDITOR_WIDTH + ACTIVITY_WIDTH + EXPLORER_WIDTH &&
      (!chatOpen || bothPanesFit || preferredPane === "explorer" || !chatDocked)
    )
  );
  const chatVisible = chatOpen && (
    !desktop || bothPanesFit || (chatDocked ? !explorerVisible : preferredPane === "chat")
  );
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
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending, chatVisible]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleExplorer = () => {
    setExplorerOpen(!explorerVisible);
    setPreferredPane("explorer");
  };

  const toggleChat = () => {
    setChatOpen(!chatVisible);
    setPreferredPane("chat");
  };

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
    <div className="workspace-shell flex min-h-dvh w-full flex-col lg:h-dvh lg:overflow-hidden" data-theme={theme}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row lg:overflow-hidden">
        <ActivityBar
          explorerOpen={explorerVisible}
          chatOpen={chatVisible}
          onToggleExplorer={toggleExplorer}
          onToggleChat={toggleChat}
        />

        <div className={`${explorerVisible ? "lg:block" : "lg:hidden"} h-[260px] w-full shrink-0 lg:h-full lg:w-[260px]`}>
          <Sidebar />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:h-full lg:overflow-hidden">
          <TabBar
            theme={theme}
            onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          />

          <main aria-label="Editor" className="workspace-content min-h-0 min-w-0 flex-1 p-6 lg:overflow-y-auto lg:p-8">
            <div className="@container/editor mx-auto w-full min-w-0 max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>

        {chatVisible && (
          <ChatPanel
            docked={chatDocked}
            messages={messages}
            draft={draft}
            setDraft={setDraft}
            isSending={isSending}
            sendMessage={sendMessage}
            scrollRef={scrollRef}
            onClose={() => setChatOpen(false)}
          />
        )}
      </div>

      <StatusBar />

      <button
        type="button"
        aria-label="Open chat"
        onClick={toggleChat}
        className="fixed bottom-12 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0078d4] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 lg:hidden"
      >
        <MessageSquareText className="h-5 w-5" />
      </button>
    </div>
  );
}
