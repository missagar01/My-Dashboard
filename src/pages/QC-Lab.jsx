import { useState, useEffect, useRef } from "react";
import AdminLayout from "../components/layout/AdminLayout";

export default function SystemForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State for dropdown options from Master sheet
    const [nameOptions, setNameOptions] = useState([]);
    const [systemOptions, setSystemOptions] = useState([]);
    const [ipOptions, setIpOptions] = useState([]);
    const [extensionOptions, setExtensionOptions] = useState([]);
    const [mobileOptions, setMobileOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [jioOptions, setJioOptions] = useState([]);
    const [airtelOptions, setAirtelOptions] = useState([]);
    const [ideaOptions, setIdeaOptions] = useState([]);
    const [emailOptions, setEmailOptions] = useState([]);
    const [extensionOutsideOptions, setExtensionOutsideOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);

    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        system: [],
        systemSpecs: "",
        ip: "",
        location: "",
        extension: "",
        mobile: "",
        jioNo: "",
        airtelNo: "",
        ideaNo: "",
        email: "",
        extensionOutside: "",
        department: "",
    });

    // State for checkbox selections
    const [selectedSystems, setSelectedSystems] = useState([]);
    const [showSystemDropdown, setShowSystemDropdown] = useState(false);

    // Advanced dropdown states
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showNameDropdown, setNameDropdown] = useState(false);
    const [showIpDropdown, setShowIpDropdown] = useState(false);
    const [showExtensionDropdown, setShowExtensionDropdown] = useState(false);
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);
    const [showJioDropdown, setShowJioDropdown] = useState(false);
    const [showAirtelDropdown, setShowAirtelDropdown] = useState(false);
    const [showIdeaDropdown, setShowIdeaDropdown] = useState(false);
    const [showEmailDropdown, setShowEmailDropdown] = useState(false);
    const [showExtensionOutsideDropdown, setShowExtensionOutsideDropdown] = useState(false);
    const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

    // Loading states for add new feature
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [isAddingName, setIsAddingName] = useState(false);
    const [isAddingIp, setIsAddingIp] = useState(false);
    const [isAddingExtension, setIsAddingExtension] = useState(false);
    const [isAddingMobile, setIsAddingMobile] = useState(false);
    const [isAddingJio, setIsAddingJio] = useState(false);
    const [isAddingAirtel, setIsAddingAirtel] = useState(false);
    const [isAddingIdea, setIsAddingIdea] = useState(false);
    const [isAddingEmail, setIsAddingEmail] = useState(false);
    const [isAddingExtensionOutside, setIsAddingExtensionOutside] = useState(false);
    const [isAddingDepartment, setIsAddingDepartment] = useState(false);

    // Refs for dropdown containers only
    const locationDropdownRef = useRef(null);
    const nameDropdownRef = useRef(null);
    const ipDropdownRef = useRef(null);
    const extensionDropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);
    const jioDropdownRef = useRef(null);
    const airtelDropdownRef = useRef(null);
    const ideaDropdownRef = useRef(null);
    const emailDropdownRef = useRef(null);
    const extensionOutsideDropdownRef = useRef(null);
    const departmentDropdownRef = useRef(null);

    // Click outside handlers for all dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            const refs = [
                { ref: locationDropdownRef, setter: setShowLocationDropdown },
                { ref: nameDropdownRef, setter: setNameDropdown },
                { ref: ipDropdownRef, setter: setShowIpDropdown },
                { ref: extensionDropdownRef, setter: setShowExtensionDropdown },
                { ref: mobileDropdownRef, setter: setShowMobileDropdown },
                { ref: jioDropdownRef, setter: setShowJioDropdown },
                { ref: airtelDropdownRef, setter: setShowAirtelDropdown },
                { ref: ideaDropdownRef, setter: setShowIdeaDropdown },
                { ref: emailDropdownRef, setter: setShowEmailDropdown },
                { ref: extensionOutsideDropdownRef, setter: setShowExtensionOutsideDropdown },
                { ref: departmentDropdownRef, setter: setShowDepartmentDropdown }
            ];

            refs.forEach(({ ref, setter }) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setter(false);
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fetch all data from Master sheet
    const fetchMasterData = async () => {
        try {
            const masterSheetId = "1poFyeN1S_1460vD2E8IrpgcDnBkpYgQ15OwEysVBb-M";
            const masterSheetName = "Master";

            const url = `https://docs.google.com/spreadsheets/d/${masterSheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
                masterSheetName
            )}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch master data: ${response.status}`);
            }

            const text = await response.text();
            const jsonStart = text.indexOf("{");
            const jsonEnd = text.lastIndexOf("}");
            const jsonString = text.substring(jsonStart, jsonEnd + 1);
            const data = JSON.parse(jsonString);

            if (!data.table || !data.table.rows) {
                console.log("No master data found");
                return;
            }

            // Extract data from all required columns
            const names = [];
            const systems = [];
            const ips = [];
            const extensions = [];
            const mobiles = [];
            const locations = [];
            const jioNumbers = [];
            const airtelNumbers = [];
            const ideaNumbers = [];
            const emails = [];
            const extensionOutside = [];
            const department = [];

            // Process all rows starting from index 1 (skip header)
            data.table.rows.slice(0).forEach((row) => {
                // Column A - IP (index 0)
                if (row.c && row.c[0] && row.c[0].v) {
                    const value = row.c[0].v.toString().trim();
                    if (value !== "") ips.push(value);
                }

                // Column B - Email (index 1)
                if (row.c && row.c[1] && row.c[1].v) {
                    const value = row.c[1].v.toString().trim();
                    if (value !== "") emails.push(value);
                }

                // Column C - Jio No. (index 2)
                if (row.c && row.c[2] && row.c[2].v) {
                    const value = row.c[2].v.toString().trim();
                    if (value !== "") jioNumbers.push(value);
                }

                // Column D - Airtel No. (index 3)
                if (row.c && row.c[4] && row.c[4].v) {
                    const value = row.c[4].v.toString().trim();
                    if (value !== "") airtelNumbers.push(value);
                }

                // Column E - Idea No. (index 4)
                if (row.c && row.c[3] && row.c[3].v) {
                    const value = row.c[3].v.toString().trim();
                    if (value !== "") ideaNumbers.push(value);
                }

                // Column F - System (index 5)
                if (row.c && row.c[5] && row.c[5].v) {
                    const value = row.c[5].v.toString().trim();
                    if (value !== "") systems.push(value);
                }

                // Column G - Name (index 6)
                if (row.c && row.c[6] && row.c[6].v) {
                    const value = row.c[6].v.toString().trim();
                    if (value !== "") names.push(value);
                }

                // Column H - Location (index 7)
                if (row.c && row.c[7] && row.c[7].v) {
                    const value = row.c[7].v.toString().trim();
                    if (value !== "") locations.push(value);
                }

                // Column I - Extension (index 8)
                if (row.c && row.c[8] && row.c[8].v) {
                    const value = row.c[8].v.toString().trim();
                    if (value !== "") extensions.push(value);
                }

                // Column J - Mobile (index 9)
                if (row.c && row.c[9] && row.c[9].v) {
                    const value = row.c[9].v.toString().trim();
                    if (value !== "") mobiles.push(value);
                }

                if (row.c && row.c[10] && row.c[10].v) {
                    const value = row.c[10].v.toString().trim();
                    if (value !== "") extensionOutside.push(value);
                }

                if (row.c && row.c[11] && row.c[11].v) {
                    const value = row.c[11].v.toString().trim();
                    if (value !== "") department.push(value);
                }
            });

            // Remove duplicates and set state
            setNameOptions([...new Set(names)].sort());
            setSystemOptions([...new Set(systems)].sort());
            setIpOptions([...new Set(ips)].sort());
            setExtensionOptions([...new Set(extensions)].sort());
            setMobileOptions([...new Set(mobiles)].sort());
            setLocationOptions([...new Set(locations)].sort());
            setJioOptions([...new Set(jioNumbers)].sort());
            setAirtelOptions([...new Set(airtelNumbers)].sort());
            setIdeaOptions([...new Set(ideaNumbers)].sort());
            setEmailOptions([...new Set(emails)].sort());
            setExtensionOutsideOptions([...new Set(extensionOutside)].sort());
            setDepartmentOptions([...new Set(department)].sort());

            console.log("Master sheet data loaded successfully");
        } catch (error) {
            console.error("Error fetching master sheet data:", error);
            // Set default options if fetch fails
            setNameOptions(["User 1", "User 2"]);
            setSystemOptions(["System 1", "System 2"]);
            setIpOptions(["192.168.1.1", "192.168.1.2"]);
            setExtensionOptions(["1001", "1002"]);
            setMobileOptions(["9876543210", "9876543211"]);
            setLocationOptions(['SRMPL', 'AAPL', 'GGIPL', 'PIL', 'CO']);
            setJioOptions(["9876543210", "9876543211"]);
            setAirtelOptions(["9876543210", "9876543211"]);
            setIdeaOptions(["9876543210", "9876543211"]);
            setEmailOptions(["user1@example.com", "user2@example.com"]);
            setExtensionOutsideOptions(["2001", "2002"]);
            setDepartmentOptions(["IT", "HR", "Finance"]);
        }
    };

    useEffect(() => {
        fetchMasterData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSystemCheckboxChange = (system) => {
        setSelectedSystems(prev => {
            const newSelectedSystems = prev.includes(system)
                ? prev.filter(item => item !== system)
                : [...prev, system];

            setFormData(prevFormData => ({
                ...prevFormData,
                system: newSelectedSystems
            }));

            return newSelectedSystems;
        });
    };

    // Generic function to add new option to Master sheet
    const addNewOptionToSheet = async (value, columnIndex, fieldName) => {
        try {
            const rowData = Array(12).fill("");
            rowData[columnIndex] = value.trim();

            const scriptUrl = "https://script.google.com/macros/s/AKfycbw-VcRnwXvGfYw6Avi5MgB0XvBYViPod0dDQkf8MDeNZsqto2_RzR6pJm5DpgO3zsd1/exec";

            const params = {
                sheetName: "Master",
                action: "insert",
                rowData: JSON.stringify(rowData)
            };

            const urlParams = new URLSearchParams();
            for (const key in params) {
                urlParams.append(key, params[key]);
            }

            const response = await fetch(scriptUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: urlParams
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || `Failed to add ${fieldName}`);
            }

            await fetchMasterData();
            return true;
        } catch (error) {
            console.error(`Error adding ${fieldName}:`, error);
            alert(`Failed to add ${fieldName}: ${error.message}`);
            return false;
        }
    };

    // Handler functions for adding new options with correct column indices
    const handleAddNewLocation = async () => {
        if (formData.location && formData.location.trim() !== "" &&
            !locationOptions.includes(formData.location.trim())) {
            setIsAddingLocation(true);
            const success = await addNewOptionToSheet(formData.location.trim(), 7, "location"); // Column H
            if (success) {
                setFormData(prev => ({ ...prev, location: formData.location.trim() }));
                alert(`Location "${formData.location.trim()}" added successfully!`);
            }
            setIsAddingLocation(false);
            setShowLocationDropdown(false);
        }
    };

    const handleAddNewName = async () => {
        if (formData.name && formData.name.trim() !== "" &&
            !nameOptions.includes(formData.name.trim())) {
            setIsAddingName(true);
            const success = await addNewOptionToSheet(formData.name.trim(), 6, "name"); // Column G
            if (success) {
                setFormData(prev => ({ ...prev, name: formData.name.trim() }));
                alert(`Name "${formData.name.trim()}" added successfully!`);
            }
            setIsAddingName(false);
            setNameDropdown(false);
        }
    };

    const handleAddNewIp = async () => {
        if (formData.ip && formData.ip.trim() !== "" &&
            !ipOptions.includes(formData.ip.trim())) {
            setIsAddingIp(true);
            const success = await addNewOptionToSheet(formData.ip.trim(), 0, "IP"); // Column A
            if (success) {
                setFormData(prev => ({ ...prev, ip: formData.ip.trim() }));
                alert(`IP "${formData.ip.trim()}" added successfully!`);
            }
            setIsAddingIp(false);
            setShowIpDropdown(false);
        }
    };

    const handleAddNewExtension = async () => {
        if (formData.extension && formData.extension.trim() !== "" &&
            !extensionOptions.includes(formData.extension.trim())) {
            setIsAddingExtension(true);
            const success = await addNewOptionToSheet(formData.extension.trim(), 8, "extension"); // Column I
            if (success) {
                setFormData(prev => ({ ...prev, extension: formData.extension.trim() }));
                alert(`Extension "${formData.extension.trim()}" added successfully!`);
            }
            setIsAddingExtension(false);
            setShowExtensionDropdown(false);
        }
    };

    const handleAddNewMobile = async () => {
        if (formData.mobile && formData.mobile.trim() !== "" &&
            !mobileOptions.includes(formData.mobile.trim())) {
            setIsAddingMobile(true);
            const success = await addNewOptionToSheet(formData.mobile.trim(), 9, "mobile"); // Column J
            if (success) {
                setFormData(prev => ({ ...prev, mobile: formData.mobile.trim() }));
                alert(`Mobile "${formData.mobile.trim()}" added successfully!`);
            }
            setIsAddingMobile(false);
            setShowMobileDropdown(false);
        }
    };

    const handleAddNewJio = async () => {
        if (formData.jioNo && formData.jioNo.trim() !== "" &&
            !jioOptions.includes(formData.jioNo.trim())) {
            setIsAddingJio(true);
            const success = await addNewOptionToSheet(formData.jioNo.trim(), 2, "Jio number"); // Column C
            if (success) {
                setFormData(prev => ({ ...prev, jioNo: formData.jioNo.trim() }));
                alert(`Jio number "${formData.jioNo.trim()}" added successfully!`);
            }
            setIsAddingJio(false);
            setShowJioDropdown(false);
        }
    };

    const handleAddNewAirtel = async () => {
        if (formData.airtelNo && formData.airtelNo.trim() !== "" &&
            !airtelOptions.includes(formData.airtelNo.trim())) {
            setIsAddingAirtel(true);
            const success = await addNewOptionToSheet(formData.airtelNo.trim(), 4, "Airtel number"); // Column E
            if (success) {
                setFormData(prev => ({ ...prev, airtelNo: formData.airtelNo.trim() }));
                alert(`Airtel number "${formData.airtelNo.trim()}" added successfully!`);
            }
            setIsAddingAirtel(false);
            setShowAirtelDropdown(false);
        }
    };

    const handleAddNewIdea = async () => {
        if (formData.ideaNo && formData.ideaNo.trim() !== "" &&
            !ideaOptions.includes(formData.ideaNo.trim())) {
            setIsAddingIdea(true);
            const success = await addNewOptionToSheet(formData.ideaNo.trim(), 3, "Idea number"); // Column D
            if (success) {
                setFormData(prev => ({ ...prev, ideaNo: formData.ideaNo.trim() }));
                alert(`Idea number "${formData.ideaNo.trim()}" added successfully!`);
            }
            setIsAddingIdea(false);
            setShowIdeaDropdown(false);
        }
    };

    const handleAddNewEmail = async () => {
        if (formData.email && formData.email.trim() !== "" &&
            !emailOptions.includes(formData.email.trim())) {
            setIsAddingEmail(true);
            const success = await addNewOptionToSheet(formData.email.trim(), 1, "email"); // Column B
            if (success) {
                setFormData(prev => ({ ...prev, email: formData.email.trim() }));
                alert(`Email "${formData.email.trim()}" added successfully!`);
            }
            setIsAddingEmail(false);
            setShowEmailDropdown(false);
        }
    };

    const handleAddNewExtensionOutside = async () => {
        if (formData.extensionOutside && formData.extensionOutside.trim() !== "" &&
            !extensionOutsideOptions.includes(formData.extensionOutside.trim())) {
            setIsAddingExtensionOutside(true);
            const success = await addNewOptionToSheet(formData.extensionOutside.trim(), 10, "extension outside"); // Column K
            if (success) {
                setFormData(prev => ({ ...prev, extensionOutside: formData.extensionOutside.trim() }));
                alert(`Extension Outside "${formData.extensionOutside.trim()}" added successfully!`);
            }
            setIsAddingExtensionOutside(false);
            setShowExtensionOutsideDropdown(false);
        }
    };

    const handleAddNewDepartment = async () => {
        if (formData.department && formData.department.trim() !== "" &&
            !departmentOptions.includes(formData.department.trim())) {
            setIsAddingDepartment(true);
            const success = await addNewOptionToSheet(formData.department.trim(), 11, "department"); // Column L
            if (success) {
                setFormData(prev => ({ ...prev, department: formData.department.trim() }));
                alert(`Department "${formData.department.trim()}" added successfully!`);
            }
            setIsAddingDepartment(false);
            setShowDepartmentDropdown(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submissionData = {
                sheetName: "Data",
                name: formData.name,
                system: selectedSystems.join(", "),
                systemSpecs: formData.systemSpecs,
                ip: formData.ip,
                location: formData.location,
                extension: formData.extension,
                mobile: formData.mobile,
                jioNo: formData.jioNo,
                airtelNo: formData.airtelNo,
                ideaNo: formData.ideaNo,
                email: formData.email,
                extensionOutside: formData.extensionOutside,
                department: formData.department
            };

            console.log("Submitting data:", submissionData);

            const params = new URLSearchParams();
            Object.keys(submissionData).forEach(key => {
                params.append(key, submissionData[key]);
            });

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbw-VcRnwXvGfYw6Avi5MgB0XvBYViPod0dDQkf8MDeNZsqto2_RzR6pJm5DpgO3zsd1/exec",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params.toString()
                }
            );

            const result = await response.json();

            if (result.success) {
                alert("Data submitted successfully!");

                setFormData({
                    name: "",
                    system: [],
                    systemSpecs: "",
                    ip: "",
                    location: "",
                    extension: "",
                    mobile: "",
                    jioNo: "",
                    airtelNo: "",
                    ideaNo: "",
                    email: "",
                    extensionOutside: "",
                    department: ""
                });
                setSelectedSystems([]);
            } else {
                throw new Error(result.error || "Failed to submit data");
            }

        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit data. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // System Dropdown with Checkboxes Component
    const SystemDropdownWithCheckboxes = () => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                System
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setShowSystemDropdown(!showSystemDropdown)}
                    className="w-full rounded-md border border-gray-200 p-2 text-left focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 bg-white"
                >
                    {selectedSystems.length > 0
                        ? `${selectedSystems.length} system(s) selected`
                        : "Select systems"}
                </button>

                {showSystemDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2 space-y-2">
                            {systemOptions.map((system, index) => (
                                <label key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedSystems.includes(system)}
                                        onChange={() => handleSystemCheckboxChange(system)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{system}</span>
                                </label>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 p-2">
                            <button
                                type="button"
                                onClick={() => setShowSystemDropdown(false)}
                                className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {selectedSystems.length > 0 && (
                <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Selected systems:</p>
                    <div className="flex flex-wrap gap-1">
                        {selectedSystems.map((system, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                {system}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-2xl font-bold tracking-tight mb-6 text-gray-500">
                    IT Assets User Form
                </h1>

                <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Details
                        </h2>
                        <p className="text-gray-600">
                            Fill in the system information details.
                        </p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Row 1: Name and System */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Name Dropdown - Inline like CallTrackerForm */}
                            <div className="space-y-2 relative" ref={nameDropdownRef}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>

                                <div className="relative">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setNameDropdown(true)}
                                        placeholder="Select or type name"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setNameDropdown(!showNameDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showNameDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {nameOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.name.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, name: option }));
                                                        setNameDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.name && formData.name.trim() !== "" &&
                                            !nameOptions.includes(formData.name.trim()) && (
                                                <div
                                                    onClick={handleAddNewName}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingName ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.name.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new name</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {nameOptions.filter(option =>
                                            option.toLowerCase().includes(formData.name.toLowerCase())
                                        ).length === 0 && formData.name && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>

                            <SystemDropdownWithCheckboxes />
                        </div>

                        {/* System Specs */}
                        <div className="space-y-2">
                            <label htmlFor="systemSpecs" className="block text-sm font-medium text-gray-700">
                                System Specs
                            </label>
                            <textarea
                                id="systemSpecs"
                                name="systemSpecs"
                                value={formData.systemSpecs}
                                onChange={handleChange}
                                placeholder="Enter system specifications/remarks"
                                rows={3}
                                className="w-full rounded-md border border-gray-200 p-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                        </div>

                        {/* Row 2: IP and Location */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* IP Dropdown */}
                            <div className="space-y-2 relative" ref={ipDropdownRef}>
                                <label htmlFor="ip" className="block text-sm font-medium text-gray-700">
                                    IP
                                </label>

                                <div className="relative">
                                    <input
                                        id="ip"
                                        name="ip"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.ip}
                                        onChange={handleChange}
                                        onFocus={() => setShowIpDropdown(true)}
                                        placeholder="Select or type IP"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowIpDropdown(!showIpDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showIpDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {ipOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.ip.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, ip: option }));
                                                        setShowIpDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.ip && formData.ip.trim() !== "" &&
                                            !ipOptions.includes(formData.ip.trim()) && (
                                                <div
                                                    onClick={handleAddNewIp}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingIp ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.ip.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new IP</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {ipOptions.filter(option =>
                                            option.toLowerCase().includes(formData.ip.toLowerCase())
                                        ).length === 0 && formData.ip && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>

                            {/* Location Dropdown */}
                            <div className="space-y-2 relative" ref={locationDropdownRef}>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                    Location
                                </label>

                                <div className="relative">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.location}
                                        onChange={handleChange}
                                        onFocus={() => setShowLocationDropdown(true)}
                                        placeholder="Select or type location"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showLocationDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {locationOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.location.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, location: option }));
                                                        setShowLocationDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.location && formData.location.trim() !== "" &&
                                            !locationOptions.includes(formData.location.trim()) && (
                                                <div
                                                    onClick={handleAddNewLocation}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingLocation ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.location.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new location</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {locationOptions.filter(option =>
                                            option.toLowerCase().includes(formData.location.toLowerCase())
                                        ).length === 0 && formData.location && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Continue this pattern for all other dropdown fields... */}
                        {/* For brevity, I'll show the pattern for one more row */}

                        {/* Row 3: Extension and Mobile */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Extension Dropdown */}
                            <div className="space-y-2 relative" ref={extensionDropdownRef}>
                                <label htmlFor="extension" className="block text-sm font-medium text-gray-700">
                                    Extension
                                </label>

                                <div className="relative">
                                    <input
                                        id="extension"
                                        name="extension"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.extension}
                                        onChange={handleChange}
                                        onFocus={() => setShowExtensionDropdown(true)}
                                        placeholder="Select or type extension"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowExtensionDropdown(!showExtensionDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showExtensionDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {extensionOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.extension.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, extension: option }));
                                                        setShowExtensionDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.extension && formData.extension.trim() !== "" &&
                                            !extensionOptions.includes(formData.extension.trim()) && (
                                                <div
                                                    onClick={handleAddNewExtension}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingExtension ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.extension.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new extension</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {extensionOptions.filter(option =>
                                            option.toLowerCase().includes(formData.extension.toLowerCase())
                                        ).length === 0 && formData.extension && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Dropdown */}
                            <div className="space-y-2 relative" ref={mobileDropdownRef}>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                    Mobile
                                </label>

                                <div className="relative">
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        onFocus={() => setShowMobileDropdown(true)}
                                        placeholder="Select or type mobile"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showMobileDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {mobileOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.mobile.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, mobile: option }));
                                                        setShowMobileDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.mobile && formData.mobile.trim() !== "" &&
                                            !mobileOptions.includes(formData.mobile.trim()) && (
                                                <div
                                                    onClick={handleAddNewMobile}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingMobile ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.mobile.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new mobile</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {mobileOptions.filter(option =>
                                            option.toLowerCase().includes(formData.mobile.toLowerCase())
                                        ).length === 0 && formData.mobile && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Extension Outside and Department */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Extension Outside Dropdown */}
                            <div className="space-y-2 relative" ref={extensionOutsideDropdownRef}>
                                <label htmlFor="extensionOutside" className="block text-sm font-medium text-gray-700">
                                    Extension Outside
                                </label>

                                <div className="relative">
                                    <input
                                        id="extensionOutside"
                                        name="extensionOutside"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.extensionOutside}
                                        onChange={handleChange}
                                        onFocus={() => setShowExtensionOutsideDropdown(true)}
                                        placeholder="Select or type outside extension"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowExtensionOutsideDropdown(!showExtensionOutsideDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showExtensionOutsideDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {extensionOutsideOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.extensionOutside.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, extensionOutside: option }));
                                                        setShowExtensionOutsideDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.extensionOutside && formData.extensionOutside.trim() !== "" &&
                                            !extensionOutsideOptions.includes(formData.extensionOutside.trim()) && (
                                                <div
                                                    onClick={handleAddNewExtensionOutside}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingExtensionOutside ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.extensionOutside.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new extension outside</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {extensionOutsideOptions.filter(option =>
                                            option.toLowerCase().includes(formData.extensionOutside.toLowerCase())
                                        ).length === 0 && formData.extensionOutside && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>

                            {/* Department Dropdown */}
                            <div className="space-y-2 relative" ref={departmentDropdownRef}>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                    Department
                                </label>

                                <div className="relative">
                                    <input
                                        id="department"
                                        name="department"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.department}
                                        onChange={handleChange}
                                        onFocus={() => setShowDepartmentDropdown(true)}
                                        placeholder="Select or type department"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showDepartmentDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {departmentOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.department.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, department: option }));
                                                        setShowDepartmentDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.department && formData.department.trim() !== "" &&
                                            !departmentOptions.includes(formData.department.trim()) && (
                                                <div
                                                    onClick={handleAddNewDepartment}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingDepartment ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.department.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new department</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {departmentOptions.filter(option =>
                                            option.toLowerCase().includes(formData.department.toLowerCase())
                                        ).length === 0 && formData.department && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Jio No. and Airtel No. */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Jio No Dropdown */}
                            <div className="space-y-2 relative" ref={jioDropdownRef}>
                                <label htmlFor="jioNo" className="block text-sm font-medium text-gray-700">
                                    Jio Number
                                </label>

                                <div className="relative">
                                    <input
                                        id="jioNo"
                                        name="jioNo"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.jioNo}
                                        onChange={handleChange}
                                        onFocus={() => setShowJioDropdown(true)}
                                        placeholder="Select or type Jio number"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowJioDropdown(!showJioDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showJioDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {jioOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.jioNo.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, jioNo: option }));
                                                        setShowJioDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.jioNo && formData.jioNo.trim() !== "" &&
                                            !jioOptions.includes(formData.jioNo.trim()) && (
                                                <div
                                                    onClick={handleAddNewJio}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingJio ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.jioNo.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new Jio number</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {jioOptions.filter(option =>
                                            option.toLowerCase().includes(formData.jioNo.toLowerCase())
                                        ).length === 0 && formData.jioNo && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>

                            {/* Airtel No Dropdown */}
                            <div className="space-y-2 relative" ref={airtelDropdownRef}>
                                <label htmlFor="airtelNo" className="block text-sm font-medium text-gray-700">
                                    Airtel No
                                </label>

                                <div className="relative">
                                    <input
                                        id="airtelNo"
                                        name="airtelNo"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.airtelNo}
                                        onChange={handleChange}
                                        onFocus={() => setShowAirtelDropdown(true)}
                                        placeholder="Select or type Airtel number"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowAirtelDropdown(!showAirtelDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showAirtelDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {airtelOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.airtelNo.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, airtelNo: option }));
                                                        setShowAirtelDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.airtelNo && formData.airtelNo.trim() !== "" &&
                                            !airtelOptions.includes(formData.airtelNo.trim()) && (
                                                <div
                                                    onClick={handleAddNewAirtel}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingAirtel ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.airtelNo.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new Airtel number</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {airtelOptions.filter(option =>
                                            option.toLowerCase().includes(formData.airtelNo.toLowerCase())
                                        ).length === 0 && formData.airtelNo && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Row 5: Idea No. and Email */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Idea No Dropdown */}
                            <div className="space-y-2 relative" ref={ideaDropdownRef}>
                                <label htmlFor="ideaNo" className="block text-sm font-medium text-gray-700">
                                    Idea No
                                </label>

                                <div className="relative">
                                    <input
                                        id="ideaNo"
                                        name="ideaNo"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.ideaNo}
                                        onChange={handleChange}
                                        onFocus={() => setShowIdeaDropdown(true)}
                                        placeholder="Select or type Idea number"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowIdeaDropdown(!showIdeaDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showIdeaDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {ideaOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.ideaNo.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, ideaNo: option }));
                                                        setShowIdeaDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.ideaNo && formData.ideaNo.trim() !== "" &&
                                            !ideaOptions.includes(formData.ideaNo.trim()) && (
                                                <div
                                                    onClick={handleAddNewIdea}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingIdea ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.ideaNo.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new Idea number</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {ideaOptions.filter(option =>
                                            option.toLowerCase().includes(formData.ideaNo.toLowerCase())
                                        ).length === 0 && formData.ideaNo && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>

                            {/* Email Dropdown */}
                            <div className="space-y-2 relative" ref={emailDropdownRef}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>

                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setShowEmailDropdown(true)}
                                        placeholder="Select or type email"
                                    // required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowEmailDropdown(!showEmailDropdown)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {showEmailDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {emailOptions
                                            .filter(option =>
                                                option.toLowerCase().includes(formData.email.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, email: option }));
                                                        setShowEmailDropdown(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="text-sm text-gray-700">{option}</span>
                                                </div>
                                            ))
                                        }

                                        {formData.email && formData.email.trim() !== "" &&
                                            !emailOptions.includes(formData.email.trim()) && (
                                                <div
                                                    onClick={handleAddNewEmail}
                                                    className="px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer text-blue-600 border-t border-gray-200 flex items-center"
                                                >
                                                    {isAddingEmail ? (
                                                        <div className="flex items-center justify-center w-full py-2">
                                                            <svg className="animate-spin mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="text-sm font-medium">Adding...</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium">Add "{formData.email.trim()}"</p>
                                                                <p className="text-xs text-blue-500 mt-1">Create new email</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                        {emailOptions.filter(option =>
                                            option.toLowerCase().includes(formData.email.toLowerCase())
                                        ).length === 0 && formData.email && (
                                                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                                                    No options found
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-between bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    name: "",
                                    system: [],
                                    systemSpecs: "",
                                    ip: "",
                                    location: "",
                                    extension: "",
                                    mobile: "",
                                    jioNo: "",
                                    airtelNo: "",
                                    ideaNo: "",
                                    email: "",
                                    extensionOutside: "",
                                    department: ""
                                });
                                setSelectedSystems([]);
                            }}
                            className="rounded-md border border-gray-200 py-2 px-6 text-gray-700 hover:border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Clear Form
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-gradient-to-r from-blue-600 to-gray-600 py-2 px-8 text-white hover:from-blue-700 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Data"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}