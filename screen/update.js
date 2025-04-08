import { useRoute } from "@react-navigation/native"
import { useState } from "react"
import { Button, StyleSheet, Switch, Text, View } from "react-native"
import { URL } from "../constants/api"
import { TextInput } from "react-native-web"

const Update = () => {
    const route = useRoute()
    const {id, infoArticle} = route.params
    console.log(infoArticle)
    // déstructuration d'objet pour récupérer les clé de infoArticle afin de les mettre par défaut dans les inputs 
    const {name, content , category, brand, price , picture, status, stock} = infoArticle
    // state pour le button switch 
    const [formSwitch, setFormSwitch] = useState(status);
    const [player, setPlayer] = useState({
        name: name,
        content: content,
        category: category,
        brand: brand,
        price: price,
        picture: {
            img:picture.img
        },
        // picture: picture,
        status: status,
        stock: stock,
    })

    // fonction qui va écoter enregistrer les changement des input 
    const changeValue = (key, value) => {
        if(key === "picture"){
            setPlayer({...player, [key]:{img:value}})
        }else{
            setPlayer({...player , [key]:value })
        }
        console.log(player)
    }

    // fonction pour mettre a jour un article 
    const UpdateArticle = async () => {
        try {
            const response = await fetch(`${URL.UPDATE_PLAYER}/${id}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(player)
            })
            const data = await response.json()
            if(response.status === 200){
                console.log(data)
                console.log('Article Updated')
                navigation.goBack()
            }
        } catch (error) {
            throw error.message;
        }
    }
    return(
        <>
             <View style={styles.container}>
                <View>
                    <Text style={styles.inputLabel}>Nom de l'article</Text>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={name}
                        // maxLength={20}
                        onChangeText={(val) => changeValue("name", val)}
                    />
                </View>

                <View>
                    <Text style={styles.inputLabel}>Description de l'article</Text>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={content}
                        // maxLength={20}
                        onChangeText={(val) => changeValue("content", val)}
                    />
                </View>

                {/* Catégotégorie de l'article  */}
                <Text style={styles.inputLabel}>Catégorie</Text>
                <TextInput 
                    style={styles.textInput}
                    defaultValue={category}
                    placeholder="Catégorie"
                    onChangeText={(val) => changeValue("category", val)}
                />
                {/* marque de l'article  */}
                <Text style={styles.inputLabel}>Marque</Text>
                <TextInput 
                    style={styles.textInput}
                    defaultValue={brand}

                    placeholder="marque"
                    onChangeText={(val) => changeValue("brand", val)}
                />
                {/* prix de l'article  */}
                <Text style={styles.inputLabel}>prix</Text>
                <TextInput 
                    style={styles.textInput}
                    defaultValue={price}

                    placeholder="prix"
                    keyboardType="numeric"
                    onChangeText={(val) => changeValue("price", val)}
                />
                {/* image de l'article  */}
                <Text style={styles.inputLabel}>Image produit</Text>
                <TextInput 
                    style={styles.textInput}
                    defaultValue={picture.img}

                    placeholder="URL de l'image"
                    onChangeText={(val) => changeValue("picture", val)}
                />
                {console.log(picture)
                }
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
                    defaultValue={stock}
                    placeholder="stock"
                    keyboardType="numeric"
                    onChangeText={(val) => changeValue("stock", val)}
                />
                <Button title="Valider" 
                    onPress={UpdateArticle} 
                />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container:{
        padding: 16,
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



}); 
export default Update