const express = require('express');
const fs = require('fs');
const { execSync } = require('child_process');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/export', upload.single('image'), (req, res) => {
    const textEntries = JSON.parse(req.body.textEntries);
    let imagePath;
    if (req.file) {
        imagePath = './uploaded_image_temp.jpg';
        fs.writeFileSync(imagePath, req.file.buffer);
    }

    const text = req.body.text;

    // Call the Python function to generate the PDF
    try {
        const output = execSync('python3 generate_pdf_script.py', {
            input: JSON.stringify(text),
            encoding: 'utf-8'
        });

        // Send the generated PDF as a response
        res.download(output.trim());
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        console.error(error.stack);
        res.status(500).send('Error generating PDF: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

