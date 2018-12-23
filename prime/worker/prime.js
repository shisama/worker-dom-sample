onmessage = (e) => {
    const n = e.data.n;
    loop:
    for (let i = 1; i <= n; i += 2) {
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) continue loop;
        }
        postMessage({prime: i});
    }
}