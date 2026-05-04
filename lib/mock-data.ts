import {
  AttendanceEntry,
  AppState,
  Certificate,
  DashboardStats,
  Formation,
  MonthlyMetric,
  Participant,
  PopularFormationMetric,
  Session,
} from "@/types";

export const formations: Formation[] = [
  { id: "f1", titre: "Management des structures de production", categorie: "Management", dureeHeures: 24, statut: "ACTIVE", sessionsCount: 2, description: "Pilotage des équipes, indicateurs et amélioration continue." },
  { id: "f2", titre: "Sécurité et prévention sur chantier", categorie: "Sécurité", dureeHeures: 16, statut: "ACTIVE", sessionsCount: 1, description: "Bonnes pratiques terrain et réduction des risques." },
  { id: "f3", titre: "Maintenance industrielle", categorie: "Technique", dureeHeures: 30, statut: "ACTIVE", sessionsCount: 1, description: "Diagnostic, maintenance préventive et corrective." },
  { id: "f4", titre: "Bureautique professionnelle", categorie: "Numérique", dureeHeures: 12, statut: "INACTIVE", sessionsCount: 0, description: "Maîtrise des outils bureautiques essentiels." },
  { id: "f5", titre: "Gestion de projet Agile", categorie: "Gestion de projet", dureeHeures: 20, statut: "ACTIVE", sessionsCount: 1, description: "Scrum, planification itérative et suivi de sprint." },
  { id: "f6", titre: "Développement des compétences métiers", categorie: "RH", dureeHeures: 18, statut: "ACTIVE", sessionsCount: 1, description: "Plan de progression et évaluation des compétences." },
];

export const entreprises = [
  "Entreprise Alpha",
  "Groupe Industriel Mada",
  "Société Chantier Plus",
  "TekFutura Interne",
];

export const sessions: Session[] = [
  { id: "s1", formationId: "f1", formationTitre: formations[0].titre, formateur: "Marie Rakoto", dateDebut: "2026-04-12", dateFin: "2026-04-16", lieu: "Antananarivo", participantsCount: 14, statut: "Terminée" },
  { id: "s2", formationId: "f2", formationTitre: formations[1].titre, formateur: "Jean Raman", dateDebut: "2026-04-20", dateFin: "2026-04-22", lieu: "Toamasina", participantsCount: 10, statut: "En cours" },
  { id: "s3", formationId: "f3", formationTitre: formations[2].titre, formateur: "Hery Andri", dateDebut: "2026-05-04", dateFin: "2026-05-08", lieu: "Fianarantsoa", participantsCount: 9, statut: "Prévue" },
  { id: "s6", formationId: "f5", formationTitre: formations[4].titre, formateur: "Marie Rakoto", dateDebut: "2026-05-12", dateFin: "2026-05-14", lieu: "Antananarivo", participantsCount: 12, statut: "Prévue" },
  { id: "s7", formationId: "f4", formationTitre: formations[3].titre, formateur: "Jean Raman", dateDebut: "2026-05-18", dateFin: "2026-05-20", lieu: "Toamasina", participantsCount: 10, statut: "Prévue" },
  { id: "s4", formationId: "f5", formationTitre: formations[4].titre, formateur: "Lova Rabe", dateDebut: "2026-03-10", dateFin: "2026-03-14", lieu: "En ligne", participantsCount: 12, statut: "Terminée" },
  { id: "s5", formationId: "f6", formationTitre: formations[5].titre, formateur: "Tina Noro", dateDebut: "2026-05-20", dateFin: "2026-05-22", lieu: "Majunga", participantsCount: 8, statut: "Annulée" },
];

export const participants: Participant[] = [
  { id: "p1", nomComplet: "Rina Ando", email: "rina.ando@alpha.mg", telephone: "+261 34 10 000 01", entreprise: entreprises[0], poste: "Chef d'équipe", formationsSuivies: [formations[0].titre, formations[1].titre], statut: "Actif" },
  { id: "p2", nomComplet: "Mika Solo", email: "mika.solo@alpha.mg", telephone: "+261 34 10 000 02", entreprise: entreprises[0], poste: "Superviseur", formationsSuivies: [formations[0].titre], statut: "Certifié" },
  { id: "p3", nomComplet: "Tovo Hery", email: "tovo.hery@gim.mg", telephone: "+261 34 10 000 03", entreprise: entreprises[1], poste: "Technicien", formationsSuivies: [formations[2].titre], statut: "En formation" },
  { id: "p4", nomComplet: "Fara Niry", email: "fara.niry@gim.mg", telephone: "+261 34 10 000 04", entreprise: entreprises[1], poste: "Responsable QHSE", formationsSuivies: [formations[1].titre], statut: "Actif" },
  { id: "p5", nomComplet: "Aina Kanto", email: "aina.kanto@chantierplus.mg", telephone: "+261 34 10 000 05", entreprise: entreprises[2], poste: "Conducteur travaux", formationsSuivies: [formations[1].titre, formations[4].titre], statut: "Certifié" },
  { id: "p6", nomComplet: "Mamy Jo", email: "mamy.jo@chantierplus.mg", telephone: "+261 34 10 000 06", entreprise: entreprises[2], poste: "Chef chantier", formationsSuivies: [formations[1].titre], statut: "Inactif" },
  { id: "p7", nomComplet: "Kolo Ben", email: "kolo.ben@tekfutura.mg", telephone: "+261 34 10 000 07", entreprise: entreprises[3], poste: "Coordinateur", formationsSuivies: [formations[5].titre], statut: "Actif" },
  { id: "p8", nomComplet: "Vola Mia", email: "vola.mia@tekfutura.mg", telephone: "+261 34 10 000 08", entreprise: entreprises[3], poste: "Assistante RH", formationsSuivies: [formations[5].titre, formations[3].titre], statut: "En formation" },
  { id: "p9", nomComplet: "Tahina M", email: "tahina.m@alpha.mg", telephone: "+261 34 10 000 09", entreprise: entreprises[0], poste: "Planificateur", formationsSuivies: [formations[4].titre], statut: "Actif" },
  { id: "p10", nomComplet: "Nantenaina R", email: "nantenaina.r@gim.mg", telephone: "+261 34 10 000 10", entreprise: entreprises[1], poste: "Ingénieur maintenance", formationsSuivies: [formations[2].titre], statut: "Certifié" },
  { id: "p11", nomComplet: "Miora L", email: "miora.l@chantierplus.mg", telephone: "+261 34 10 000 11", entreprise: entreprises[2], poste: "Assistante projet", formationsSuivies: [formations[4].titre], statut: "Actif" },
  { id: "p12", nomComplet: "Feno T", email: "feno.t@tekfutura.mg", telephone: "+261 34 10 000 12", entreprise: entreprises[3], poste: "Formateur interne", formationsSuivies: [formations[0].titre, formations[5].titre], statut: "Certifié" },
];

export const certificates: Certificate[] = [
  { id: "c1", numero: "TF-2026-0012", participantId: "p1", participantNom: "Rina Ando", formation: formations[0].titre, dateEmission: "2026-04-18", statut: "Disponible" },
  { id: "c2", numero: "TF-2026-0013", participantId: "p2", participantNom: "Mika Solo", formation: formations[0].titre, dateEmission: "2026-04-18", statut: "Disponible" },
  { id: "c3", numero: "TF-2026-0014", participantId: "p4", participantNom: "Fara Niry", formation: formations[1].titre, dateEmission: "2026-04-24", statut: "En attente" },
  { id: "c4", numero: "TF-2026-0015", participantId: "p5", participantNom: "Aina Kanto", formation: formations[1].titre, dateEmission: "2026-04-24", statut: "Disponible" },
  { id: "c5", numero: "TF-2026-0016", participantId: "p10", participantNom: "Nantenaina R", formation: formations[2].titre, dateEmission: "2026-05-10", statut: "En attente" },
];

export const attendanceBySession: Record<string, AttendanceEntry[]> = {
  s2: participants.slice(0, 8).map((participant, index) => ({
    participantId: participant.id,
    participantNom: participant.nomComplet,
    statut: index % 5 === 0 ? "Retard" : index % 3 === 0 ? "Absent" : "Présent",
    remarque: index % 3 === 0 ? "Justificatif en attente" : "",
  })),
};

export const dashboardStats: DashboardStats = {
  totalFormations: formations.length,
  sessionsEnCours: sessions.filter((s) => s.statut === "En cours").length,
  participantsInscrits: participants.length,
  certificatsGeneres: certificates.length,
  tauxPresenceMoyen: 86,
};

export const inscriptionsParMois: MonthlyMetric[] = [
  { mois: "Jan", inscriptions: 18 },
  { mois: "Fév", inscriptions: 22 },
  { mois: "Mar", inscriptions: 19 },
  { mois: "Avr", inscriptions: 28 },
  { mois: "Mai", inscriptions: 24 },
  { mois: "Juin", inscriptions: 30 },
];

export const formationsPopulaires: PopularFormationMetric[] = [
  { nom: "Management", participants: 32 },
  { nom: "Sécurité", participants: 29 },
  { nom: "Maintenance", participants: 17 },
  { nom: "Agile", participants: 14 },
];

export const repartitionCategories = [
  { name: "Informatique", value: 35 },
  { name: "Management", value: 28 },
  { name: "Sécurité", value: 22 },
  { name: "Maintenance", value: 18 },
  { name: "Data", value: 15 }
];

export const evolutionPresence = [
  { month: "Jan", rate: 78 },
  { month: "Fév", rate: 82 },
  { month: "Mar", rate: 75 },
  { month: "Avr", rate: 86 },
  { month: "Mai", rate: 80 },
  { month: "Juin", rate: 88 }
];

export const currentUser = {
  nom: "Aina Rakoto",
  role: "Administrateur" as const,
  email: "aina.rakoto@tekfutura.mg",
};

export const initialAppState: AppState = {
  formations,
  sessions,
  participants,
  certificates,
  attendanceBySession,
  dashboardStats,
  inscriptionsParMois,
  formationsPopulaires,
  repartitionCategories,
  evolutionPresence,
  entreprises,
  currentUser,
};

export function computeDashboardStats(state: AppState): DashboardStats {
  const attendance = Object.values(state.attendanceBySession).flat();
  const presents = attendance.filter((entry) => entry.statut === "Présent").length;
  const tauxPresenceMoyen = attendance.length
    ? Math.round((presents / attendance.length) * 100)
    : state.dashboardStats.tauxPresenceMoyen;

  return {
    totalFormations: state.formations.length,
    sessionsEnCours: state.sessions.filter((session) => session.statut === "En cours").length,
    participantsInscrits: state.participants.length,
    certificatsGeneres: state.certificates.length,
    tauxPresenceMoyen,
  };
}
