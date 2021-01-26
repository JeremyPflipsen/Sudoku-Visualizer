//This function is bound to the App class in App.js
//so that App may pass it onto other components
//and those components may change app's state

export default function selectAlg(value) {
    switch(value) {
      case value:
        this.setState({selectedAlg: value})
        break
      
      default:
        console.log("You selected an algorithm!")
        break
    }
  }