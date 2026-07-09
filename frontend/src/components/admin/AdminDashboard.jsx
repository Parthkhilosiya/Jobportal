import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Users, Building2, FileText, ArrowRight } from 'lucide-react'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
    useGetAllAdminJobs();
    useGetAllCompanies();
    const navigate = useNavigate();
    const { allAdminJobs } = useSelector(store => store.job);
    const { companies } = useSelector(store => store.company);

    const stats = [
        {
            icon: <Briefcase className="w-8 h-8 text-blue-600" />,
            label: "Total Jobs",
            value: allAdminJobs?.length || 0,
            color: "bg-blue-50",
            borderColor: "border-blue-200"
        },
        {
            icon: <Building2 className="w-8 h-8 text-purple-600" />,
            label: "Companies",
            value: companies?.length || 0,
            color: "bg-purple-50",
            borderColor: "border-purple-200"
        },
        {
            icon: <Users className="w-8 h-8 text-green-600" />,
            label: "Applicants",
            value: allAdminJobs?.reduce((sum, job) => sum + (job?.applications?.length || 0), 0) || 0,
            color: "bg-green-50",
            borderColor: "border-green-200"
        },
        {
            icon: <FileText className="w-8 h-8 text-orange-600" />,
            label: "Active",
            value: allAdminJobs?.filter(job => job?.status !== 'closed')?.length || 0,
            color: "bg-orange-50",
            borderColor: "border-orange-200"
        }
    ];

    const quickActions = [
        { label: "Post New Job", icon: <Briefcase className="w-5 h-5" />, path: "/admin/jobs/create", color: "bg-blue-600 hover:bg-blue-700" },
        { label: "Add Company", icon: <Building2 className="w-5 h-5" />, path: "/admin/companies/create", color: "bg-purple-600 hover:bg-purple-700" },
        { label: "View All Jobs", icon: <FileText className="w-5 h-5" />, path: "/admin/jobs", color: "bg-green-600 hover:bg-green-700" },
        { label: "View Companies", icon: <Building2 className="w-5 h-5" />, path: "/admin/companies", color: "bg-orange-600 hover:bg-orange-700" }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                {/* Header */}
                <div className='mb-10'>
                    <h1 className='font-bold text-4xl text-gray-900 mb-2'>Admin Dashboard</h1>
                    <p className='text-gray-600'>Manage jobs, companies, and applications</p>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
                    {stats.map((stat, index) => (
                        <div key={index} className={`${stat.color} border-2 ${stat.borderColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}>
                            <div className='flex items-start justify-between'>
                                <div>
                                    <p className='text-gray-600 text-sm font-medium mb-2'>{stat.label}</p>
                                    <p className='text-4xl font-bold text-gray-900'>{stat.value}</p>
                                </div>
                                <div className='p-3 bg-white rounded-lg'>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-10'>
                    <h2 className='font-bold text-2xl text-gray-900 mb-6'>Quick Actions</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => navigate(action.path)}
                                className={`${action.color} text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group`}
                            >
                                {action.icon}
                                {action.label}
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Jobs Preview */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='font-bold text-2xl text-gray-900'>Recent Jobs</h2>
                        <Button onClick={() => navigate("/admin/jobs")} variant="outline">View All</Button>
                    </div>
                    <div className='space-y-3'>
                        {allAdminJobs?.slice(0, 5).map((job, index) => (
                            <div key={index} className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h3 className='font-semibold text-gray-900'>{job?.title}</h3>
                                        <p className='text-sm text-gray-600'>{job?.company?.name}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-sm font-medium text-gray-900'>{job?.applications?.length || 0} Applications</p>
                                        <p className='text-xs text-gray-500'>₹{job?.salary?.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!allAdminJobs || allAdminJobs.length === 0) && (
                            <p className='text-gray-500 text-center py-8'>No jobs posted yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
