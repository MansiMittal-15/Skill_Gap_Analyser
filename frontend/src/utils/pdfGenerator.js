import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate a PDF from analysis data
export const generateAnalysisPDF = async (analysisData, targetRole) => {
  // Create a new PDF document
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let y = margin;

  // Add title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(0, 102, 255); // Primary blue color
  pdf.text("AI-Powered Skill Gap Analysis", pageWidth / 2, y, { align: 'center' });
  y += 10;

  // Add target role
  pdf.setFontSize(14);
  pdf.setTextColor(70, 70, 70);
  pdf.text(`Target Role: ${targetRole}`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Add date
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Helper function to add a section title
  const addSectionTitle = (title) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(30, 30, 30);
    pdf.text(title, margin, y);
    y += 7;
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(0, 102, 255);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 7;
  };

  // Helper function to add text with potential page break
  const addText = (text, fontSize = 11, isBold = false) => {
    pdf.setFont("helvetica", isBold ? "bold" : "normal");
    pdf.setFontSize(fontSize);
    pdf.setTextColor(50, 50, 50);
    
    // Check if we need a new page
    if (y > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
    
    // Handle long text with line breaks
    const textLines = pdf.splitTextToSize(text, pageWidth - (2 * margin));
    pdf.text(textLines, margin, y);
    y += (textLines.length * fontSize * 0.353) + 3; // Approximate height calculation plus spacing
  };
  
  // Helper function to add a list of items
  const addList = (items, prefix = "• ") => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(50, 50, 50);
    
    items.forEach(item => {
      // Check if we need a new page
      if (y > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      const textLines = pdf.splitTextToSize(prefix + item, pageWidth - (2 * margin) - 5);
      pdf.text(textLines, margin + 5, y);
      y += (textLines.length * 11 * 0.353) + 3;
    });
  };

  // Current Skills
  if (analysisData.extractedSkills?.length > 0) {
    addSectionTitle("Your Current Skills");
    addList(analysisData.extractedSkills);
    y += 5;
  }

  // Missing Skills
  if (analysisData.missingSkills?.length > 0) {
    addSectionTitle("Skills to Develop");
    addList(analysisData.missingSkills);
    y += 5;
  }

  // Recommended Certifications by Skill
  if (analysisData.recommendedCertifications && Object.keys(analysisData.recommendedCertifications).length > 0) {
    addSectionTitle("Recommended Certifications by Skill");
    
    Object.entries(analysisData.recommendedCertifications).forEach(([skill, certifications]) => {
      if (y > pageHeight - margin - 20) {
        pdf.addPage();
        y = margin;
      }
      
      addText(skill, 12, true);
      if (certifications.length > 0) {
        addList(certifications, "  - ");
      } else {
        addText("No specific certifications recommended", 10);
      }
      y += 3;
    });
    
    y += 5;
  }

  // Course Recommendations
  if (analysisData.recommendations?.courses?.length > 0) {
    addSectionTitle("Recommended Courses");
    
    analysisData.recommendations.courses.forEach(course => {
      if (y > pageHeight - margin - 25) {
        pdf.addPage();
        y = margin;
      }
      
      addText(course.name, 12, true);
      addText(`Platform: ${course.platform}`, 10);
      addText(course.description);
      if (course.url) {
        addText(`URL: ${course.url}`, 9);
      }
      y += 5;
    });
    
    y += 5;
  }

  // Certification Recommendations
  if (analysisData.recommendations?.certifications?.length > 0) {
    addSectionTitle("Recommended Certifications");
    
    analysisData.recommendations.certifications.forEach(cert => {
      if (y > pageHeight - margin - 25) {
        pdf.addPage();
        y = margin;
      }
      
      addText(cert.name, 12, true);
      addText(`Issuer: ${cert.issuer}`, 10);
      addText(cert.description);
      y += 5;
    });
    
    y += 5;
  }

  // Additional Resources
  if (analysisData.recommendations?.resources?.length > 0) {
    addSectionTitle("Additional Resources");
    
    analysisData.recommendations.resources.forEach(resource => {
      if (y > pageHeight - margin - 25) {
        pdf.addPage();
        y = margin;
      }
      
      addText(resource.name, 12, true);
      addText(`Type: ${resource.type}`, 10);
      addText(resource.description);
      if (resource.url) {
        addText(`URL: ${resource.url}`, 9);
      }
      y += 5;
    });
  }

  // Add footer with page numbers
  const totalPages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  // Save the PDF
  const filename = `Skill_Gap_Analysis_${targetRole.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(filename);
  
  return filename;
}; 