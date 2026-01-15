# Snackii (Makan@RP)

Snackii (a.k.a. Makan@RP) is a small React web app that helps Republic Polytechnic students find and choose food on campus. It includes a simple AI chat interface for asking about stalls, menus and quick suggestions.

Key features
- Home page with project information and team profiles
- Chat page with an AI webhook integration to get responses
- Simple Docs and Contact pages
- Reset button in chat to start a fresh session (with confirmation)

Quick start
1. Install dependencies:

```bash
npm install
```

2. Run the app locally:

```bash
npm start
```

3. Open the app at http://localhost:3000

Notes for developers
- The chat logic is in `src/pages/Chat.js`. The webhook URL and session ID handling are implemented there.
- The reset button creates a new `user_session_id` in `sessionStorage` and clears chat messages.
- Team profiles and avatar styling are in `src/App.js` and `src/App.css`.

Customization
- To change the chat backend, edit the `url` in `postToWebhook()` inside `src/pages/Chat.js`.
- Update team members in `src/App.js` under the `HomeContent` component.

License & credits
This project was bootstrapped with Create React App. Keep or change the license as needed.

If you want a hand making further changes (styling, webhook integration, or tests), tell me what to do next.
