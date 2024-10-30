import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import schemas.contact as contact_schema
from properties.properties import sender_email, sender_password, recipient_email, email_server


# メール送信処理
def send_email(contact_data: contact_schema.ContactCreate):
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = "新しいお問い合わせ"

    # メール本文の作成
    body = f"名前: {contact_data.name}\nメールアドレス: {contact_data.email}\nメッセージ:\n{contact_data.contents}"
    message.attach(MIMEText(body, "plain"))

    # SMTPサーバーに接続してメールを送信
    try:
        with smtplib.SMTP(email_server, 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message.as_string())
    except Exception as e:
        print(f"メール送信中にエラーが発生しました: {e}")