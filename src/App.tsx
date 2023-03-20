import { useState } from 'react'
import Chat from './pages/Chat';

function App() {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setApiKeyInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // setApiKeyInput("");
  }

  return (
    <div className="App">
      {isSubmitted ? (
          <Chat apiKey={apiKeyInput} />
        ) : (
          <form type = "submit" onSubmit = { handleSubmit }>
            <input
              type = "text"
              value = { apiKeyInput }
              onChange = { handleChange }
              placeholder = "Please input your OpenAI ApiKey"
            />
          </form>
        )
    }
    </div >
  )
}

export default App;
