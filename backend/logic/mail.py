import json
import urllib.request

import schemas.contact as contact_schema
from properties.properties import mail_relay_url, mail_relay_token


# Render's free plan blocks outbound SMTP ports, so mail goes out through an
# HTTPS relay hosted on Xserver (see xserver/contact_mail.php). The relay only
# sends to the admin address configured on its side.
def notify_new_contact(contact_data: contact_schema.ContactCreate):
    if not mail_relay_url:
        print("MAIL_RELAY_URL is not set: skipped the contact notification mail")
        return

    # メール本文の作成
    body = f"名前: {contact_data.name}\nメールアドレス: {contact_data.email}\nメッセージ:\n{contact_data.contents}"
    payload = {"subject": contact_data.title, "body": body, "reply_to": contact_data.email}
    request = urllib.request.Request(
        mail_relay_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "X-Relay-Token": mail_relay_token or "",
            "User-Agent": "animePilgrimage-backend",
        },
    )

    # 中継サーバーへ送信（2xx以外は例外になる）
    try:
        with urllib.request.urlopen(request, timeout=10):
            pass
    except Exception as e:
        print(f"メール送信中にエラーが発生しました: {e}")
