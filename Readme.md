# Optimisation de la Gestion d’un Restaurant avec Angular et NgRx

#### Objectif du Projet
Optimiser la gestion quotidienne d’un restaurant en utilisant Angular et NgRx, en résolvant 3 problématiques concrètes.

#### Problématiques Résolues

##### 1. Calcul du Prix Total d’une Commande
- Problème : Calcul manuel → erreurs et lenteur
- Solution : Total calculé automatiquement via NgRx selectors, avec mise à jour réactive du panier
- Bénéfice : Calcul instantané et fiable, zéro erreur

##### 2. Rupture de Produits / Pas de Suivi Stock
- Problème : Commandes sur des plats indisponibles
- Solution : Gestion du menu avec NgRx store et selectors pour filtrer les produits disponibles
- Bénéfice : Fluidité service ↔ cuisine et moins d’annulations

##### 3. Absence d’Espace Feedback Client
- Problème : Aucun retour qualitatif des clients
- Solution : Ajout d’une feature `feedback` avec formulaire persistant via LocalStorage
- Bénéfice : Indicateur qualité et amélioration continue du service

#### Mapping Technique (Problème → Feature)

| Problème                  | Feature Angular | NgRx                         |
|----------------------------|----------------|------------------------------|
| Total commande             | orders         | selectors + store            |
| Stock & rupture            | menu           | store + selectors            |
| Feedback client            | feedback       | store + localStorage         |

#### Technologies Utilisées
- Angular (Standalone Components)
- NgRx (Store, Actions, Reducers, Selectors, Effects)
- RxJS
- LocalStorage

#### Architecture Résumée

src/app/
├── core/ # services et configuration globale
├── shared/ # composants réutilisables, pipes et directives
├── features/ # modules : orders / menu / feedback
└── store/ # état global NgRx : actions, reducers, selectors,effects

#### Résultat Attendu
- Réduction des erreurs
- Communication améliorée entre salle et cuisine
- Expérience client optimisée