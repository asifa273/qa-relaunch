# 🤖 Chatbot Flask Application

A modern, interactive chatbot web application built with Flask and the Google Generative AI API.

## Features

✨ **Modern UI** - Beautiful, responsive chat interface
🤖 **AI-Powered** - Integrated with Google Generative AI API
💬 **Real-time Chat** - Instant message sending and receiving
📝 **Conversation History** - Maintains chat context
🔗 **Connection Status** - Real-time API connection monitoring
🧹 **Clear Chat** - Reset conversation history anytime
⚡ **Fast & Responsive** - Smooth animations and instant feedback

## Installation

### 1. Install Dependencies

```bash
cd /Users/asifabegum/asifa273/qa-relaunch/python
pip install -r requirements.txt
```

### 2. Run the Flask App

```bash
python chatbot_app.py
```

You should see:
```
🤖 Starting Chatbot Flask App...
📍 Open http://localhost:5000 in your browser
```

### 3. Open in Browser

Visit: **http://localhost:5000**

## How It Works

### File Structure
```
python/
├── chatbot_app.py          # Flask application (backend)
├── requirements.txt        # Python dependencies
├── templates/
│   └── chatbot.html       # Web UI (frontend)
└── pytest/
    └── basicTests/
        └── test_fixtures.py  # Tests for the connection
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve chatbot UI |
| `/api/chat` | POST | Send message and get response |
| `/api/history` | GET | Get conversation history |
| `/api/clear` | POST | Clear chat history |
| `/api/status` | GET | Check API connection status |

### Request/Response Examples

**Send a message:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

**Response:**
```json
{
  "success": true,
  "message": "I'm doing great! How can I help you today?"
}
```

## Configuration

The chatbot uses these settings (in `chatbot_app.py`):

```python
CHATBOT_CONFIG = {
    "base_url": "https://generativelanguage.googleapis.com/v1beta/openai",
    "token": "AIzaSyA3i5cmDuJ-Tx-iFjj2sSvTI4XIL2DUE3s",
}
```

> ⚠️ **Security Note:** Keep your API token private! Don't commit it to public repositories. Consider using environment variables instead.

## Testing the Chatbot

Use pytest to test the chatbot connection:

```bash
pytest pytest/basicTests/test_fixtures.py -v
```

## Features Explained

### 1. **Chat Interface**
- Clean, modern design with gradient background
- Real-time message display with animations
- Message history visible in the chat window

### 2. **Connection Status**
- Shows 🟢 green when connected
- Shows 🔴 red when disconnected
- Auto-checks every 30 seconds

### 3. **Error Handling**
- Network errors handled gracefully
- Timeout messages shown to user
- Error messages displayed in chat

### 4. **Conversation Management**
- Messages stored in memory during session
- Clear button to reset chat
- Conversation history retrievable via API

## Troubleshooting

### Issue: "Connection refused" error
**Solution:** Make sure Flask is running on port 5000
```bash
python chatbot_app.py
```

### Issue: "API Error 401"
**Solution:** Your API token might be invalid. Check that the token in `chatbot_app.py` is correct.

### Issue: "Module not found: flask"
**Solution:** Install dependencies first:
```bash
pip install -r requirements.txt
```

### Issue: Port 5000 already in use
**Solution:** Change the port in `chatbot_app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=8000)  # Use port 8000 instead
```

## Development

### Enable Debug Mode
The app runs with `debug=True` by default, so changes to code will auto-reload.

### Disable Debug Mode (Production)
```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

## Next Steps

1. ✅ Install dependencies: `pip install -r requirements.txt`
2. ✅ Run the app: `python chatbot_app.py`
3. ✅ Open http://localhost:5000 in your browser
4. ✅ Start chatting! 💬

## Support

For issues or questions:
- Check the terminal output for error messages
- Look at the browser console (F12 → Console) for JavaScript errors
- Review the API response in Network tab (F12 → Network)

---

**Happy Chatting! 🤖** 🎉
