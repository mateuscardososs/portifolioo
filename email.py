import pandas as pd
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

# Carregar dados dos clientes
clientes = pd.read_excel('C:/Users/mateu/OneDrive/Área de Trabalho/portifolio/email em massa/clientes.xlsx')

for index, cliente in clientes.iterrows():
    msg = MIMEMultipart()
    msg['Subject'] = 'email teste em massa!' 
    msg['From'] = 'seu email'
    msg['To'] = cliente['email']
    
    message = f'Olá {cliente["nome"]}, você recebeu um email de Mateus!'
    msg.attach(MIMEText(message, 'plain'))
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587) #depende de qual plataforma escolher
        server.starttls()
        server.login('seu email novamente', 'senha de app, gerada no servidor')
        server.sendmail(msg['From'], msg['To'], msg.as_string())
        print(f'Email enviado para {cliente["email"]}')
    except Exception as e:
        print(f'Erro ao enviar email para {cliente["email"]}: {e}')
    finally:
        server.quit()
