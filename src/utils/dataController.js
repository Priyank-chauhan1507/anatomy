import data from "../assets/data.json";

let processedData = {
    "ordered": {
        "english": {
            "Shave biopsy": {
                "description": "Informed consent was obtained and the risks and benefits of biopsies were discussed with the patient. Risks discussed included bleeding, infection, scarring, and damage to underlying structures. The patient had no additional questions. The biopsy sites were cleaned with alcohol and infiltrated with local anesthetic. The shave biopsy performed. Hemostasis was achieved. Biopsy site was covered with ointment and a bandaid. Biopsy site wound care instructions were reviewed with the patient.",
                "mapLabel": "ShaveBx",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Ointment",
                        "options": [
                            "Vaseline",
                            "Antibiotic ointment",
                            "Aquaphor"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Hemostasis",
                        "options": [
                            "Aluminum chloride",
                            "Cautery",
                            "Sutures",
                            "Pressure"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Details",
                        "options": [
                            "Wound care instructions were provided.  ",
                            "Followup to discuss results.  "
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Size (cm)",
                        "options": [
                            "0.1",
                            "0.2",
                            "0.3",
                            "0.4",
                            "0.5",
                            "0.6",
                            "0.7",
                            "0.8",
                            "0.9",
                            "1.0",
                            "1.1",
                            "1.2",
                            "1.3,1.4",
                            "1.5",
                            "1.6",
                            "1.7",
                            "1.8",
                            "1.9",
                            "2.0"
                        ],
                        "value": "0.1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - NUB;ME66.6 - Rash; Other;Custom;Lookup",
                    "AssociatedCPTCode": "11102"
                }
            },
            "Shave removal": {
                "description": "Informed consent was obtained and the risks and benefits of biopsies were discussed with the patient. Risks discussed included bleeding, infection, scarring, and damage to underlying structures. The patient had no additional questions. The biopsy site was cleaned with alcohol and infiltrated with local anesthetic. The shave removal performed. Hemostasis was achieved. Biopsy site was covered with ointment and a bandaid. Biopsy site wound care instructions were reviewed with the patient.",
                "mapLabel": "ShaveRm",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Ointment",
                        "options": [
                            "Vaseline",
                            "Antibiotic ointment"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Hemostasis",
                        "options": [
                            "Aluminum chloride",
                            "Cautery",
                            "Sutures"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Details",
                        "options": [
                            "Wound care instructions were provided.  ",
                            "Followup to discuss results.  "
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Size (cm)",
                        "options": [
                            "0.1",
                            "0.2",
                            "0.3",
                            "0.4",
                            "0.5",
                            "0.6",
                            "0.7",
                            "0.8",
                            "0.9",
                            "1.0",
                            "1.1",
                            "1.2",
                            "1.3,1.4",
                            "1.5",
                            "1.6",
                            "1.7",
                            "1.8",
                            "1.9"
                        ],
                        "value": "0.1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - NUB;ME66.6 - Rash; Other;Custom;Lookup"
                }
            },
            "Punch biopsy": {
                "description": "Informed consent was obtained and the risks and benefits of biopsies were discussed with the patient. Risks discussed included bleeding, infection, scarring, and damage to underlying structures. The patient had no additional questions. The biopsy sites were cleaned with alcohol and infiltrated with local anesthetic. The biopsy was performed. Hemostasis was achieved. Sutures were placed. Biopsy sites were covered with ointment and a bandaid. Wound care instructions were reviewed with the patient.",
                "mapLabel": "PunchBx",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Suture size",
                        "options": [
                            "3-0",
                            "4-0",
                            "5-0"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Suture type",
                        "options": [
                            "Nylon",
                            "Prolene",
                            "PDS",
                            "Ethilon"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Details",
                        "options": [
                            "Wound care instructions were provided.  ",
                            "Followup to discuss results.  "
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Size (cm)",
                        "options": [
                            "0.1",
                            "0.2",
                            "0.3",
                            "0.4",
                            "0.5",
                            "0.6",
                            "0.7",
                            "0.8",
                            "0.9",
                            "1.0",
                            "1.1",
                            "1.2",
                            "1.3,1.4",
                            "1.5",
                            "1.6",
                            "1.7",
                            "1.8",
                            "1.9"
                        ],
                        "value": "0.1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - NUB;ME66.6 - Rash; Other;Custom;Lookup",
                    "AssociatedCPTCode": "11104"
                }
            },
            "Punch Excision": {
                "description": "Informed consent was obtained and the risks and benefits of punch excision were discussed with the patient. Risks discussed included bleeding, infection, scarring, and damage to underlying structures. The patient had no additional questions. The punch excision site was cleaned with alcohol and infiltrated with local anesthetic. The punch excision was performed. Hemostasis was achieved. Sutures were placed.  Punch excision site was covered with ointment and a bandaid. Wound care instructions were reviewed with the patient.",
                "mapLabel": "PunchExc",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Suture size",
                        "options": [
                            "3-0",
                            "4-0",
                            "5-0"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Suture type",
                        "options": [
                            "Nylon",
                            "Prolene",
                            "PDS",
                            "Ethilon"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Details",
                        "options": [
                            "Wound care instructions were provided.  ",
                            "Followup to discuss results.  "
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Size (cm)",
                        "options": [
                            "0.1",
                            "0.2",
                            "0.3",
                            "0.4",
                            "0.5",
                            "0.6",
                            "0.7",
                            "0.8",
                            "0.9",
                            "1.0",
                            "1.1",
                            "1.2",
                            "1.3,1.4",
                            "1.5",
                            "1.6",
                            "1.7",
                            "1.8",
                            "1.9"
                        ],
                        "value": "0.1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - NUB;ME66.6 - Rash; Other;Custom;Lookup"
                }
            },
            "Excision": {
                "description": "Informed consent was obtained and the risks and benefits of excision were discussed with the patient. Risks discussed included bleeding, infection, scarring, and damage to underlying structures. The patient had no additional questions. The punch excision site was cleaned with alcohol and infiltrated with local anesthetic. The excision was performed. Hemostasis was achieved. Sutures were placed.  Excision site was covered with ointment and a bandaid. Wound care instructions were reviewed with the patient.",
                "mapLabel": "Exc",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Suture size",
                        "options": [
                            "3-0",
                            "4-0",
                            "5-0"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Suture type",
                        "options": [
                            "Nylon",
                            "Prolene",
                            "PDS",
                            "Ethilon"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Details",
                        "options": [
                            "Wound care instructions were provided.  ",
                            "Followup to discuss results.  "
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Lesion Size (cm)",
                        "options": [
                            "0.1",
                            "0.2",
                            "0.3",
                            "0.4",
                            "0.5",
                            "0.6",
                            "0.7",
                            "0.8",
                            "0.9",
                            "1.0",
                            "1.1",
                            "1.2",
                            "1.3,1.4",
                            "1.5",
                            "1.6",
                            "1.7",
                            "1.8",
                            "1.9"
                        ],
                        "value": "0.1"
                    },
                    {
                        "type": "select",
                        "label": "Margin Size (cm)",
                        "options": [
                            "0.1",
                            "0.2",
                            "0.3",
                            "0.4",
                            "0.5",
                            "0.6",
                            "0.7",
                            "0.8",
                            "0.9",
                            "1.0",
                            "1.1",
                            "1.2",
                            "1.3,1.4",
                            "1.5",
                            "1.6",
                            "1.7",
                            "1.8",
                            "1.9"
                        ],
                        "value": "0.1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - NUB;ME66.6 - Rash; Other;Custom;Lookup"
                }
            }
        },
        "spanish": {
            "Shave biopsy": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de las biopsias fueron discutidos con el paciente. Riesgos discutidos incluyen sangrado, infecci??n, cicatrices y da??os a las estructuras subyacentes. El paciente no ten??a m??s preguntas. Los sitios de la biopsia se limpiaron con alcohol y se infiltraron con un anest??sico local. La biopsia por raspado a cabo. se consigui?? la hemostasis. sitio de la biopsia fue cubierta con pomada y una tirita. instrucciones de cuidado sitio de la herida de biopsia fueron revisados ??????con el paciente.",
                "mapLabel": "biopsia por raspado",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto 3 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto 3 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto 3 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupci??n cut??nea; Other;Custom;Lookup"
                }
            },
            "Shave removal": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de las biopsias fueron discutidos con el paciente. Riesgos discutidos incluyen sangrado, infecci??n, cicatrices y da??os a las estructuras subyacentes. El paciente no ten??a m??s preguntas. El sitio de la biopsia se limpi?? con alcohol y se infiltr?? con anestesia local. La eliminaci??n afeitado realiza. se consigui?? la hemostasis. sitio de la biopsia fue cubierta con pomada y una tirita. instrucciones de cuidado sitio de la herida de biopsia fueron revisados ??????con el paciente.",
                "mapLabel": "eliminaci??n de afeitado",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto4 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto4 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto4 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupci??n cut??nea; Other;Custom;Lookup"
                }
            },
            "Punch biopsy": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de las biopsias fueron discutidos con el paciente. Riesgos discutidos incluyen sangrado, infecci??n, cicatrices y da??os a las estructuras subyacentes. El paciente no ten??a m??s preguntas. Los sitios de la biopsia se limpiaron con alcohol y se infiltraron con un anest??sico local. Se realiz?? la biopsia. se consigui?? la hemostasis. Se colocaron suturas. sitios de la biopsia fueron cubiertos con un ung??ento y una tirita. instrucciones de cuidado de las heridas fueron revisados ??????con el paciente.",
                "mapLabel": "biopsia por punci??n",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto5 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto5 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto5 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupci??n cut??nea; Other;Custom;Lookup"
                }
            },
            "Punch Excision": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de la supresi??n del sacador se discutieron con el paciente. Riesgos discutidos incluyen sangrado, infecci??n, cicatrices y da??os a las estructuras subyacentes. El paciente no ten??a m??s preguntas. El sitio de escisi??n punz??n se limpi?? con alcohol y se infiltr?? con anestesia local. Se realiz?? la escisi??n punz??n. se consigui?? la hemostasis. Se colocaron suturas. sitio de supresi??n del sacador estaba cubierta con un ung??ento y una tirita. instrucciones de cuidado de las heridas fueron revisados ??????con el paciente.",
                "mapLabel": "supresi??n del sacador",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto6 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto6 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Texto6 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupci??n cut??nea; Other;Custom;Lookup"
                }
            },
            "Excision": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de la escisi??n se discutieron con el paciente. Riesgos discutidos incluyen sangrado, infecci??n, cicatrices y da??os a las estructuras subyacentes. El paciente no ten??a m??s preguntas. El sitio de escisi??n punz??n se limpi?? con alcohol y se infiltr?? con anestesia local. Se realiz?? la escisi??n. se consigui?? la hemostasis. Se colocaron suturas. Escisi??n sitio se cubri?? con ung??ento y una tirita. instrucciones de cuidado de las heridas fueron revisados ??????con el paciente.",
                "mapLabel": "excisi??n",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text7 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text7 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text7 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 - NUB;R23.8 - Rash;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupci??n cut??nea; Other;Custom;Lookup"
                }
            }
        },
        "japanese": {
            "Shave biopsy": {
                "description": "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                "mapLabel": "????????????",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;????????????3",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;????????????3",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;????????????3",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  ????????????????????????????????????;R23.8 - ??????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - ????????????????????????????????????; ME66.6 - ??????;Other;Custom;Lookup"
                }
            },
            "Shave removal": {
                "description": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                "mapLabel": "????????????",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;????????????4",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;????????????4",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;????????????4",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  ????????????????????????????????????;R23.8 - ??????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - ????????????????????????????????????; ME66.6 - ??????;Other;Custom;Lookup"
                }
            },
            "Punch biopsy": {
                "description": "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                "mapLabel": "?????????????????????",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text5",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text5",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text5",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  ????????????????????????????????????;R23.8 - ??????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - ????????????????????????????????????; ME66.6 - ??????;Other;Custom;Lookup"
                }
            },
            "Punch Excision": {
                "description": "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                "mapLabel": "????????????",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text6",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text6",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text6",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  ????????????????????????????????????;R23.8 - ??????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - ????????????????????????????????????; ME66.6 - ??????;Other;Custom;Lookup"
                }
            },
            "Excision": {
                "description": "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
                "mapLabel": "??????",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text7",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text7",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text7",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  ????????????????????????????????????;R23.8 - ??????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - ????????????????????????????????????; ME66.6 - ??????;Other;Custom;Lookup"
                }
            }
        }
    },
    "grouped": {
        "english": {
            "Cryo-AK": {
                "description": "Cryosurgical destruction of premalignant lesion(s) occurred in this anatomic area.",
                "mapLabel": "AK-Cryo",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Method",
                        "options": [
                            "Cold spray",
                            "Cold forceps",
                            "Cotton tipped applicator"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Subtype",
                        "options": [
                            "Hypertrophic",
                            "Porokeratosis treated as AK"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Total number treated",
                        "options": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19"
                        ],
                        "value": "1"
                    },
                    {
                        "type": "select",
                        "label": "Freeze-time (s)",
                        "options": [
                            "0.5",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9"
                        ],
                        "value": "0.5"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L57.0 - Actinic Keratosis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: EK90.0 - Actinic keratosis;Other;Custom;Lookup",
                    "AssociatedCPTCode": "17000"
                }
            },
            "Cryo-Wart": {
                "description": "Cryosurgical destruction of benign lesion(s) occurred in this anatomic area.",
                "mapLabel": "Wart-Cryo",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Method",
                        "options": [
                            "Cold spray",
                            "Cold forceps",
                            "Cotton tipped applicator"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Subtype",
                        "options": [
                            "Verruca vulgaris",
                            "Plantar wart",
                            "Filiform wart",
                            "Condyloma"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Total number treated",
                        "options": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19"
                        ],
                        "value": "1"
                    },
                    {
                        "type": "select",
                        "label": "Freeze-time (s)",
                        "options": [
                            "0.5",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9"
                        ],
                        "value": "0.5"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::B07.8 - Viral Warts;B08.1 - Molluscum contagiosum;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::1E80 - Common Warts;1E76 - Molluscum contagiousum",
                    "AssociatedCPTCode": "17110"
                }
            },
            "Cryo-ISK": {
                "description": "Cryosurgical destruction was performed on the following ISKs:",
                "mapLabel": "ISK-Cryo",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L82.0 - Inflamed Seborrheic keratosis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F21.0 - Inflamed Seborrheic Keratosis;Other;Custom;Lookup",
                    "AssociatedCPTCode": "17110"
                }
            },
            "Injection-Med": {
                "description": "Medication was injected:",
                "mapLabel": "Inj",
                "pinType": "carat",
                "pinColor": "orange",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Medication Name",
                        "options": [
                            "Kenalog",
                            "Candida Antigen",
                            "Bleomycin",
                            "Methotrexate"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Medication Indication",
                        "options": [
                            "Hypertrophic painful scar",
                            "Keloid",
                            "Wart",
                            "Squamous cell carcinoma"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L91.0 - Hypertrophic scar or Keloid;L63.9 - Alopecia areata;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EE60.1 - Hypertrophic scar or Keloid;ED70.2 - Alopecia areata;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Nevus": {
                "description": "Diagnosis: A benign appearing nevus was noted",
                "mapLabel": "Dx-Nevus",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D22.9 - Melanocytic nevus atypical;I78.1 - Benign appearing mole;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F20.1 - Melanocytic nevus atypical;2F20.Z - Benign appearing mole;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Acne": {
                "description": "Diagnosis: Acne was noted.",
                "mapLabel": "Dx-Acne",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L70.9 - Acne;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::ED80.Z - Acne;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Psoriasis": {
                "description": "Diagnosis: Psoriasis was noted",
                "mapLabel": "Dx-Psoriasis",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L40.9 - Psoriasis;L40.50 - Psoriasis with arthritis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA90.Z - Psoriasis;FA21.Z - Psoriasis with arthritis;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Eczema": {
                "description": "Diagnosis:  Eczema was noted",
                "mapLabel": "Dx-Eczema",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": []
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    },
                    {
                        "type": "select",
                        "label": "Title",
                        "options": [
                            "Additional Text1",
                            " Additional Text2"
                        ],
                        "value": "Additional Text1"
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L20.9 - Eczema Atopic Dermatitis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA80 - Eczema Atopic Dermatitis;Other;Custom;Lookup"
                }
            }
        },
        "spanish": {
            "Cryo-AK": {
                "description": "desctruction criocirug??a se realiz?? en las siguientes lesiones premalignas:",
                "mapLabel": "queratosis act??nica",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text8 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text8 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text8 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L57.0 - Actinic Keratosis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EK90.0 - Queratosis act??nica;Other;Custom;Lookup"
                }
            },
            "Cryo-Wart": {
                "description": "la destrucci??n de criocirug??a se realiz?? en las siguientes verrugas:",
                "mapLabel": "verruga",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text9 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text9 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text9 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::B07.8 - Viral Warts;B08.1 - Molluscum contagiosum;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::1E80 - Verrugas comunes;1E76 - Molusco contagioso;Other;Custom;Lookup"
                }
            },
            "Cryo-ISK": {
                "description": "la destrucci??n de criocirug??a se realiz?? en las siguientes ISKs:",
                "mapLabel": "queratosis seborreica inflamado",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text10 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text10 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text10 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L82.0 - Inflamed Seborrheic keratosis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F21.0 - Queratosis seborreica;Other;Custom;Lookup"
                }
            },
            "Injection-Med": {
                "description": "se inyect?? Medicaci??n:",
                "mapLabel": "inyecci??n",
                "pinType": "carat",
                "pinColor": "orange",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text11 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text11 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text11 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L91.0 - Hypertrophic scar or Keloid;L63.9 - Alopecia areata;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EE60.1 - Cicatriz hipertr??fica;ED70.2 - Alopecia areata;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Nevus": {
                "description": "Diagn??stico: un nevus aparecen benignos se observ??",
                "mapLabel": "nevo",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text12 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text12 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text12 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D22.9 - Melanocytic nevus;I78.1 - Benign appearing mole;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F20.1 - Nevo melanoc??tico at??pico;2F20.Z - Neoplasias melanoc??ticas cut??neas benignas, sin especificaci??n;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Acne": {
                "description": "Diagn??stico: El acn?? se observ??.",
                "mapLabel": "acn??",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text13 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text13 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; text13 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L70.9 - Acne;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::ED80.Z - Acn??;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Psoriasis": {
                "description": "Diagn??stico: La psoriasis se observ??",
                "mapLabel": "soriasis",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text14 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text14 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text14 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L40.9 - Psoriasis;L40.50 - Psoriasis with arthritis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA90.Z - Psoriasis;FA21.Z - Psoriasis with arthritis;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Eczema": {
                "description": "Diagn??stico: Eczema se observ??",
                "mapLabel": "eczema",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text15 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text15 adicional",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "Texto1 adicional; Texto2 adicional; Text15 adicional",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L20.9 - Eczema Atopic Dermatitis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA80 - Eccema at??pico;Other;Custom;Lookup"
                }
            }
        },
        "japanese": {
            "Cryo-AK": {
                "description": "????????????desctruction??????????????????????????????",
                "mapLabel": "??????????????????",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text8",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text8",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text8",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L57.0 - ??????????????????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: EK90.0 - ??????????????????;Other;Custom;Lookup"
                }
            },
            "Cryo-Wart": {
                "description": "???????????????????????????????????????",
                "mapLabel": "???",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text9",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text9",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text9",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::B07.8 - ?????????;B08.1 - ???????????????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::1E80 - ?????????;1E76 - ???????????????;Other;Custom;Lookup"
                }
            },
            "Cryo-ISK": {
                "description": "???????????????????????????ISKs?????????",
                "mapLabel": "???????????????????????????",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text10",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text10",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text10",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L82.0 - Inflamed Seborrheic keratosis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F21.0 - ??????????????????;Other;Custom;Lookup"
                }
            },
            "Injection-Med": {
                "description": "???????????????",
                "mapLabel": "??????",
                "pinType": "carat",
                "pinColor": "orange",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text11",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text11",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text11",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L91.0 - ???????????????;L63.9 - ??????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EE60.1 - ???????????????;ED70.2 - ??????;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Nevus": {
                "description": "????????????????????????????????????",
                "mapLabel": "???",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text12",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text12",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text12",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D22.9 - ????????????????????????;I78.1 - ???????????????????????????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F20.1 - ????????????????????????;2F20.Z - ???????????????????????????;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Acne": {
                "description": "????????????????????????",
                "mapLabel": "??????",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text13",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text13",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text13",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L70.9 - ??????????????????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::ED80.Z - ??????????????????;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Psoriasis": {
                "description": "????????????????????????",
                "mapLabel": "?????????",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text14",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text14",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text14",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L40.9 - ?????????;L40.50 - ?????????????????????????????????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA90.Z -  ?????????;FA21.Z - ?????????????????????????????????;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Eczema": {
                "description": "?????????????????????",
                "mapLabel": "??????",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text15",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text15",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "????????????1;????????????2;??????Text15",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L20.9 - ???????????????;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA80 - ???????????????;Other;Custom;Lookup"
                }
            }
        }
    }
}
const getLanguage = (id = 0) => {
  switch (Number(id)) {
    case 1:
      return "english";
    case 2:
      return "spanish";
    case 3:
      return "japanese";
    default:
      return "";
  }
};

const getListType = (label = "UnorderedList") => {
  switch (label) {
    case "UnorderedList":
      return "grouped";
    case "OrderedList":
      return "ordered";
    default:
      return "";
  }
};
const getInputType = (key) => {
  if (key.includes("select or text entry")) return "select";
  else if (key.includes("Drop-down Checkboxes")) return "multiselect";
};

const getInitialValue = (key,firstValue)=>{
    // eslint-disable-next-line default-case
    switch(key){
        case 'multiselect': return [];
        case 'select': return firstValue;
        case 'text': return ''
    }
}

const getInputFromMetaData = (key, value) => {
  let type = getInputType(key);
  let options = [];
  let label = "";
  let entryAndLabel = value.split("::");
  label = entryAndLabel[0];
  options = entryAndLabel[1] ? entryAndLabel[1].split(";"): [];
  options.pop();
  const initialValue = getInitialValue(type, options[0]);
  
  return {
    type,
    label,
    options,
    value: initialValue
  };
};


export const initData = ()=>{
    data["Sheet1"].forEach((datum) => {
        let otherData = {
          inputs: [],
          codes: {},
        };
        Object.entries(datum).map(([key, value]) => {
          if (key.startsWith("AdditionalOptions")) {
            otherData.inputs.push(getInputFromMetaData(key, value));
          } else if (key.startsWith("Associated")) {
            otherData["codes"][key] = value;
          }
          return null;
        });
        if (processedData[getListType(datum.Toolgroup)]) {
          if (
            processedData[getListType(datum.Toolgroup)][getLanguage(datum.Language)]
          ) {
            processedData[getListType(datum.Toolgroup)][getLanguage(datum.Language)][
              datum["ToolType-Selection"]
            ] = {
              description: datum["Text (HTML)"],
              mapLabel: datum["MapLabel"],
              pinType: datum["PinType"],
              pinColor: datum["Pin Color"],
              ...otherData,
            };
          } else {
            processedData[getListType(datum.Toolgroup)][getLanguage(datum.Language)] =
              {
                [datum["ToolType-Selection"]]: {
                  description: datum["Text (HTML)"],
                  mapLabel: datum["MapLabel"],
                  pinType: datum["PinType"],
                  pinColor: datum["Pin Color"],
                  ...otherData,
                },
              };
          }
        } else {
          processedData[getListType(datum.Toolgroup)] = {
            [getLanguage(datum.Language)]: {
              [datum["ToolType-Selection"]]: {
                description: datum["Text (HTML)"],
                mapLabel: datum["MapLabel"],
                pinType: datum["PinType"],
                pinColor: datum["Pin Color"],
                ...otherData,
              },
            },
          };
        }
      });

      
}

export const getInputsForGroupedList = (groupListType = "",language='english') => {


  return processedData['grouped'][language][groupListType]['inputs']
};
