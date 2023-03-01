import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { UserContext} from '../../App'
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';
import * as Animatable from 'react-native-animatable'
import IconPlay from '../../assets/ImageIcons/iconPlay.svg'
import ArrowDeck from '../../assets/ImageIcons/arrowDeck.svg'

export function Decks({ navigation }) {
    const {dataUser} = useContext(UserContext)
    const [menu, setMenu] = useState({on: false, index: ''})
    const {callAxios, answerAxios} = useAxios()
    const [visible, setVisible] = useState(true)
    const [modalDelet, setModalDelet] = useState(false)
    const [idFlashDelet, setIdFlashDelet] = useState()

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

    async function deleteCard (){
        try{
            setVisible(true)
            await callAxios('cards/' + idFlashDelet, '', 'delete')
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
                <Image source={{uri: card.image_url}} style={{width: '100%', height: '100%'}}/>
            
                <View style={styles.line}>
                        <Text style={styles.title}>{card.title}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ShowFlashCard',answerAxios.res[index].id)} style={styles.buttonPlay}>
                            <IconPlay />
                        </TouchableOpacity>
                </View>
                { menu.on && menu.index === index ?
                <Animatable.View delay={0} duration={500}
                    animation="fadeInLeft"  style={styles.editBox}>
                    <TouchableOpacity onPress={() => setMenu({on: false, index})} style={{alignItems: 'flex-end', marginTop: 6, right: '5%', padding: 5}}>       
                        <ArrowDeck />
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.textEdit} onPress={() => {
                        navigation.navigate('EditDeck', card.id) 
                        setMenu({on: false, index})}}>
                            <Text style={{color:'#FFF', fontSize: 18}}> Editar </Text>
                            <View style={{backgroundColor: '#FFF', width: 22, height: 2, marginLeft: 4,}}></View>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.textEdit} onPress={() => {
                        setIdFlashDelet(card.id)
                        setModalDelet(!modalDelet)
                        setMenu({on: false, index})}}>
                        <Text style={{color:'#FFF', fontSize: 18}}> Excluir </Text>
                        <View style={{backgroundColor: '#FFF', width: 22, height: 2, marginLeft: 4,}}></View>
                    </TouchableOpacity>
                </Animatable.View>
            :
                <TouchableOpacity 
                    onPress={() => setMenu({on: true, index})}
                    style={{position: 'absolute', marginTop: 16, marginLeft: 22, rotation: 180}}>       
                    <ArrowDeck />
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

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalDelet}
            onRequestClose={() => {
            setModalDelet(!modalDelet)
            }}>

            <TouchableOpacity style={styles.buttonExit} onPress={() => setModalDelet(!modalDelet)}>
            <TouchableOpacity activeOpacity={1} style={styles.boxModal}>
                <View style={{width: '80%', height: '100%', alignSelf: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize:20, fontWeight: '500', color: '#fff', textAlign: 'center'}}>Tem certeza que deseja excluir este evento?</Text>
                <TouchableOpacity style={styles.buttonSave} onPress={() => (setModalDelet(!modalDelet), deleteCard())}>
                    <Text style={styles.textButtonSave}>Sim</Text>
                </TouchableOpacity>
                </View>
            </TouchableOpacity>
            </TouchableOpacity>
        </Modal>  
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
        right: 1,
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

  //Modal de Confirmação de deletar
  buttonExit:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 73, 115, 0.79)',
  },
  boxModal:{
    width:285,
    height:225,
    backgroundColor: 'rgba(75, 130, 163, 1)',
    borderWidth: 2, 
    borderColor: '#FFF',
    borderRadius: 8,
  },
  buttonSave:{
    width:123,
    height:36,
    borderRadius: 8,
    backgroundColor: 'background: rgba(145, 189, 216, .2)',
    borderWidth: 2,
    borderColor: '#91BDD8',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textButtonSave:{
    color: '#91BDD8',
    fontSize: 18,
  },

})