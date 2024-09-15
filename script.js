let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial';
    menuContent.classList.toggle('on', show);
    show = !show;
});

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

const timelineWrapper = document.querySelector('.timeline-wrapper');
let isDown = false;
let startX;
let scrollLeft;

timelineWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  timelineWrapper.classList.add('active');
  startX = e.pageX - timelineWrapper.offsetLeft;
  scrollLeft = timelineWrapper.scrollLeft;
});

timelineWrapper.addEventListener('mouseleave', () => {
  isDown = false;
  timelineWrapper.classList.remove('active');
});

timelineWrapper.addEventListener('mouseup', () => {
  isDown = false;
  timelineWrapper.classList.remove('active');
});

timelineWrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - timelineWrapper.offsetLeft;
  const walk = (x - startX) * 2; // Aumenta a velocidade da rolagem
  timelineWrapper.scrollLeft = scrollLeft - walk;
});


