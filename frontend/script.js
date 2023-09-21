async function generateHash() {
    const fileInput = document.getElementById('fileInput');
    const hashValue = document.getElementById('hashValue');

    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a PDF file.');
        return;
    }

    const fileReader = new FileReader();

    fileReader.onload = async () => {
        const buffer = new Uint8Array(fileReader.result);
        const hashArray = await crypto.subtle.digest('SHA-256', buffer);
        const hashHex = Array.from(new Uint8Array(hashArray))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
        hashValue.textContent = hashHex;
    };

    fileReader.readAsArrayBuffer(file);
}