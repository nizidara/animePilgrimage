import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import schemas.contact as contact_schema
from properties.properties import sender_email, sender_password, recipient_email, email_server


# メール送信処理
def notify_new_contact(contact_data: contact_schema.ContactCreate):
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = contact_data.title

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

def send_complete_contact(contact_data: contact_schema.ContactCreate):
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = contact_data.email
    message["Subject"] = "お問い合わせが完了しました"

    # メール本文の作成
    body = f"名前: {contact_data.name}さん\nメールアドレス: {contact_data.email}\n題名: {contact_data.title}\n\nメッセージ:\n{contact_data.contents}"
    footer = f"\n\nにじげんたび\nMAIL: {sender_email}"
    message.attach(MIMEText(body + footer, "plain"))

    # SMTPサーバーに接続してメールを送信
    try:
        with smtplib.SMTP(email_server, 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message.as_string())
    except Exception as e:
        print(f"メール送信中にエラーが発生しました: {e}")
