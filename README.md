# Système de Gestion et de Suivi des Formations TekFutura

## Présentation

TekFutura MVP est un prototype frontend de plateforme centralisée pour la gestion des formations, des sessions, des participants et du suivi des présences. Cette application permet de visualiser l'ensemble de la chaîne de formation, du catalogue de formations jusqu'à la génération des certificats, avec un tableau de bord intégrant les indicateurs clés de performance.

## Objectifs du MVP

- **Centraliser les formations** : Catalogue unifié des formations disponibles avec catégories et durées
- **Suivre les sessions** : Planification et suivi en temps réel des sessions de formation
- **Gérer les participants** : Répertoire complet des apprenants avec filtrage par entreprise
- **Suivre les présences** : Suivi journalier des présences avec statuts (Présent, Absent, Retard)
- **Préparer la génération des certificats** : Gestion des certificats générés et suivi de leur statut
- **Afficher des indicateurs de pilotage** : Tableau de bord avec métriques clés (formations, sessions en cours, taux de présence, certificats)

## Modules disponibles

- **Tableau de bord** : Vue d'ensemble des KPIs et graphiques de tendances
- **Formations** : Catalogue avec recherche, filtrage par catégorie et statut
- **Sessions** : Calendrier opérationnel avec filtrage par statut et vue détaillée avec onglets
- **Participants** : Répertoire centralisé avec filtrage par entreprise
- **Présences** : Suivi des présences par session et par date
- **Certificats** : Gestion des certificats avec suivi de statut
- **Rapports** : Indicateurs de performance et visualisations graphiques
- **Paramètres** : Configuration générale de l'application

## Nouvelles fonctionnalités (MVP v1.1)

- **Pagination** : Toutes les listes affichent un maximum de 6 éléments par page avec contrôles de navigation
- **Détail session amélioré** : Vue détaillée avec onglets (Informations, Participants, Présences, Certificats)
- **Statistiques de session** : Affichage des KPIs spécifiques à chaque session (nb participants, taux présence, certificats, durée)
- **Toasts de feedback** : Actions non encore implémentées affichent des messages informatifs
- **Textes français corrigés** : Interface complètement en français avec accents appropriés

## Stack technique

- **Next.js 16.2.4** : Framework React avec App Router
- **TypeScript** : Typage statique pour la robustesse
- **Tailwind CSS** : Styling utility-first
- **Lucide React** : Iconographie moderne
- **Recharts** : Visualisations graphiques
- **React 19** : Dernière version de React
- **Données mockées** : Simulation en local (backend non connecté pour le MVP)

## État actuel du projet

### Fonctionnel ✅
- Interface frontend complètement fonctionnelle comme prototype
- Navigation fluide entre les modules
- Recherche et filtrage sur toutes les listes
- Pagination sur tous les tableaux
- Onglets interactifs sur la vue détail session
- Toasts de feedback pour les actions simulées

### En simulation 🔄
- Toutes les données sont mockées (lib/mock-data.ts)
- Les actions d'ajout/modification sont simulées
- Les enregistrements ne persistent pas (localStorage possible pour le MVP+)

### À implémenter 🚀
- Backend NestJS avec API REST
- Base de données PostgreSQL
- Authentification JWT réelle
- Génération PDF des certificats réelle
- Exports PDF/Excel réels
- Persistance des données
- Sécurité et autorisations

## Installation

### Prérequis
- Node.js 18+ ou pnpm 8+

### Étapes

```bash
# Cloner le projet
git clone <url-du-repo>
cd tekfutura-mvp

# Installer les dépendances
pnpm install
# ou
npm install

# Lancer le serveur de développement
pnpm dev
# ou
npm run dev
```

## Lancement

Accédez à l'application via :
```
http://localhost:3000
```

L'application se lancera directement sur la page de connexion, puis redirige vers le tableau de bord.

### Utilisateur par défaut (MVP)
- **Nom** : Aina Rakoto
- **Rôle** : Administrateur
- **Email** : aina.rakoto@tekfutura.mg

## Scripts disponibles

```bash
# Développement
pnpm dev          # Démarre le serveur local

# Build
pnpm build        # Construit l'application pour la production
pnpm start        # Lance la version de production

# Linting
pnpm lint         # Exécute ESLint
```

## Structure du projet

```
app/                    # Pages Next.js avec App Router
├── (platform)/        # Routes protégées du dashboard
├── login/             # Page de connexion
└── layout.tsx         # Layout principal

components/           # Composants React réutilisables
├── forms/            # Formulaires (formations, sessions, etc.)
├── tables/           # Tableaux (DataTable, AttendanceTable)
├── layout/           # Layout (Header, Sidebar)
├── shared/           # Composants partagés (Button, Card, Tabs, Pagination, etc.)
└── ui/               # Composants UI primitifs

hooks/                # Hooks React personnalisés
├── use-*-data.ts    # Gestion des données mockées
├── use-pagination.ts # Logique de pagination
└── use-client-ready.ts

lib/                  # Utilitaires et configuration
├── mock-data.ts     # Données mockées (formations, sessions, participants, etc.)
├── routes.ts        # Définition des routes de l'application
├── api/             # (Futur) Appels API
└── utils.ts         # Fonctions utilitaires

types/               # Définitions TypeScript
└── index.ts        # Interfaces et types

public/              # Fichiers statiques
```

## Prochaines étapes (roadmap)

### Phase 2 : Backend & Persistance
- [ ] Créer l'API NestJS
- [ ] Mettre en place PostgreSQL avec Prisma ORM
- [ ] Connecter le frontend à l'API

### Phase 3 : Authentification & Sécurité
- [ ] Implémenter l'authentification JWT réelle
- [ ] Ajouter les autorisations par rôle (RBAC)
- [ ] Sécuriser les endpoints API

### Phase 4 : Génération de certificats
- [ ] Intégrer une bibliothèque PDF (pdfkit, jsPDF, etc.)
- [ ] Implémenter la génération réelle de certificats
- [ ] Ajouter la signature numérique

### Phase 5 : Export & Rapports
- [ ] Générer les rapports en PDF (avec charts)
- [ ] Ajouter l'export en Excel
- [ ] Créer des templates paramétrables

### Phase 6 : Évolutions UX/UI
- [ ] Thème personnalisable (light/dark mode)
- [ ] Notifications en temps réel (WebSocket)
- [ ] Export/import de données en masse
- [ ] Calendrier interactif avancé

## Bonnes pratiques

### Code
- Composants fonctionnels avec hooks
- Gestion d'état avec useState et useMemo
- Imports relatifs avec alias (@)
- TypeScript strict partout

### Design
- Inspiré par Linear, Supabase, Retool
- Palette de couleurs : bleu sobre (#2563eb), grays neutres
- Espacements généreux, coins arrondis (lg)
- Accessibilité prioritaire

### Données
- Mock-data centralisée en lib/mock-data.ts
- Hooks custom pour la logique métier
- Pas de state management complexe (Redux) pour le MVP

## Contribuer

Pour apporter des améliorations :
1. Crée une branche feature (`git checkout -b feature/ma-fonctionnalite`)
2. Fais tes modifications
3. Committe ton code (`git commit -m "Add: description"`)
4. Pousse ta branche (`git push origin feature/ma-fonctionnalite`)
5. Crée une Pull Request

## Support & Contact

Pour les questions sur ce MVP, contacte l'équipe TekFutura.

---

**Version** : 1.1.0  
**Dernière mise à jour** : Avril 2026  
**Statut** : MVP - Prototype Fonctionnel
