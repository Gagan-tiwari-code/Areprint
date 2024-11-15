
        // Fetch data from the server
        async function fetchFiles() {
            try {
                const response = await fetch("fetch_files.php");
                const data = await response.json();

                if (data.success) {
                    displayFiles(data.files);
                } else {
                    document.getElementById("file-list").innerText = data.message;
                }
            } catch (error) {
                console.error("Error fetching files:", error);
                document.getElementById("file-list").innerText = "Failed to load files.";
            }
        }

        // Display files in the file-list div
        function displayFiles(files) {
            const fileList = document.getElementById("file-list");
            fileList.innerHTML = ""; // Clear previous content

            files.forEach(file => {
                const fileItem = document.createElement("div");
                fileItem.classList.add("file-item");

                // Display name
                const name = document.createElement("p");
                name.textContent = `Name: ${file.name}`;
                fileItem.appendChild(name);

                // Display file names with download buttons
                file.files.forEach(filePath => {
                    const fileContainer = document.createElement("div");
                    fileContainer.classList.add("file-container");

                    const fileName = document.createElement("span");
                    fileName.textContent = filePath.split('/').pop();

                    const downloadBtn = document.createElement("button");
                    downloadBtn.textContent = "Download";
                    downloadBtn.onclick = () => downloadFile(filePath);

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.onclick = () => deleteFile(file.id, filePath);

                    fileContainer.appendChild(fileName);
                    fileContainer.appendChild(downloadBtn);
                    fileContainer.appendChild(deleteBtn);
                    fileItem.appendChild(fileContainer);
                });

                fileList.appendChild(fileItem);
            });
        }

        // Download file
        function downloadFile(filePath) {
            const a = document.createElement("a");
            a.href = filePath;
            a.download = filePath.split('/').pop();
            a.click();
        }

        // Delete file
        async function deleteFile(fileId, filePath) {
            if (confirm("Are you sure you want to delete this file?")) {
                try {
                    const response = await fetch("delete_file.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ id: fileId, filePath })
                    });
                    const result = await response.json();

                    if (result.success) {
                        alert("File deleted successfully.");
                        fetchFiles(); // Refresh the file list
                    } else {
                        alert(result.message);
                    }
                } catch (error) {
                    console.error("Error deleting file:", error);
                    alert("Failed to delete the file.");
                }
            }
        }

        // Fetch files on page load
        window.onload = fetchFiles;
    