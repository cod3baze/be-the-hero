import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity,
  Image, Linking
} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import styles from './styles';

function Detail() {
  const navigation = useNavigation()
  const route = useRoute()

  const incidentx = route.params.incident
  const message = `Olá ${incidentx.name}, estou entrando em contacto pois gostaria de ajudar no caso "${incidentx.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style:"currency", currency: 'BRL' }).format(incidentx.value)}.`

  function navigateBack() {
    navigation.goBack()
  }

  async function sendMail() {
    try {
      await MailComposer.composeAsync({
        subject: `Herói do caso: ${incidentx.title}`,
        recipients: [incidentx.email],
        body: message,
      })
    } catch (err) {
      alert(err)
    }
  }

  async function sendWhatsapp() {
    try {
      await Linking.openURL(`whatsapp://send?phone=${incidentx.whatsapp}&text=${message}`)
    } catch (err) {
      alert(arr)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity 
          onPress={navigateBack} 
          style={styles.header}
        >
          <Feather name="arrow-left" color="#E82041" size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0, }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{ incidentx.name } de  { incidentx.city } / {incidentx.uf}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{ incidentx.title }</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>{ 
          Intl.NumberFormat('pt-BR', { style:"currency", currency: 'BRL' }).format(incidentx.value)
        }</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seje o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contacto:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


export default Detail
