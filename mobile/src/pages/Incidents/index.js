import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { 
  View, Text, Image,
  TouchableOpacity, FlatList, Alert,
  ActivityIndicator
} from 'react-native';
import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles';

function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingx, setLoadingx] = useState(true)

  const navigation = useNavigation()

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    if(loading) {
      return
    }

    if(total > 0 && incidents.length === total) {
      return
    }

    setLoading(true)

    try {
      const response = await api.get('incidents', {
        params: { page }
      })

      setIncidents([ ...incidents, ...response.data ])
      setTotal(response.headers['x-total-count'])
      setPage(page + 1)
      setLoading(false)
    } catch (err) {
      Alert.alert('Error', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadIncidents()
    setLoadingx(false)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={ styles.headerTextBold }>{total} Casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

      {loadingx ? <ActivityIndicator style={{ marginTop: 150, }} animating color="#000" size="small" /> : 
        <FlatList
          style={styles.incidentsList}
          data={incidents}
          keyExtractor={e => e.id.toString()}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({ item: incidentx }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{ incidentx.name }</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{ incidentx.title }</Text>

              <Text style={styles.incidentProperty}>Valor:</Text>
              <Text style={styles.incidentValue}>{ 
                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidentx.value)
              }</Text>

              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => navigateToDetail(incidentx)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      }
    </View>
  );
}


export default Incidents
