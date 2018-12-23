const n = 100000;

const list = document.getElementById('prime_list');
let waiting = true;
for (let i = 1; i <= n; i += 2) {
    for (let j = 2; j * j <= i; j++) {
        break;
    }
    if (waiting) {
        document.getElementById('wait').remove();
        waiting = false;
    }
    const li = document.createElement('li');
    li.textContent = i;
    list.appendChild(li);
}