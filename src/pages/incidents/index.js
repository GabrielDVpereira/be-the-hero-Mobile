import React, { useEffect, useState } from "react";

import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import logo from "../../../assets-app-mobile/assets-app-mobile/logo.png";
import styles from "./styles";
import api from "../../services/api";

export default function Incidents({ navigation }) {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    if (loading) return;
    if (total > 0 && incidents.length == total) return;

    setLoading(true);
    const respose = await api.get("/incidents", {
      params: { page },
    });
    setIncidents([...incidents, ...respose.data]);
    setTotal(respose.headers["x-total-count"]);
    setLoading(false);
    setPage(page + 1);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia
      </Text>

      <View style={styles.incidentsList}>
        <FlatList
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(incident) => String(incident.id)}
          data={incidents}
          renderItem={({ item: incident }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentPropety}>ONG: </Text>
              <Text style={styles.incidentValue}> {incident.name}</Text>

              <Text style={styles.incidentPropety}>Caso: </Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentPropety}>Valor: </Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(incident.value)}
              </Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate("details", { incident })}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
