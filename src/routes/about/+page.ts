export const load = () => {
    return {
        props: {
            headings: {
                main: 'Lebenslauf',
                sections: [
                    { key: 'work_experience', title: 'Berufserfahrung' },
                    { key: 'education', title: 'Ausbildung' },
                    { key: 'volunteer', title: 'Ehrenamt' },
                    { key: 'fellowships', title: 'Mitgliedschaften' },
                    { key: 'skills', title: 'Kompetenzen' }
                ]
            },
            items: {
                work_experience: [
                    {
                        title: 'IT-Systemadministrator:in (Kommunale Fachanwendungen)',
                        company: 'ITEBO GmbH',
                        start: '2024-10',
                        end: '',
                        description: [],
                        skills: ['Windows', 'Datenbankverwaltung (MSSQL)', 'Kunden-Support', 'VOIS'],
                        image: 'logo_itebo.webp',
                        bgcolor: 'bg-white',
                        link: 'https://www.itebo.de',
                    },
                    {
                        title: 'System Administrator:in',
                        company: 'Gingco Systems GmbH',
                        start: '2022-11',
                        end: '2024-10',
                        description: [
                            'Betreuung und Entwicklung von Docker-basierten Netzwerk- und Serverinfrastruktur',
                            'Administration Netzwerkumgebung/Firewall',
                            'Administrativer 2nd- und 3rd-Level Support (Remote)',
                            'Performance- und Securitymanagement sowie Analyse und Beseitigung von Störungen',
                            'Kommunikation mit Kunden, externen Dienstleistern und Lieferanten',
                            'Verwaltung und Konfiguration von Server-Diensten (Windows, Linux)',
                            'Administration Telefonanlage',
                            'Technische Unterstützung bei der Einführung der ISO 27001',
                            'Administration Azure/Intune/Entra Umgebung'
                        ],
                        skills: ['PHP', 'Linux', 'Docker', 'ISO 27001', 'Microsoft Intune', 'Datenbankverwaltung (PostgreSQL & MSSQL)', 'Kunden-Support',],
                        image: 'logo_gingco.webp',
                        bgcolor: 'bg-gingco-blau',
                        link: 'https://gingco.systems',
                    },
                    {
                        title: 'Fachinformatiker:in Anwendungsbetreuung',
                        company: 'Luftfahrt-Bundesamt',
                        start: '2021-10',
                        end: '2022-11',
                        description: [
                            'Administration des Telekommunikationssystem',
                            'IT-Usersupport (Vor Ort und Remote)',
                        ],
                        skills: ['Telekommunikation', 'Telekommunikationssysteme', 'Linux', 'Windows',],
                        image: 'logo_lba.webp',
                        bgcolor: 'bg-white',
                        link: 'https://www.lba.de/DE/Home/home_node.html',
                    },
                    {
                        title: 'Junior Data Manager PIM',
                        company: 'STEINEL GmbH',
                        start: '2021-06',
                        end: '2021-10',
                        description: [
                            'Entwicklung von Automatisierung wie Vertriebsdatenblätter, Preislisten, Katalog, Printwerbemittel etc.',
                            'Entwicklung von Schnittstellen, wie z. B. die automatische Aktualisierung der Steinel Homepage durch das PIM-System',
                            'Dataquality weiter ausbauen',
                            'Enge Kooperation mit internen Abteilungen sowie externen Dienstleistern',
                            'Eruierung und Festlegung von Prozessen und Workflows',
                            'Koordination und Kontrolle der externen Dienstleister',
                            'Umsetzung neuer gesetzlicher Vorgaben und Verordnungen',
                        ],
                        skills: ['PHP', 'Scripting', 'HTML', 'Datenmanagement',],
                        image: 'logo_steinel.webp',
                        bgcolor: 'bg-white',
                        link: 'https://steinel.de'
                    }
                ],
                education: [
                    {
                        title: 'Fachinformatiker:in in der Fachrichtung Systemintegration',
                        company: 'STEINEL GmbH',
                        start: '2018-08',
                        end: '2021-06',
                        description: [
                            'IT-Usersupport (Vor Ort und Remote)',
                            'Support der Druckerumgebung (insbes. EU-Label Drucker)',
                            'Installation & Einrichtung von PCs/Mobilen Endgeräten',
                            'Erstellen & Aktualisieren der Windows 10 Images für die Installation der Geräte',
                            'Erstellen, koordinieren & halten von IT-Schulungen (Allgemeine IT Schulung & Informationssicherheitsschulung)',
                            'Erstellen einer Dokumentation der WLAN Umgebung am Standort Herzebrock',
                        ],
                        skills: ['Windows', 'Kunden-Support', 'Drucker',],
                        image: 'logo_steinel.webp',
                        bgcolor: 'bg-white',
                        link: 'https://steinel.de',
                    },
                    {
                        title: 'Gesamtschule - Fachoberschulreife',
                        company: 'Von-Zumbusch-Gesamtschule',
                        start: '2012-08',
                        end: '2018-07',
                        description: [],
                        skills: [],
                        image: 'logo_vzg.webp',
                        bgcolor: 'bg-white',
                        link: 'https://von-zumbusch-gesamtschule.de',
                    }
                ],
                volunteer: [
                    {
                        title: 'Co-Koordination AG Umwelt',
                        company: 'BÜNDNIS 90/DIE GRÜNEN Braunschweig',
                        start: '2025-05',
                        end: '',
                        description: [],
                        skills: [],
                        image: 'logo_gruene.svg',
                        bgcolor: 'bg-secondary-600',
                        link: 'https://gruene-braunschweig.de',
                    },
                    {
                        title: 'Bürger:innenmitglied im Umwelt- und Grünflächenausschuss des Rates der Stadt Braunschweig',
                        company: 'Stadt Braunschweig',
                        start: '2025-04',
                        end: '',
                        description: [],
                        skills: [],
                        image: 'logo_stadt_braunschweig.png',
                        bgcolor: 'bg-white',
                        link: 'https://braunschweig.de',
                    },
                    {
                        title: 'Plakatiermanager:in im Wahlkampfteam Bundestagswahl 2025',
                        company: 'BÜNDNIS 90/DIE GRÜNEN Braunschweig',
                        start: '2024-11',
                        end: '2025-02',
                        description: [],
                        skills: [],
                        image: 'logo_gruene.svg',
                        bgcolor: 'bg-secondary-600',
                        link: 'https://gruene-braunschweig.de',
                    },
                    {
                        title: 'Co-Koordination AG Digitales',
                        company: 'BÜNDNIS 90/DIE GRÜNEN Braunschweig',
                        start: '2023-11',
                        end: '',
                        description: [],
                        skills: [],
                        image: 'logo_gruene.svg',
                        bgcolor: 'bg-secondary-600',
                        link: 'https://gruene-braunschweig.de',
                    },
                    {
                        title: 'Co-Koordination Aktionsgruppe',
                        company: 'BÜNDNIS 90/DIE GRÜNEN Braunschweig',
                        start: '2023-11',
                        end: '2024-08',
                        description: [],
                        skills: [],
                        image: 'logo_gruene.svg',
                        bgcolor: 'bg-secondary-600',
                        link: 'https://gruene-braunschweig.de',
                    },
                ],
                fellowships: [
                    {
                        title: 'NABU',
                        // company: 'BÜNDNIS 90/DIE GRÜNEN Braunschweig',
                        start: '2025-01',
                        end: '',
                        description: [],
                        skills: [],
                        image: 'logo_nabu.webp',
                        bgcolor: 'bg-white',
                        link: 'https://gruene-jugend.de',
                    },
                    {
                        title: 'GRÜNE JUGEND',
                        // company: 'BÜNDNIS 90/DIE GRÜNEN Braunschweig',
                        start: '2022-11',
                        end: '',
                        description: [],
                        skills: [],
                        image: 'logo_gruene_jugend.webp',
                        bgcolor: 'bg-gruene-jugend-hellgruen',
                        link: 'https://gruene-jugend.de',
                    },
                    {
                        title: 'BÜNDNIS 90/DIE GRÜNEN',
                        // company: 'BÜNDNIS 90/DIE GRÜNEN Braunschweig',
                        start: '2022-11',
                        end: '',
                        description: [],
                        skills: [],
                        image: 'logo_gruene.svg',
                        bgcolor: 'bg-secondary-600',
                        link: 'https://www.gruene.de',
                    },
                ],
                skills: [
                    {
                        category: 'Informationstechnik',
                        subcategories: [
                            {
                                title: 'Infrastruktur',
                                skills: ['Windowsclient', 'Windowsserver', 'Linuxserver', 'Microsoft Intune', 'Docker', 'Telekommunikation', 'Telekommunikationssysteme', 'PostgreSQL', 'MSSQL']
                            },
                            {
                                title: 'Programmierung/Frameworks',
                                skills: ['PHP', 'CSS', 'HTML', 'TypeScript', 'SvelteKit']
                            },
                            {
                                title: 'Software',
                                skills: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'VS Code', 'SQL Server Management Studio']
                            }
                        ]
                    },
                    {
                        category: 'Sprachen',
                        skills: ['Deutsch (Muttersprache)', 'Englisch (B1)']
                    },
                ]
            }
        }
    }
}