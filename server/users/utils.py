import requests
from django.conf import settings

def check_recaptcha(recaptcha_response_token):
    VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
    
    data = {
        'secret': settings.RECAPTCHA_SECRET_KEY, 
        'response': recaptcha_response_token
    }
    
    try:
        response = requests.post(VERIFY_URL, data=data, timeout=5)
        result = response.json()
        
        return result.get('success', False)
        
    except requests.RequestException:
        # Fallback seguro: si Google no responde, asumimos fallo para evitar bots
        return False