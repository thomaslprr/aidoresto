const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.commandeCompteur = functions.firestore
    .document('/restorant/{idResto}/commandes/{idCommande}')
    .onCreate((snap, context) => {

        const commande = snap.data();

        let objetCommande = {
            date: commande.date,
            nom: commande.nom,
            couverts: commande.nombreCouverts,
            prix: commande.prixTotal,
            resto: idResto
        };

        db.doc('/stats/commandes').set(objetCommande);

});