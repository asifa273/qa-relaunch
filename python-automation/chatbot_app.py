from flask import Flask, render_template, request, jsonify
import requests
import json

app = Flask(__name__)

# Chatbot configuration (same as in your fixture)
CHATBOT_CONFIG = {
    "base_url": "https://generativelanguage.googleapis.com/v1beta/openai",
    "token": "AIzaSyA3i5cmDuJ-Tx-iFjj2sSvTI4XIL2DUE3s",
}

# Store conversation history
conversation_history = []


@app.route('/')
def home():
    """Serve the chatbot UI"""
    return render_template('chatbot.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    try:
        data = request.json
        user_message = data.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Add user message to history
        conversation_history.append({
            'role': 'user',
            'content': user_message
        })

        # Make request to chatbot API
        headers = {
            'Authorization': f'Bearer {CHATBOT_CONFIG["token"]}',
            'Content-Type': 'application/json'
        }

        payload = {
            'messages': conversation_history
        }

        response = requests.post(
            f'{CHATBOT_CONFIG["base_url"]}/chat/completions',
            headers=headers,
            json=payload,
            timeout=30
        )

        if response.status_code != 200:
            return jsonify({
                'error': f'API Error: {response.status_code}',
                'details': response.text
            }), response.status_code

        # Parse response
        api_response = response.json()
        bot_message = api_response.get('choices', [{}])[0].get(
            'message', {}).get('content', 'No response')

        # Add bot message to history
        conversation_history.append({
            'role': 'assistant',
            'content': bot_message
        })

        return jsonify({
            'success': True,
            'message': bot_message
        })

    except requests.exceptions.Timeout:
        return jsonify({'error': 'Request timeout. Please try again.'}), 504
    except requests.exceptions.ConnectionError:
        return jsonify({'error': 'Connection error. Please check your internet.'}), 503
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500


@app.route('/api/history', methods=['GET'])
def get_history():
    """Get conversation history"""
    return jsonify({
        'history': conversation_history
    })


@app.route('/api/clear', methods=['POST'])
def clear_history():
    """Clear conversation history"""
    global conversation_history
    conversation_history = []
    return jsonify({'success': True, 'message': 'Chat history cleared'})


@app.route('/api/status', methods=['GET'])
def status():
    """Check chatbot connection status"""
    try:
        headers = {
            'Authorization': f'Bearer {CHATBOT_CONFIG["token"]}',
        }

        # Test connection with a simple request
        response = requests.get(
            f'{CHATBOT_CONFIG["base_url"]}/models',
            headers=headers,
            timeout=5
        )

        if response.status_code == 200:
            return jsonify({
                'status': 'connected',
                'message': 'Chatbot is ready!'
            })
        else:
            return jsonify({
                'status': 'error',
                'message': f'API returned status {response.status_code}'
            }), response.status_code

    except Exception as e:
        return jsonify({
            'status': 'disconnected',
            'message': f'Connection error: {str(e)}'
        }), 503


if __name__ == '__main__':
    print("🤖 Starting Chatbot Flask App...")
    print("📍 Open http://localhost:5000 in your browser")
    app.run(debug=True, host='0.0.0.0', port=5000)
