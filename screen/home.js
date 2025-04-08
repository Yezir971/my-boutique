import { Button, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from 'react'
import { URL } from "../constants/api"
import { useNavigation } from "@react-navigation/native"

export default function Home(){
    const [players, setPlayers] = useState([])
    const navigation = useNavigation()
    const renderItem = ({item}) => {
        const {_id, name , content, stock, price,status, picture} = item
        return(
            <Pressable
                style={styles.content}
                onPress={() => {
                    navigation.navigate('Detail', {
                        id:_id
                    })
                }}
 
            >
                
                <View style={styles.card}>
                    <View style={styles.cardTop}>
                        <Image
                        alt=""
                        resizeMode="cover"
                        style={styles.cardImg}
                        source={picture?.img} />
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{name}</Text>
                            {/* <FontAwesome
                                color="#ea266d"
                                name="star"
                                solid={true}
                                size={12}
                                style={{ marginBottom: 2 }} /> */}
                            <Text style={styles.cardStatus}>En stock : {status ? "Disponible" : "Rupture de stock"}</Text>
           
                        </View>
                    <Text style={styles.cardPrice}>
                      <Text style={{ fontWeight: '600' }}>{price} € </Text>
                      
                    </Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    
    useEffect(() =>{
        const fetchPlayers = async () => {
            try {
                const response = await fetch(URL.FETCH_PLAYERS)
                const data = await response.json()
                if(data.status == 200){
                    console.log('Succès de la requête')
                    console.log(data)
                }
                setPlayers(data)
                
            } catch (error) {
                throw error.message;
                
            }
        }
        fetchPlayers()
    }, [])
    console.log(players)
    
    return(
        <>
            <FlatList 
                data={players}
                keyExtractor={item => item._id}
                renderItem={renderItem}
            />
        </>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        marginVertical:16,
    },
    /** Card */
    card: {
        position: 'relative',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
    },
    cardTop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardImg: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardBody: {
        padding: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#232425',
        marginRight: 'auto',
    },
    cardStatus: {
        marginLeft: 2,
        marginRight: 4,
        fontSize: 15,
        fontWeight: '500',
        color: '#232425',
    },
    cardDates: {
        marginTop: 4,
        fontSize: 16,
        color: '#595a63',
    },
    cardPrice: {
        marginTop: 6,
        fontSize: 16,
        color: '#232425',
    },
});