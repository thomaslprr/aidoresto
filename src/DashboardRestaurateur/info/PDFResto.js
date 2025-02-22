import React from 'react';
import {Page, Text, View, Document, StyleSheet, Image, Font} from '@react-pdf/renderer';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    subtitle2: {
        fontSize: 10,
        marginLeft: 12,
        fontFamily: 'Oswald'
    },
    textcode:{
        fontSize: 65,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    adressesite:{
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Times-Roman',
        backgroundColor:'yellow'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    ou:{
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    section: {
        color: 'white',
        textAlign: 'center',
        marginLeft:135
    },

    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});


const PDFResto = (nom,adresse,qrcode,coderesto) => {
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ Ce restaurant utilise Helporesto pour faciliter les commandes et consulter la carte en ligne ~
                </Text>
                <Text style={styles.title}>{nom}</Text>
                <Text style={styles.author}>{adresse}</Text>
                <Text style={styles.subtitle}>
                    Accéder à la carte de notre restaurant en scannant le QRCode ci-dessous.
                </Text>
                <Text style={styles.subtitle2}>
                    Vous pouvez le scanner à l'aide de votre caméra de téléphone, snapchat, etc.
                </Text>
                <Text style={styles.text}>

                </Text>

                <View style={styles.section}>
                <Image source={ {uri: qrcode} } style={{width:250+'px'}} />
                </View>

                <Text style={styles.ou}>
                    OU
                </Text>
                <Text style={styles.subtitle}>
                    Accéder à la carte de notre restaurant en rentrant le code suivant sur le site
                </Text>
                <Text style={styles.adressesite}>helporesto.fr</Text>
                <Text style={styles.textcode}>
                    {coderesto}
                </Text>



            </Page>
        </Document>
    )
};

export default PDFResto;

