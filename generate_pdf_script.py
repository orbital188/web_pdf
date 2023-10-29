
import json
import sys
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf_with_reportlab(text_entries, image_path=None):
    # Define the output path for the PDF
    output_path = "./generated_output_reportlab.pdf"
    
    # Create a new PDF document
    doc = SimpleDocTemplate(output_path, pagesize=landscape(letter))
    story = []

    # Add the text entries to the PDF
    styles = getSampleStyleSheet()
    for entry in text_entries:
        story.append(Paragraph("<b>{}</b>".format(entry['title']), styles['Heading2']))
        story.append(Paragraph(entry['content'], styles['BodyText']))
        story.append(Spacer(1, 0.5*inch))

    # Add the image to the PDF if provided
    if image_path:
        img = Image(image_path, width=5*inch, height=3*inch)
        story.append(img)

    # Build the PDF
    doc.build(story)
    
    return output_path

# Read input data from the first argument
text_entries = json.loads(sys.argv[1])

# Get the image path from the second argument, if provided
image_path = sys.argv[2] if len(sys.argv) > 2 else None

# Generate the PDF using ReportLab
output_path = generate_pdf_with_reportlab(text_entries, image_path)

# Print the path to the generated PDF
print(output_path)
