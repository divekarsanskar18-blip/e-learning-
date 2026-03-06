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

    // Simulated AI Logic
    const getBotResponse = (userText) => {
        const text = userText.toLowerCase();

        if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
            return "Hello! How can I assist with your learning journey today?";
        }
        if (text.includes('course') || text.includes('learn')) {
            return "We offer courses in C, C++, Java, Web Development, Python, DSA, and DBMS! Head over to the Dashboard to find them.";
        }
        if (text.includes('note')) {
            return "You can find dedicated course notes in the 'Notes' section from the top navigation menu.";
        }
        if (text.includes('certificate')) {
            return "After completing a course, you can generate your certificate from the 'Certificate' hub!";
        }
        if (text.includes('quiz') || text.includes('test')) {
            return "Test your knowledge in the 'Quizzes' section. We have quizzes for all major courses.";
        }
        if (text.includes('login') || text.includes('sign up')) {
            return "You can use the login page to access your account. If you don't have an account, click 'Sign up' at the bottom of the login form!";
        }

        return "I'm still learning! Right now I can help you find courses, notes, quizzes, and certificates. Let me know what you'd like to explore!";
    };

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("div");
        chatLi.classList.add("chat-msg", className);
        let chatContent = className === "outgoing" ? `<p></p>` : `<p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }

    const handleChat = () => {
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

        setTimeout(() => {
            const responseText = getBotResponse(userMessage);
            incomingChatLi.querySelector("p").textContent = responseText;
            chatBox.scrollTo(0, chatBox.scrollHeight);
        }, 600);
    }

    sendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });
});
