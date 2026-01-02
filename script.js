function oku() {
    const input = document.getElementById("hostInput").value;
    const lines = input.split(/\r?\n/);

    const headers = [];

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        if (/^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)\s+.+\s+HTTP\/\d/i.test(line)) {
            continue;
        }

        if (line.includes(":")) {
            let [key, ...rest] = line.split(":");
            let value = rest.join(":").trim();
            value = value.replace(/"/g, '\\"');

            headers.push(`    "${key.trim()}" to "${value}"`);
        }
    }

    const sonuc =
`mapOf(
${headers.join(",\n")}
)`;

    document.querySelector("#output pre").textContent = sonuc;
}


function kopyala() {
    const text = document.querySelector("#output pre").textContent;
    if (!text) return;

    navigator.clipboard.writeText(text);

    const el = document.querySelector(".kopyala");
    el.classList.add("kopyalandi");

    setTimeout(() => {
        el.classList.remove("kopyalandi");
    }, 1200);
}

