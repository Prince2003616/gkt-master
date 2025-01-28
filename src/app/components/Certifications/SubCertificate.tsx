import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setCookie, getCookie } from "@/app/utils/cookies";
import {
    fetchCertificateBySlug,
    CertificateData,
    CertificateCourseCostPlan,
    CertificateCourseItem,
} from '@/app/utils/api';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

const SubCertificate: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    // const navigate = useNavigate();
    const router = useRouter();

    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificateData = async () => {
            if (slug) {
                try {
                    const data = await fetchCertificateBySlug(slug);
                    const cookiesToSet = {
                        visited_certificate: data.title,
                        visited_time: new Date().toISOString(),
                        message: "Visited certificate page",
                      };
                      setCookie("visited_certificate", JSON.stringify(cookiesToSet), 7);
                      console.log(cookiesToSet.message);
                    if (data) {
                        setCertificateData(data);
                    } else {
                        setError('No data found for the provided slug.');
                    }
                } catch (err) {
                    const errorMessage = (err as Error).message || 'Unknown error';
                    setError(`Failed to fetch certificate data. Error: ${errorMessage}`);
                }
            } else {
                setError('Invalid certificate slug.');
            }
        };

        fetchCertificateData();
    }, [slug]);

    const handleViewCourseDetails = (courseSlug: string) => {
        router.push(`/coursepage2/${courseSlug}`)
    };

    if (error) {
        return <div className="text-red-500 text-center py-12">{error}</div>;
    }

    if (!certificateData) {
        return <div className="text-white text-center py-16 animate-pulse">Loading...</div>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-900 pt-20">
                <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Top Section */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-10">
                        {/* Left Side - Form */}
                        <div className="lg:w-1/2">
                            <div className="bg-gradient-to-br from-purple-800 to-purple-500/30 rounded-lg shadow-lg overflow-hidden p-6 space-y-4">
                                <h2 className="text-center text-2xl font-bold text-white mb-6">Request More Information</h2>
                                <form method="POST" action="#" className="space-y-4">
                                    {['Name', 'Email', 'Phone No', 'Company Name'].map((label) => (
                                        <div className="relative" key={label}>
                                            <input
                                                placeholder={label}
                                                className="peer h-10 w-full border-b-2 border-gray-600 text-white bg-white/5 rounded px-3 placeholder-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                required
                                                id={label.toLowerCase().replace(' ', '-')}
                                                name={label.toLowerCase().replace(' ', '-')}
                                                type={label === 'Email' ? 'email' : label === 'Phone No' ? 'tel' : 'text'}
                                            />
                                            <label className="absolute left-3 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-purple-400 peer-focus:text-sm">
                                                {label}
                                            </label>
                                        </div>
                                    ))}
                                    <button className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transform hover:scale-105 transition-all duration-300 shadow">
                                        Submit Request
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Side - Certificate Details */}
                        <div className="lg:w-1/2">
                            <div className="bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col justify-between border-2 border-purple-500/50">
                                <div className="space-y-4">
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight">
                                        {certificateData.title}
                                    </h1>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {certificateData.description}
                                    </p>
                                </div>
                                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 font-medium">Courses:</span>
                                        <span className="text-purple-400 font-semibold">
                                            {certificateData.CertificateCourseCostPlans?.[0]?.CertificateCourseItems?.length || 0}
                                        </span>
                                    </div>
                                    <button className="w-full sm:w-auto bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transform hover:scale-105 transition-all duration-300 shadow">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span>Available Courses</span>
                            <div className="h-1 flex-grow bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificateData.CertificateCourseCostPlans?.length > 0 ? (
                                certificateData.CertificateCourseCostPlans.flatMap((plan: CertificateCourseCostPlan) =>
                                    plan.CertificateCourseItems.map((item: CertificateCourseItem) => (
                                        <div
                                            key={item.Course.slug}
                                            className="h-36 w-full border-2 border-purple-500/50 rounded-lg bg-gradient-to-br from-purple-800 to-purple-500/30 text-white p-4 flex flex-col gap-2 backdrop-blur-lg hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                                        >
                                            <h4 className="text-lg font-medium">{item.Course.title}</h4>
                                            <button
                                                onClick={() => handleViewCourseDetails(item.Course.slug)}
                                                className="w-fit text- px-4 py-1 border border-purple-400 rounded-full hover:bg-purple-500/20 transition-all duration-300"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    ))
                                )
                            ) : (
                                <div className="col-span-full text-center text-gray-400 py-8">No course items available.</div>
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
