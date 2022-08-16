import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Canvas, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 20,
  },
  topContainer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  logo: {
    width: '40%'
  },
  contacts: {
    width: '60%',
    paddingLeft: 10
  },
  contact: {
    fontFamily: 'Helvetica-Oblique',
    marginBottom: 4,
    width: '100%',
    textAlign: 'right'
  },
  bold: {
    fontFamily: 'Helvetica-Bold'
  },
  italicBold: {
    fontFamily: 'Helvetica-BoldOblique'
  },
  divider: {
    width: '100%',
    backgroundColor: 'black',
    height: 2,
    marginBottom: 15,
    marginTop: 15
  },
  paragraph: {
    fontSize: 10,
    fontFamily: 'Helvetica-Oblique',
    width: '100%',
    textAlign: 'center',
    marginBottom: 10
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
  rowGrey: {
    backgroundColor: '#F2F2F2',
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
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    padding: 5
  },
  rowValue1: {
    width: '30%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    padding: 5
  },
  rowName: {
    width: '20%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    padding: 5
  },
  rowValue2: {
    width: '30%',
    textAlign: 'center',
    padding: 5
  },
  bottomContainer: {
    marginBottom: 15
  },
  productFirstRow: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row'
  },
  productRow: {
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
  numberValue: {
    width: '8%',
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
  },
  modelValue: {
    width: '15%',
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
  },
  totalText: {
    width: '15%',
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    fontFamily: 'Helvetica-Bold'
  },
  sizeValue: {
    width: '20%',
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
  },
  addOnsValue: {
    width: '34%',
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
  },
  addOn: {
    padding: 4,
    width: '100%',
  },
  quantityValue: {
    width: '8%',
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
  },
  priceValue: {
    width: '15%',
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
  },
  footer: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  footerText: {
    width: '50%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  footerTextExecutor: {
    width: '50%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  stamp: {
    width: 80,
    height: 80
  },
  logoImg: {
    width: 120,
    height: 120
  }
});

export const BlancComanda = ({data, orders}) => {

  var index = 0

  return(
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.topContainer}>
        <View style={styles.logo}>
          <Image style={styles.logoImg} src='https://res.cloudinary.com/dbh1vgas3/image/upload/v1660483326/millory_ga9hd4.png'/>
        </View>
        {
          data.roDomain ?
          <View style={styles.contacts}>
            <Text style={styles.contact}><Text style={styles.bold}>MIRRORS & GLASS SRL</Text></Text>
            <Text style={styles.contact}>Adresa juridica: MD-2032, str. Mr. Irimia</Text>
            <Text style={styles.contact}>Popescu,Nr.1, la SCPA Coste & Ioanid, Etaj1, Ap.4 judet iasi</Text>
            <Text style={styles.contact}>CUI 45789185</Text>
            <Text style={styles.contact}>Nr.de ordine in registru comertului: J22/870/14.03.2022</Text>
            <Text style={styles.contact}>CONT RO94INGB0000999912467987</Text>

            <Text style={styles.contact}>Administrator: Schiopu Petru</Text>
            <Text style={styles.contact}>E-mail: <Link src="mailto:millory.ro@gmail.com">millory.ro@gmail.com</Link></Text>
            <Text style={styles.contact}>Tel: <Link src="tel:+40754599101" style={styles.bold}>+40 754 599 101</Link></Text>
          </View>
          :
          <View style={styles.contacts}>
            <Text style={styles.contact}><Text style={styles.bold}>ELISEI & COMPANI SRL</Text></Text>
            <Text style={styles.contact}>C/F: 1015600021930</Text>
            <Text style={styles.contact}>Cod TVA: 0308975</Text>
            <Text style={styles.contact}>Adresa juridica: MD-2032, str. Titulescu 28, (of.10), mun. Chisinau, RM</Text>
            <Text style={styles.contact}>IBAN: MD48ML000000002251317763</Text>
            <Text style={styles.contact}>BIC: MOLDMX317</Text>
            <Text style={styles.contact}>BC”MICB” SA Sucursala Remiz</Text>

            <Text style={styles.contact}>E-mail: <Link src="mailto:millory.ro@gmail.com">millory.ro@gmail.com</Link></Text>
            <Text style={styles.contact}>Tel: <Link src="tel:37369482034" style={styles.bold}>+373 694 820 34</Link></Text>
            <Text style={styles.contact}>Adressa SHOWROOM: <Text style={styles.bold}>str. Ismail 98</Text></Text>
          </View>
        }
      </View>
      <View style={styles.divider}/>
      <Text style={styles.paragraph}>Toate oglinzile sunt brandate cu logotipul Millory, in conformitate cu toate conditiile de garantie !!!</Text>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={styles.rowName}>Beneficiar:</Text>
          <Text style={styles.rowValue1}>{data.name}</Text>
          <Text style={styles.rowName}>Nr. comanda:</Text>
          <Text style={styles.rowValue2}>{data.id}</Text>
        </View>
        <View style={styles.rowGrey}>
          <Text style={styles.rowName}>Adresa:</Text>
          <Text style={styles.rowValue1}>{data.address}</Text>
          <Text style={styles.rowName}>Data:</Text>
          <Text style={styles.rowValue2}>{data.date || ''}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowName}>Tel:</Text>
          <Text style={styles.rowValue1}>{data.phone}</Text>
          <Text style={styles.rowName}>Data executare:</Text>
          <Text style={styles.rowValue2}>{data.executionDate || ''}</Text>
        </View>
        <View style={styles.rowGrey}>
          <Text style={styles.rowName}>Email:</Text>
          <Text style={styles.rowValue1}>{data.email}</Text>
          <Text style={styles.rowName}>Data montarii:</Text>
          <Text style={styles.rowValue2}></Text>
        </View>
      </View>
      <View style={styles.divider}/>
      <View style={styles.bottomContainer}>
        <View style={styles.productFirstRow}>
          <Text style={styles.numberValue}>Nr</Text>
          <Text style={styles.modelValue}>Denumirea (model)</Text>
          <View style={styles.sizeValue}>
            <Text>Dimensiunile:</Text> 
            <Text>Inaltimea/Latimea</Text>
          </View>
          <Text style={styles.addOnsValue}>Suplimente adaugatoare</Text>
          <Text style={styles.quantityValue}>Buc</Text>
          <Text style={styles.priceValue}>Costul</Text>
        </View>
        {orders && orders.length && orders.map((order) => {
          index += 1
          return(
            <View style={styles.productRow}>
              <Text style={styles.numberValue}>{index}</Text>
              <Text style={styles.modelValue}>{order.products[0].name}</Text>
              <Text style={styles.sizeValue}>{order.size.name}</Text>
              <View style={styles.addOnsValue}>{order.add_ons.map((addOn) => (
                <Text style={styles.addOn}>{addOn.name}</Text>
              ))}</View>
              <Text style={styles.quantityValue}>{order.number}</Text>
              <Text style={styles.priceValue}>{order.price} lei</Text>
            </View>
        )})}
        <View style={styles.productRow}>
          <Text style={styles.numberValue}>{index+1}</Text>
          <Text style={styles.modelValue}>Livrare</Text>
          <Text style={styles.sizeValue}/>
          <Text style={styles.addOnsValue}/>
          <Text style={styles.quantityValue}/>
          <Text style={styles.priceValue}/>
        </View>
        <View style={styles.productRow}>
          <Text style={styles.numberValue}>{index+2}</Text>
          <Text style={styles.modelValue}>Instalare</Text>
          <Text style={styles.sizeValue}/>
          <Text style={styles.addOnsValue}/>
          <Text style={styles.quantityValue}/>
          <Text style={styles.priceValue}/>
        </View>
        <View style={styles.productRow}>
          <Text style={styles.numberValue}>{index+3}</Text>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.sizeValue}/>
          <Text style={styles.addOnsValue}/>
          <Text style={styles.quantityValue}/>
          <Text style={styles.priceValue}>{data.pret} lei</Text>
        </View>
        <View style={styles.productRow}>
          <Text style={styles.numberValue}>{index+3}</Text>
          <Text style={styles.totalText}>Avans:</Text>
          <Text style={styles.sizeValue}/>
          <Text style={styles.addOnsValue}/>
          <Text style={styles.quantityValue}/>
          <Text style={styles.priceValue}/>
        </View>
        <View style={styles.productRow}>
          <Text style={styles.numberValue}>{index+3}</Text>
          <Text style={styles.totalText}>Ramas:</Text>
          <Text style={styles.sizeValue}/>
          <Text style={styles.addOnsValue}/>
          <Text style={styles.quantityValue}/>
          <Text style={styles.priceValue}/>
        </View>
      </View>
      <View style={styles.paragraph}>
        <Text>Prezentul act este perfectat in doua exeplare, cate unul pentru fiecare parte.</Text>
        <Text>Garantie 2 ani de zile – (transformator, iluminare led, suplimentele adaugatoare).</Text>
        <Text>Termenul de executare comenzii – 20 zile (lucratoare)</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Beneficiar: {data.name}</Text>
        <View style={styles.footerTextExecutor}>
          <Text style={styles.stampText}>Executor: Millory</Text>
          {
            data.roDomain 
            ? <Image style={styles.stamp} src="https://res.cloudinary.com/dbh1vgas3/image/upload/v1660482970/milloryRoStampila_tr8bjl.png"/>
            : <Image style={styles.stamp} src="https://res.cloudinary.com/dbh1vgas3/image/upload/v1660482970/milloryMdStampila_tpdjju.png"/>
          }
        </View>
      </View>
    </Page>
  </Document>
)};