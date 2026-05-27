import google.generativeai as genai
import os

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

try:
    import PIL.Image
    img = PIL.Image.open("/Users/renoroy/Desktop/zaffabit/campaigns.png")
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([
        img,
        "Describe the exact layout of this dashboard image. Are there any tables, charts, or graphs? What is on the left side vs the right side? Describe the 4 top cards, their icons, and values. Describe the 'Recent Activity' section exactly. Please be very detailed so I can recreate it exactly in React."
    ])
    print(response.text)
except Exception as e:
    print(f"Error: {e}")
