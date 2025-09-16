import axios, {type Method} from "axios";

const methodSelect = document.getElementById("method") as HTMLSelectElement;
const endpointInput = document.getElementById("endpoint") as HTMLInputElement;
const sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;
const responseBox = document.getElementById("response") as HTMLElement;
const bodyInput = document.getElementById("bodyInput") as HTMLTextAreaElement;

methodSelect.addEventListener("change", () => {
    if (["POST", "PUT"].includes(methodSelect.value)) {
        bodyInput.style.display = "block";
    } else {
        bodyInput.style.display = "none";
    }
});

sendBtn.addEventListener("click", async () => {
    const method = methodSelect.value as Method;
    const endpoint = endpointInput.value.trim();

    if (!endpoint) {
        responseBox.textContent = "Please enter a valid endpoint.";
        responseBox.style.color = "yellow";
        return;
    }

    let data: any = undefined;
    if (["POST", "PUT"].includes(method)) {
        try {
            data = bodyInput.value ? JSON.parse(bodyInput.value) : {};
        } catch {
            responseBox.textContent = "Invalid JSON in request body.";
            responseBox.style.color = "red";
            return;
        }
    }

    try {
        const res = await axios({method, url: endpoint, data});
        if (res.data && "data" in res.data && "color" in res.data) {
            responseBox.textContent = JSON.stringify(res.data.data, null, 2);
            responseBox.style.color = res.data.color;
        } else {
            responseBox.textContent = JSON.stringify(res.data, null, 2);
            responseBox.style.color = "#0f0";
        }
    } catch (err: any) {
        responseBox.textContent =
            err.response?.data
                ? JSON.stringify(err.response.data, null, 2)
                : err.message;
        responseBox.style.color = "red";
    }
});