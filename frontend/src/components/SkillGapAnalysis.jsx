import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRobot, FaUpload, FaBrain, FaLightbulb, FaCertificate, FaChartLine, FaUserGraduate, FaFilePdf, FaDownload, FaStar } from 'react-icons/fa';
import { generateAnalysisPDF } from '../utils/pdfGenerator';
import Header from './Header';
import Footer from './Footer';

const SkillGapAnalysis = () => {
    const [resume, setResume] = useState(null);
    const [targetRole, setTargetRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [credits, setCredits] = useState(null);
    const [analysisTypes, setAnalysisTypes] = useState({
        missingSkills: true,
        courses: true,
        certifications: true,
        resources: true
    });
    const [creditCost, setCreditCost] = useState(0);
    const [pdfGenerating, setPdfGenerating] = useState(false);
    const [pdfSuccess, setPdfSuccess] = useState(false);
    const navigate = useNavigate();

    // Fetch user's credit balance if logged in
    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await axios.get(`http://localhost:8000/api/v1/credits/${userId}`);
                    setCredits(response.data.credits);
                }
            } catch (err) {
                console.error('Error fetching credits:', err);
            }
        };
        
        fetchCredits();
    }, []);

    // Calculate estimated credit cost based on selected analysis types
    useEffect(() => {
        let cost = 5; // Base cost for analysis
        
        if (analysisTypes.missingSkills) cost += 9;
        if (analysisTypes.courses) cost += 9;
        if (analysisTypes.certifications) cost += 15;
        if (analysisTypes.resources) cost += 15;
        
        setCreditCost(cost);
    }, [analysisTypes]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'text/plain')) {
            setResume(file);
            setError(null);
        } else {
            setError('Please upload a PDF or text file');
            setResume(null);
        }
    };

    const handleAnalysisTypeChange = (type) => {
        setAnalysisTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume || !targetRole) {
            setError('Please provide both resume and target role');
            return;
        }

        // Check if user has enough credits
        const userId = localStorage.getItem('userId');
        if (userId && credits !== null && credits < creditCost) {
            setError(`Insufficient credits. You need ${creditCost} credits but only have ${credits}.`);
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('targetRole', targetRole);
        
        // Add user ID if available
        if (userId) {
            formData.append('userId', userId);
        }
        
        // Add selected analysis types
        const selectedTypes = Object.keys(analysisTypes).filter(type => analysisTypes[type]);
        formData.append('analysisType', JSON.stringify(selectedTypes));

        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.data) {
                throw new Error("Empty response from backend");
            }

            setAnalysis(response.data);
            
            // Update credits if provided in response
            if (response.data.creditsRemaining !== undefined) {
                setCredits(response.data.creditsRemaining);
            }
        } catch (err) {
            console.error('Upload failed:', err);

            if (err.response) {
                setError(`Server Error: ${err.response.data?.error || 'Unknown error'}`);
            } else if (err.request) {
                setError('No response from server. Please ensure the backend is running.');
            } else {
                setError(`Client Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle PDF generation
    const handleGeneratePDF = async () => {
        try {
            setPdfGenerating(true);
            setPdfSuccess(false);
            await generateAnalysisPDF(analysis, targetRole);
            setPdfSuccess(true);
            setTimeout(() => setPdfSuccess(false), 3000); // Hide success message after 3 seconds
        } catch (error) {
            console.error("Error generating PDF:", error);
            setError("Failed to generate PDF. Please try again.");
        } finally {
            setPdfGenerating(false);
        }
    };

    return (
        <>
        <Header/>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-8 transform hover:scale-105 transition-transform duration-300">
                    <FaRobot className="text-5xl text-white" />
                </div>
                <h1 className="text-6xl font-extrabold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        AI-Powered
                    </span>
                    <span className="text-white"> Skill Gap Analysis</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Our cutting-edge artificial intelligence analyzes your resume, identifies skill gaps, and provides personalized recommendations to accelerate your career growth.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <div className="flex items-center text-yellow-400">
                        <FaStar className="text-xl" />
                        <FaStar className="text-xl" />
                        <FaStar className="text-xl" />
                        <FaStar className="text-xl" />
                        <FaStar className="text-xl" />
                    </div>
                    <span className="text-gray-400">Trusted by professionals worldwide</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                    {/* Credit display */}
                    {credits !== null && (
                        <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <FaBrain className="text-xl mr-2" />
                                <span className="font-medium">AI Credit Balance:</span>
                            </div>
                            <span className="text-xl font-bold">{credits}</span>
                        </div>
                    )}

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Resume Upload */}
                            <div className="bg-white/5 p-6 rounded-xl border-2 border-dashed border-white/20 transition-all hover:border-blue-400/50">
                                <label className="text-lg font-medium text-white mb-4 flex items-center justify-center">
                                    <FaUpload className="mr-2 text-blue-400" />
                                    Upload Your Resume
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.txt"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="resume-upload"
                                />
                                <label htmlFor="resume-upload" className="w-full flex flex-col items-center justify-center cursor-pointer">
                                    <div className="w-full bg-white/10 p-4 rounded-lg text-center border border-white/10 hover:bg-white/20 transition-all">
                                        <p className="text-gray-300">Drag and drop your resume or click to browse</p>
                                        <p className="text-sm text-gray-400 mt-1">PDF or Text files only</p>
                                    </div>
                                </label>
                                {resume && (
                                    <div className="mt-4 p-3 bg-white/10 rounded-lg border border-green-200/20 flex items-center">
                                        <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                                            <FaUpload className="text-green-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{resume.name}</p>
                                            <p className="text-sm text-gray-400">{(resume.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Target Role Input */}
                            <div>
                                <label className="text-lg font-medium text-white mb-2 flex items-center">
                                    <FaUserGraduate className="mr-2 text-blue-400" />
                                    Target Role
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        placeholder="e.g., Full Stack Developer, Data Scientist, Product Manager..."
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 focus:border-blue-400 focus:ring focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        Press Enter to Analyze
                                    </div>
                                </div>
                            </div>

                            {/* Analysis Type Selection */}
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <label className="text-lg font-medium text-white mb-4 flex items-center">
                                    <FaLightbulb className="mr-2 text-blue-400" />
                                    Analysis Options
                                </label>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {Object.entries(analysisTypes).map(([type, isSelected]) => (
                                        <div 
                                            key={type}
                                            className={`p-4 rounded-lg border transition-all ${
                                                isSelected 
                                                ? 'bg-blue-500/20 border-blue-400/50' 
                                                : 'bg-white/5 border-white/10'
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={type}
                                                    checked={isSelected}
                                                    onChange={() => handleAnalysisTypeChange(type)}
                                                    className="h-5 w-5 text-blue-400 focus:ring-blue-400 border-white/20 rounded bg-white/10"
                                                />
                                                <label htmlFor={type} className="ml-3 block text-sm font-medium text-white">
                                                    <div className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {type === 'missingSkills' ? 'Identify skill gaps' :
                                                         type === 'courses' ? 'Personalized course suggestions' :
                                                         type === 'certifications' ? 'Industry-recognized certifications' :
                                                         'Helpful tools and materials'}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 p-3 bg-blue-500/20 rounded-lg text-center border border-blue-400/50">
                                    <p className="text-sm text-white">
                                        Total cost: <span className="font-bold text-blue-400">{creditCost}</span> credits
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-500/20 border border-red-400/50 text-red-400 px-6 py-4 rounded-lg">
                                    <p className="font-medium">Error</p>
                                    <p className="text-sm mt-1">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-4 px-6 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="relative z-10">Analyzing Resume...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaBrain className="mr-2 relative z-10" />
                                        <span className="relative z-10">Analyze Skills ({creditCost} credits)</span>
                                        <FaStar className="absolute right-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </>
                                )}
                            </button>
                        </form>

                        {analysis && (
                            <div className="mt-12 space-y-8">
                                {/* Credit usage information */}
                                {analysis.creditCost && (
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <p className="text-sm text-green-700 flex items-center">
                                            <FaChartLine className="mr-2" />
                                            <span className="font-medium">Credits used:</span> {analysis.creditCost}
                                            {analysis.creditsRemaining !== undefined && 
                                                ` (${analysis.creditsRemaining} credits remaining)`}
                                        </p>
                                    </div>
                                )}

                                {/* Download PDF Button */}
                                <div className="flex justify-end">
                                    <div className="relative">
                                        <button
                                            onClick={handleGeneratePDF}
                                            disabled={pdfGenerating}
                                            className={`flex items-center px-4 py-2 rounded-lg shadow-md transition-colors ${
                                                pdfGenerating 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : pdfSuccess 
                                                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                        >
                                            {pdfGenerating ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Generating PDF...
                                                </>
                                            ) : pdfSuccess ? (
                                                <>
                                                    <FaDownload className="mr-2" />
                                                    PDF Downloaded!
                                                </>
                                            ) : (
                                                <>
                                                    <FaFilePdf className="mr-2" />
                                                    Download PDF Report
                                                </>
                                            )}
                                        </button>
                                        
                                        {/* Success tooltip */}
                                        {pdfSuccess && (
                                            <div className="absolute top-full mt-2 right-0 bg-green-100 text-green-800 text-sm py-1 px-3 rounded shadow-md">
                                                PDF successfully generated!
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Results Section */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                        <FaBrain className="text-blue-600 mr-2" />
                                        Analysis Results
                                    </h2>
                                    
                                    {analysis.extractedSkills?.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-medium text-gray-800 mb-4">Your Current Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.extractedSkills.map((skill, index) => (
                                                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {analysis.missingSkills?.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-medium text-gray-800 mb-4">Skills to Develop</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.missingSkills.map((skill, index) => (
                                                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {analysis.recommendedCertifications && Object.keys(analysis.recommendedCertifications).length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                                                <FaCertificate className="text-blue-600 mr-2" />
                                                Recommended Certifications by Skill
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {Object.entries(analysis.recommendedCertifications).map(([skill, certifications]) => (
                                                    <div key={skill} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                        <h4 className="font-bold text-gray-800 mb-2">{skill}</h4>
                                                        {certifications.length > 0 ? (
                                                            <ul className="space-y-1">
                                                                {certifications.map((cert, index) => (
                                                                    <li key={index} className="text-gray-600 text-sm flex items-start">
                                                                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                                                                        {cert}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-gray-500 text-sm">No specific certifications recommended</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {analysis.recommendations && (
                                        <>
                                            {analysis.recommendations.courses?.length > 0 && (
                                                <div className="mb-8">
                                                    <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                                                        <FaUserGraduate className="text-blue-600 mr-2" />
                                                        Recommended Courses
                                                    </h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {analysis.recommendations.courses.map((course, index) => (
                                                            <div key={index} className="recommendation-card p-4">
                                                                <h4 className="font-bold text-gray-800">{course.name}</h4>
                                                                <p className="text-sm text-blue-600 mt-1">{course.platform}</p>
                                                                <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                                                                <a href={course.url} target="_blank" rel="noopener noreferrer" 
                                                                   className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                                                    View Course
                                                                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {analysis.recommendations.certifications?.length > 0 && (
                                                <div className="mb-8">
                                                    <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                                                        <FaCertificate className="text-blue-600 mr-2" />
                                                        Recommended Certifications
                                                    </h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {analysis.recommendations.certifications.map((cert, index) => (
                                                            <div key={index} className="certification-card bg-white p-4 rounded-lg shadow-sm">
                                                                <h4 className="font-bold text-gray-800">{cert.name}</h4>
                                                                <p className="text-sm text-blue-600 mt-1">{cert.issuer}</p>
                                                                <p className="text-sm text-gray-600 mt-2">{cert.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {analysis.recommendations.resources?.length > 0 && (
                                                <div>
                                                    <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                                                        <FaLightbulb className="text-blue-600 mr-2" />
                                                        Additional Resources
                                                    </h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {analysis.recommendations.resources.map((resource, index) => (
                                                            <div key={index} className="resource-card bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                                                <h4 className="font-bold text-gray-800">{resource.name}</h4>
                                                                <p className="text-sm text-blue-600 mt-1">{resource.type}</p>
                                                                <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
                                                                <a href={resource.url} target="_blank" rel="noopener noreferrer" 
                                                                   className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                                                    View Resource
                                                                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
            @keyframes blob {
                0% {
                    transform: translate(0px, 0px) scale(1);
                }
                33% {
                    transform: translate(30px, -50px) scale(1.1);
                }
                66% {
                    transform: translate(-20px, 20px) scale(0.9);
                }
                100% {
                    transform: translate(0px, 0px) scale(1);
                }
            }
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
            .animation-delay-4000 {
                animation-delay: 4s;
            }
        `}</style>
        <Footer />
        </>
    );
};

export default SkillGapAnalysis;
