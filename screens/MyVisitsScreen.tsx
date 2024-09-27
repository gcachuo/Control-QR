import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import BackButton from "../components/BackButton";
import {Appbar, List} from "react-native-paper";
import moment from 'moment-timezone';
import {collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import {useAuth} from "../hooks/useAuth";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import { useFocusEffect} from "@react-navigation/native";

export default function MyVisitsScreen() {
    const { user } = useAuth();
    const [visits, setVisits] = useState<{[key: string]:DocumentData[]}>({});
    moment.tz.setDefault("America/Mexico_City");

    useFocusEffect(
    useCallback(() => {
        (async () => {
            const q = query(
                collection(getFirestore(), "visits"),
                where("creatorUid", "==", user!.uid)
            );

            const querySnapshot = await getDocs(q);
            const visits = querySnapshot.docs.map((doc) => doc.data());

            const grouped = visits.reduce((acc: { [key: string]: DocumentData[] }, visit) => {
                const visitDate = new Date(visit.createdTime); // 'timestamp' es el campo que contiene la fecha
                const dayKey = visitDate.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

                if (!acc[dayKey]) {
                    acc[dayKey] = [];
                }

                acc[dayKey].push(visit);

                return acc;
            }, {});

            setVisits(grouped);
        })();
    }, [user]));

    console.log(visits);
    return (
        <ScrollView>
            <Appbar
                style={{
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                }}
            >
                <BackButton/>
            </Appbar>
            <View style={styles.container}>
                <View style={styles.form}>
                    <List.Section title="Mis Visitas">
                        {Object.keys(visits).map((day) => (
                            <List.Accordion
                                key={day}
                                title={moment(day).format("DD/MMMM YYYY")}
                                left={props => <List.Icon {...props} icon="calendar" />}
                            >
                                {visits[day]
                                    .sort((a, b) => a.createdTime - b.createdTime)
                                    .map((visit, index) => (
                                    <List.Item
                                        key={index}
                                        title={`Visita de ${visit.guestName}`}
                                        description={`Hora: ${moment(visit.createdTime).format('hh:mm a')}`}
                                    />
                                ))}
                            </List.Accordion>
                        ))}
                    </List.Section>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        width: "90%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4,
    },
    input: {
        marginBottom: 20,
    },
    qrContainer: {
        paddingVertical: 20,
        alignItems: "center",
        backgroundColor: "white",
    },
    qrData: {
        marginVertical: 10,
        fontSize: 13,
    },
});