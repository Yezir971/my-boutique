import { View } from "react-native-web";
import { URL } from "../constants/api";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Image, StyleSheet, Text } from "react-native";

export default function Detail (){
    const [player, setPlayers] = useState([])
    const route =  useRoute()
    const {id} = route.params
    const navigation = useNavigation()

    const deleteplayer = async () => {
        try {
            const response = await fetch(`${URL.DELETE_PLAYER}/${id}`, {
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            // si l'api nous retourne un status 200 on affiche dans la console les donnés et on retourne sur l'écran précédent  
            if(response.status == 200){
                console.log(data)
                navigation.goBack()
            }
        } catch (error) {
            throw { message: error.message };
        }
    }


    const fetchIOneArticle = async () => {
        try {
            const response = await fetch(`${URL.FETCH_PLAYER_BYID}/${id}`)
            const data = await response.json()
            setPlayers(data)
            console.log(player)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        fetchIOneArticle()
    }, [])


    return(
        <>
            <View style={styles.container}>
                {console.log(player?.picture?.img)}

                <View style={styles.card}>
                    <Image source={player?.picture?.img} style={styles.image} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{player.name}</Text>
                        <Text style={styles.description}>{player.content}</Text>
                        <View style={styles.details}>
                            <Text style={styles.stock}>{player.stock}</Text>
                            <Text style={styles.price}>{player.price} €</Text>
                        </View>
                    </View>

                </View>







                <View style={styles.buttonWrap}>
                    <Button 
                        title="Supprimer"
                        onPress={deleteplayer}
                    />
                    <Button 
                        title="Modifier"
                        onPress={() => {
                            navigation.navigate('Update', {
                                id:id,
                                infoArticle:player
                            })
                        }}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 16,
        marginVertical:16,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 16
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stock: {
        fontSize: 14,
        color: '#888',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    buttonWrap:{
        flex: 1,
        gap:16,
    },

});
  