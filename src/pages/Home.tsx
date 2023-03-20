import { useState } from 'react';
import { useNavigate } from 'react-router';

function Home() {
    const [apiKeyInput, setApiKeyInput] = useState("");
    const navigate = useNavigate()

    const handleChange = (e: any) => {
        setApiKeyInput(e.target.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        localStorage.setItem('OPENAI_API_KEY', e.target[0].value);
        navigate('/chat');
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
