#Rage Pank (Bage Planche)
##Objectif
Montrer des statistiques sur le degré de rage des utilisateurs GitHub, présenté sous forme de jauges

##Fonctionnalités
- Déterminer le plus gros rageux de GitHub, selon un set de 1000 utilisateurs, déterminés à partir d'un id au hasard (les 1000 utilisateurs à partir de cet id sont utilisés)  
- Chercher un utilisateur et voir son degré de rage, caculé à partir du nombre de commits grossiers  
- Présenter une timeline de rage par utilisateur (par année)
- Présenter une table des messages rageux par repository  
- Présenter les commits rageux de l'utilisateur  
- Déterminer les utilisateurs "clean" 

##Lancement
Pour lancer le projet localement:  
- Insérer son token d'authentification dans le fichier _./server/.env_
- Depuis le dossier _server_, exécuter la commande `npm start`  
- Depuis le dossier _site_, exécuter également la commande `npm start`  
Une fenêtre contenant l'application devrait s'ouvrir dans le browser.  
