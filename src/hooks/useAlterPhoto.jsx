import React, {useState} from 'react'
import {uploadImage} from '../components/UpdateImage'
import { UserContext } from '../../App';
import * as ImagePicker from 'expo-image-picker';
import useAxios from '../hooks/useAxios'
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAlterPhoto() {
    //Variavel Informação do axios
    const {callAxios} = useAxios()
    //Variavel Informação da photo que foi trocada
    const  [answerAlterPhoto, setanswerAlterPhoto] = useState() 
    //Variavel global
    const {dataUser} = React.useContext(UserContext)
    const {setDataUser} = React.useContext(UserContext)
    
    let result
    //variavel de photo e name
    const [photoProfile, setPhotoProfile] = useState(dataUser.image)  

    const callAlterPhoto = React.useCallback(async(type) =>{
        try{
            if (type === "launchImageLibraryAsync"){
                result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            setanswerAlterPhoto("")
            } else if (type === "launchCameraAsync"){
                result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                }); 
            }   
        } catch(e) {
            console.log(e)
         }
        const image = await fetchImageFromuri(result.uri)

        try{
            const resp = await uploadImage(image)
            dataUser.image = resp.url
            const newData = dataUser
            setDataUser(newData)

            try {
            await AsyncStorage.clear()
            await AsyncStorage.setItem('User', JSON.stringify(newData));
            } catch(e) {
            console.log(e)
            }

            setanswerAlterPhoto(resp)
            AlterTableImage()
        } catch(e){
        console.log(e)
        }
    },[])


    //Altera a imagem no banco de dados e no app
    async function AlterTableImage(){
        const data = {
            image: photoProfile
        } 
        try{
            await callAxios ("user/image/" + dataUser.id, data, "put", false) 
        } catch(e) {
            setanswerAlterPhoto("")
            console.log(e)    
        } finally {
            setanswerAlterPhoto("")
        }
    }

    //Transforma a imagem inteira em um url blob
    async function fetchImageFromuri(uri){
        const resp = await fetch(uri)
        const blob = resp.blob()
        return blob
    }

    return { 
        callAlterPhoto,
        answerAlterPhoto
    }

    }

export default useAlterPhoto