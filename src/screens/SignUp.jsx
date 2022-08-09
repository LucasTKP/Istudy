import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components/native'
import { Text, Image, Alert, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { CheckBox } from 'react-native-elements'
import Google from '../components/Google'
import Input from '../components/Input'
import Loading from '../components/Loading'
import useAxios from '../hooks/useAxios'
import Pencil from '../../assets/Pencil.png'
import BoxCode from '../components/BoxCode'
import BoxAlert from '../components/BoxAlert'
import { UserContext } from '../../App';

export function SignUp({navigation}) {
  //Variavel global
  const {setModal, setAlert} = useContext(UserContext)
  //Variavel CheckBox
  const [checked, setChecked] = useState(false);
  //Variaveis Dados recebidos do Input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  //Variaveis de erro
  const [errorName, setErrorName] = useState(true); 
  const [errorEmail, setErrorEmail] = useState(true); 
  const [errorPassword, setErrorPassword] = useState(true); 

  //Variavel Loading
  const [visible, setVisible] = useState(false)
  //Variavel Icon/View Password
  const [viewPassword, setViewPassword] = useState(true); 
  //Variavel Informação do axios
  const {callAxios, answerAxios} = useAxios()
  //Variavel NameIcon
  const [nameIcon, setNameIcon] = useState("eye-off");
  //codigo que chega no email
  const [codeEmail, setCodeEmail] = useState("")
  //Message of Alert
  const [message, setMessage] = useState()
  //Termos de uso
  const termosDeUso = "VOCÊ DEVE LER E CONCORDAR COM ESTAS CONDIÇÕES DE USO PARA ACESSAR AO REGISTRAR-SE E/OU AO COMPARTILHAR DADOS OU INFORMAÇÃO NESTE SITE. SE VOCÊ NÃO CONCORDAR COM TODA OU QUALQUER PARTE DESTAS CONDIÇÕES DE USO, POR FAVOR, NÃO USE ESSE SITE.  Avisos importantes que você deve ler  Você reside fora do Brasil e de Portugal Nós preparamos esta informação para Usuários que falam português, residentes no Brasil ou em Portugal, de forma que essas informações (ou parte delas) podem não se aplicar a você. Por favor, dedique um momento para verificar nossos outros sites e políticas e os territórios aos quais eles se aplicam.  Existe alguma coisa que você não entende? Fizemos o melhor que pudemos para preparar essas informações para Usuários de todas as idades e estamos comprometidos com uma constante revisão e aprimoramento do idioma que usamos para ser o mais simples e claro possível. Caso tenha algum problema com o significado de uma palavra, frase ou parte de qualquer uma das informações abaixo, consulte as perguntas frequentes do Site e peça ajuda aos seus representantes legais, pais ou tutores. Além disso, avise-nos se houver algo que possamos fazer para tornar essas informações mais amigáveis e compreensíveis. Nós apreciamos qualquer ajuda que você possa nos dar!  1.1. – Introdução Estas condições (“ Condições ”) definem os termos e condições sob os quais você pode se registrar, ou usar o nosso app, incluindo as informações e recursos fornecidos pelo App. Tanto o App como as informações e recursos do App estão disponíveis para qualquer pessoa interessada (o “ Usuário ”), sob as condições e restrições fornecidas nestas Condições.   1.2. – Quem pode usar este App? Este Site é destinado principalmente a alunos, professores e, ainda, aos pais ou representantes legais que falem o idioma dos menores. Se você tiver 13 anos de idade ou mais no Brasil, ou 16 anos de idade ou mais em Portugal, poderá se registrar e aceitar estes Termos de Serviço autonomamente. Se você residir no Brasil ou em Portugal e não tiver pelo menos 13 anos de idade no Brasil ou 16 anos de idade em Portugal, por favor pare de usar o App e não se registre e/ou use o App sem a devida autorização de seus pais ou representantes legais. Podemos pedir-lhe para confirmar a sua idade, país de residência e também para nos fornecer detalhes adicionais em relação à data de nascimento e ao nível de escolaridade"

  //Muda o nome/image do icone de senha
  function VerifyEye(){
    if(viewPassword === true){
      setNameIcon("eye")
    } else if (viewPassword === false){
      setNameIcon("eye-off")
    }
  }
  //Valida email nome e senha de acordo com as regex
  useEffect(()=>{
    Validar()
  },[name])
  useEffect(()=>{
    Validar()
  },[email])
  useEffect(()=>{
    Validar()
  },[password])
 
  //Muda de pagina apos a confirmação
  useEffect(()=>{
    if(answerAxios.code){
      setCodeEmail(answerAxios.code)
      setModal(true)
    } else if (answerAxios.message){
      setMessage(answerAxios.message)
      setAlert(true)
    }
  },[answerAxios])
  
  //Validação dos inputs com regex
  function Validar(){
    const regexName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const regexPassword = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/

    setErrorName(true)
    setErrorEmail(true)
    setErrorPassword(true)

    if(name.length > 1 && !regexName.test(name)){
      setErrorName(false)
      return false
    } 
    if(email.length > 1 && !regexEmail.test(email)){
      setErrorEmail(false)
      return false
    } 
    
    if (password.length > 1 && !regexPassword.test(password)){
      setErrorPassword(false)
      return false
    }
    return true
  }

  //envia o email e o nome para verificar se nao tem igual
  async function Axios(){

    setVisible(true)
    const data = {
      name: name,
      email: email
    } 
    try{
      await callAxios ("user/verify", data, "post")
    }catch(e){
      console.log(e)
    }finally{
      setVisible(false)
    }
  }

  //Verifica se aceito os termos de uso
  const Cadastrar = () => {
    if (checked == true){
      if (Validar()){
        Axios() 
      }
    } else {
      setMessage("Aceite os termos de verificação")
      setAlert(true)
    }
  }     
  
  //Termos de uso em alert
  const alertTermos = () =>
    Alert.alert(
      "Termos de Serviço",
      termosDeUso,
      [{ text: "OK"}]
    );

  return (
    <View style={styles.container}>
      <Loading visible={visible} />
      <BoxCode codeEmail={codeEmail} email={email} funcao={'Cadastro'} password={password} name={name} />
      <BoxAlert message={message} type={"erro"}/>


      <View style={styles.containerLogo}>
      <Image source={require('../../assets/imageSingUp.png')}></Image>
      </View>
      
      
      
      <KeyboardAvoidingView style={styles.containerForm}>

      <Text style={styles.textTitle}> Cadastrar </Text>
        
         <Input  
          //Config Input
          onChangeText={(Text)=> setName(Text)} 
          placeholder="Name"
          //Config Icon
          style={{marginTop: 10, marginRight: 5}}
          name="body" 
          size={26} 
          color={"#444"}
          />
          {errorName ? <Text style={{height:0}}></Text> : <Text style={styles.textError}>O nome tem que ter no minimo 4 letras</Text>}
        
          <Input  
          //Config Input
          onChangeText={(Text)=> setEmail(Text)}
          placeholder="Email" 
          keyboardType='email-address'
          //Config Icon
          style={{marginTop:10,  marginRight: 5}} 
          name="md-mail" 
          size={26} 
          color={"#444"}
          />
          {errorEmail ? <Text style={{height:0}}></Text> : <Text style={styles.textError}>O email esta invalido</Text>}   

          <Input 
          //Config Input
          onChangeText={(Text)=> setPassword(Text)}
          placeholder="Senha"
          secureTextEntry={viewPassword}
          //Config Icon
          onPress={()=> (setViewPassword(!viewPassword), VerifyEye())} 
          style={{marginTop:10,  marginRight: 5}} 
          name={nameIcon} 
          size={26} 
          color={"#444"}
          />
          {errorPassword ? <Text style={{height:0}}></Text> : <Text style={styles.textError}>A senha deve conter 8 letras, minusculas, maiusculas e numeros</Text>}  
         
        
          <CheckBox 
            containerStyle={{
              width: 200,
              backgroundColor:"transparent", 
              borderColor:"transparent",
              width: '85%',
            }}
            center
            title={"Eu aceito os termos de serviço. Clique Aqui!"}
            textStyle={{color:"#4F91C2"}}
            checked={checked}
            onIconPress={() => setChecked(!checked)}
            onPress={() => alertTermos()}
          /> 
          <TouchableOpacity style={styles.buttonLogin} 
          onPress={() => Cadastrar()}>
           <Image source={require('../../assets/setaDireita.png')} />
          </TouchableOpacity>

          <Google/>


          </KeyboardAvoidingView>

          </View>
        
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#004973',
  },
  containerLogo: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle:{
    fontSize: 30,
    fontWeight:'bold',
    color: '#FFFF', 
    marginTop: 15,
    width: '85%',
    
  },
  containerForm:{
    flex:2,
    marginTop: 0,
    alignItems: 'center',
  },
  buttonLogin:{
    marginTop: 0,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: "#007FC7",
    borderRadius: 100,
    paddingVertical: 25,
    paddingHorizontal: 35,
    width: 30
  },
  textError:{
    color: 'red',
    width: 300,
    textAlign: 'center',
  },

})
