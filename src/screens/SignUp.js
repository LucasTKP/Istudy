import React, {useState} from 'react';
import styled from 'styled-components/native'
import { Text, View, Button, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'
import axios from 'axios';


export function SignUp({navigation}) {
  //Variavel CheckBox
  const [checked, setChecked] = useState(false);
  //Variaveis Dados recebidos do Input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [passwordViwer, setPasswordViwer] = useState(true); 

  const termosDeUso = "VOCÊ DEVE LER E CONCORDAR COM ESTAS CONDIÇÕES DE USO PARA ACESSAR AO REGISTRAR-SE E/OU AO COMPARTILHAR DADOS OU INFORMAÇÃO NESTE SITE. SE VOCÊ NÃO CONCORDAR COM TODA OU QUALQUER PARTE DESTAS CONDIÇÕES DE USO, POR FAVOR, NÃO USE ESSE SITE.  Avisos importantes que você deve ler  Você reside fora do Brasil e de Portugal Nós preparamos esta informação para Usuários que falam português, residentes no Brasil ou em Portugal, de forma que essas informações (ou parte delas) podem não se aplicar a você. Por favor, dedique um momento para verificar nossos outros sites e políticas e os territórios aos quais eles se aplicam.  Existe alguma coisa que você não entende? Fizemos o melhor que pudemos para preparar essas informações para Usuários de todas as idades e estamos comprometidos com uma constante revisão e aprimoramento do idioma que usamos para ser o mais simples e claro possível. Caso tenha algum problema com o significado de uma palavra, frase ou parte de qualquer uma das informações abaixo, consulte as perguntas frequentes do Site e peça ajuda aos seus representantes legais, pais ou tutores. Além disso, avise-nos se houver algo que possamos fazer para tornar essas informações mais amigáveis e compreensíveis. Nós apreciamos qualquer ajuda que você possa nos dar!  1.1. – Introdução Estas condições (“ Condições ”) definem os termos e condições sob os quais você pode se registrar, ou usar o nosso app, incluindo as informações e recursos fornecidos pelo App. Tanto o App como as informações e recursos do App estão disponíveis para qualquer pessoa interessada (o “ Usuário ”), sob as condições e restrições fornecidas nestas Condições.   1.2. – Quem pode usar este App? Este Site é destinado principalmente a alunos, professores e, ainda, aos pais ou representantes legais que falem o idioma dos menores. Se você tiver 13 anos de idade ou mais no Brasil, ou 16 anos de idade ou mais em Portugal, poderá se registrar e aceitar estes Termos de Serviço autonomamente. Se você residir no Brasil ou em Portugal e não tiver pelo menos 13 anos de idade no Brasil ou 16 anos de idade em Portugal, por favor pare de usar o App e não se registre e/ou use o App sem a devida autorização de seus pais ou representantes legais. Podemos pedir-lhe para confirmar a sua idade, país de residência e também para nos fornecer detalhes adicionais em relação à data de nascimento e ao nível de escolaridade"

  function Validar(){
    const regexName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const regexPassword = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/

    if(name.length < 7 || !regexName.test(name)){
      Alert.alert(
        "Nome invalido",
        "Tamanho ou caracteres invalidos",
        [{ text: "OK" }]
      );
      return false
    }

    if(!regexEmail.test(email)){
      Alert.alert(
        "Email invalido",
        "Caracteres invalidos",
        [{ text: "OK" }]
      );
      return false
    }

    if (!regexPassword.test(password)){
      Alert.alert(
        "Senha invalida",
        "Caracteres invalidos",
        [{ text: "OK" }]
      );
      return false
    }
    return true
  }

  async function Axios(){
    const urlVerification = "https://istudy-back-production.up.railway.app/api/v1/users/verify"

    const data = {
      name: name,
      email: email
    }
  
    const config = {
      headers:{
        Authentication: "donos_do_codigo"
      }
    }
    
    const resposta = await axios.post(urlVerification, data, config)

    const respostaData = resposta.data

    if(respostaData.status == 200){
    navigation.navigate("Confirmation", {code: respostaData.code, name: name, email: email, senha: password})             
    } else {
      Alert.alert(
        "Não foi possivel cadastrar",
        respostaData.message,
        [{ text: "OK" }]
      );
    }

  }

  const Cadastrar = () => {
    if (checked == true){
      if (Validar()){
        Axios() 
      }

    } else {
      Alert.alert(
        "Não foi possivel cadastrar",
        "Aceite os termos de verificação",
        [{text:"OK"}]
      )
    }
  }     

  const alertTermos = () =>
    Alert.alert(
      "Termos de Serviço",
      termosDeUso,
      [{ text: "OK"}]
    );

  return (
    <Container>
      <TextCadastrar> Cadastrar </TextCadastrar>

      <Input  
        onChangeText={(Text)=> setName(Text)} 
        placeholder="Name">
      </Input>

      <Input  
        onChangeText={(Text)=> setEmail(Text)}
        placeholder="Email" 
        keyboardType='email-address'>
      </Input>

      <Input 
        onChangeText={(Text)=> setPassword(Text)}
        placeholder="Senha"
        secureTextEntry={true}>
      </Input>

      <CheckBox 
        containerStyle={{
          width: 200,
          backgroundColor:"transparent", 
          borderColor:"transparent"
        }}
        center
        title={"Eu aceito os termos de serviço. Clique Aqui!"}
        textStyle={{color:"#4F91C2"}}
        checked={checked}
        onIconPress={() => setChecked(!checked)}
        onPress={() => alertTermos()}
      /> 

      <ButtonCadastro><TextButton 
      style={{color: 'white'}} 
      onPress={() => Cadastrar()}>
      Cadastre-se</TextButton></ButtonCadastro>

    </Container>
  );
}


const Container = styled.View `
  align-items: center;
  height: 100%;
`

const TextCadastrar = styled.Text `
font-size: 30px;
margin-top: 20px;
font-weight: bold;
`

const Input = styled.TextInput `
  border: 1px solid black;
  padding: 10px;
  margin-top: 50px;
  width: 300px;
  border-radius: 8px;
`

const ButtonCadastro = styled.TouchableOpacity `
  border: 1px solid black;
  border-radius: 20px;
  width: 300px;
  height: 70px;
  align-items: center;
  background-color: #0353BF;
  margin-top: 150px;
`

const TextButton = styled.Text`
font-size: 30px;
width:100%;
height:100%;
margin-top: 10px;
text-align: center;
`


