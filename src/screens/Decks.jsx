import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { UserContext} from '../../App'
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';

export function Decks({ navigation }) {
    const {dataUser} = useContext(UserContext)
    const [menu, setMenu] = useState({on: false, index: ''})
    const {callAxios, answerAxios} = useAxios()
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        Cards()
    }
    ,[])

    async function Cards (){
        try{
            await callAxios('cards/' + dataUser.id, '', 'get')
        } catch(error){
            console.log(error)
        } finally {
            setVisible(false)
        } 
    }

    async function deleteCard (id){
        console.log(id)
        try{
            setVisible(true)
            await callAxios('cards/' + id, '', 'delete')
            Cards()
        } catch(error){
            console.log(error)
        }
    }

    return (
        <View style={styles.background}>
            <Loading visible={visible} />
            {visible ? <Text></Text> : 
            <ScrollView>
            <Text style={styles.text}>Seus decks</Text>

            {answerAxios.res && answerAxios.res[0] ? answerAxios.res.map((card, index) => {
                return (
                <View style={styles.box} key={card.id}>
                <Image source={{uri: card.image_url}}
                 style={{width: '100%', height: '100%'}}/>
                
                <View style={styles.line}>
                        <Text style={styles.title}>{card.title}</Text>
                        <TouchableOpacity style={styles.buttonPlay}>
                            <Image 
                            style={styles.imagePlay}
                            source={require('../../assets/iconPlay.png')}/>
                        </TouchableOpacity>
                    </View>
                { menu.on && menu.index === index ?
                <View style={styles.editBox}>
                    <TouchableOpacity onPress={() => setMenu({on: false, index})} style={{alignItems: 'flex-end', marginTop: 6, right: '5%', padding: 5}}>       
                        <Image 
                        style={{tintColor: '#FFF'}}
                        source={require('../../assets/flecha.png')}/>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.textEdit} onPress={() => {
                        navigation.navigate('EditDeck', card.id) 
                        setMenu({on: false, index})}}>
                            <Text style={{color:'#FFF', fontSize: 18}}> Editar </Text>
                            <View style={{backgroundColor: '#FFF', width: 22, height: 2, marginLeft: 4,}}></View>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.textEdit} onPress={() => {
                        deleteCard(card.id)
                        setMenu({on: false, index})}}>
                        <Text style={{color:'#FFF', fontSize: 18}}> Excluir </Text>
                        <View style={{backgroundColor: '#FFF', width: 22, height: 2, marginLeft: 4,}}></View>
                    </TouchableOpacity>
                </View>
            :
                <TouchableOpacity 
                    onPress={() => setMenu({on: true, index})}
                    style={{position: 'absolute', marginTop: 16, marginLeft: 22, rotation: 180}}>       
                    <Image 
                        style={{tintColor: '#FFF'}}
                        source={require('../../assets/flecha.png')}/>
                </TouchableOpacity>
                }     
                </View>
            )}) : 
            <View style={{marginLeft: 44}}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    lineHeight: 30,
                    width: 300,
                    marginTop: 40
                }}>Não há nada por aqui, crie decks incriveis para estudar offline!</Text>
                <TouchableOpacity style={{
                    marginTop: 40,
                    borderColor: '#F9B84F',
                    borderWidth: 2,
                    backgroundColor: '#91BDD8',
                    borderRadius: 4,
                    width: 150
                }} onPress={() => navigation.navigate('CreateNewDeck')}><Text style={{color: '#005483', padding: 10, fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Criar Decks</Text></TouchableOpacity>
            </View>
        
        }
           </ScrollView>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor: '#004973',
        paddingTop: 60,
    },
    text:{
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFF',
        marginLeft:44,
    },
    box:{
        marginTop: 30,
        alignSelf: 'center',
        width: 295,
        height: 118,
    },
    line:{
        position: 'absolute',
        width: '100%',
        height: 44,
        backgroundColor: '#FFF',
        opacity: 0.6,
        bottom: '0%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title:{
        color: '#23709D',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    buttonPlay:{
        position: 'absolute',
        width: 32,
        height: 32,
        backgroundColor: '#23709D',
        right: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        paddingVertical: 18,
        paddingHorizontal: 18,
    },
    editBox:{
        position: 'absolute',
        backgroundColor: '#005483',
        borderRadius: 8,
        width: '50%',
        height: '100%',
        borderWidth: 3,
        borderColor: '#7BACC9'
    },
    textEdit:{
        marginLeft: 15, 
        marginTop: 4,
        color: '#FFF'
    },

})