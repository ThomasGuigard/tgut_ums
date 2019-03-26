# tgut_ums
Application permettant de consulter l'API d'OMDb

Ultimate Movie Scrapper

Les différents objectifs du projet :

Disposer d’une application Material Design 
Utiliser et manipuler l’API d’OMDb pour afficher des films/series/episodes
Sauvegarder une liste de favoris
Pouvoir exporter cette liste de favoris au format CSV
Disposer d’une application multiplateforme
Utiliser Cordova pour se servir du stockage des posters




L’application permet de :
Rechercher un film ou une série
Afficher le détail du média et consulter les saisons et les épisodes si c’est une série 
Pouvoir ajouter ou supprimer le média des favoris
Pouvoir télécharger le poster en HD si il est disponible
Afficher les favoris
Pouvoir partager ses favoris
Importer ou exporter des favoris
Disposer d’un compte pour se connecter à l’application
Pouvoir créer un compte


L’application est développée à partir d’Ionic 4 pour une meilleure implémentation d’Angular,
Elle est découpée en 3 tabs avec un formulaire de connexion à l’ouverture pour y accéder.
Le premier est pour rechercher un film, le second une série et le dernier à afficher les favoris de l’utilisateur.
Les favoris sont découpés entre Films et Séries
Depuis le détail d’une série l’utilisateur peut accéder aux différents épisodes.
Sur ce même détail il peut télécharger le poster si il le souhaite ou encore ajouter le média aux favoris.

Elles disposent de 4 services pour manipuler les données :

ExtrasService pour pouvoir passer des objets entres les pages ou garder en mémoire la tab actuelle
ItemService pour permettre à l’application de sauvegarder les favoris dans firebase et avoir une persistence des données offline comme online
OmdbService pour accéder à l’API d’imdb et ainsi afficher nos différentes informations
AuthenticateService : Permet de se connecter à l’application et par la suite d’avoir des favoris propre à son compte

Au niveau des packages utilisés nous disposons de AngularFire2 qui va s’occuper de la liaison avec Firebase

Les favoris et les comptes sont stockés sur Firebase

Nous avons aussi 2 plugins cordova : File et Social Sharing

File est utilisé pour sauvegarder les posters en .PNG et la liste des favoris en .CSV

Social Sharing permet de partager le fichier .CSV une fois créée dans le cache à l’aide du plugin File



