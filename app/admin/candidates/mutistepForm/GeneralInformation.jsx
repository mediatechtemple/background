"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { _getAll } from "../../../../utils/apiUtils";
import { useSearchParams } from 'next/navigation';

const GeneralInformation = ({ formData, setFormData }) => {
  const [companies, setCompanies] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [process, setProcess] = useState("");
  const [processList, setProcessList] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    // Simulate user role and client ID logic for testing, replace with actual logic
    setUserRole('2'); // Example: Set userRole based on your logic
    setClientId('example_client_id'); // Example: Set clientId based on your logic

    const fetchData = async () => {
      try {
        const companiesData = await _getAll('/client');

        if (userRole === '2') {
          const updatedCompaniesList = companiesData.find((rec) => rec.id == clientId);
          const updatedList = [];
          updatedList.push(updatedCompaniesList);
          setCompanies(updatedList);
          setFormData(updatedCompaniesList);
          setProcessList(updatedCompaniesList.process_list);
        } else {
          setCompanies(companiesData);
        }

        if (id) {
          const candidateData = await _getAll(`/candidate/${id}`);
          setFormData(candidateData);
        } else {
          if (userRole === '3') {
            const data = await _getAll('/candidate');
            setFormData(data[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userRole !== null) {
      fetchData();
    }
  }, [id, setFormData, userRole, clientId]);

  const handleCompanyChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      client_id: newValue ? newValue.id : null,
    }));
    const processData = companies.find((rec) => rec.id === newValue.id);
    setProcessList(processData.process_list);
  };

  const handleProcessChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      process: newValue
    }));
    setProcess(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fields = [
    { name: "notify_candidate", label: "E-mail Notification to candidate", type: "select", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    { name: "notify_client", label: "E-mail Notification to client", type: "select", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    { name: "notify_admin", label: "E-mail Notification to admin", type: "select", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    { name: "form_filled_by", label: "Form Filled By", type: "select", options: [{ label: "Candidate", value: "Candidate" }, { label: "Data Internal Team", value: "Data Internal Team" }] },
    { name: "client_id", label: "Company (Auto Assign to Client Portal)", type: "text" },
    { name: "process", label: "Process (Auto Assign to Client Portal)", type: "text" },
    { name: "name", label: "Candidate Name", type: "text" },
    { name: "dob", label: "Candidate DOB", type: "date" },
    { name: "father_name", label: "Candidate Father’s Name", type: "text" },
    { name: "mobile_no", label: "Candidate Mobile No", type: "text" },
    { name: "email_id", label: "Candidate Email ID", type: "email" },
    { name: "client_location", label: "Company Location", type: "text" },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {fields.map((field, index) => (
        <div key={index} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
          {field.name === "client_id" ? (
            <Autocomplete
              value={companies.find(company => company.id === formData.client_id) || null}
              onChange={handleCompanyChange}
              disabled={userRole === '2'}
              options={companies}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="client_id"
                  label="Company"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          ) : field.name === "process" ? (
            <Autocomplete
              value={process}
              onChange={handleProcessChange}
              options={processList}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="process"
                  label="Process"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          ) : field.type === "select" ? (
            <TextField
              select
              name={field.name}
              value={formData[field.name] || field.options[0].value}
              onChange={handleChange}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
              SelectProps={{ native: true }}
            >
              {field.options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </TextField>
          ) : (
            <TextField
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={field.type === "date" ? { shrink: true } : {}}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GeneralInformation;
