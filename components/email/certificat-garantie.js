import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 13,
    padding: 20,
  },
  firstRow: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row'
  },
  row: {
    width: '100%',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    borderLeftStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    display: 'flex',
    flexDirection: 'row'
  },
  rowName: {
    width: '20%',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    padding: 5
  },
  rowValue: {
    width: '80%',
    textAlign: 'center',
    padding: 5
  },
  heading: {
    fontSize: 24,
    fontWeight: 800,
    width: '100%',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontFamily: 'Helvetica-Bold'
  },
  container: {
    marginBottom: 15
  },
  paragraph: {
    marginBottom: 10
  },
  bold: {
    fontFamily: 'Helvetica-Bold'
  }
});

export const CertificatGarantie = ({data, order}) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Text style={styles.heading}>CERTIFICAT DE GARANTIE</Text>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={styles.rowName}>Nr comenzii:</Text>
          <Text style={styles.rowValue}>{data.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowName}>Model:</Text>
          <Text style={styles.rowValue}>{order.products[0].name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowName}>Data:</Text>
          <Text style={styles.rowValue}>{data.date || ''}</Text>
        </View>
      </View>

      <Text style={styles.paragraph}><Text style={styles.bold}>MILLORY</Text> garanteaza produsele din data cumpararii privitor la orice defect de fabricatie. Aceasta garantie nu acopera daunele provocate de utilizarea incorecta, folosirea produselor in alte scopuri decat pentru cele care au fost realizate sau lovirea produsului.</Text>
      <Text style={styles.paragraph}><Text style={styles.bold}>Termenul de garantie</Text> este de 24 luni de la data vanzarii. Conform Art.17 din Legea 449-2003 consumatorul trebuie sa informeze vanzatorul despre lipsa de conformitate in termen de 1 luna de cand a constatat-o.</Text>
      <Text style={styles.paragraph}><Text style={styles.bold}>Durata medie de utilizare</Text> a produselor MILLORY este de 10 ani. In cadrul acestei perioade, se asigura inlocuirea partilor defecte, contra cost.</Text>
      <Text style={styles.paragraph}><Text style={styles.bold}>TRANSPORT/DEPOZITARE/MANIPULARE-MONTARE/INSTALARE-INTRETINERE</Text></Text>
      <Text style={styles.paragraph}>Instructiuni cu privire la transportul/instalarea/folosirea si intretinerea oglinzilor.</Text>
      <Text style={styles.paragraph}>1. Transportul se face cu mijloace acoperite, curate, cu mijloace adecvate de fixare si protejare pentru a se evita deteriorarea in timpul manipularii si transportului.</Text>
      <Text style={styles.paragraph}>2. Transportul si depozitarea se face ii ambalaje MILLORY exclusive in pozitie verticala cu fixare rigida a ambalajului de un suport fix.</Text>
      <Text style={styles.paragraph}>3.  Mutarea produselor MILLORY se face numai prin ridicarea lor, prinderea pentru ridicare se face de la baza.</Text>
      <Text style={styles.paragraph}>4. Instalarea din punct de vedere electric a produsului este obligator sa fie executata exclusiv de catre personal autorizat pentru astfel de operatiuni.</Text>
      <Text style={styles.paragraph}>5. In caz de reclamatie cumparatorul va face dovada ca instalarea componentelor electrice a fost executata de o persoana fizica sau juridica autorizata. In caz contrar, producatorul nu isi asuma nici o responsabilitate pentru defectarea produsului sau pentru orice alte daune de orice natura provocate de montajul necorespunzator al instalatei electrice.</Text>
      <Text style={styles.paragraph}>6. Ambalajul si schema de montaj se vor pastra pentru verificari in cazul unor eventuale reclamati ulterioare.</Text>
      <Text style={styles.paragraph}>7. Nu asezati pe polite obiecte cu greutatea totala mai mare de 1,5-2 kg.</Text>
      <Text style={styles.paragraph}>8. Produsele MILLORY se pastrează numai in incaperi aerisite, ferit de afectiunea radiatiilor solare si de contactul indelungat cu apa.</Text>
      <Text style={styles.paragraph}>Retineti: Produsele MILLORY sunt concepute pentru interior.</Text>
      <Text style={styles.paragraph}>9. Se recomanda o distanta de minimum 15-30 cm fata de sursele de apa. Evitati contactul direct cu apa. Acesta este conceput sa reziste la conditii normale de umiditate. Expunerea permanent la un grad ridicat de umiditate va provoca deteriorarea produselor.</Text>
      <Text style={styles.paragraph}>10. Amplasati  la distanta de sursele de caldura (calorifer, etc.) distanta de garda generala  este de 10-20 cm.</Text>
    </Page>
  </Document>
);