Application fonctionne, mais la conception n’est pas encore totalement terminée.
App est  actuellement en MVP (Minimum Viable Product).

🧠 1️⃣ Ce que  l'app fait (MVP)

Expense Tracker possède déjà les bases solides :

🔐 Authentification

✔️ Inscription utilisateur

✔️ Login JWT

✔️ Stockage du token

✔️ Refresh token

💰 Gestion des dépenses

✔️ Ajouter une dépense

✔️ Lister les dépenses

✔️ Modifier une dépense

✔️ Supprimer une dépense

✔️ Chaque utilisateur voit ses propres dépenses

📊 Interface mobile

✔️ Home screen

✔️ Liste des dépenses

✔️ Ajout

✔️ Edition

✔️ Suppression

✔️ Loader

✔️ Message si aucune dépense

✔️ Total des dépenses

Ce qui manque  pour que l'app est soit "complète"

 Fonctionnalités utiles
1- Filtrer les dépenses

exemple :

aujourd'hui

cette semaine

ce mois

API :

/api/expenses/?month=5
2️⃣ Statistiques

Exemple :

Total transport : 50000
Total nourriture : 30000
Total loisirs : 15000

et afficher un graphique.

3️⃣ Budget mensuel

Exemple :

Budget : 200000
Dépensé : 150000
Restant : 50000
4️⃣ Pagination

Si l'utilisateur a 1000 dépenses

/api/expenses?page=2
5️⃣ Recherche
/api/expenses?search=transport

Amélioration du mobile

Interface plus pro :

Ajouter

✔️ icônes
✔️ animation
✔️ graphiques
✔️ dark mode