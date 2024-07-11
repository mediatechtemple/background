import React, { useState, useEffect } from 'react';
import { Button, Modal, Grid } from '@mui/material';
import { BsPlus, BsDownload } from 'react-icons/bs';
import NewClientForm from '../../app/admin/companies/companies-components/NewClientForm';
import CompaniesList from '../../app/admin/companies/companies-components/CompaniesList';
import { _getAll } from '@/utils/apiUtils'; // Assuming BASE_URL is already set in apiUtils
import axios from 'axios';
import Link from 'next/link';

function DashboardBody() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientListData, setClientListData] = useState([]);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Simulating userRole for testing, replace with actual logic
        setUserRole('1'); // Example: Set userRole based on your logic

        // Fetch client list data on component mount
        updateCandidateListByClientId();
    }, []);

    const handleOpenModal = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
        setIsModalOpen(false);
    };

    const updateCandidateListByClientId = async () => {
        try {
            // Simulate client ID fetch logic, replace with actual implementation
            const clientId = 'example_client_id'; // Replace with actual client ID logic if needed

            // Fetch client list data
            const response = await _getAll(`/client/${clientId}/candidates`);
            setClientListData(response);
        } catch (error) {
            console.error('Failed to fetch client data. Please try again later.', error);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div style={{ margin: "10px" }}>
                    {/* Placeholder for additional buttons or elements */}
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ margin: "10px" }}>
                        <Button
                            variant="contained"
                            startIcon={<BsDownload style={{ fontSize: '1.2em' }} />}
                        >
                            Download as Excel
                        </Button>
                    </div>
                    <div style={{ margin: "10px" }}>
                        {userRole === '1' && (
                            <Button
                                variant="contained"
                                startIcon={<BsPlus style={{ fontSize: '1.2em' }} />}
                                onClick={() => handleOpenModal(null)}
                            >
                                New Company
                            </Button>
                        )}
                        {userRole === '2' && (
                            <Link href="/admin/candidates/add-candidates" passHref style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    startIcon={<BsPlus style={{ fontSize: '1.2em' }} />}
                                >
                                    New Candidate
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <CompaniesList 
                clientListData={clientListData}
                onEdit={handleOpenModal} 
                onAdd={handleOpenModal} 
                updateClientList={updateCandidateListByClientId} 
            />
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
            >
                <Grid>
                    <Grid>
                        <NewClientForm client={selectedClient} onClose={handleCloseModal} updateClientList={updateCandidateListByClientId} />
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
}

export default DashboardBody;
