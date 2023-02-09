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
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de las biopsias fueron discutidos con el paciente. Riesgos discutidos incluyen sangrado, infección, cicatrices y daños a las estructuras subyacentes. El paciente no tenía más preguntas. Los sitios de la biopsia se limpiaron con alcohol y se infiltraron con un anestésico local. La biopsia por raspado a cabo. se consiguió la hemostasis. sitio de la biopsia fue cubierta con pomada y una tirita. instrucciones de cuidado sitio de la herida de biopsia fueron revisados ​​con el paciente.",
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
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupción cutánea; Other;Custom;Lookup"
                }
            },
            "Shave removal": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de las biopsias fueron discutidos con el paciente. Riesgos discutidos incluyen sangrado, infección, cicatrices y daños a las estructuras subyacentes. El paciente no tenía más preguntas. El sitio de la biopsia se limpió con alcohol y se infiltró con anestesia local. La eliminación afeitado realiza. se consiguió la hemostasis. sitio de la biopsia fue cubierta con pomada y una tirita. instrucciones de cuidado sitio de la herida de biopsia fueron revisados ​​con el paciente.",
                "mapLabel": "eliminación de afeitado",
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
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupción cutánea; Other;Custom;Lookup"
                }
            },
            "Punch biopsy": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de las biopsias fueron discutidos con el paciente. Riesgos discutidos incluyen sangrado, infección, cicatrices y daños a las estructuras subyacentes. El paciente no tenía más preguntas. Los sitios de la biopsia se limpiaron con alcohol y se infiltraron con un anestésico local. Se realizó la biopsia. se consiguió la hemostasis. Se colocaron suturas. sitios de la biopsia fueron cubiertos con un ungüento y una tirita. instrucciones de cuidado de las heridas fueron revisados ​​con el paciente.",
                "mapLabel": "biopsia por punción",
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
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupción cutánea; Other;Custom;Lookup"
                }
            },
            "Punch Excision": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de la supresión del sacador se discutieron con el paciente. Riesgos discutidos incluyen sangrado, infección, cicatrices y daños a las estructuras subyacentes. El paciente no tenía más preguntas. El sitio de escisión punzón se limpió con alcohol y se infiltró con anestesia local. Se realizó la escisión punzón. se consiguió la hemostasis. Se colocaron suturas. sitio de supresión del sacador estaba cubierta con un ungüento y una tirita. instrucciones de cuidado de las heridas fueron revisados ​​con el paciente.",
                "mapLabel": "supresión del sacador",
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
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupción cutánea; Other;Custom;Lookup"
                }
            },
            "Excision": {
                "description": "Se obtuvo consentimiento informado y los riesgos y beneficios de la escisión se discutieron con el paciente. Riesgos discutidos incluyen sangrado, infección, cicatrices y daños a las estructuras subyacentes. El paciente no tenía más preguntas. El sitio de escisión punzón se limpió con alcohol y se infiltró con anestesia local. Se realizó la escisión. se consiguió la hemostasis. Se colocaron suturas. Escisión sitio se cubrió con ungüento y una tirita. instrucciones de cuidado de las heridas fueron revisados ​​con el paciente.",
                "mapLabel": "excisión",
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
                    "AssociatedDxCode11": "Dx11:: 2F72 - Neoplasias de comportamiento incierto de la piel;ME66.6 - Erupción cutánea; Other;Custom;Lookup"
                }
            }
        },
        "japanese": {
            "Shave biopsy": {
                "description": "获得知情同意和活检的风险和收益都与病人讨论。风险讨论包括出血，感染，瘢痕形成，并且损坏底层结构。病人没有其他问题。该活检部位用酒精进行清洗，并用局部麻醉渗透。刮胡子活检进行。达到止血。活检部位覆盖着药膏和创可贴。活检部位的伤口护理指令是与患者审查。",
                "mapLabel": "剃须活检",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;附加文本3",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;附加文本3",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;附加文本3",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  皮肤生物学行为不定的肿瘤;R23.8 - 皮疹;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - 皮肤生物学行为不定的肿瘤; ME66.6 - 皮疹;Other;Custom;Lookup"
                }
            },
            "Shave removal": {
                "description": "获得知情同意和活检的风险和收益都与病人讨论。风险讨论包括出血，感染，瘢痕形成，并且损坏底层结构。病人没有其他问题。活检部位用酒精清洗，并用局部麻醉渗透。刮胡子去除执行。达到止血。活检部位覆盖着药膏和创可贴。活检部位的伤口护理指令是与患者审查。",
                "mapLabel": "剃须去除",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;附加文本4",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;附加文本4",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;附加文本4",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  皮肤生物学行为不定的肿瘤;R23.8 - 皮疹;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - 皮肤生物学行为不定的肿瘤; ME66.6 - 皮疹;Other;Custom;Lookup"
                }
            },
            "Punch biopsy": {
                "description": "获得知情同意和活检的风险和收益都与病人讨论。风险讨论包括出血，感染，瘢痕形成，并且损坏底层结构。病人没有其他问题。该活检部位用酒精进行清洗，并用局部麻醉渗透。进行活检。达到止血。缝合线放置。活检部位布满了药膏和创可贴。伤口护理指令是与患者审查。",
                "mapLabel": "钻孔活组织检查",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text5",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text5",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text5",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  皮肤生物学行为不定的肿瘤;R23.8 - 皮疹;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - 皮肤生物学行为不定的肿瘤; ME66.6 - 皮疹;Other;Custom;Lookup"
                }
            },
            "Punch Excision": {
                "description": "获得知情同意和风险，并冲切除的好处是与病人讨论。风险讨论包括出血，感染，瘢痕形成，并且损坏底层结构。病人没有其他问题。冲头切除部位用酒精清洗，并用局部麻醉渗透。进行冲头切除。达到止血。缝合线放置。冲床切除部位覆盖着药膏和创可贴。伤口护理指令是与患者审查。",
                "mapLabel": "冲床切除",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text6",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text6",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text6",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  皮肤生物学行为不定的肿瘤;R23.8 - 皮疹;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - 皮肤生物学行为不定的肿瘤; ME66.6 - 皮疹;Other;Custom;Lookup"
                }
            },
            "Excision": {
                "description": "签署知情同意书，并切除的风险和收益都与病人讨论。风险讨论包括出血，感染，瘢痕形成，并且损坏底层结构。病人没有其他问题。冲头切除部位用酒精清洗，并用局部麻醉渗透。进行切除。达到止血。缝合线放置。切除部位覆盖着药膏和创可贴。伤口护理指令是与患者审查。",
                "mapLabel": "切除",
                "pinType": "circle",
                "pinColor": "red",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text7",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text7",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text7",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D48.5 -  皮肤生物学行为不定的肿瘤;R23.8 - 皮疹;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F72 - 皮肤生物学行为不定的肿瘤; ME66.6 - 皮疹;Other;Custom;Lookup"
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
                "description": "desctruction criocirugía se realizó en las siguientes lesiones premalignas:",
                "mapLabel": "queratosis actínica",
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
                    "AssociatedDxCode11": "Dx11::EK90.0 - Queratosis actínica;Other;Custom;Lookup"
                }
            },
            "Cryo-Wart": {
                "description": "la destrucción de criocirugía se realizó en las siguientes verrugas:",
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
                "description": "la destrucción de criocirugía se realizó en las siguientes ISKs:",
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
                "description": "se inyectó Medicación:",
                "mapLabel": "inyección",
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
                    "AssociatedDxCode11": "Dx11::EE60.1 - Cicatriz hipertrófica;ED70.2 - Alopecia areata;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Nevus": {
                "description": "Diagnóstico: un nevus aparecen benignos se observó",
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
                    "AssociatedDxCode11": "Dx11::2F20.1 - Nevo melanocítico atípico;2F20.Z - Neoplasias melanocíticas cutáneas benignas, sin especificación;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Acne": {
                "description": "Diagnóstico: El acné se observó.",
                "mapLabel": "acné",
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
                    "AssociatedDxCode11": "Dx11::ED80.Z - Acné;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Psoriasis": {
                "description": "Diagnóstico: La psoriasis se observó",
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
                "description": "Diagnóstico: Eczema se observó",
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
                    "AssociatedDxCode11": "Dx11::EA80 - Eccema atópico;Other;Custom;Lookup"
                }
            }
        },
        "japanese": {
            "Cryo-AK": {
                "description": "低温外科desctruction是以下癌前病变进行：",
                "mapLabel": "光化性角化病",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text8",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text8",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text8",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L57.0 - 光线性角化病;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11:: EK90.0 - 光线性角化病;Other;Custom;Lookup"
                }
            },
            "Cryo-Wart": {
                "description": "冷冻手术破坏了以下疣进行：",
                "mapLabel": "疣",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text9",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text9",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text9",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::B07.8 - 寻常疣;B08.1 - 传染性软疣;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::1E80 - 寻常疣;1E76 - 传染性软疣;Other;Custom;Lookup"
                }
            },
            "Cryo-ISK": {
                "description": "冷冻手术破坏了以下ISKs进行：",
                "mapLabel": "发炎的脂溢性角化病",
                "pinType": "asterisk",
                "pinColor": "blue",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text10",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text10",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text10",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L82.0 - Inflamed Seborrheic keratosis;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F21.0 - 脂溢性角化病;Other;Custom;Lookup"
                }
            },
            "Injection-Med": {
                "description": "药物注射：",
                "mapLabel": "注射",
                "pinType": "carat",
                "pinColor": "orange",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text11",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text11",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text11",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L91.0 - 增生性瘢痕;L63.9 - 斑秃;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EE60.1 - 增生性瘢痕;ED70.2 - 斑秃;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Nevus": {
                "description": "诊断：良性痣出现有人指出",
                "mapLabel": "痣",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text12",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text12",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text12",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::D22.9 - 非典型黑素细胞痣;I78.1 - 未特指的黑素细胞痣;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::2F20.1 - 非典型黑素细胞痣;2F20.Z - 未特指的黑素细胞痣;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Acne": {
                "description": "诊断：痤疮指出。",
                "mapLabel": "粉刺",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text13",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text13",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text13",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L70.9 - 未特指的痤疮;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::ED80.Z - 未特指的痤疮;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Psoriasis": {
                "description": "诊断：银屑病指出",
                "mapLabel": "银屑病",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text14",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text14",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text14",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L40.9 - 银屑病;L40.50 - 未特指的银屑病性关节炎;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA90.Z -  银屑病;FA21.Z - 未特指的银屑病性关节炎;Other;Custom;Lookup"
                }
            },
            "Diagnosis-Eczema": {
                "description": "诊断：湿疹指出",
                "mapLabel": "湿疹",
                "pinType": "circle",
                "pinColor": "green",
                "inputs": [
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text15",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text15",
                        "options": [],
                        "value": []
                    },
                    {
                        "type": "multiselect",
                        "label": "附加文本1;附加文本2;其他Text15",
                        "options": [],
                        "value": []
                    }
                ],
                "codes": {
                    "AssociatedDxCode10": "Dx10::L20.9 - 特应性湿疹;Other;Custom;Lookup",
                    "AssociatedDxCode11": "Dx11::EA80 - 特应性湿疹;Other;Custom;Lookup"
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
