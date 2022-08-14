import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 14,
    padding: 10,
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
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    padding: 5
  },
  rowValue: {
    width: '50%',
    textAlign: 'center',
    padding: 5
  }
});

export const FoaieOglinda = ({data, order}) => (
  <Document>
    <Page size='A4' style={styles.page}>
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
          <Text style={styles.rowName}>Beneficiar:</Text>
          <Text style={styles.rowValue}>{data.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowName}>Adresa:</Text>
          <Text style={styles.rowValue}>{data.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowName}>Tel:</Text>
          <Text style={styles.rowValue}>{data.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowName}>Localitatea:</Text>
          <Text style={styles.rowValue}>{data.city || ''}</Text>
        </View>
      </View>
    </Page>
  </Document>
);