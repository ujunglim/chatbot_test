import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'



interface MessageType {
    message: string
    sender: string,
    direction: string,
}

function Chat({apiKey}) {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! How can I assist you?",
      sender: 'ChatGPT',
      direction: 'incoming',
    }
  ])

  const handleSend = async (message: string) => {
    const newMessage: MessageType = {
      message,
      sender: "user",
      direction: "outgoing"
    }
    const newMessages: MessageType[] = [...messages, newMessage];

    // update message state
    setMessages(newMessages);

    // send to chatGPT and get response
    setTyping(true);
    await sendMsgToChatGpt(newMessages);
  }

  const sendMsgToChatGpt = async (chatMessages: MessageType[]) => {
    // role: user(user), assistant(chatGPT), system(style of how to talk)
    let apiMessages = chatMessages.map(msgObject => {
      let role = "";
      if (msgObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: msgObject.message };
    })

    const systemMessage = {
      role: "system",
      content: "Explain like I am 10 years old"
      // content: "speak like a king"
    } 

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ],
    }

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    })
        .then(data => data.json())
        .then(data => {
            setMessages([...chatMessages, {
                message: data?.choices[0].message.content,
                sender: 'ChatGPT',
                direction: 'incoming'
            }])
            setTyping(false);
        })
  }

  return (
      <MainContainer style={{ position: 'relative', height: 800, width: 700 }}>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
  )
}

export default Chat;
