import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 display-4 fw-bold">HomePage</h1>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="card gradient-bg p-3 custom-shadow rounded mb-4">
                        <div className="card-body text-white">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <p className="fs-6 fs-md-5 fs-lg-4 fs-xl-3 fs-xxl-2">Willkommen auf der HomePage des Lernplaners der Gruppe "WiesoNichtDasBinIch"</p>
                                    <p className="fs-6 fs-md-5 fs-lg-4 fs-xl-3 fs-xxl-2">Bitte navigieren Sie durch die Menüs, um mehr zu erfahren.</p>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="aspect-ratio aspect-ratio-1x1">
                                        <img src="/ai_pic_greyscale.jpg" alt="AI Bild" className="img-fluid rounded-3 shadow"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card gradient-bg p-3 custom-shadow rounded mb-4">
                        <div className="card-body text-white">
                            <h2 className="text-center mb-4 fs-1 fs-md-2 fs-lg-3 fs-xl-4 fs-xxl-5">Ist-Zustand</h2>
                            <p className="fs-6 fs-md-5 fs-lg-4 fs-xl-3 fs-xxl-2">
                                Zum Ist-Zustand lässt sich sagen, dass der komplette Schulalltag analog geregelt und organisiert wurde, was zu verschiedenen Problemen geführt hat. Diese lagen zum Beispiel im uneinheitlichen Informationsaustausch zwischen verschiedenen Parteien, wie zum Beispiel Lehrern und Eltern, da diese über verschiedene Wege (Telefon, E-Mail, Brieftaube) kommuniziert haben. Des Weiteren gab es Probleme bei der Koordination von bestimmten Schulabläufen, wie zum Beispiel dem Organisieren und Verwalten der Klassenstrukturen, da dies über die analogen Klassenbücher, sowie veraltete Excel Tabellen geschah, was zu erheblichen Effizienzeinbußen und Unstimmigkeiten führte. Ein Beispiel dazu wäre, dass bei Schulentfall nicht alle Schüler und Lehrer gleichermaßen davon mitbekommen haben. Auch wurde das Kommunizieren der Hausaufgaben nicht einheitlich geregelt, was zu Schwierigkeiten zwischen Lehrern und Schülern führte.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card gradient-bg p-3 custom-shadow rounded mb-4">
                        <div className="card-body text-white">
                            <h2 className="text-center mb-4 fs-1 fs-md-2 fs-lg-3 fs-xl-4 fs-xxl-5">Anforderungen</h2>
                            <div className="row align-items-center">
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="aspect-ratio aspect-ratio-1x1">
                                        <img src="/ai_pic_greyscale_2.jpg" alt="AI Bild" className="img-fluid rounded-3 shadow"/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <p className="fs-6 fs-md-5 fs-lg-4 fs-xl-3 fs-xxl-2">
                                        Die IGS Wolfsburg stellte die funktionalen Anforderungen den Schulalltag durch ein allgemein nutzbares Tool zu verbessern, welche zum Beispiel darin bestanden die Klassen-, Schüler- und Lehrerverwaltung zu modernisieren und digitalisieren. Deshalb sollte eine Datenbank eingeführt werden, welche genannte Entitäten beherbergt und in einer einfachen Benutzeroberfläche zur Verfügung stellt. Des Weiteren sollten Hausaufgaben digital erfasst und abgerufen werden können. Auch der Prozess des Krankmeldens sollte in Zukunft durch einen einheitlichen Kanal der Lernplaner App abgewickelt werden, wozu die Eltern gleichermaßen wie Lehrer und Schüler einen Login bekommen sollten, mit welchem sie dann einen Kommunikationsweg zu Schulverantwortlichen einrichten können. Entfallene Schulfächer sollten zudem über das Kalendermodul für Schüler und Lehrer leicht einzusehen sein. Dabei sollte die gesamte Applikation modular aufgebaut sein, sodass in Zukunft auch schnell neue Module und Features angefragt und entwickelt werden können. Zu den nicht-funktionalen Anforderungen zählten zum Beispiel die Einhaltung der Datenschutzgrundverordnung. Des Weiteren war es wichtig eine möglichst einfach benutzbare und ansprechende Oberfläche zu verwenden, da diese gleichermaßen von technikaffinen jüngeren Benutzern, aber auch Benutzern, welche nicht so gut mit moderner Software klarkommen (z.B. Eltern), benutzt wird. Dazu zählt auch eine schnelle Reaktionszeit, sowie genügend Feedback bei Ladezeiten.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}