
import os
import json
import urllib.request
import urllib.error

# Load .env.local manually
try:
    with open('.env.local', 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, val = line.split('=', 1)
                os.environ[key] = val
except Exception as e:
    print(f"Error loading .env.local: {e}")

CLERK_KEY = os.environ.get('CLERK_SECRET_KEY')
if not CLERK_KEY:
    print("CLERK_SECRET_KEY not found")
    exit(1)

def request(url, method='GET', data=None):
    req = urllib.request.Request(url, method=method)
    req.add_header('Authorization', f'Bearer {CLERK_KEY}')
    req.add_header('Content-Type', 'application/json')
    req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    if data:
        req.data = json.dumps(data).encode('utf-8')
        
    try:
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read())
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode()}")
        return None

print("Searching specifically for gazzab7@gmail.com...")
# Use the email_address filter which is more reliable than iterating a partial list
users = request("https://api.clerk.com/v1/users?email_address=gazzab7@gmail.com")

if not users:
    print("No users found with that email.")
    # Fallback to query
    print("Trying query search...")
    users = request("https://api.clerk.com/v1/users?query=gazzab7")

if not users:
    print("No users found via query either.")
    exit(1)

test_user = None
target_email = 'gazzab7@gmail.com'

# Clerk returns a list even for email search
for u in users:
    print(f"Checking user: {u['id']}")
    emails = [e['email_address'].lower() for e in u.get('email_addresses', [])]
    if target_email in emails:
         test_user = u
         break
    first_name = (u.get('first_name') or "").lower()
    last_name = (u.get('last_name') or "").lower()
    
    # Exact match for the user in the screenshot OR the googlemail alias
    if 'gazzab7@gmail.com' in emails or 'gazzab7@googlemail.com' in emails:
         test_user = u
         break
    # If we didn't find specific gmail.com match in the results
    print(f"User {target_email} not found in search results.")
    exit(1)

print(f"Found User: {test_user['id']} ({test_user['email_addresses'][0]['email_address']})")
print(f"Current Metadata: {test_user.get('public_metadata')}")

# Reset logic
print("Updating to INSIDER tier...")
payload = {
    "public_metadata": {
        "tier": "INSIDER",
        "downloadsThisMonth": 0
    }
}

res = request(f"https://api.clerk.com/v1/users/{test_user['id']}/metadata", method='PATCH', data=payload)

if res:
    print("✅ Success! Metadata updated.")
    print(res.get('public_metadata'))
else:
    print("Failed to update.")
