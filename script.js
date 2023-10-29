
function exportText() {
    // Collect all textareas
    const textareas = document.querySelectorAll('textarea');
    
    // Extract text from each textarea
    let textEntries = [];
    textareas.forEach((textarea, index) => {
        const titleElement = document.querySelector(`h3:nth-child(${2*index + 1})`);
        const title = titleElement ? titleElement.innerText : `Title ${index + 1}`;
        textEntries.push({
            title: title,
            content: textarea.value
        });
    });

    // Create a FormData object to send text and image data
    const formData = new FormData();
    formData.append("textEntries", JSON.stringify(textEntries));
    const imageFile = document.getElementById('imageUpload').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    // Send data to the server
    fetch('/export', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        // Create a new object URL and point the browser to it
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_text.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
