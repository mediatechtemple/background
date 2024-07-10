"use client";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Grid } from '@mui/material';
import { BsPlus, BsDownload } from 'react-icons/bs';
import NewClientForm from '../../app/admin/companies/companies-components/NewClientForm';
import CompaniesList from '../../app/admin/companies/companies-components/CompaniesList';
import { BASE_URL, _getAll } from '@/utils/apiUtils'; 
import axios from 'axios';
import Link from 'next/link';

function DashboardBody() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientListData, setClientListData] = useState([]);

    useEffect(() => {
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
            const clientId = localStorage.getItem("client_id");
            if (!clientId) {
                throw new Error("Client ID is not available in localStorage.");
            }
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
                       {localStorage.getItem("user_role") === '1' && <Button
                            variant="contained"
                            startIcon={<BsPlus style={{ fontSize: '1.2em' }} />}
                            onClick={() => handleOpenModal(null)}
                        >
                            New Company
                        </Button>
                        }
                         {localStorage.getItem("user_role") === '2' && <Link
                         href="/admin/candidates/add-candidates" passHref style={{ textDecoration:"none"}}><Button
                            variant="contained"
                            startIcon={<BsPlus style={{ fontSize: '1.2em' }} />}
                        >
                            New Candidate
                        </Button>
                        </Link>
                        }
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
                <Grid >
                    <Grid >
                        <NewClientForm client={selectedClient} onClose={handleCloseModal} updateClientList={updateCandidateListByClientId} />
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
}

export default DashboardBody;
