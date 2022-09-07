import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Container, ScrollViewBase, ScrollViewComponent} from 'react-native';
import  TipHalf from '../../assets/ImageIcons/tipHalf.svg'
import  TipCarts  from '../../assets/ImageIcons/tipCarts.svg'

export function GameQuestion({navigation}) {
  let teste = 'TEXTO I É evidente que a vitamina D é importante — mas como obtê-la? Realmente, a vitamina D pode ser produzida naturalmente pela exposição à luz do sol, mas ela também existe em alguns alimentos comuns. Entretanto, como fonte dessa vitamina, certos alimentos são melhores do que outros. Alguns possuem uma quantidade significativa de vitamina D, naturalmente, e são alimentos que talvez você não queira exagerar: manteiga, nata, gema de ovo e fígado. TEXTO II Todos nós sabemos que a vitamina D (colecalciferol) é crucial para sua saúde. Mas a vitamina D é realmente uma vitamina? Está presente nas comidas que os humanos normalmente consomem? Embora exista em algum percentual na gordura do peixe, a vitamina D não está em nossas dietas, a não ser que os humanos artificialmente incrementem um produto alimentar, como o leite enriquecido com vitamina D. A natureza planejou que você a produzisse em sua pele, e não a colocasse direto em sua boca. Então, seria a vitamina D realmente uma vitamina? '
  return (
    <View style={{flex:1, backgroundColor: '#005483'}}>
        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}}>
          <View style={styles.header}>
            <Text onPress={() => navigation.navigate('GameAnswer')} style={{color: '#fff', fontSize: 20, fontWeight: '500', marginTop: 25}}>0:30</Text>
            <View style={{width: '94%', height: 3, backgroundColor: 'rgba(193, 193, 193, 1)'}}>
              <View style={{width: '50%', height: '100%', backgroundColor: '#fff'}}></View>
            </View>
          </View>

       <View style={{width: '80%', alignItems: 'center'}}>
        <Text style={styles.initialText}> Historia</Text>
        <Text style={styles.initialText}> Revolução Francesa </Text>
        <Text style={styles.initialText}> 1/10 </Text>

        <View style={styles.textArea}>
          <ScrollView nestedScrollEnabled contentContainerStyle={{width: '100%'}}>
          <Text  multiline={true} style={{fontSize: 16, fontWeight: '500', margin:20}}>{teste}</Text>
          </ScrollView>
        </View>

        <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
          <TipCarts />
          <TipHalf />
        </View>
      
          <View style={styles.answerArea}>
            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>A</Text></View>
              <View style={styles.divAnswer}><Text style={styles.answer}> Comprova cientificamente que a vitamina D não é uma vitamina. </Text></View>
            </View>

            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>B</Text></View>
              <View style={styles.divAnswer}><Text style={styles.answer}>Demonstra a verdadeira importância da vitamina D para a saúde. </Text></View>
            </View>

            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>C</Text></View>
              <View style={styles.divAnswer}><Text style={styles.answer}>Enfatiza que a vitamina D é mais comumente produzida pelo corpo que absorvida por meio de alimentos. </Text></View>
            </View>

            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>D</Text></View>
              <View style={styles.divAnswer}><Text style={styles.answer}>Afirma que a vitamina D existe na gordura dos peixes e no leite, não em seus derivados. </Text></View>
            </View>
          </View>
        </View> 
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%', 
    height: 93, 
    alignItems: 'center', 
    marginTop: 50, 
    backgroundColor: 'rgba(35, 112, 157, 1)'
  },

  initialText:{
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '500', 
    marginTop: 16
  },
  textArea:{
    width: '100%', 
    height: 250, 
    backgroundColor:'#fff', 
    borderRadius: 10, 
    borderWidth: 3, 
    borderColor: 'rgba(0, 0, 0, 1)', 
    justifyContent: 'center', 
    alignItems:'center', 
    marginTop: 16
  },
  answerArea: {
    width: '100%', 
    height: 242, 
    borderRadius: 8, 
    backgroundColor: 'rgba(145, 189, 216, 0.18)', 
    marginTop: 15, 
    justifyContent: 'center', 
    alignItems:'center', 
    marginBottom: 30
  },
  configAnswer: {
    width: '90%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 5
  },
  divLetterAnswer: {
    width: 42, 
    height: 42, 
    backgroundColor: 'rgba(158, 222, 254, 1)', 
    borderRadius: 100, 
    alignItems:'center', 
    justifyContent: 'center', 
    color: 'rgba(35, 112, 157, 1)',
    borderWidth: 3,
    borderColor: '#007FC7'
  }, 
  letterAnswer: {
    fontSize: 20, 
    fontWeight: '800'
  },
  divAnswer: {
    width: 230, 
    height: 40, 
    backgroundColor: 'rgba(158, 222, 254, 1)', 
    borderRadius: 8, 
    alignItems:'center', 
    justifyContent: 'center', 
    color: 'rgba(35, 112, 157, 1)',
    borderWidth: 3,
    borderColor: '#007FC7'
  },
  answer: {
    fontSize: 14, 
    fontWeight: '800'
  }
})