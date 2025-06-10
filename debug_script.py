import requests

# Base URL for the API
base_url = 'http://localhost:3000/api'

# Endpoints to check
endpoints = [
    '/users',
    '/reviews',
    '/cart',
    '/products'
]

# Function to check each endpoint
def check_endpoint(endpoint):
    url = base_url + endpoint
    try:
        response = requests.get(url)
        print(f'Endpoint: {endpoint}')
        print(f'Status Code: {response.status_code}')
        print(f'Response: {response.json()}')
    except Exception as e:
        print(f'Error checking {endpoint}: {e}')

# Check all endpoints
for endpoint in endpoints:
    check_endpoint(endpoint) 