import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi — I'm Snackii. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ensure a session id for the user session (persist for tab)
  useEffect(() => {
    if (!sessionStorage.getItem('user_session_id')) {
      sessionStorage.setItem('user_session_id', `s_${Date.now()}_${Math.floor(Math.random()*100000)}`);
    }
  }, []);

  async function postToWebhook(query) {
    const url = 'https://n8ngc.codeblazar.org/webhook/bc0df85b-ea80-4a3e-bf1a-e255b7723ccf';
    const userSession = sessionStorage.getItem('user_session_id') || null;

    const body = { query, userSession };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error('Webhook error', res.status, txt);
        return null;
      }

      const data = await res.json().catch(() => null);
      console.log('Webhook response', data);
      return data;
    } catch (err) {
      console.error('Failed to call webhook', err);
      return null;
    }
  }

  // Extract a displayable reply string from various possible webhook response shapes
  function extractReply(resp) {
    if (!resp) return null;

    // If the webhook returned an array (e.g. [{ output: "response" }])
    if (Array.isArray(resp) && resp.length) {
      // Prefer the first element's reply if present
      const first = resp[0];
      const fromFirst = extractReply(first);
      if (fromFirst) return fromFirst;

      // Fallback: join stringified items
      return resp
        .map((it) => {
          if (typeof it === 'string') return it;
          if (it && typeof it === 'object') {
            if (typeof it.output === 'string') return it.output;
            if (it.output && typeof it.output.text === 'string') return it.output.text;
            if (typeof it.text === 'string') return it.text;
          }
          return JSON.stringify(it);
        })
        .filter(Boolean)
        .join('\n');
    }

    // Common conventions: { reply: 'text' } or { output: 'text' }
    if (typeof resp === 'string') return resp;
    if (typeof resp.reply === 'string' && resp.reply.trim()) return resp.reply;
    if (typeof resp.output === 'string' && resp.output.trim()) return resp.output;

    // Some systems return { output: { text: '...' } } or nested
    if (resp.output && typeof resp.output === 'object') {
      if (typeof resp.output.text === 'string' && resp.output.text.trim()) return resp.output.text;
      if (Array.isArray(resp.output) && resp.output.length) {
        // join array of strings or objects
        return resp.output.map((it) => (typeof it === 'string' ? it : JSON.stringify(it))).join('\n');
      }
      // Some agents return { output: { output: '...' } }
      if (typeof resp.output.output === 'string' && resp.output.output.trim()) return resp.output.output;
    }

    // other possible keys
    if (typeof resp.text === 'string' && resp.text.trim()) return resp.text;
    if (typeof resp.result === 'string' && resp.result.trim()) return resp.result;
    return null;
  }

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    const queryText = input.trim();
    setInput('');

    // call webhook and show response when available; fall back to demo output
    postToWebhook(queryText).then((resp) => {
      const reply = extractReply(resp);
      if (reply) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: reply }]);
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, from: 'bot', text: 'Thanks — this is a preview response from Snackii.' },
          ]);
        }, 700);
      }
    });
  }

  function handleKey(e) {
    if (e.key === 'Enter') sendMessage();
  }

  const quickPrompts = [
    'Recommend something for under $5',
    "What are some Halal options?",
    'What are some Vegetarian options?'
  ];

  function sendQuick(prompt) {
    setInput('');
    const userMsg = { id: Date.now(), from: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);

    // call webhook for quick prompt
    postToWebhook(prompt).then((resp) => {
      const reply = extractReply(resp);
      if (reply) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: reply }]);
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, from: 'bot', text: `Preview output for: "${prompt}"` },
          ]);
        }, 600);
      }
    });
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with Snackii</h2>
          <p className="chat-sub">Ask about stalls, menus, or get quick suggestions.</p>
        </div>

        <div className="chat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`chat-message ${m.from === 'user' ? 'from-user' : 'from-bot'}`}>
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-chips">
          {quickPrompts.map((p) => (
            <button key={p} className="chip" onClick={() => sendQuick(p)}>{p}</button>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask Snackii... e.g. 'Craving something cheap?'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="send-button" onClick={sendMessage} aria-label="Send">Send</button>
        </div>
      </div>
    </div>
  );
}
