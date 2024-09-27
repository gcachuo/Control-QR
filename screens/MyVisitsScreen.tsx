import React from "react";
import {ScrollView} from "react-native";
import BackButton from "../components/BackButton";
import {Appbar} from "react-native-paper";

export default function MyVisitsScreen() {
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
        </ScrollView>
    )
}