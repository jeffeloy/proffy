import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import {
  BorderlessButton,
  RectButton,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import styles from "./styles";
import api from "../../services/api";

function TeacherList() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");

  function handleToogleFilterVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  async function handleFiltersSubmit() {
    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFilterVisible(false);
    setTeachers(response.data);
  }
  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToogleFilterVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeek_day(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
