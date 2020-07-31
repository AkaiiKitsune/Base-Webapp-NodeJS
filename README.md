<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/AkaiiKitsune/OMP-GestionPic">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">OMP Stage MMI 2</h3>

  <p align="center">
    Une application permettant de gerer des chambres...
    <br/>
    <a href="https://github.com/AkaiiKitsune/OMP-GestionPic"><strong>Documentation</strong></a>
    <br/>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [A propos](#a-propos)
  * [Frameworks](#Frameworks)
* [Getting Started](#getting-started)
  * [Prérequis](#Prérequis)
  * [Installation](#installation)
* [Utilisation](#Utilisation)



<!-- ABOUT THE PROJECT -->
## A Propos

[![Product Name Screen Shot][product-screenshot]]

There are many great README templates available on GitHub, however, I didn't find one that really suit my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should element DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue.

A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Frameworks
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)



<!-- GETTING STARTED -->
## Getting Started

Cette application a été réalisée pour etre utilisée sur debian. En revanche tout distribution fait affaire tant que Node et MongoDB sont installés.

### Prérequis

L'application a besoin de trois paquets pour fonctionner : Git, MongoDB et Nodejs.
* git
```sh
sudo apt install git
```

* NodeJS
```sh
sudo apt install nodejs
```

* MongoDB
```sh
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Installation
1. Cloner le repo et entrer dans le repertoire de celui ci
```sh
git clone https://github.com/AkaiiKitsune/OMP-GestionPic && cd ./OMP-GestionPic
```
2. Installer les packets NPM
```sh
npm install
```
3. Ajouter la clé d'api dans /config/secrets.js (La clé est a générer sur https://api.insee.fr/catalogue/, dans la rubrique API Sirene V3)
```JS
module.exports={secretSirenAPI:'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'};
```



<!-- USAGE EXAMPLES -->
## Utilisation

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.




<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: images/screenshot.png
