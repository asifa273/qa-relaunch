import os
import json
import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def analyze_defect(bug: dict) -> str:
    prompt = f"""
    You are a software defect analyst for a retail POS system.
    Analyze this bug report and identify the root cause.

    Bug Report:
    Defect ID: {bug['defect_id']}
    Title: {bug['title']}
    Description: {bug['description']}
    Module: {bug['module']}
    Code: {bug['code_snippet']}

    Provide:
    1. Root cause (2-3 sentences)
    2. Impact assessment
    3. Suggested fix approach
    """
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text


if __name__ == "__main__":
    with open("defects/sample_bug.json") as f:
        bugs = json.load(f)
    result = analyze_defect(bugs[0])
    print(result)
