setTimeout(() => {
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello World!';
    document.getElementById('waiting').remove();
    document.body.appendChild(h1);
}, 3000);