import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 10,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  section: {
    width: '50%',
    padding: 5
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
  bottomContainer: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  bigRowName: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    textAlign: 'center',
    padding: 5
  },
  bigRowValue: {
    width: '50%',
    textAlign: 'center',
    padding: 5
  },
  addOnContainer: {
    width: '50%',
    textAlign: 'center',
  },
  addOn: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    padding: 5
  },
  smallRowName: {
    width: '40%',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    padding: 5
  },
  smallRowValue: {
    width: '60%',
    textAlign: 'center',
    padding: 5
  }
});

export const BlancProducere = ({data, order}) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.topContainer}>
        <View style={styles.section}>
          <Image src={order.image || 'https://res.cloudinary.com/dbh1vgas3/image/upload/v1660648520/placeholder_xvcg8b.png'} />
        </View>
        <View style={styles.section}>
          <View style={styles.firstRow}>
            <Text style={styles.smallRowName}>Nr. Comanda:</Text>
            <Text style={styles.smallRowValue}>{data.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.smallRowName}>Dimensiuni:</Text>
            <View style={styles.smallRowValue}>
              <Text>Inaltime x Latime</Text>
              <Text>{order.size ? order.size.name : ''}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.smallRowName}>Model:</Text>
            <Text style={styles.smallRowValue}>{order.products ? order.products[0].name : ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.smallRowName}>Data:</Text>
            <Text style={styles.smallRowValue}>{data.date || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.smallRowName}>Data executare:</Text>
            <Text style={styles.smallRowValue}>{data.executionDate || ''}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.firstRow}>
          <Text style={styles.bigRowName}>Suplimente adaugatoare:</Text>
          <View style={styles.addOnContainer}>
            <Text style={styles.addOn}>Suplimente adaugatoare :</Text>
            {order.add_ons && order.add_ons.map((addOn) => <Text style={styles.addOn.name}>{addOn.name}</Text>)}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.bigRowName}>Dunga de iluminare:</Text>
          <Text style={styles.bigRowValue}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.bigRowName}>Led fata:</Text>
          <Text style={styles.bigRowValue}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.bigRowName}>Led spate:</Text>
          <Text style={styles.bigRowValue}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.bigRowName}>Culoarea iluminare:</Text>
          <Text style={styles.bigRowValue}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.bigRowName}>Impachetare:</Text>
          <Text style={styles.bigRowValue}>{order.packaging ? 'Da' : ''}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bigRowName}>Beneficiar:</Text>
          <Text style={styles.bigRowValue}>{data.name}</Text>
        </View>
      </View>
    </Page>
  </Document>
);