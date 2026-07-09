import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Award } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const { appliedJobs } = useSelector(store => store.application);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                
                {/* Profile Section */}
                <div className='bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8 shadow-sm'>
                    <div className='flex items-start justify-between gap-6'>
                        <div className='flex items-start gap-6'>
                            <Avatar className="h-32 w-32 flex-shrink-0 border-4 border-blue-100">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <div className='flex-1'>
                                <h1 className='font-bold text-3xl text-gray-900 mb-1'>{user?.fullname}</h1>
                                <p className='text-gray-600 text-base mb-4 max-w-lg'>{user?.profile?.bio || 'No bio added yet'}</p>
                                
                                {/* Contact Information */}
                                <div className='space-y-3 mb-6'>
                                    <div className='flex items-center gap-3 text-gray-700'>
                                        <Mail className="w-5 h-5 text-blue-600" />
                                        <span className='text-sm'>{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-gray-700'>
                                        <Contact className="w-5 h-5 text-blue-600" />
                                        <span className='text-sm'>{user?.phoneNumber}</span>
                                    </div>
                                </div>

                                {/* Badge - Role */}
                                <div className='flex items-center gap-2 mb-4'>
                                    <Badge className='bg-blue-100 text-blue-800 capitalize'>{user?.role}</Badge>
                                </div>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                        >
                            <Pen className='w-4 h-4 mr-2' />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Skills Section */}
                    <div className='mt-8 pt-8 border-t border-gray-200'>
                        <div className='flex items-center gap-2 mb-4'>
                            <Award className="w-5 h-5 text-purple-600" />
                            <h2 className='font-bold text-lg text-gray-900'>Skills</h2>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {
                                user?.profile?.skills && user?.profile?.skills.length > 0 
                                    ? user?.profile?.skills.map((item, index) => (
                                        <Badge 
                                            key={index} 
                                            className='bg-purple-100 text-purple-800 px-3 py-1.5 text-sm'
                                        >
                                            {item}
                                        </Badge>
                                      ))
                                    : <span className='text-gray-500 italic'>No skills added yet</span>
                            }
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className='mt-8 pt-8 border-t border-gray-200'>
                        <div className='flex items-center gap-2 mb-4'>
                            <FileText className="w-5 h-5 text-green-600" />
                            <h2 className='font-bold text-lg text-gray-900'>Resume</h2>
                        </div>
                        {
                            user?.profile?.resume 
                                ? <a 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                    href={user?.profile?.resume} 
                                    className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                                  >
                                    <FileText className='w-4 h-4' />
                                    {user?.profile?.resumeOriginalName || 'Download Resume'}
                                  </a>
                                : <span className='text-gray-500 italic'>No resume uploaded</span>
                        }
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm'>
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <h2 className='font-bold text-2xl text-gray-900'>Applied Jobs</h2>
                            <p className='text-gray-600 text-sm mt-1'>You have applied to {appliedJobs?.length || 0} job(s)</p>
                        </div>
                    </div>
                    
                    {/* Applied Job Table */}
                    <div className='overflow-x-auto'>
                        <AppliedJobTable />
                    </div>
                    
                    {(!appliedJobs || appliedJobs.length === 0) && (
                        <div className='text-center py-12'>
                            <p className='text-gray-500 text-base'>You haven't applied to any jobs yet.</p>
                            <Button className='mt-4 bg-blue-600 hover:bg-blue-700'>
                                Browse Jobs
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile