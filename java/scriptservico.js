document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById('formStatus').innerText = 'Mensagem enviada com sucesso!';
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    document.getElementById('formStatus').innerText = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    document.getElementById('formStatus').innerText = 'Erro ao enviar a mensagem.';
                }
            });
        }
    }).catch(error => {
        document.getElementById('formStatus').innerText = 'Erro ao enviar a mensagem.';
    });
});
