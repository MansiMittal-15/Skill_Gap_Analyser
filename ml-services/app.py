# ml-service/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import nltk
from nltk.corpus import stopwords
import string

# Setup
app = Flask(__name__)
CORS(app)

# Load NLP Model
nlp = spacy.load('en_core_web_sm')
nltk.download('stopwords')

# Dummy Certifications Data (Expand as necessary)
certifications_database = {
    "Python": ["Python for Everybody", "Google IT Automation with Python"],
    "SQL": ["SQL for Data Science", "Database Management Certification"],
    "JavaScript": ["JavaScript Algorithms and Data Structures", "Frontend Developer Certification"],
}

# Predefined Skills Database
skills_database = ["Python", "SQL", "JavaScript", "Node.js", "React", "HTML", "CSS", "MongoDB", "Express.js"]

# Extract skills from resume text
def extract_skills(resume_text):
    doc = nlp(resume_text)
    tokens = [token.text for token in doc if token.is_alpha and not token.is_stop]
    
    extracted = [token for token in tokens if token in skills_database]
    return list(set(extracted))

# Analyze gaps between skills
def find_skill_gaps(extracted_skills, target_skills):
    return [skill for skill in target_skills if skill not in extracted_skills]

# Recommend certifications based on missing skills
def recommend_certifications(missing_skills):
    return {skill: certifications_database.get(skill, []) for skill in missing_skills}

# Root route for testing
@app.route('/')
def home():
    return jsonify({"message": "Resume Analysis API is running"})

# Route to analyze resume
@app.route('/analyze', methods=['POST'])
def analyze_resume():
    data = request.get_json()
    resume_text = data.get('resumeText', '')
    target_role = data.get('targetRole', '')

    # Dummy target role and required skills
    role_skills = {
        "Full Stack Developer": ["JavaScript", "React", "Node.js", "MongoDB", "HTML", "CSS"]
    }

    target_skills = role_skills.get(target_role, [])
    extracted_skills = extract_skills(resume_text)
    missing_skills = find_skill_gaps(extracted_skills, target_skills)
    recommended_certifications = recommend_certifications(missing_skills)

    result = {
        "extractedSkills": extracted_skills,
        "missingSkills": missing_skills,
        "recommendedCertifications": recommended_certifications
    }
    
    return jsonify(result)

# Run Flask App
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
