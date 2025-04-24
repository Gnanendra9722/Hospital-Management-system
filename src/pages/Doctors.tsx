import React, { useState } from 'react';
import { Search, Plus, Filter, Star, Mail, Phone } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { Doctor } from '../types';

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    experience: 12,
    phone: '(555) 123-4567',
    email: 'john.smith@hospital.com',
    availability: [
      { day: 'monday', startTime: '09:00', endTime: '17:00' },
      { day: 'wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'friday', startTime: '09:00', endTime: '13:00' },
    ],
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Dr. Sarah Adams',
    specialization: 'Neurology',
    experience: 8,
    phone: '(555) 234-5678',
    email: 'sarah.adams@hospital.com',
    availability: [
      { day: 'tuesday', startTime: '08:00', endTime: '16:00' },
      { day: 'thursday', startTime: '08:00', endTime: '16:00' },
      { day: 'saturday', startTime: '10:00', endTime: '14:00' },
    ],
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    experience: 15,
    phone: '(555) 345-6789',
    email: 'james.wilson@hospital.com',
    availability: [
      { day: 'monday', startTime: '10:00', endTime: '18:00' },
      { day: 'tuesday', startTime: '10:00', endTime: '18:00' },
      { day: 'thursday', startTime: '10:00', endTime: '18:00' },
    ],
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    id: 4,
    name: 'Dr. Emily Clark',
    specialization: 'Pediatrics',
    experience: 10,
    phone: '(555) 456-7890',
    email: 'emily.clark@hospital.com',
    availability: [
      { day: 'wednesday', startTime: '08:00', endTime: '16:00' },
      { day: 'friday', startTime: '08:00', endTime: '16:00' },
      { day: 'saturday', startTime: '09:00', endTime: '13:00' },
    ],
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: 5,
    name: 'Dr. Michael Brown',
    specialization: 'Dermatology',
    experience: 7,
    phone: '(555) 567-8901',
    email: 'michael.brown@hospital.com',
    availability: [
      { day: 'monday', startTime: '09:00', endTime: '17:00' },
      { day: 'wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'friday', startTime: '09:00', endTime: '13:00' },
    ],
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    id: 6,
    name: 'Dr. Lisa Johnson',
    specialization: 'Ophthalmology',
    experience: 9,
    phone: '(555) 678-9012',
    email: 'lisa.johnson@hospital.com',
    availability: [
      { day: 'tuesday', startTime: '08:30', endTime: '16:30' },
      { day: 'thursday', startTime: '08:30', endTime: '16:30' },
      { day: 'saturday', startTime: '10:00', endTime: '14:00' },
    ],
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
  }
];

const Doctors: React.FC = () => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');

  // Get unique specializations for filter
  const specializations = ['All', ...new Set(doctors.map(doctor => doctor.specialization))];

  // Filter doctors based on search term and specialization
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialization(e.target.value);
  };

  // Format availability days to be more readable
  const formatAvailability = (doctor: Doctor) => {
    const days = doctor.availability.map(a => {
      const day = a.day.charAt(0).toUpperCase() + a.day.slice(1);
      return `${day} (${a.startTime}-${a.endTime})`;
    });
    return days.join(', ');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Doctors" 
        description="View and manage medical staff"
      >
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Doctor
        </button>
      </PageHeader>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative md:flex-1">
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
        </div>
        <div className="flex gap-4">
          <div className="w-64">
            <select 
              className="form-input"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
            >
              {specializations.map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization === 'All' ? 'All Specializations' : specialization}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Doctors grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img 
                src={doctor.avatar} 
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
              />
              <div>
                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {doctor.specialization}
                  </span>
                  <span className="ml-2 flex items-center text-xs text-neutral-500">
                    <Star size={12} className="text-yellow-400 mr-1" fill="#facc15" />
                    {doctor.experience} years exp
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-start">
                <Mail size={16} className="text-neutral-400 mr-2 mt-0.5" />
                <p className="text-sm text-neutral-600">{doctor.email}</p>
              </div>
              <div className="flex items-start mt-2">
                <Phone size={16} className="text-neutral-400 mr-2 mt-0.5" />
                <p className="text-sm text-neutral-600">{doctor.phone}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Availability</h4>
              <p className="text-sm">{formatAvailability(doctor)}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between">
              <button className="btn btn-outline text-sm px-3 py-1">View Profile</button>
              <button className="btn btn-primary text-sm px-3 py-1">Schedule</button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-neutral-500">No doctors found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;