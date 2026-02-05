# Questions et Réponses - Débriefing SmartResto

## 1. Architecture Générale

### Q1: Quelle est la structure globale du projet SmartResto ?
**R:** SmartResto est une application Angular 20 avec NgRx pour la gestion d'état. Elle est organisée en modules features (order, review, stock), un menu-catalog, des services partagés, et un store centralisé avec Redux.

### Q2: Pourquoi avoir choisi Angular 20 ?
**R:** Angular 20 est la dernière version stable avec des améliorations de performance, un meilleur support TypeScript 5.9, et des fonctionnalités modernes comme les standalone components.

### Q3: Quelle est la philosophie derrière l'utilisation de NgRx ?
**R:** NgRx permet une gestion d'état prévisible et centralisée, facilitant le debugging avec Redux DevTools, la traçabilité des actions, et la séparation des responsabilités (actions, reducers, selectors).

### Q4: Comment est structuré le dossier features/ ?
**R:** Le dossier features/ contient 3 modules : order (gestion des commandes), review (gestion des avis clients), et stock (gestion des stocks). Chaque feature a ses propres composants et test-components.

### Q5: Quelle est la différence entre /store et /menu-catalog ?
**R:** /store contient les actions, reducers et selectors centralisés (product, review). /menu-catalog contient le composant principal d'affichage du catalogue avec sa propre logique UI.

## 2. Gestion d'État avec NgRx

### Q6: Quels sont les reducers principaux de l'application ?
**R:** Deux reducers principaux : productReducer (gère les produits, le panier, les catégories, la recherche) et reviewReducer (gère les avis clients).

### Q7: Comment fonctionne le flux de données dans l'application ?
**R:** Le flux suit le pattern Redux : Component → dispatch(action) → Reducer modifie le state → Selector récupère les données → Component reçoit via Observable.

### Q8: Quelles actions sont disponibles pour les produits ?
**R:** loadProductsSuccess, addToCart, removeFromCart, updateCartQuantity, clearCart, setCategory, setSearchTerm, loadCartFromStorage.

### Q9: Comment est configuré le StoreDevtools ?
**R:** StoreDevtools est configuré dans app.module.ts avec maxAge: 25 et logOnly: false pour permettre le time-travel debugging en développement.

### Q10: Qu'est-ce que le CatalogAppState ?
**R:** Interface TypeScript définissant la structure du state : products (Product[]), cart (CartItem[]), selectedCategory (string), searchTerm (string).

## 3. Modèles de Données

### Q11: Quels sont les attributs d'un Product ?
**R:** id (number), name (string), price (number), stock (number), category (string), image (string).

### Q12: Quelle est la différence entre Product et CartItem ?
**R:** CartItem étend Product en ajoutant une propriété quantity pour gérer la quantité dans le panier.

### Q13: Comment est structuré le modèle Review ?
**R:** Review contient : id, username, rating (1-5), comment, date, et productId pour associer l'avis à un produit.

### Q14: Comment gérez-vous la diminution du stock ?
**R:** Via la fonction decreaseStock qui crée un nouveau produit avec stock réduit (Math.max(0, stock - quantity)) pour respecter l'immutabilité.

### Q15: Quel est le rôle de AppState.model.ts ?
**R:** Il définit les interfaces centrales pour structurer l'état global de l'application et garantir la cohérence des types.

## 4. Composant Menu Catalog

### Q16: Qu'est-ce qu'un standalone component ?
**R:** MenuCatalogComponent est standalone (imports internes), ce qui permet de l'utiliser sans le déclarer dans @NgModule.declarations.

### Q17: Comment les produits sont-ils chargés au démarrage ?
**R:** Au ngOnInit, on vérifie localStorage('api-menu'). Si absent, on fetch assets/api-menu.json, puis on sauvegarde et dispatch loadProductsSuccess.

### Q18: Comment fonctionne la persistance du panier ?
**R:** Le panier est sauvegardé dans localStorage('cart') à chaque modification et rechargé au démarrage via loadCartFromStorage action.

### Q19: Quels Observables sont exposés dans MenuCatalogComponent ?
**R:** products$, cart$, categories$, selectedCategory$, cartTotal$, cartItemCount$ - tous connectés via les selectors NgRx.

### Q20: Comment gérez-vous l'affichage/masquage du panier ?
**R:** Via une propriété showCart (boolean) qui toggle l'affichage du panier dans le template.

## 5. Système d'Avis (Reviews)

### Q21: Comment les avis sont-ils stockés ?
**R:** Dans localStorage('avis') avec une structure par produit : { "1": { idproduit: 1, avis: [...] } }.

### Q22: Comment charger les avis au démarrage ?
**R:** loadReviewsFromStorage() lit localStorage('avis'), convertit la structure par produit en tableau plat, et dispatch loadReviewsSuccess.

### Q23: Quelle validation est appliquée au formulaire d'avis ?
**R:** username (requis, min 2 caractères), rating (requis, 1-5), comment (requis, min 10 caractères).

### Q24: Comment calculer la moyenne des notes ?
**R:** Via le selector selectAverageRating qui somme tous les ratings et divise par le nombre d'avis.

### Q25: Comment supprimer un avis ?
**R:** Dispatch de removeReview({ reviewId }) qui filtre le review du state et met à jour localStorage.

## 6. Gestion du Panier

### Q26: Comment ajouter un produit au panier ?
**R:** Dispatch de addToCart({ product }) qui vérifie si le produit existe déjà (incrémente quantity) ou l'ajoute comme nouveau CartItem.

### Q27: Comment gérer les quantités dans le panier ?
**R:** Via updateCartQuantity({ productId, quantity }) qui met à jour la quantité si > 0, sinon supprime l'item.

### Q28: Comment calculer le total du panier ?
**R:** Le selector selectCartTotal fait cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).

### Q29: Que se passe-t-il quand le stock est insuffisant ?
**R:** La fonction decreaseStock utilise Math.max(0, stock - quantity) pour éviter les stocks négatifs.

### Q30: Comment vider complètement le panier ?
**R:** Dispatch de clearCart() qui réinitialise cart à [] et supprime localStorage('cart').

## 7. Filtrage et Recherche

### Q31: Comment fonctionne le filtre par catégorie ?
**R:** Dispatch de setCategory({ category }) puis le selector selectFilteredProducts filtre les produits selon selectedCategory et searchTerm.

### Q32: Comment implémenter la recherche par mot-clé ?
**R:** Via setSearchTerm({ searchTerm }) et le selector filtre products.filter(p => p.name.toLowerCase().includes(searchTerm)).

### Q33: Comment obtenir la liste des catégories uniques ?
**R:** Le selector selectCategories utilise Array.from(new Set(products.map(p => p.category))) pour dédupliquer.

### Q34: Les filtres sont-ils cumulables ?
**R:** Oui, selectFilteredProducts applique d'abord le filtre catégorie puis le filtre de recherche sur les résultats.

### Q35: Comment réinitialiser les filtres ?
**R:** Dispatch setCategory({ category: '' }) et setSearchTerm({ searchTerm: '' }).

## 8. Configuration et Dépendances

### Q36: Quelles sont les dépendances principales du projet ?
**R:** @angular/core 20.3, @ngrx/store 20.1, @ngrx/store-devtools 20.1, rxjs 7.8, zone.js 0.15.

### Q37: Quel bundler est utilisé ?
**R:** Angular Build (@angular/build 20.3.9) qui utilise esbuild pour des builds ultra-rapides.

### Q38: Quels outils de test sont configurés ?
**R:** Jasmine 5.9, Karma 6.4, avec karma-chrome-launcher, karma-coverage, karma-jasmine-html-reporter.

### Q39: Comment lancer l'application en développement ?
**R:** npm start ou ng serve, qui lance le serveur de développement avec hot-reload.

### Q40: Prettier est-il configuré ?
**R:** Oui, avec printWidth: 100, singleQuote: true, et parser 'angular' pour les fichiers HTML.

## 9. Routing et Navigation

### Q41: Comment est configuré le routing ?
**R:** Via RouterModule.forRoot(routes) dans app.module.ts, les routes sont définies dans app.routes.ts.

### Q42: Quel composant est le bootstrap de l'application ?
**R:** MenuCatalogComponent est défini comme bootstrap dans app.module.ts.

### Q43: Y a-t-il des routes lazy-loaded ?
**R:** Le projet est structuré pour supporter le lazy loading avec les features modules (order, review, stock).

### Q44: Comment naviguer entre les différentes sections ?
**R:** Via routerLink dans les templates ou Router.navigate dans les composants.

### Q45: Y a-t-il des guards de navigation ?
**R:** Non configuré actuellement, mais la structure permet d'ajouter des guards pour protéger certaines routes.

## 10. Bonnes Pratiques et Optimisations

### Q46: Comment est gérée l'immutabilité ?
**R:** Utilisation du spread operator (...) dans les reducers et fonctions helpers pour créer de nouveaux objets au lieu de muter.

### Q47: Pourquoi utiliser des selectors ?
**R:** Les selectors NgRx sont mémorisés (memoized), évitent les recalculs inutiles, et centralisent la logique de sélection des données.

### Q48: Comment optimiser les performances du menu ?
**R:** TrackBy dans ngFor (trackByReviewId), OnPush change detection, Observables avec async pipe, lazy loading des features.

### Q49: Comment gérer les erreurs de chargement ?
**R:** Try-catch dans ngOnInit pour le fetch de api-menu.json avec console.error pour loguer les erreurs.

### Q50: Quelles améliorations futures sont envisageables ?
**R:** 
- Backend API REST au lieu de localStorage
- Authentication et autorisation
- Système de paiement
- Notifications en temps réel (WebSocket)
- PWA pour utilisation offline
- Tests E2E avec Cypress/Playwright
- Internationalisation (i18n)
- Analytics et monitoring
- Gestion des commandes multi-étapes
- Dashboard administrateur
