#Rage Pank (Bage Planche)
##Objectif
Montrer des statistiques sur le degré de rage des utilisateurs GitHub, présenté sous forme de jauge
##Indicateurs
1. Swear words dans les commits
2. Beaucoup de deletion de code
3. Rebase
##Fonctionnalités
- Déterminer le plus gros rageux de GitHub  
- Chercher un utilisateur et voir son degré de rage  
- Avoir une timeline de rage par utilisateur  
- Obtenir une étoile à son repo s'il n'y a aucun indicateur de rage présent  
- Obtenir une couronne si tous ses repos ont une étoile  
- Avoir accès aux messages enragés des utilisateurs  
- Faire apparaître un commit rageux random  

##Rage calculation
###Par repo
Calcul d'un pourcentage. Un repo full hate = 100%  
1/3 de pourcentage calculé selon vulgarité des commits  
1/3 selon les deletions élevées  
1/3 selon un potentiel rebase  

Commits:  
Si 0.5% des commits du repo sont dirty => 0.25 des 33% alloués
Si 1% => 0.5  
Si 2% => 0.75  
Si >2% => 1  
(on pourrait vraiment calculer le pourcentage de dirty commits et prendre ce pourcentage sur 33% mais les chiffres seraient bien trop bas)  
  
Deletions:  
Si le nombre de deletions concernant un repo représente 1/4 des additions => 0.25 des 33% alloués  
Si 1/3 => 0.5  
Si 1/2 => 0.75  
Si >1/2 => 1  
  
Si rebase: 1 des 33% alloués  
  
Moyenne des pourcentages obtenus dans tous les repos (ou juste les dirty?) = total hate  
  
Si repo = 0% hate => étoile
