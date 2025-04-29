import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SkillGapAnalysis = () => {
    const [resume, setResume] = useState(null);
    const [targetRole, setTargetRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume || !targetRole) {
            setError('Please provide both resume and target role');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('targetRole', targetRole);

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

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Gap Analysis</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Resume (PDF or Text)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.txt"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                            {resume && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Selected file: {resume.name} ({(resume.size / 1024).toFixed(2)} KB)
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Target Role
                            </label>
                            <input
                                type="text"
                                value={targetRole}
                                onChange={(e) => setTargetRole(e.target.value)}
                                placeholder="e.g., Full Stack Developer"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                                <p className="font-medium">Error</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Analyzing...' : 'Analyze Skills'}
                        </button>
                    </form>

                    {analysis && (
                        <div className="mt-8 space-y-6">
                            {analysis.extractedSkills?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Extracted Skills</h3>
                                    <ul className="mt-2 list-disc list-inside">
                                        {analysis.extractedSkills.map((skill, index) => (
                                            <li key={index} className="text-gray-600">{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {analysis.missingSkills?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Missing Skills</h3>
                                    <ul className="mt-2 list-disc list-inside">
                                        {analysis.missingSkills.map((skill, index) => (
                                            <li key={index} className="text-gray-600">{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {analysis.recommendedCertifications && Object.keys(analysis.recommendedCertifications).length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Recommended Certifications by Skill</h3>
                                    <div className="mt-2 space-y-4">
                                        {Object.entries(analysis.recommendedCertifications).map(([skill, certifications]) => (
                                            <div key={skill} className="bg-gray-50 p-4 rounded-md">
                                                <h4 className="font-medium text-gray-900">{skill}</h4>
                                                {certifications.length > 0 ? (
                                                    <ul className="mt-2 list-disc list-inside">
                                                        {certifications.map((cert, index) => (
                                                            <li key={index} className="text-gray-600">{cert}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-500 text-sm mt-1">No specific certifications recommended</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {analysis.recommendations && (
                                <>
                                    {analysis.recommendations.courses?.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">Recommended Courses</h3>
                                            <div className="mt-2 grid gap-4">
                                                {analysis.recommendations.courses.map((course, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                                                        <h4 className="font-medium text-gray-900">{course.name}</h4>
                                                        <p className="text-sm text-gray-500">{course.platform}</p>
                                                        <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                                                        <a href={course.url} target="_blank" rel="noopener noreferrer" 
                                                           className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
                                                            View Course
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {analysis.recommendations.certifications?.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">Recommended Certifications</h3>
                                            <div className="mt-2 grid gap-4">
                                                {analysis.recommendations.certifications.map((cert, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                                                        <h4 className="font-medium text-gray-900">{cert.name}</h4>
                                                        <p className="text-sm text-gray-500">{cert.issuer}</p>
                                                        <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {analysis.recommendations.resources?.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">Additional Resources</h3>
                                            <div className="mt-2 grid gap-4">
                                                {analysis.recommendations.resources.map((resource, index) => (
                                                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                                                        <h4 className="font-medium text-gray-900">{resource.name}</h4>
                                                        <p className="text-sm text-gray-500">{resource.type}</p>
                                                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" 
                                                           className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
                                                            View Resource
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillGapAnalysis;
