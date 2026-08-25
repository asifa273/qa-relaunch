import os
import json
import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def generate_fix(bug: dict, analysis: str) -> str:
    prompt = f"""
    Based on this root cause analysis:
    {analysis}

    Original buggy code:
    {bug['code_snippet']}

    Generate a corrected version of the code with a brief explanation
    of what was changed and why.
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
    analysis = "Root cause: discount is applied as flat value instead of percentage."
    result = generate_fix(bugs[0], analysis)
    print(result)
