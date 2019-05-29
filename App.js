import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    cards: [], 
    question: '', 
    answer: '', 
    formActive: false, 
    showAnswer: false, 
    error: '', 
    success: ''
  }
  

  shuffleCards() {
    const array = this.state.cards.slice(); 
    
    let copy = []
    let n = array.length;
    let i; 

    // While there remain elements to shuffle…
    while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);
  
      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
  
    this.setState({ cards: copy }); 
  }

  getNextCard() {
    const cardsCopy = this.state.cards.slice(); 
    const currentCard = cardsCopy.shift(); 
    cardsCopy.push(currentCard)
    this.setState({ cards: cardsCopy, showAnswer: false }); 
  }

  addCard() {
    if (!this.state.question || !this.state.answer) {
      return this.setState({ error: 'Please enter both a question and an answer.', success: ''});  
    }
    const cards = [...this.state.cards, ...[{ question: this.state.question, answer: this.state.answer }]]
    this.setState({ cards: cards, question: '', answer: '', error: '', success: 'Your card was successfully added' }); 
    setTimeout(() => {
      this.setState({ success: ''})
    }, 5000); 
  }

  renderForm() {
    return (
      <View style={styles.contentContainer}>
        <TextInput 
          style={styles.inputStyles}
          value={this.state.question}
          placeholder="Question"
          placeholderTextColor="white"
          onChangeText={text => this.setState({ question: text, error: '' })}
        ></TextInput>
        <TextInput 
          style={styles.inputStyles}
          value={this.state.answer}
          placeholder="Answer"
          placeholderTextColor="white"
          onChangeText={text => this.setState({ answer: text, error: ''  })}
        ></TextInput>
        <Text style={styles.error}>{this.state.error}</Text>
        <Text style={styles.successMessage}>{this.state.success}</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => this.addCard()}
        >
          <Text style={styles.buttonText}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderCard() {
    const total = this.state.cards.length
    return (
      <View style={styles.contentContainer}>
        {this.state.cards.length ? (
          <View style={styles.quizContent}>
            <Text style={styles.topMessage}>You have {total} total card{total > 1 ? 's' : ''}</Text>
            <Text
              style={styles.label}
            >
              {this.state.showAnswer ? 'ANSWER:' : 'QUESTION:'}
            </Text>
            <Text style={styles.instructions}>
              {this.state.showAnswer ? this.state.cards[0].answer : this.state.cards[0].question}
            </Text>
            <TouchableOpacity style={styles.answerButton} onPress={() => this.setState({ showAnswer: !this.state.showAnswer })}>
              <Text style={styles.buttonText}>
                See {this.state.showAnswer ? 'Question' : 'Answer'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => this.getNextCard()}>
              <Text style={styles.buttonText}>
                Next Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shuffleButton} onPress={() => this.shuffleCards()}>
              <Text style={styles.buttonText}>
                Shuffle
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.instructions}>You haven't made any cards yet!</Text>
        )}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.outerContainer}> 
        <View style={styles.menuContainer}>
          {this.state.formActive ? (
            <TouchableOpacity onPress={() => this.setState({ formActive: false })}>
              <Text style={styles.navigationLink}>
                Back to Cards
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.setState({ formActive: true })}>
              <Text style={styles.navigationLink}>
                Create a card
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {this.state.formActive ? this.renderForm() : this.renderCard()}
        <View style={styles.footerContainer}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1, 
    backgroundColor: '#efedf9',
  },
  menuContainer: {
    flex: 1,  
    backgroundColor: '#424242',
    textAlign: 'center'
  },
  footerContainer: {
    flex: 1,  
    backgroundColor: '#424242',
    textAlign: 'center'
  },
  navigationLink: {
    marginTop: 50,
    marginBottom: 20,
    color: 'white', 
    textAlign: 'center'
  },  
  contentContainer: {
    flex: 7, 
    justifyContent: 'center'
  }, 
  quizContent: { 
    paddingBottom: 100
  },
  formContainer: {
    display: 'flex', 
    backgroundColor: 'red',
    flex: 1 
  },
  error: {
    color: 'red',
    width: 200, 
    textAlign: 'center',
    marginLeft: 'auto', 
    marginRight: 'auto'
  },
  successMessage: {
    color: 'green',
    width: 200, 
    textAlign: 'center',
    marginLeft: 'auto', 
    marginRight: 'auto'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  label: {
    textAlign: 'center',
    fontWeight: 'bold', 
    color: 'black',
    marginBottom: 5,
  },
  topMessage: {
    marginLeft: 'auto', 
    marginRight: 'auto', 
    marginBottom: 100
  },
  createButton: {
    marginTop: 50, 
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 24,
    color: 'white',
    overflow: 'hidden',
    padding: 15,
    marginLeft: 50,
    marginRight: 50
  }, 
  nextButton: {
    marginTop: 20, 
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 24,
    color: 'white',
    overflow: 'hidden',
    padding: 15,
    marginLeft: 50,
    marginRight: 50
  },
  answerButton: {
    marginTop: 90, 
    backgroundColor: '#7db573',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 24,
    color: 'white',
    overflow: 'hidden',
    padding: 15,
    marginLeft: 50,
    marginRight: 50
  }, 
  shuffleButton: {
    marginTop: 20, 
    backgroundColor: '#737bb5',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 24,
    color: 'white',
    overflow: 'hidden',
    padding: 15,
    marginLeft: 50,
    marginRight: 50
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
  },
  inputStyles: {
    marginBottom: 20,
    backgroundColor: 'grey', 
    borderRadius: 5, 
    color: 'white',  
    padding: 10,
    marginLeft: 50,
    marginRight: 50
  }
});
