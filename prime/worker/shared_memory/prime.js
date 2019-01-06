onmessage = (e) => {
    const buf = new Uint32Array(e.data);
    const n = buf[0];
    const sharedBuffer = new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT);
    const uint32Array = new Uint32Array(sharedBuffer);
    loop:
    for (let i = 1; i <= n; i += 2) {
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) continue loop;
        }
        const sharedBuffer = new SharedArrayBuffer(Uint32Array.BYTES_PER_ELEMENT);
        const uint32Array = new Uint32Array(sharedBuffer);
        uint32Array[0] = i;
        postMessage(sharedBuffer);
    }
}