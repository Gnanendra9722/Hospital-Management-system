import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash, MoreHorizontal } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { Patient } from '../types';

// Mock data for patients
const mockPatients: Patient[] = [
  {
    id: 1,
    name: 'Emma Wilson',
    age: 32,
    gender: 'female',
    bloodType: 'A+',
    phone: '(555) 123-4567',
    email: 'emma.wilson@example.com',
    address: '123 Main St, New York, NY',
    registrationDate: '2023-02-15',
    emergencyContact: 'John Wilson (Husband) - (555) 987-6543',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    age: 45,
    gender: 'male',
    bloodType: 'O-',
    phone: '(555) 234-5678',
    email: 'michael.johnson@example.com',
    address: '456 Elm St, Boston, MA',
    registrationDate: '2022-11-20',
    emergencyContact: 'Sarah Johnson (Wife) - (555) 876-5432',
  },
  {
    id: 3,
    name: 'Sophia Brown',
    age: 28,
    gender: 'female',
    bloodType: 'B+',
    phone: '(555) 345-6789',
    email: 'sophia.brown@example.com',
    address: '789 Oak St, Chicago, IL',
    registrationDate: '2023-04-05',
    emergencyContact: 'Robert Brown (Father) - (555) 765-4321',
  },
  {
    id: 4,
    name: 'William Davis',
    age: 62,
    gender: 'male',
    bloodType: 'AB+',
    phone: '(555) 456-7890',
    email: 'william.davis@example.com',
    address: '101 Pine St, San Francisco, CA',
    registrationDate: '2022-08-12',
    emergencyContact: 'Linda Davis (Wife) - (555) 654-3210',
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    age: 19,
    gender: 'female',
    bloodType: 'A-',
    phone: '(555) 567-8901',
    email: 'olivia.martinez@example.com',
    address: '202 Cedar St, Miami, FL',
    registrationDate: '2023-05-30',
    emergencyContact: 'Carlos Martinez (Father) - (555) 543-2109',
  },
  {
    id: 6,
    name: 'James Taylor',
    age: 54,
    gender: 'male',
    bloodType: 'O+',
    phone: '(555) 678-9012',
    email: 'james.taylor@example.com',
    address: '303 Birch St, Seattle, WA',
    registrationDate: '2022-12-10',
    emergencyContact: 'Emily Taylor (Daughter) - (555) 432-1098',
  }
];

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    // In a real app, you might navigate to a patient detail page
    console.log('View patient:', patient);
  };

  const handleEditPatient = (patientId: number) => {
    const patient = patients.find(p => p.id === patientId);
    setShowActionMenu(null);
    // In a real app, you'd open an edit form
    console.log('Edit patient:', patient);
  };

  const handleDeletePatient = (patientId: number) => {
    setShowActionMenu(null);
    // In a real app, you'd show a confirmation dialog
    console.log('Delete patient:', patientId);
  };

  const toggleActionMenu = (patientId: number | null) => {
    setShowActionMenu(showActionMenu === patientId ? null : patientId);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Patients" 
        description="Manage and view patient records"
      >
        <button className="btn btn-outline flex items-center gap-2">
          <Filter size={16} />
          Filter
        </button>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} />
          New Patient
        </button>
      </PageHeader>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients by name, email, or phone..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
        </div>
      </div>

      {/* Patients list */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Age</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Gender</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Blood Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Contact</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Registration Date</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id}
                  className="hover:bg-neutral-50 transition-colors cursor-pointer"
                  onClick={() => handleViewPatient(patient)}
                >
                  <td className="px-4 py-4 text-sm font-medium">{patient.name}</td>
                  <td className="px-4 py-4 text-sm">{patient.age}</td>
                  <td className="px-4 py-4 text-sm capitalize">{patient.gender}</td>
                  <td className="px-4 py-4 text-sm">{patient.bloodType}</td>
                  <td className="px-4 py-4 text-sm">
                    <div>{patient.phone}</div>
                    <div className="text-neutral-500">{patient.email}</div>
                  </td>
                  <td className="px-4 py-4 text-sm">{patient.registrationDate}</td>
                  <td className="px-4 py-4 text-sm text-center relative">
                    <button 
                      className="p-1 rounded-full hover:bg-neutral-100 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActionMenu(patient.id);
                      }}
                    >
                      <MoreHorizontal size={18} className="text-neutral-500" />
                    </button>
                    
                    {showActionMenu === patient.id && (
                      <div className="absolute right-12 top-3 bg-white shadow-dropdown rounded-md py-1 z-10 w-36 animate-fade-in">
                        <button 
                          className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-neutral-50 text-neutral-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPatient(patient.id);
                          }}
                        >
                          <Edit size={14} className="mr-2" />
                          Edit
                        </button>
                        <button 
                          className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-neutral-50 text-error-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePatient(patient.id);
                          }}
                        >
                          <Trash size={14} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="text-center py-10">
            <p className="text-neutral-500">No patients found matching your search criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-4">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-neutral-300 rounded-md text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-neutral-300 rounded-md text-sm text-neutral-700 hover:bg-neutral-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;