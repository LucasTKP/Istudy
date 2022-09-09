import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Image, Br , TouchableOpacity, TextInput} from 'react-native';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import IconRank from '../../assets/ImagePages/rank.svg';
import IconTrophy from '../../assets/ImageIcons/iconTrophy.svg';

export function Ranks() {
    const {callAxios, answerAxios} = useAxios()
    const [visible, setVisible] = useState(false)
    const [show, setShow] = useState(false)
    const [position, setPosition] = useState(0)

    function next(){
        setPosition(position + 1)
    }

    useEffect(() => {
        if(answerAxios[0]){
            setShow(true)
            console.log(answerAxios)
        }
    },[answerAxios])
    useEffect(() => {
        GetRanks()
    },[])

    async function GetRanks(){
        try{
            const data = {
            }
            setVisible(true)
            await callAxios ("user/top", data, "get")
        }catch(e){
            console.log(e)
        }finally{
            setVisible(false)
        }
    }
  return (
    <View style={{backgroundColor:'#004973', height:'100%', width:'100%', alignItems: 'center'}}>
        <Loading visible={visible}/>
        <View style={{width:'80%', alignItems: 'center'}}>
            <View style={{width: '100%', flexDirection: 'row',justifyContent: 'space-between'}}>
                <View>
                    <Text style={{fontSize:30, fontWeight:'500', color:'#fff'}}>Ranks</Text>
                    <Text style={{fontSize: 15, fontWeight: '400', color: '#91BDD8', marginTop: 15}}>Os maiores vencedores {'\n'} de nossos flashcards!</Text>
                </View>
                <IconRank />
            </View>
            
            <View style={styles.BoxRanks}>
                {show ? answerAxios.map((player, index) =>{
                    return (
                        <>
                <View style={styles.DetailsBoxRanks}></View>
                <View style={styles.ContentPlayer}>
                        <Text style={styles.NumberRank}>{index + 1}º</Text>
                        <Text style={styles.NamePlayer}>{player.user.name}</Text>
                    <View style={styles.DivPoints}>
                        <IconTrophy />
                        <Text style={styles.NumberPoins}>{player.wins}</Text>
                    </View>
                </View>
                <View style={{height: 3, width: '100%', backgroundColor: '#004973'}}></View>
                </>
                    )
                }) : <></>}
                
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    BoxRanks: {
        width: 280, 
        height: 400, 
        backgroundColor: '#006299', 
        borderRadius: 12, 
        marginTop: 75
    },
    DetailsBoxRanks: {
        height: '100%', 
        width: 4, 
        backgroundColor: '#004973', 
        position: 'absolute', 
        left: 40
    },
    ContentPlayer: {
        flexDirection: 'row', 
        width: '90%', 
        height: '9.3%', 
        alignSelf: 'center', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    DivPosition: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '55%', 
        justifyContent: 'space-between'
    },
    DivPoints: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '23%', 
        justifyContent: 'space-between'
    },
    NamePlayer: {
        fontSize: 18,
        fontWeight: '500',
        color: '#7BACC9',
         width: '50%'
    }, 
    NumberRank: {
        fontSize: 18,
        fontWeight: '500',
        color: '#7BACC9',
         width: '20%'
    }, 
    NumberPoins: {
        fontSize: 18,
        fontWeight: '500',
        color: '#7BACC9',
    }, 
})