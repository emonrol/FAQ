import requests
import json

# Repo and filter
url = "https://api.github.com/repos/chagai95/stayinginbern/issues"
params = {"state": "open", "labels": "faq"}

# Fetch issues
response = requests.get(url, params=params)
issues = response.json()

# Extract only title & body
filtered = [{"title": issue["title"], "body": issue["body"]} for issue in issues]

# Save as JSON
with open("filtered_issues.json", "w", encoding="utf-8") as f:
    json.dump(filtered, f, ensure_ascii=False, indent=2)

# Optional: also save as Markdown
with open("filtered_issues.md", "w", encoding="utf-8") as f:
    for issue in filtered:
        f.write(f"# {issue['title']}\n\n{issue['body']}\n\n---\n")
