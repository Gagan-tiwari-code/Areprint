function handleFileSelect(event) {
    const files = event.target.files;
    const filePreviewList = document.getElementById("file-preview-list");
    filePreviewList.innerHTML = ""; // Clear previous previews

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePreviewItem = document.createElement("div");
        filePreviewItem.classList.add("file-preview-item");

        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src);
            img.classList.add("preview-image");
            filePreviewItem.appendChild(img);
        }

        const fileName = document.createElement("span");
        fileName.textContent = file.name;
        filePreviewItem.appendChild(fileName);

        filePreviewList.appendChild(filePreviewItem);
    }
}

async function submitFiles() {
    const nameInput = document.getElementById("name-input").value;
    const files = document.getElementById("file-upload").files;

    if (!nameInput || files.length === 0) {
        alert("Please enter your name and select at least one file.");
        return;
    }

    const formData = new FormData();
    formData.append("name", nameInput);
    for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
    }

    try {
        const response = await fetch("upload.php", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("File submission failed.");
    }
}