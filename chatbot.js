// Chatbot HTML Structure
const chatbotHTML = `
  <button class="chatbot-toggler">
    💬
  </button>
  <div class="chatbot-container">
    <div class="chatbot-header">
      <div class="chatbot-header-info">
        <div class="chatbot-avatar">🤖</div>
        <div class="chatbot-title">
          <h3>E-Learning AI</h3>
          <p>Online & Ready to Help</p>
        </div>
      </div>
      <button class="chatbot-close">✕</button>
    </div>
    <div class="chatbot-box" id="chatbotBox">
      <div class="chat-msg incoming">
        <p>Hi there! 👋 I'm your AI learning assistant. How can I help you today?</p>
      </div>
    </div>
    <div class="chatbot-input">
      <textarea id="chatInput" placeholder="Type a message..." rows="1"></textarea>
      <button class="chatbot-input-btn" id="sendBtn" disabled>➤</button>
    </div>
  </div>
`;

// Inject HTML and CSS when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'chatbot.css';
  document.head.appendChild(link);

  // Inject HTML
  const chatbotWrapper = document.createElement('div');
  chatbotWrapper.innerHTML = chatbotHTML;
  document.body.appendChild(chatbotWrapper);

  // Select DOM elements
  const chatbotToggler = document.querySelector('.chatbot-toggler');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatBox = document.getElementById('chatbotBox');

  // Toggle Chatbot
  chatbotToggler.addEventListener('click', () => {
    chatbotContainer.classList.add('show');
    chatbotToggler.style.display = 'none';
  });

  chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('show');
    chatbotToggler.style.display = 'flex';
  });

  // Auto size textarea
  chatInput.addEventListener('input', () => {
    chatInput.style.height = '24px';
    chatInput.style.height = `${chatInput.scrollHeight}px`;
    sendBtn.disabled = !chatInput.value.trim();
  });

  // Real AI Logic via Free Pollinations.ai Text API
  const getBotResponse = async (userText) => {
    try {
      // Give the AI some context about who it is
      const systemPrompt = "You are a friendly and concise AI assistant for an E-Learning platform. The platform offers courses in C, C++, Java, Python, Web Development, DSA, and DBMS. It also features Quizzes, Notes, and Certificates. Answer the following query concisely and helpfully. Query: ";

      const url = 'https://text.pollinations.ai/' + encodeURIComponent(systemPrompt + userText);
      const response = await fetch(url);

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.text();
      return data;
    } catch (error) {
      console.error("AI Error:", error);
      return "Sorry, I'm having a little trouble connecting to my brain right now! Please try again later.";
    }
  };

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("div");
    chatLi.classList.add("chat-msg", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
  }

  const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Clear input
    chatInput.value = "";
    chatInput.style.height = '24px';
    sendBtn.disabled = true;

    // Append User Message
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);

    // AI "Thinking" Delay
    const incomingChatLi = createChatLi("...", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);

    // Fetch real AI response
    const responseText = await getBotResponse(userMessage);

    // Update DOM
    incomingChatLi.querySelector("p").textContent = responseText;
    chatBox.scrollTo(0, chatBox.scrollHeight);
  }

  sendBtn.addEventListener('click', handleChat);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  });
});
