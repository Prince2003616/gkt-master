import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    fetchCertificateBySlug, 
    CertificateData, 
    CertificateCourseCostPlan, 
    CertificateCourseItem 
} from '@/app/utils/api';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

const SubCertificate: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
    const [error, setError] = useState<string | null>(null); // State to hold error messages

    useEffect(() => {
        const fetchCertificateData = async () => {
            if (slug) {
                console.log('Fetching certificate for slug:', slug);
                try {
                    const data = await fetchCertificateBySlug(slug);
                    console.log('Received certificate data:', data);
                    if (data) {
                        setCertificateData(data);
                    } else {
                        setError('No data found for the provided slug.');
                    }
                } catch (err) {
                    console.error('Error fetching certificate data:', err);
                    const errorMessage = (err as Error).message || 'Unknown error';
                    setError(`Failed to fetch certificate data for slug: ${slug}. Error: ${errorMessage}. Please try again later.`);
                }
            } else {
                console.error('Slug is undefined');
                setError('Invalid certificate slug.');
            }
        };

        fetchCertificateData();
    }, [slug]);

    const handleViewCourseDetails = (courseSlug: string) => {
        navigate(`/course/${courseSlug}`);
    };

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message
    }

    if (!certificateData) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-900 pt-20">
                <div className="container mx-auto px-4 py-12">
                    {/* Top Container with Form and Certificate Details */}
                    <div className="flex flex-col lg:flex-row gap-8 mb-12">
                        {/* Left Side - Request Information Form */}
                        <div className="lg:w-1/2">
                            <div className="bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.3)] rounded-[1.5em] shadow-2xl overflow-hidden p-8 space-y-6">
                                <h2 className="text-center text-3xl font-bold text-white mb-8">Request More Information</h2>
                                <form method="POST" action="#" className="space-y-8">
                                    <div className="relative">
                                        <input
                                            placeholder="Name"
                                            className="peer h-12 w-full border-b-2 border-gray-600 text-white bg-white/5 rounded-lg px-4 placeholder-transparent focus:outline-none focus:border-purple-400 transition-all duration-300"
                                            required
                                            id="name"
                                            name="name"
                                            type="text"
                                        />
                                        <label className="absolute left-4 -top-6 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-purple-400 peer-focus:text-sm">
                                            Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            placeholder="Email"
                                            className="peer h-12 w-full border-b-2 border-gray-600 text-white bg-white/5 rounded-lg px-4 placeholder-transparent focus:outline-none focus:border-purple-400 transition-all duration-300"
                                            required
                                            id="email"
                                            name="email"
                                            type="email"
                                        />
                                        <label className="absolute left-4 -top-6 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-purple-400 peer-focus:text-sm">
                                            Email
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            placeholder="Phone No"
                                            className="peer h-12 w-full border-b-2 border-gray-600 text-white bg-white/5 rounded-lg px-4 placeholder-transparent focus:outline-none focus:border-purple-400 transition-all duration-300"
                                            required
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                        />
                                        <label className="absolute left-4 -top-6 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-purple-400 peer-focus:text-sm">
                                            Phone No
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            placeholder="Company Name"
                                            className="peer h-12 w-full border-b-2 border-gray-600 text-white bg-white/5 rounded-lg px-4 placeholder-transparent focus:outline-none focus:border-purple-400 transition-all duration-300"
                                            required
                                            id="company"
                                            name="company"
                                            type="text"
                                        />
                                        <label className="absolute left-4 -top-6 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-purple-400 peer-focus:text-sm">
                                            Company Name
                                        </label>
                                    </div>
                                    <button className="w-full py-3 px-6 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg" type="submit">
                                        Submit Request
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Side - Certificate Details */}
                        <div className="lg:w-1/2">
                            <div className="bg-gray-800 rounded-[1.5em] shadow-xl p-8 h-full flex flex-col justify-between border-2 border-[rgba(75,30,133,0.5)]">
                                <div className="space-y-6">
                                    <h1 className="text-4xl font-bold text-white leading-tight">{certificateData.title}</h1>
                                    <p className="text-gray-300 text-lg leading-relaxed">{certificateData.description}</p>
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 font-medium">Courses:</span>
                                        <span className="text-purple-400 font-semibold">
                                            {certificateData.CertificateCourseCostPlans?.[0]?.CertificateCourseItems?.length || 0}
                                        </span>
                                    </div>
                                    <button className="w-full sm:w-auto bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div className="mt-16">
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <span>Available Courses</span>
                            <div className="h-1 flex-grow bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certificateData?.CertificateCourseCostPlans?.length > 0 ? (
                                certificateData.CertificateCourseCostPlans.flatMap((plan: CertificateCourseCostPlan) => 
                                    plan.CertificateCourseItems.map((item: CertificateCourseItem) => (
                                        <div 
                                            key={item.Course.slug} 
                                            className="h-[16em] w-full border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.3)] text-white p-[1em] flex flex-col gap-[0.75em] backdrop-blur-[12px] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <h4 className="text-[2em] font-medium">{item.Course.title}</h4>
                                            <button 
                                                onClick={() => handleViewCourseDetails(item.Course.slug)}
                                                className="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:bg-purple-500/20 transition-all duration-300 cursor-pointer"
                                            >
                                                <span>View Details</span>
                                                <svg 
                                                    className="w-6 h-6 group-hover:translate-x-[10%] duration-300" 
                                                    stroke="currentColor" 
                                                    strokeWidth="1" 
                                                    viewBox="0 0 24 24" 
                                                    fill="white"
                                                >
                                                    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                )
                            ) : (
                                <div className="col-span-full text-center text-gray-400 py-12">No course items available.</div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SubCertificate;