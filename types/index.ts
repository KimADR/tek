export type FormationStatus = "ACTIVE" | "INACTIVE";
export type SessionStatus = "Prévue" | "En cours" | "Terminée" | "Annulée";
export type AttendanceStatus = "Présent" | "Absent" | "Retard";
export type UserRole = "Administrateur" | "Direction" | "Formateur";
export type CertificateStatus = "Disponible" | "En attente";

export interface Formation {
  id: string;
  titre: string;
  categorie: string;
  dureeHeures: number;
  statut: FormationStatus;
  sessionsCount: number;
  description: string;
}

export interface Session {
  id: string;
  formationId: string;
  formationTitre: string;
  formateur: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  participantsCount: number;
  statut: SessionStatus;
}

export interface Participant {
  id: string;
  nomComplet: string;
  email: string;
  telephone: string;
  entreprise: string;
  poste: string;
  formationsSuivies: string[];
  statut?: "Actif" | "En formation" | "Certifié" | "Inactif";
}

export interface Certificate {
  id: string;
  numero: string;
  participantId: string;
  participantNom: string;
  formation: string;
  dateEmission: string;
  statut: CertificateStatus;
}

export interface AttendanceEntry {
  participantId: string;
  participantNom: string;
  statut: AttendanceStatus;
  remarque?: string;
}

export interface DashboardStats {
  totalFormations: number;
  sessionsEnCours: number;
  participantsInscrits: number;
  certificatsGeneres: number;
  tauxPresenceMoyen: number;
}

export interface MonthlyMetric {
  mois: string;
  inscriptions: number;
}

export interface PopularFormationMetric {
  nom: string;
  participants: number;
}

export interface CategoryMetric {
  name: string;
  value: number;
}

export interface PresenceMetric {
  month: string;
  rate: number;
}

export interface AppUser {
  nom: string;
  role: UserRole;
  email: string;
}

export interface AppState {
  formations: Formation[];
  sessions: Session[];
  participants: Participant[];
  certificates: Certificate[];
  attendanceBySession: Record<string, AttendanceEntry[]>;
  dashboardStats: DashboardStats;
  inscriptionsParMois: MonthlyMetric[];
  formationsPopulaires: PopularFormationMetric[];
  repartitionCategories: CategoryMetric[];
  evolutionPresence: PresenceMetric[];
  entreprises: string[];
  currentUser: AppUser;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
}

export interface ApiItemResponse<T> {
  data: T;
  message?: string;
}

export interface FormationPayload {
  titre: string;
  categorie: string;
  dureeHeures: number;
  statut: FormationStatus;
  description: string;
}

export interface SessionPayload {
  formationId: string;
  formationTitre: string;
  formateur: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  participantsCount: number;
  statut: SessionStatus;
}

export interface ParticipantPayload {
  nomComplet: string;
  email: string;
  telephone: string;
  entreprise: string;
  poste: string;
  formationsSuivies: string[];
}
