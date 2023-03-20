import { useState } from 'react'

function Home() {
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
        <form type="submit" onSubmit={handleSubmit}>
            <input
                type="text"
                value={apiKeyInput}
                onChange={handleChange}
                placeholder="Please input your OpenAI ApiKey"
            />
        </form>
    )
}

export default Home;
