// 챗봇 메시지 추가 함수
function addMessage(text, sender) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 대화 히스토리 저장 (OpenAI API용)
let conversation = [
    { role: 'system', content: 'You are a helpful assistant.' }
];
let openaiApiKey = '';

// 페이지 진입 시 API 키 입력
// 오늘의 명언 리스트
const quotes = [
    '성공은 준비와 기회의 만남이다. – Bobby Unser',
    '포기하지 마라. 위대한 일은 시간이 걸린다. – Unknown',
    '노력은 배신하지 않는다. – Unknown',
    '오늘 걷지 않으면 내일은 뛰어야 한다. – Unknown',
    '할 수 있다고 믿는 사람만이 결국 해낸다. – Virgil',
    '작은 성취가 큰 성공을 만든다. – Unknown',
    '시작이 반이다. – Aristotle',
    '실패는 성공의 어머니이다. – Unknown',
    '꿈을 꾸는 자만이 미래를 바꾼다. – Malcolm X',
    '행동이 모든 성공의 기초다. – Pablo Picasso'
];

document.addEventListener('DOMContentLoaded', () => {
    // 오늘의 명언 랜덤 선택 및 출력
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    addMessage('오늘의 명언\n"' + randomQuote + '"', 'bot');

    if (!openaiApiKey) {
        openaiApiKey = prompt('OpenAI API 키를 입력하세요:');
        if (!openaiApiKey) {
            alert('API 키가 필요합니다. 새로고침 후 입력해 주세요.');
        }
    }

    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    async function sendMessage() {
        const text = userInput.value;
        if (!text.trim()) return;
        addMessage(text, 'user');
        userInput.value = '';

        if (!openaiApiKey) {
            addMessage('API 키가 필요합니다.', 'bot');
            return;
        }

        addMessage('답변 생성 중...', 'bot');
        const botReply = await getOpenAIResponse(text);
        // 마지막 "답변 생성 중..." 메시지 삭제 후 실제 답변 표시
        const chatWindow = document.getElementById('chat-window');
        chatWindow.removeChild(chatWindow.lastChild);
        addMessage(botReply, 'bot');
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

async function getOpenAIResponse(userInput) {
    conversation.push({ role: 'user', content: userInput });
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: conversation,
                max_tokens: 1024,
                temperature: 0.7
            })
        });
        if (!response.ok) {
            throw new Error('API 요청 실패');
        }
        const data = await response.json();
        const botReply = data.choices[0].message.content.trim();
        conversation.push({ role: 'assistant', content: botReply });
        return botReply;
    } catch (err) {
        return 'OpenAI API 호출에 실패했습니다. API 키를 확인해 주세요.';
    }
}

// 전송 버튼 및 엔터키 이벤트
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    async function sendMessage() {
        const text = userInput.value;
        if (!text.trim()) return;
        addMessage(text, 'user');
        userInput.value = '';

        if (!openaiApiKey) {
            addMessage('API 키가 필요합니다.', 'bot');
            return;
        }

        addMessage('답변 생성 중...', 'bot');
        const botReply = await getOpenAIResponse(text);
        // 마지막 "답변 생성 중..." 메시지 삭제 후 실제 답변 표시
        const chatWindow = document.getElementById('chat-window');
        chatWindow.removeChild(chatWindow.lastChild);
        addMessage(botReply, 'bot');
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
