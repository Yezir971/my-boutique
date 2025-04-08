import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, ScrollView, Switch, View } from "react-native"
import { URL } from "../constants/api"
import { useNavigation } from "@react-navigation/native"

const Add = () => {
    const navigation = useNavigation()
    // state pour le button switch 
    const [formSwitch, setFormSwitch] = useState(true);
    // state pour les inputs 
    const [player, setPlayer] = useState({
        name: "",
        content: "",
        category: "",
        brand: "",
        price: 12,
        picture: {
            img:""
        },
        status: true,
        stock: 7
    })
    // fonction pour écouter les changement des inputs 
    const changeValue = (key, value) => {
        if(key === "picture"){
            setPlayer({...player, [key]:{img:value}})
        }else{
            setPlayer({...player , [key]:value })
        }
        console.log(player)
    }
    // fonction pour valider les données du nouvelle article 
    const validate = async () => {
        try {
            const response = await fetch(`${URL.CREATE_PLAYER}`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(player)
            })
            const data = await response.json()
            if(response.status === 200){
                navigation.goBack()
                console.log("SUCCES CREATION" + data)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    return(
        <>
            <ScrollView style={styles.container}>
                {/* nom de l'article  */}
                <Text style={styles.inputLabel}>Nom de l'article</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Nom"
                    onChangeText={(val) => changeValue("name", val)}
                />
                {/* Description de l'article   */}
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Description"
                    onChangeText={(val) => changeValue("content", val)}
                />
                {/* Catégotégorie de l'article  */}
                <Text style={styles.inputLabel}>Catégorie</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Catégorie"
                    onChangeText={(val) => changeValue("category", val)}
                />
                {/* marque de l'article  */}
                <Text style={styles.inputLabel}>Marque</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="marque"
                    onChangeText={(val) => changeValue("brand", val)}
                />
                {/* prix de l'article  */}
                <Text style={styles.inputLabel}>prix</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="prix"
                    keyboardType="numeric"
                    onChangeText={(val) => changeValue("price", val)}
                />
                {/* image de l'article  */}
                <Text style={styles.inputLabel}>Image produit</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="URL de l'image"
                    onChangeText={(val) => changeValue("picture", val)}
                />
                {/* Disponibilité de l'article  */}
                <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                    <Text style={styles.inputLabel}>Disponibilité</Text>
                    <View style={styles.rowSpacer} />
                        <Switch
                            onValueChange={(val) => {
                                setFormSwitch(val); // Mettre à jour l'état du switch
                                changeValue("status", val); // Mettre à jour l'état de l'article
                            }}
                            value={formSwitch} 
                        />
                    </View>
                </View>
                {/* quantité en stock */}
                <Text style={styles.inputLabel}>Nombre de produit en stock</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="stock"
                    keyboardType="numeric"
                    onChangeText={(val) => changeValue("stock", val)}
                />
                <Button 
                    title="Ajouter"
                    onPress={validate} 
                />
            </ScrollView>
        </>
    )
}

export default Add

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 16,
        marginVertical:12,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    textInput:{
        height: 44,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        marginBottom: 16,
    },
    row: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rowSpacer: {
        flexGrow: 1,
    }
})