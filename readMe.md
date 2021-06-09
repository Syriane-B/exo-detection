##Reflection sur le code
A chaque fois que le tonneau descend un peu, je parcours le tableau des plateformes.  
Je regarde si le tonneau est aligné à une plateforme en calculant la fourchette dans laquelle doit se situer la marge gauche du tonneau actuel.  Si la marge gauche du tonneau actuelle est alignée avec la plateforme, je regarde alors la posision sur l'axe des Y du tonneau et la compare à la plateforme.  
Si le tonneau arrive au niveau de la plateforme, je stoppe la chute du tonneau.
